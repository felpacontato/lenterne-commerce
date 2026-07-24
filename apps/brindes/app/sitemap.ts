import type { MetadataRoute } from "next";
import { byChannel } from "@lenterne/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BRINDES_URL ?? "https://lenterne-v2-brindes.vercel.app";
  return [
    { url: base },
    { url: `${base}/catalogo` },
    { url: `${base}/sobre` },
    { url: `${base}/orcamento` },
    { url: `${base}/conta` },
    { url: `${base}/carrinho` },
    { url: `${base}/privacidade` },
    { url: `${base}/trocas` },
    ...byChannel("brindes").map(({ slug }) => ({ url: `${base}/produto/${slug}` })),
  ];
}
