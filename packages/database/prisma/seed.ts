import { PrismaClient, Channel, ProductStatus } from "@prisma/client";
import { products } from "@lenterne/catalog";
const prisma = new PrismaClient();
async function main() { for (const product of products) await prisma.product.upsert({ where: { sku: product.id }, update: {}, create: { sku: product.id, slug: product.slug, channel: product.channel === "brindes" ? Channel.GIFTS : Channel.HARDWARE, status: ProductStatus.ACTIVE, name: product.name, category: product.category, description: product.description, price: product.price, minimumQuantity: product.minimumQuantity, customizable: product.customizable, imageUrl: product.image, specs: product.specs } }); }
main().finally(() => prisma.$disconnect());

