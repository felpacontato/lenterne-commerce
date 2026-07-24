import type { Metadata } from "next";
import "@lenterne/storefront/styles.css";
import "./v1-pages.css";
import { SiteShell, giftsBrand } from "@lenterne/storefront";

export const metadata: Metadata = { title: { default: "Lenterne Brindes", template: "%s | Lenterne Brindes" }, description: "Brindes personalizados para empresas, equipes e eventos.", metadataBase: new URL(process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000") };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body><SiteShell brand={giftsBrand}>{children}</SiteShell></body></html>; }
