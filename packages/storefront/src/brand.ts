import type { Channel } from "@lenterne/catalog";

export type BrandConfig = {
  channel: Channel;
  title: string;
  descriptor: string;
  headline: string;
  intro: string;
  primaryCta: string;
  switchLabel: string;
  switchUrl: string;
};

export const giftsBrand: BrandConfig = {
  channel: "brindes",
  title: "Lenterne Brindes",
  descriptor: "Personalizados para empresas e eventos",
  headline: "Sua marca, feita para circular.",
  intro: "Brindes produzidos por quem entende de material, montagem e acabamento. Escolha o produto; nós ajudamos a transformar sua arte em objeto.",
  primaryCta: "Explorar brindes",
  switchLabel: "Ir para Ferragens",
  switchUrl: process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"
};

export const hardwareBrand: BrandConfig = {
  channel: "ferragens",
  title: "Lenterne Ferragens",
  descriptor: "Componentes para produção e montagem",
  headline: "A peça certa. Na medida do seu lote.",
  intro: "Argolas, garras e clips com especificação clara, fornecimento direto e atendimento para compras recorrentes.",
  primaryCta: "Ver catálogo técnico",
  switchLabel: "Ir para Brindes",
  switchUrl: process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000"
};

