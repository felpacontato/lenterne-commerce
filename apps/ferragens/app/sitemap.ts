import type { MetadataRoute } from "next";
import { byChannel } from "@lenterne/catalog";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"; return [{ url: base }, { url: `${base}/catalogo` }, { url: `${base}/sobre` }, ...byChannel("ferragens").map(({ slug }) => ({ url: `${base}/produto/${slug}` }))]; }
