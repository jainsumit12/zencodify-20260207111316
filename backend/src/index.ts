import fs from "node:fs";
import path from "node:path";
import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import { SiteSpecSchema, migrateGalleryStringsToImages } from "@zencodify/shared";
import { demoRoutes } from "./routes/demo";
import { closeStorage, getStorageStatus, initializeStorage } from "./storage";

function loadEnvironment(): string | null {
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "backend/.env"),
    path.resolve(__dirname, "../.env"),
    path.resolve(__dirname, "../../backend/.env")
  ];

  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (seen.has(candidate)) {
      continue;
    }
    seen.add(candidate);
    if (!fs.existsSync(candidate)) {
      continue;
    }

    dotenv.config({ path: candidate });
    return candidate;
  }

  dotenv.config();
  return null;
}

const loadedEnvPath = loadEnvironment();

const app = Fastify({
  logger: true
});

const start = async () => {
  try {
    const parsedPort = Number(process.env.PORT);
    const PORT = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 4010;

    // ✅ register CORS INSIDE start()
    await app.register(cors, {
      origin: true, // allow all localhost/dev origins
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    await initializeStorage(app.log);
    app.addHook("onClose", async () => {
      await closeStorage(app.log);
    });

    // health route
    app.get("/health", async () => {
      return {
        ok: true,
        storage: getStorageStatus()
      };
    });

    // schema validation route
    app.post("/validate", async (request, reply) => {
      const migrated = migrateGalleryStringsToImages(request.body);
      const result = SiteSpecSchema.safeParse(migrated);

      if (!result.success) {
        return reply.status(400).send({
          ok: false,
          errors: result.error.flatten(),
        });
      }

      return reply.send({ ok: true });
    });

    // AI + demo routes
    await demoRoutes(app);

    // start server
    await app.listen({ port: PORT, host: "0.0.0.0" });

    if (loadedEnvPath) {
      app.log.info({ envPath: loadedEnvPath }, "Loaded environment file");
    } else {
      app.log.warn("No .env file found via known paths; using process environment only.");
    }

    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`🧠 AI endpoint: http://localhost:${PORT}/demo/generate-sitespec`);
    console.log(`💓 Health: http://localhost:${PORT}/health`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
