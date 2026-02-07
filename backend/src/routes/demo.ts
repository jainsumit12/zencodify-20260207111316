import type { FastifyInstance } from "fastify";
import OpenAI from "openai";
import { SiteSpecSchema } from "@zencodify/shared";
import { buildSiteSpecPrompt } from "../ai/siteSpecPrompt";

type DemoGenerateBody = {
  templateId?: unknown;
  siteType?: unknown;
  businessName?: unknown;
  category?: unknown;
  city?: unknown;
  phone?: unknown;
  whatsapp?: unknown;
  address?: unknown;
  hours?: unknown;
  services?: unknown;
};

const REQUIRED_FIELDS: Array<keyof DemoGenerateBody> = [
  "templateId",
  "siteType",
  "businessName",
  "category",
  "city",
  "phone",
  "whatsapp",
  "address"
];

const VALID_SITE_TYPES = new Set(["one_page", "multipage"]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeStringList(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    const normalized = value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    return normalized.length > 0 ? normalized : undefined;
  }

  if (typeof value === "string") {
    const normalized = value
      .split(/\r?\n|,/g)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    return normalized.length > 0 ? normalized : undefined;
  }

  return undefined;
}

function compactSnippet(value: string, maxLength = 1200): string {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength)}...`;
}

function extractTextFromUnknown(value: unknown, chunks: string[]): void {
  if (!value) {
    return;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      chunks.push(trimmed);
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => extractTextFromUnknown(item, chunks));
    return;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.output_text === "string") {
      extractTextFromUnknown(record.output_text, chunks);
    }
    if (typeof record.text === "string") {
      extractTextFromUnknown(record.text, chunks);
    }
    if (typeof record.content === "string") {
      extractTextFromUnknown(record.content, chunks);
    }

    extractTextFromUnknown(record.output, chunks);
    extractTextFromUnknown(record.content, chunks);
    extractTextFromUnknown(record.parts, chunks);
    extractTextFromUnknown(record.items, chunks);
    extractTextFromUnknown(record.messages, chunks);
    extractTextFromUnknown(record.choices, chunks);
  }
}

function extractResponseText(response: unknown): string | null {
  if (
    response &&
    typeof response === "object" &&
    typeof (response as { output_text?: unknown }).output_text === "string"
  ) {
    const direct = (response as { output_text: string }).output_text.trim();
    if (direct) {
      return direct;
    }
  }

  const chunks: string[] = [];
  extractTextFromUnknown(response, chunks);

  if (chunks.length === 0) {
    return null;
  }

  return chunks.join("\n").trim();
}

function toJsonCandidate(text: string): string {
  const trimmed = text.trim();

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const unwrapped = fenced ? fenced[1].trim() : trimmed;

  if (unwrapped.startsWith("{") && unwrapped.endsWith("}")) {
    return unwrapped;
  }

  const firstBrace = unwrapped.indexOf("{");
  const lastBrace = unwrapped.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return unwrapped.slice(firstBrace, lastBrace + 1);
  }

  return unwrapped;
}

export async function demoRoutes(app: FastifyInstance): Promise<void> {
  app.post("/demo/generate-sitespec", async (request, reply) => {
    const body = (request.body ?? {}) as DemoGenerateBody;

    const missing = REQUIRED_FIELDS.filter((field) => !isNonEmptyString(body[field]));
    if (missing.length > 0) {
      return reply.status(400).send({
        ok: false,
        message: "Missing required fields.",
        missingFields: missing
      });
    }

    if (!VALID_SITE_TYPES.has(String(body.siteType))) {
      return reply.status(400).send({
        ok: false,
        message: "siteType must be one_page or multipage."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return reply.status(500).send({
        ok: false,
        message: "OPENAI_API_KEY is not configured."
      });
    }

    const prompt = buildSiteSpecPrompt({
      templateId: String(body.templateId).trim(),
      siteType: String(body.siteType).trim() as "one_page" | "multipage",
      businessName: String(body.businessName).trim(),
      category: String(body.category).trim(),
      city: String(body.city).trim(),
      phone: String(body.phone).trim(),
      whatsapp: String(body.whatsapp).trim(),
      address: String(body.address).trim(),
      hours: normalizeStringList(body.hours),
      services: normalizeStringList(body.services)
    });

    const model = process.env.AI_MODEL || "gpt-5";
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let response: unknown;
    try {
      response = await client.responses.create({
        model,
        input: prompt
      });
    } catch (error) {
      request.log.error({ error }, "OpenAI request failed");
      return reply.status(502).send({
        ok: false,
        message: "Failed to generate SiteSpec from AI provider."
      });
    }

    const rawText = extractResponseText(response);
    if (!rawText) {
      return reply.status(502).send({
        ok: false,
        message: "AI response did not contain text output."
      });
    }

    const rawSnippet = compactSnippet(rawText);
    const jsonCandidate = toJsonCandidate(rawText);

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonCandidate);
    } catch {
      return reply.status(502).send({
        ok: false,
        message: "AI response was not valid JSON.",
        rawSnippet
      });
    }

    const parsed = SiteSpecSchema.safeParse(parsedJson);
    if (!parsed.success) {
      return reply.status(422).send({
        ok: false,
        errors: parsed.error.flatten(),
        rawSnippet
      });
    }

    return reply.send({ spec: parsed.data });
  });
}
