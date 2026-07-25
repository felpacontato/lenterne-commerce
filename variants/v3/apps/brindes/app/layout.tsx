import type { Metadata } from "next";
import "@lenterne/storefront/styles.css";
import { SiteShell, giftsBrand } from "@lenterne/storefront";

export const metadata: Metadata = {
  title: { default: "Lenterne Brindes", template: "%s | Lenterne Brindes" },
  description: "Brindes personalizados para empresas, equipes e eventos.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BRINDES_URL ?? "https://lenterne-v3-brindes.vercel.app")
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><SiteShell brand={giftsBrand}>{children}</SiteShell></body></html>;
}
