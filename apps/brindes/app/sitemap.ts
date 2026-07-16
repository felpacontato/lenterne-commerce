import type { MetadataRoute } from "next";
import { byChannel } from "@lenterne/catalog";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000"; return [{ url: base }, { url: `${base}/catalogo` }, { url: `${base}/sobre` }, ...byChannel("brindes").map(({ slug }) => ({ url: `${base}/produto/${slug}` }))]; }

