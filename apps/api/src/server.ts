import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { z } from "zod";
import { byChannel } from "@lenterne/catalog";

const app = Fastify({ logger: true, bodyLimit: 2_000_000 });
await app.register(helmet);
await app.register(cors, { origin: [process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000", process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"] });

app.get("/health", async () => ({ ok: true, service: "lenterne-api", timestamp: new Date().toISOString() }));
app.get("/catalog/:channel", async (request, reply) => { const parsed = z.enum(["brindes", "ferragens"]).safeParse((request.params as { channel: string }).channel); if (!parsed.success) return reply.code(400).send({ error: "invalid_channel" }); return { items: byChannel(parsed.data) }; });

const quoteSchema = z.object({
  channel: z.enum(["brindes", "ferragens"]),
  customer: z.object({ name: z.string().min(2), company: z.string().optional(), phone: z.string().min(8), email: z.string().email(), postalCode: z.string().optional(), message: z.string().optional(), artworkUrl: z.string().url().or(z.literal("")).optional() }).passthrough(),
  lines: z.array(z.object({ productId: z.string(), quantity: z.number().int().positive() })).max(100),
  estimatedTotal: z.number().nonnegative()
});

app.post("/quotes", { config: { rateLimit: { max: 10, timeWindow: "1 minute" } } }, async (request, reply) => {
  const parsed = quoteSchema.safeParse(request.body);
  if (!parsed.success) return reply.code(422).send({ error: "validation_error", fields: parsed.error.flatten().fieldErrors });
  // Persistência entra ao habilitar DATABASE_URL na homologação. O contrato já é estável para o storefront.
  const reference = `ORC-${Date.now().toString(36).toUpperCase()}`;
  request.log.info({ reference, channel: parsed.data.channel, lineCount: parsed.data.lines.length }, "quote accepted");
  return reply.code(201).send({ reference, status: "received" });
});

app.post("/orders", async (_request, reply) => reply.code(501).send({ error: "payment_provider_not_configured", message: "Ative PAYMENT_PROVIDER após a homologação comercial." }));

const port = Number(process.env.API_PORT ?? 4000);
await app.listen({ port, host: "0.0.0.0" });

