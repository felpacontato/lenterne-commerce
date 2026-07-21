import type { Metadata } from "next";
import { CatalogPage } from "@lenterne/storefront";
export const metadata: Metadata = { title: "Catálogo", description: "Canecas, copos, cordões e identificadores personalizados." };
export default function Page() { return <CatalogPage channel="brindes" />; }
