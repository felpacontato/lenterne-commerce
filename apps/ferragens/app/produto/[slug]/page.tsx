import { notFound } from "next/navigation";
import { byChannel, findProduct } from "@lenterne/catalog";
import { ProductPage } from "@lenterne/storefront";
export function generateStaticParams() { return byChannel("ferragens").map(({ slug }) => ({ slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = findProduct("ferragens", slug); if (!product) notFound(); return <ProductPage product={product} />; }
