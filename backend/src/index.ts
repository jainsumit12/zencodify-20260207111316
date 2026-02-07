import Fastify from "fastify";
import { SiteSpecSchema } from "@zencodify/shared";

const app = Fastify({
  logger: true
});

app.get("/health", async () => {
  return { ok: true };
});

app.post("/validate", async (request, reply) => {
  const result = SiteSpecSchema.safeParse(request.body);

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
    await app.listen({ port: 4000, host: "0.0.0.0" });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();
