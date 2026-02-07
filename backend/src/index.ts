import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";

import { SiteSpecSchema, migrateGalleryStringsToImages } from "@zencodify/shared";
import { demoRoutes } from "./routes/demo";

const app = Fastify({
  logger: true
});

const start = async () => {
  try {
    const PORT = 4010;

    // ✅ register CORS INSIDE start()
    await app.register(cors, {
      origin: true, // allow all localhost/dev origins
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });

    // health route
    app.get("/health", async () => {
      return { ok: true };
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

    console.log(`🚀 Backend running on http://localhost:${PORT}`);
    console.log(`🧠 AI endpoint: http://localhost:${PORT}/demo/generate-sitespec`);
    console.log(`💓 Health: http://localhost:${PORT}/health`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();