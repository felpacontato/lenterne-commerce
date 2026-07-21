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
  headline: "Sua marca continua presente.",
  intro: "Há mais de 10 anos, a Lenterne fabrica produtos plásticos e acessórios para identificação. Personalizamos cada pedido para empresas, eventos e ações promocionais.",
  primaryCta: "Explorar brindes",
  switchLabel: "Ir para Ferragens",
  switchUrl: process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "http://localhost:3001"
};

export const hardwareBrand: BrandConfig = {
  channel: "ferragens",
  title: "Lenterne Ferragens",
  descriptor: "Componentes para produção e montagem",
  headline: "Peças direto da fábrica.",
  intro: "Argolas, garras e clips metálicos para chaveiros, cordões e identificação. Fornecimento com condições para revenda, atacado e compras recorrentes.",
  primaryCta: "Ver catálogo técnico",
  switchLabel: "Ir para Brindes",
  switchUrl: process.env.NEXT_PUBLIC_BRINDES_URL ?? "http://localhost:3000"
};
