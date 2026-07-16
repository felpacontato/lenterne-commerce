import { byChannel, findProduct, type Channel, type Product } from "@lenterne/catalog";

const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100";
export async function loadCatalog(channel: Channel): Promise<Product[]> { try { const response = await fetch(`${api}/catalog/${channel}`, { cache: "no-store" }); if (response.ok) return (await response.json()).items as Product[]; } catch {} return byChannel(channel); }
export async function loadProduct(channel: Channel, slug: string): Promise<Product | undefined> { try { const response = await fetch(`${api}/catalog/${channel}/${slug}`, { cache: "no-store" }); if (response.ok) return await response.json() as Product; } catch {} return findProduct(channel, slug); }
