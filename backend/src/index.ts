import "dotenv/config";
import Fastify from "fastify";
import { SiteSpecSchema, migrateGalleryStringsToImages } from "@zencodify/shared";
import { demoRoutes } from "./routes/demo";

const app = Fastify({
  logger: true
});

app.get("/health", async () => {
  return { ok: true };
});

app.post("/validate", async (request, reply) => {
  const migrated = migrateGalleryStringsToImages(request.body);
  const result = SiteSpecSchema.safeParse(migrated);

  if (!result.success) {
    return reply.status(400).send({
      ok: false,
      errors: result.error.flatten()
    });
  }

  return reply.send({ ok: true });
});

const start = async () => {
  try {
    await demoRoutes(app);
    await app.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();
