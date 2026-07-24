import type { MetadataRoute } from "next";
import { byChannel } from "@lenterne/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "https://lenterne-v1-ferragens.vercel.app";
  return [
    { url: base },
    { url: `${base}/catalogo` },
    { url: `${base}/sobre` },
    { url: `${base}/orcamento` },
    { url: `${base}/conta` },
    { url: `${base}/carrinho` },
    { url: `${base}/privacidade` },
    { url: `${base}/trocas` },
    ...byChannel("ferragens").map(({ slug }) => ({ url: `${base}/produto/${slug}` })),
  ];
}
