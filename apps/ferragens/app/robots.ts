import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { const base = process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"; return { rules: { userAgent: "*", allow: "/", disallow: ["/carrinho", "/orcamento"] }, sitemap: `${base}/sitemap.xml` }; }
