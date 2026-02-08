import crypto from "node:crypto";
import type { ConnectionOptions } from "node:tls";
import { Pool, type PoolConfig } from "pg";
import { createClient, type RedisClientType } from "redis";

type LoggerLike = {
  info: (obj: unknown, msg?: string) => void;
  warn: (obj: unknown, msg?: string) => void;
  error: (obj: unknown, msg?: string) => void;
};

type ConnectionState = "disabled" | "ready" | "error";

export type StorageStatus = {
  postgres: ConnectionState;
  redis: ConnectionState;
  errors: string[];
};

export type SaveGeneratedSpecInput = {
  templateId: string;
  siteType: string;
  businessName: string;
  city: string;
  model: string;
  input: Record<string, unknown>;
  spec: Record<string, unknown>;
};

const GENERATED_SPEC_CACHE_PREFIX = "zencodify:generated-spec";
const DEFAULT_REDIS_CACHE_TTL_SECONDS = 3600;

const storageStatus: StorageStatus = {
  postgres: "disabled",
  redis: "disabled",
  errors: []
};

let postgresPool: Pool | null = null;
let redisClient: RedisClientType | null = null;

function parseBoolean(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

function parseSslConfig(
  sslMode: string | undefined,
  fallbackEnabled: boolean
): boolean | ConnectionOptions | undefined {
  const normalized = (sslMode ?? "").trim().toLowerCase();
  if (normalized === "disable") {
    return undefined;
  }
  if (normalized === "no-verify") {
    return { rejectUnauthorized: false };
  }
  if (normalized === "require" || fallbackEnabled) {
    return { rejectUnauthorized: true };
  }
  return undefined;
}

function resolvePostgresConfig(): PoolConfig | null {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  const sslMode = process.env.DATABASE_SSL_MODE ?? process.env.PGSSLMODE;
  const sslEnabled = parseBoolean(process.env.DATABASE_SSL);
  const ssl = parseSslConfig(sslMode, sslEnabled);

  if (databaseUrl) {
    return {
      connectionString: databaseUrl,
      ...(ssl ? { ssl } : {})
    };
  }

  const host = process.env.PGHOST?.trim();
  const user = process.env.PGUSER?.trim();
  const password = process.env.PGPASSWORD;
  const database = process.env.PGDATABASE?.trim();

  if (!host || !user || !password || !database) {
    return null;
  }

  return {
    host,
    user,
    password,
    database,
    port: parsePositiveInteger(process.env.PGPORT, 5432),
    ...(ssl ? { ssl } : {})
  };
}

function resolveRedisUrl(): string | null {
  if (process.env.REDIS_URL?.trim()) {
    return process.env.REDIS_URL.trim();
  }

  const host = process.env.REDIS_HOST?.trim();
  if (!host) {
    return null;
  }

  const username = process.env.REDIS_USERNAME?.trim();
  const password = process.env.REDIS_PASSWORD;
  const port = parsePositiveInteger(process.env.REDIS_PORT, 6379);
  const db = parsePositiveInteger(process.env.REDIS_DB, 0);
  const protocol = parseBoolean(process.env.REDIS_TLS) ? "rediss" : "redis";

  let auth = "";
  if (username || password) {
    auth = `${encodeURIComponent(username ?? "")}:${encodeURIComponent(password ?? "")}@`;
  }

  return `${protocol}://${auth}${host}:${port}/${db}`;
}

async function ensureGeneratedSpecsTable(): Promise<void> {
  if (!postgresPool) {
    return;
  }

  await postgresPool.query(`
    CREATE TABLE IF NOT EXISTS generated_site_specs (
      id BIGSERIAL PRIMARY KEY,
      template_id TEXT NOT NULL,
      site_type TEXT NOT NULL,
      business_name TEXT NOT NULL,
      city TEXT NOT NULL,
      model TEXT NOT NULL,
      input_json JSONB NOT NULL,
      spec_json JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await postgresPool.query(`
    CREATE INDEX IF NOT EXISTS idx_generated_site_specs_created_at
    ON generated_site_specs (created_at DESC);
  `);
}

function normalizeForHash(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeForHash(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const input = value as Record<string, unknown>;
  const entries = Object.keys(input)
    .sort()
    .map((key) => [key, normalizeForHash(input[key])] as const);
  return Object.fromEntries(entries);
}

function pushStorageError(message: string): void {
  storageStatus.errors = [...storageStatus.errors, message].slice(-10);
}

export async function initializeStorage(logger: LoggerLike): Promise<StorageStatus> {
  storageStatus.errors = [];

  const postgresConfig = resolvePostgresConfig();
  if (!postgresConfig) {
    storageStatus.postgres = "disabled";
    logger.info({ postgres: "disabled" }, "PostgreSQL is not configured.");
  } else {
    try {
      postgresPool = new Pool(postgresConfig);
      await postgresPool.query("SELECT 1;");
      await ensureGeneratedSpecsTable();
      storageStatus.postgres = "ready";
      logger.info({ postgres: "ready" }, "PostgreSQL connected.");
    } catch (error) {
      storageStatus.postgres = "error";
      pushStorageError("PostgreSQL connection failed.");
      logger.error({ error }, "Failed to connect PostgreSQL.");
    }
  }

  const redisUrl = resolveRedisUrl();
  if (!redisUrl) {
    storageStatus.redis = "disabled";
    logger.info({ redis: "disabled" }, "Redis is not configured.");
  } else {
    try {
      redisClient = createClient({ url: redisUrl });
      redisClient.on("error", (error) => {
        pushStorageError("Redis runtime error.");
        logger.error({ error }, "Redis runtime error.");
      });
      await redisClient.connect();
      await redisClient.ping();
      storageStatus.redis = "ready";
      logger.info({ redis: "ready" }, "Redis connected.");
    } catch (error) {
      storageStatus.redis = "error";
      pushStorageError("Redis connection failed.");
      logger.error({ error }, "Failed to connect Redis.");
      if (redisClient) {
        try {
          await redisClient.quit();
        } catch {
          // ignore cleanup error
        }
        redisClient = null;
      }
    }
  }

  return getStorageStatus();
}

export async function closeStorage(logger: LoggerLike): Promise<void> {
  if (postgresPool) {
    try {
      await postgresPool.end();
    } catch (error) {
      logger.warn({ error }, "Failed to close PostgreSQL pool cleanly.");
    }
    postgresPool = null;
  }

  if (redisClient) {
    try {
      await redisClient.quit();
    } catch (error) {
      logger.warn({ error }, "Failed to close Redis connection cleanly.");
    }
    redisClient = null;
  }
}

export function getStorageStatus(): StorageStatus {
  return {
    postgres: storageStatus.postgres,
    redis: storageStatus.redis,
    errors: [...storageStatus.errors]
  };
}

export function buildGeneratedSpecCacheKey(payload: unknown): string {
  const normalized = normalizeForHash(payload);
  const serialized = JSON.stringify(normalized);
  const hash = crypto.createHash("sha256").update(serialized).digest("hex");
  return `${GENERATED_SPEC_CACHE_PREFIX}:${hash}`;
}

export async function getCachedGeneratedSpec<T>(
  cacheKey: string,
  logger: LoggerLike
): Promise<T | null> {
  if (!redisClient || storageStatus.redis !== "ready") {
    return null;
  }

  try {
    const raw = await redisClient.get(cacheKey);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    logger.warn({ error, cacheKey }, "Failed to read generated spec from Redis.");
    return null;
  }
}

export async function cacheGeneratedSpec(
  cacheKey: string,
  value: unknown,
  ttlSeconds: number | undefined,
  logger: LoggerLike
): Promise<void> {
  if (!redisClient || storageStatus.redis !== "ready") {
    return;
  }

  const ttl = ttlSeconds && ttlSeconds > 0 ? ttlSeconds : DEFAULT_REDIS_CACHE_TTL_SECONDS;
  try {
    await redisClient.set(cacheKey, JSON.stringify(value), { EX: ttl });
  } catch (error) {
    logger.warn({ error, cacheKey }, "Failed to write generated spec to Redis.");
  }
}

export async function saveGeneratedSpec(
  input: SaveGeneratedSpecInput,
  logger: LoggerLike
): Promise<string | null> {
  if (!postgresPool || storageStatus.postgres !== "ready") {
    return null;
  }

  try {
    const result = await postgresPool.query<{ id: string }>(
      `
        INSERT INTO generated_site_specs (
          template_id,
          site_type,
          business_name,
          city,
          model,
          input_json,
          spec_json
        )
        VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb)
        RETURNING id;
      `,
      [
        input.templateId,
        input.siteType,
        input.businessName,
        input.city,
        input.model,
        JSON.stringify(input.input),
        JSON.stringify(input.spec)
      ]
    );
    return result.rows[0]?.id ?? null;
  } catch (error) {
    logger.warn({ error }, "Failed to persist generated spec to PostgreSQL.");
    return null;
  }
}
