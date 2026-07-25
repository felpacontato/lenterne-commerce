import type { Metadata } from "next";
import "@lenterne/storefront/styles.css";
import { SiteShell, hardwareBrand } from "@lenterne/storefront";

const commercialStyles = "https://lenterne-v2-brindes-27y4casl4-felpa-dev-studio.vercel.app/_next/static/chunks/0zx1v5hkp_-of.css";

export const metadata: Metadata = {
  title: { default: "Lenterne Ferragens", template: "%s | Lenterne Ferragens" },
  description: "Argolas, garras e clips para produção e montagem.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "https://lenterne-v2-ferragens.vercel.app"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><head><link rel="stylesheet" href={commercialStyles} /></head><body><SiteShell brand={hardwareBrand}>{children}</SiteShell></body></html>;
}
