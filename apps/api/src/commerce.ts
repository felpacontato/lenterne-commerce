import { products, type Channel } from "@lenterne/catalog";

export type Customer = { name: string; company?: string; phone: string; email: string; postalCode?: string; message?: string; artworkUrl?: string };
export type RequestedLine = { productId: string; quantity: number };
export type PricedLine = RequestedLine & { name: string; unitPrice: number; subtotal: number };
export type Quote = { reference: string; channel: Channel; customer: Customer; lines: PricedLine[]; estimatedTotal: number; status: "received"; createdAt: string };
export type Order = { reference: string; channel: Channel; customer: Customer; lines: PricedLine[]; total: number; shipping: { status: "pending_quote" }; payment: { status: "pending_configuration" }; status: "awaiting_commercial_review"; createdAt: string };

export interface CommerceRepository {
  saveQuote(quote: Quote): Promise<void>;
  findQuote(reference: string): Promise<Quote | undefined>;
  saveOrder(order: Order): Promise<void>;
  findOrder(reference: string): Promise<Order | undefined>;
}

export class MemoryCommerceRepository implements CommerceRepository {
  private readonly quotes = new Map<string, Quote>();
  private readonly orders = new Map<string, Order>();
  async saveQuote(quote: Quote) { this.quotes.set(quote.reference, quote); }
  async findQuote(reference: string) { return this.quotes.get(reference); }
  async saveOrder(order: Order) { this.orders.set(order.reference, order); }
  async findOrder(reference: string) { return this.orders.get(reference); }
}

export class CommerceValidationError extends Error {
  constructor(public readonly issues: string[]) { super("Invalid commerce request"); }
}

export function priceLines(channel: Channel, requestedLines: RequestedLine[]): PricedLine[] {
  const issues: string[] = [];
  const lines = requestedLines.map((line) => {
    const product = products.find((item) => item.id === line.productId && item.channel === channel);
    if (!product) {
      issues.push(`Produto ${line.productId} não pertence ao catálogo ${channel}.`);
      return undefined;
    }
    if (line.quantity < product.minimumQuantity) issues.push(`${product.name}: quantidade mínima de ${product.minimumQuantity} unidades.`);
    return { ...line, name: product.name, unitPrice: product.price, subtotal: Number((product.price * line.quantity).toFixed(2)) };
  });
  if (issues.length) throw new CommerceValidationError(issues);
  return lines.filter((line): line is PricedLine => Boolean(line));
}

export function reference(prefix: "ORC" | "PED") {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
}
