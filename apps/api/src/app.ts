import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { z } from "zod";
import { byChannel } from "@lenterne/catalog";
import { CommerceValidationError, MemoryCommerceRepository, priceLines, reference, type CommerceRepository } from "./commerce.js";

const channelSchema = z.enum(["brindes", "ferragens"]);
const customerSchema = z.object({ name: z.string().trim().min(2), company: z.string().trim().optional(), phone: z.string().trim().min(8), email: z.string().trim().email(), postalCode: z.string().trim().optional(), message: z.string().trim().optional(), artworkUrl: z.string().url().or(z.literal("")).optional() });
const lineSchema = z.object({ productId: z.string().min(1), quantity: z.number().int().positive() });
const quoteSchema = z.object({ channel: channelSchema, customer: customerSchema, lines: z.array(lineSchema).max(100) });
const orderSchema = z.object({ channel: channelSchema, customer: customerSchema, lines: z.array(lineSchema).min(1).max(100) });

export function buildApp(repository: CommerceRepository = new MemoryCommerceRepository()) {
  const app = Fastify({ logger: false, bodyLimit: 2_000_000 });
  void app.register(helmet);
  void app.register(cors, { origin: [process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000", process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"] });

  app.get("/health", async () => ({ ok: true, service: "lenterne-api", mode: process.env.COMMERCE_MODE ?? "homologation", timestamp: new Date().toISOString() }));
  app.get("/catalog/:channel", async (request, reply) => {
    const parsed = channelSchema.safeParse((request.params as { channel: string }).channel);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_channel" });
    return { items: byChannel(parsed.data) };
  });

  app.post("/quotes", async (request, reply) => {
    const parsed = quoteSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation_error", fields: parsed.error.flatten().fieldErrors });
    try {
      const lines = priceLines(parsed.data.channel, parsed.data.lines);
      const quote = { reference: reference("ORC"), ...parsed.data, lines, estimatedTotal: Number(lines.reduce((sum, line) => sum + line.subtotal, 0).toFixed(2)), status: "received" as const, createdAt: new Date().toISOString() };
      await repository.saveQuote(quote);
      return reply.code(201).send(quote);
    } catch (error) {
      if (error instanceof CommerceValidationError) return reply.code(422).send({ error: "catalog_validation_error", issues: error.issues });
      throw error;
    }
  });

  app.get("/quotes/:reference", async (request, reply) => {
    const quote = await repository.findQuote((request.params as { reference: string }).reference);
    return quote ?? reply.code(404).send({ error: "quote_not_found" });
  });

  app.post("/orders", async (request, reply) => {
    const parsed = orderSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation_error", fields: parsed.error.flatten().fieldErrors });
    try {
      const lines = priceLines(parsed.data.channel, parsed.data.lines);
      const order = { reference: reference("PED"), ...parsed.data, lines, total: Number(lines.reduce((sum, line) => sum + line.subtotal, 0).toFixed(2)), shipping: { status: "pending_quote" as const }, payment: { status: "pending_configuration" as const }, status: "awaiting_commercial_review" as const, createdAt: new Date().toISOString() };
      await repository.saveOrder(order);
      return reply.code(201).send(order);
    } catch (error) {
      if (error instanceof CommerceValidationError) return reply.code(422).send({ error: "catalog_validation_error", issues: error.issues });
      throw error;
    }
  });

  app.get("/orders/:reference", async (request, reply) => {
    const order = await repository.findOrder((request.params as { reference: string }).reference);
    return order ?? reply.code(404).send({ error: "order_not_found" });
  });
  return app;
}
