import { notFound } from "next/navigation";
import { loadProduct, ProductPage } from "@lenterne/storefront";
export const dynamic = "force-dynamic";
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = await loadProduct("brindes", slug); if (!product) notFound(); return <ProductPage product={product} />; }
