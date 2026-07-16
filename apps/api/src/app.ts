import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { z } from "zod";
import type { Product } from "@lenterne/catalog";
import { CommerceValidationError, MemoryCommerceRepository, priceLines, reference, type CommerceRepository } from "./commerce.js";
import { ProductStore } from "./product-store.js";

const channelSchema = z.enum(["brindes", "ferragens"]);
const customerSchema = z.object({ name: z.string().trim().min(2), company: z.string().trim().optional(), phone: z.string().trim().min(8), email: z.string().trim().email(), postalCode: z.string().trim().optional(), message: z.string().trim().optional(), artworkUrl: z.string().url().or(z.literal("")).optional() });
const lineSchema = z.object({ productId: z.string().min(1), quantity: z.number().int().positive() });
const quoteSchema = z.object({ channel: channelSchema, customer: customerSchema, lines: z.array(lineSchema).max(100) });
const orderSchema = z.object({ channel: channelSchema, customer: customerSchema, lines: z.array(lineSchema).min(1).max(100) });

const managerTokens = new Map<string, number>();
const productSchema: z.ZodType<Product> = z.object({ id: z.string().min(1), slug: z.string(), channel: channelSchema, name: z.string().min(2), category: z.string().min(2), description: z.string().min(2), price: z.number().nonnegative(), unitLabel: z.string().min(2), minimumQuantity: z.number().int().positive(), customizable: z.boolean(), featured: z.boolean().optional(), stock: z.enum(["in_stock", "low", "quote"]), stockQuantity: z.number().int().nonnegative().optional(), specs: z.record(z.string()), image: z.string().min(1), imageAlt: z.string().min(2) });

export function buildApp(repository: CommerceRepository = new MemoryCommerceRepository(), productStore = new ProductStore()) {
  const app = Fastify({ logger: false, bodyLimit: 12_000_000 });
  void app.register(helmet);
  void app.register(cors, { origin: [process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000", process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"] });

  app.get("/health", async () => ({ ok: true, service: "lenterne-api", mode: process.env.COMMERCE_MODE ?? "homologation", timestamp: new Date().toISOString() }));
  app.get("/catalog/:channel", async (request, reply) => {
    const parsed = channelSchema.safeParse((request.params as { channel: string }).channel);
    if (!parsed.success) return reply.code(400).send({ error: "invalid_channel" });
    return { items: await productStore.list(parsed.data) };
  });
  app.get("/catalog/:channel/:slug", async (request, reply) => { const params = request.params as { channel: string; slug: string }; const channel = channelSchema.safeParse(params.channel); if (!channel.success) return reply.code(400).send({ error: "invalid_channel" }); return await productStore.find(channel.data, params.slug) ?? reply.code(404).send({ error: "product_not_found" }); });

  const authorized = (request: { headers: Record<string, unknown> }) => { const value = String(request.headers.authorization ?? ""); const token = value.startsWith("Bearer ") ? value.slice(7) : ""; const expires = managerTokens.get(token); return Boolean(expires && expires > Date.now()); };
  app.post("/manager/login", async (request, reply) => { const parsed = z.object({ username: z.string(), password: z.string() }).safeParse(request.body); if (!parsed.success || parsed.data.username !== (process.env.MANAGER_USER ?? "admin") || parsed.data.password !== (process.env.MANAGER_PASSWORD ?? "lenterne123")) return reply.code(401).send({ error: "invalid_credentials" }); const token = crypto.randomUUID(); managerTokens.set(token, Date.now() + 8 * 60 * 60 * 1000); return { token, expiresIn: 28800 }; });
  app.get("/manager/products", async (request, reply) => authorized(request) ? { items: await productStore.list() } : reply.code(401).send({ error: "unauthorized" }));
  app.post("/manager/products", async (request, reply) => { if (!authorized(request)) return reply.code(401).send({ error: "unauthorized" }); const parsed = productSchema.safeParse(request.body); return parsed.success ? reply.code(201).send(await productStore.save(parsed.data)) : reply.code(422).send({ error: "validation_error", details: parsed.error.flatten() }); });
  app.put("/manager/products/:id", async (request, reply) => { if (!authorized(request)) return reply.code(401).send({ error: "unauthorized" }); const parsed = productSchema.safeParse({ ...(request.body as object), id: (request.params as { id: string }).id }); return parsed.success ? productStore.save(parsed.data) : reply.code(422).send({ error: "validation_error", details: parsed.error.flatten() }); });
  app.delete("/manager/products/:id", async (request, reply) => { if (!authorized(request)) return reply.code(401).send({ error: "unauthorized" }); return await productStore.remove((request.params as { id: string }).id) ? reply.code(204).send() : reply.code(404).send({ error: "product_not_found" }); });

  app.post("/quotes", async (request, reply) => {
    const parsed = quoteSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation_error", fields: parsed.error.flatten().fieldErrors });
    try {
      const lines = priceLines(parsed.data.channel, parsed.data.lines, await productStore.list(parsed.data.channel));
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
      const lines = priceLines(parsed.data.channel, parsed.data.lines, await productStore.list(parsed.data.channel));
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
