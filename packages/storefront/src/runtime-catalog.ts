import { byChannel, findProduct, type Channel, type Product } from "@lenterne/catalog";

const api = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export async function loadCatalog(channel: Channel): Promise<Product[]> {
  if (api) {
    try {
      const response = await fetch(`${api}/catalog/${channel}`, { cache: "no-store" });
      if (response.ok) return (await response.json()).items as Product[];
    } catch {
      // O catálogo estático mantém a loja disponível.
    }
  }
  return byChannel(channel);
}

export async function loadProduct(channel: Channel, slug: string): Promise<Product | undefined> {
  if (api) {
    try {
      const response = await fetch(`${api}/catalog/${channel}/${slug}`, { cache: "no-store" });
      if (response.ok) return await response.json() as Product;
    } catch {
      // O produto estático mantém a página disponível.
    }
  }
  return findProduct(channel, slug);
}
