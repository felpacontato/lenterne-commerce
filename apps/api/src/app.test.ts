import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

const customer = { name: "Empresa Teste", phone: "11999999999", email: "compras@empresa.test" };

test("health and catalog routes respond", async () => {
  const app = buildApp();
  const health = await app.inject({ method: "GET", url: "/health" });
  assert.equal(health.statusCode, 200);
  assert.equal(health.json().mode, "homologation");
  const catalog = await app.inject({ method: "GET", url: "/catalog/brindes" });
  assert.equal(catalog.statusCode, 200);
  assert.ok(catalog.json().items.length > 0);
  await app.close();
});

test("quote total is calculated server-side and can be retrieved", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "POST", url: "/quotes", payload: { channel: "brindes", customer, lines: [{ productId: "gift-twister-500", quantity: 50 }], estimatedTotal: 1 } });
  assert.equal(response.statusCode, 201);
  const quote = response.json();
  assert.equal(quote.estimatedTotal, 145);
  const retrieved = await app.inject({ method: "GET", url: `/quotes/${quote.reference}` });
  assert.equal(retrieved.statusCode, 200);
  await app.close();
});

test("accepts a direct quote request before a product is selected", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "POST", url: "/quotes", payload: { channel: "brindes", customer, lines: [] } });
  assert.equal(response.statusCode, 201);
  assert.equal(response.json().estimatedTotal, 0);
  await app.close();
});

test("rejects product from another storefront and quantities below minimum", async () => {
  const app = buildApp();
  const wrongChannel = await app.inject({ method: "POST", url: "/orders", payload: { channel: "brindes", customer, lines: [{ productId: "hardware-ring-13", quantity: 1000 }] } });
  assert.equal(wrongChannel.statusCode, 422);
  const belowMinimum = await app.inject({ method: "POST", url: "/orders", payload: { channel: "ferragens", customer, lines: [{ productId: "hardware-ring-13", quantity: 10 }] } });
  assert.equal(belowMinimum.statusCode, 422);
  await app.close();
});

test("creates a homologation order with explicit pending integrations", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "POST", url: "/orders", payload: { channel: "ferragens", customer, lines: [{ productId: "hardware-ring-13", quantity: 1000 }] } });
  assert.equal(response.statusCode, 201);
  assert.equal(response.json().payment.status, "pending_configuration");
  assert.equal(response.json().shipping.status, "pending_quote");
  await app.close();
});
