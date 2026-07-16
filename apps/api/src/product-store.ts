import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { products, type Channel, type Product } from "@lenterne/catalog";

export class ProductStore {
  private readonly file: string;
  private queue = Promise.resolve();

  constructor(file = process.env.CATALOG_DATA_FILE ?? resolve(process.cwd(), ".data", "catalog.json")) { this.file = file; }

  private async read(): Promise<Product[]> {
    try { return JSON.parse(await readFile(this.file, "utf8")) as Product[]; }
    catch { await this.write(products); return structuredClone(products); }
  }

  private async write(items: Product[]) {
    await mkdir(dirname(this.file), { recursive: true });
    await writeFile(this.file, JSON.stringify(items, null, 2), "utf8");
  }

  async list(channel?: Channel) { const items = await this.read(); return channel ? items.filter((item) => item.channel === channel) : items; }
  async find(channel: Channel, slug: string) { return (await this.read()).find((item) => item.channel === channel && item.slug === slug); }
  async save(product: Product) {
    let saved!: Product;
    this.queue = this.queue.then(async () => {
      const items = await this.read();
      const index = items.findIndex((item) => item.id === product.id);
      saved = { ...product, slug: product.slug || product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") };
      if (index >= 0) items[index] = saved; else items.push(saved);
      await this.write(items);
    });
    await this.queue;
    return saved;
  }
  async remove(id: string) { const items = await this.read(); const next = items.filter((item) => item.id !== id); await this.write(next); return next.length !== items.length; }
}
