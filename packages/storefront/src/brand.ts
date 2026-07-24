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
  intro: "Brindes, identificação e produtos personalizados para empresas, eventos e ações promocionais, com atendimento direto de fábrica.",
  primaryCta: "Explorar brindes",
  switchLabel: "Ir para Ferragens",
  switchUrl: process.env.NEXT_PUBLIC_FERRAGENS_URL ?? "https://lenterne-v1-ferragens.vercel.app"
};

export const hardwareBrand: BrandConfig = {
  channel: "ferragens",
  title: "Lenterne Ferragens",
  descriptor: "Componentes para produção e montagem",
  headline: "Peças direto da fábrica.",
  intro: "Argolas, garras, clips e conjuntos para produção, montagem, identificação, atacado e compras recorrentes.",
  primaryCta: "Ver catálogo técnico",
  switchLabel: "Ir para Brindes",
  switchUrl: process.env.NEXT_PUBLIC_BRINDES_URL ?? "https://lenterne-v1-brindes.vercel.app"
};
