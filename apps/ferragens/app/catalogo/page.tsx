import type { Metadata } from "next";
import { CatalogPage } from "@lenterne/storefront";
export const metadata: Metadata = { title: "Catálogo", description: "Argolas, garras e clips para produção e montagem." };
export default function Page() { return <CatalogPage channel="ferragens" />; }
