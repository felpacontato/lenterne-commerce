import type { Metadata } from "next";
import "@lenterne/storefront/styles.css";
import { SiteShell, hardwareBrand } from "@lenterne/storefront";

export const metadata: Metadata = {
  title: { default: "Lenterne Ferragens", template: "%s | Lenterne Ferragens" },
  description: "Argolas, garras e clips para produção e montagem.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "https://lenterne-v3-ferragens.vercel.app")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><SiteShell brand={hardwareBrand}>{children}</SiteShell></body></html>;
}
