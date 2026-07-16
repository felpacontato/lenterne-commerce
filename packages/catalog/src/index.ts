export type Channel = "brindes" | "ferragens";

export type Product = {
  id: string;
  slug: string;
  channel: Channel;
  name: string;
  category: string;
  description: string;
  price: number;
  unitLabel: string;
  minimumQuantity: number;
  customizable: boolean;
  featured?: boolean;
  stock: "in_stock" | "low" | "quote";
  specs: Record<string, string>;
  image: string;
  imageAlt: string;
};

export const products: Product[] = [
  {
    id: "gift-twister-500",
    slug: "copo-twister-500ml-personalizado",
    channel: "brindes",
    name: "Copo Twister 500 ml",
    category: "Copos personalizados",
    description: "Copo reutilizável com tampa e canudo para eventos, campanhas e ações de marca.",
    price: 2.9,
    unitLabel: "por unidade no lote mínimo",
    minimumQuantity: 50,
    customizable: true,
    featured: true,
    stock: "quote",
    specs: { Capacidade: "500 ml", Material: "Plástico", Personalização: "Sob consulta" },
    image: "https://static.wixstatic.com/media/8cfa65_700c0860b9a542398965c83ac2e069b8~mv2.jpg/v1/fill/w_980,h_1179,al_c,q_85/8cfa65_700c0860b9a542398965c83ac2e069b8~mv2.jpg",
    imageAlt: "Copo personalizado da Lenterne"
  },
  {
    id: "gift-badge-reel",
    slug: "porta-cracha-retratil-personalizado",
    channel: "brindes",
    name: "Porta-crachá retrátil",
    category: "Identificação",
    description: "Acessório compacto para equipes, eventos e controle de acesso, personalizável com a marca.",
    price: 4,
    unitLabel: "por unidade no lote mínimo",
    minimumQuantity: 100,
    customizable: true,
    featured: true,
    stock: "quote",
    specs: { Aplicação: "Crachás", Personalização: "Logotipo", Uso: "Corporativo e eventos" },
    image: "https://static.wixstatic.com/media/8cfa65_82ebca7ed55b419cb3671f87d7053dce~mv2.jpeg/v1/fill/w_980,h_980,al_c,q_85/8cfa65_82ebca7ed55b419cb3671f87d7053dce~mv2.jpeg",
    imageAlt: "Porta-crachá retrátil"
  },
  {
    id: "gift-mug",
    slug: "caneca-acrilica-rosqueavel",
    channel: "brindes",
    name: "Caneca acrílica rosqueável",
    category: "Canecas",
    description: "Caneca resistente para foto, lembranças e ativações promocionais.",
    price: 3,
    unitLabel: "por unidade no lote mínimo",
    minimumQuantity: 100,
    customizable: true,
    stock: "quote",
    specs: { Material: "Acrílico", Fechamento: "Rosqueável", Arte: "Foto ou identidade visual" },
    image: "https://static.wixstatic.com/media/8cfa65_bd7a941ef07343538e4920b1ff00512e~mv2.png/v1/fill/w_980,h_980,al_c,q_90/8cfa65_bd7a941ef07343538e4920b1ff00512e~mv2.png",
    imageAlt: "Caneca acrílica personalizada"
  },
  {
    id: "gift-lanyard",
    slug: "cordao-personalizado-15mm",
    channel: "brindes",
    name: "Cordão personalizado 15 mm",
    category: "Cordões para crachá",
    description: "Cordão corporativo personalizado para identificação de equipes e participantes.",
    price: 3,
    unitLabel: "por unidade no lote mínimo",
    minimumQuantity: 100,
    customizable: true,
    stock: "quote",
    specs: { Largura: "15 mm", Acabamento: "A definir", Impressão: "Personalizada" },
    image: "https://static.wixstatic.com/media/8cfa65_c50052c9b0cf430b8afd094db4c58838~mv2.jpg/v1/fill/w_980,h_1738,al_c,q_85/8cfa65_c50052c9b0cf430b8afd094db4c58838~mv2.jpg",
    imageAlt: "Cordão personalizado para crachá"
  },
  {
    id: "hardware-ring-13",
    slug: "argola-chaveiro-13mm",
    channel: "ferragens",
    name: "Argola para chaveiro 13 mm",
    category: "Argolas",
    description: "Argola metálica para chaveiros, brindes e montagem de acessórios.",
    price: 0.03,
    unitLabel: "por unidade no pacote",
    minimumQuantity: 1000,
    customizable: false,
    featured: true,
    stock: "in_stock",
    specs: { Diâmetro: "13 mm", Material: "Metal", Pacote: "1.000 unidades" },
    image: "https://static.wixstatic.com/media/8cfa65_f1642993b24c4b6e9a3578f502d89009~mv2.jpg/v1/fill/w_980,h_780,al_c,q_85/8cfa65_f1642993b24c4b6e9a3578f502d89009~mv2.jpg",
    imageAlt: "Argolas metálicas para chaveiro"
  },
  {
    id: "hardware-claw-15",
    slug: "garra-dentada-15mm",
    channel: "ferragens",
    name: "Garra dentada 15 mm",
    category: "Garras para cordão",
    description: "Fechamento metálico para cordões e fitas com fixação firme.",
    price: 0.089,
    unitLabel: "por unidade no pacote",
    minimumQuantity: 1000,
    customizable: false,
    featured: true,
    stock: "in_stock",
    specs: { Largura: "15 mm", Material: "Metal", Pacote: "1.000 unidades" },
    image: "https://static.wixstatic.com/media/8cfa65_8c56d4b5e44143a8a72c0ac61d9cd7fc~mv2.jpg/v1/fill/w_980,h_1738,al_c,q_85/8cfa65_8c56d4b5e44143a8a72c0ac61d9cd7fc~mv2.jpg",
    imageAlt: "Garras dentadas para cordão"
  },
  {
    id: "hardware-clip-loose",
    slug: "clip-jacare-solto",
    channel: "ferragens",
    name: "Clip jacaré solto",
    category: "Clips",
    description: "Clip metálico resistente para fixação de crachás e protetores.",
    price: 0.25,
    unitLabel: "por unidade no pacote",
    minimumQuantity: 1000,
    customizable: false,
    stock: "in_stock",
    specs: { Tipo: "Jacaré", Material: "Metal", Pacote: "1.000 unidades" },
    image: "https://static.wixstatic.com/media/8cfa65_08ee174e73884502b2ba52e1b44a71c4~mv2.jpg/v1/fill/w_980,h_979,al_c,q_85/8cfa65_08ee174e73884502b2ba52e1b44a71c4~mv2.jpg",
    imageAlt: "Clips jacaré de metal"
  },
  {
    id: "hardware-clip-ring",
    slug: "clip-jacare-com-argola-22mm",
    channel: "ferragens",
    name: "Clip jacaré com argola 22 mm",
    category: "Clips",
    description: "Conjunto metálico pronto para montagem de identificadores e cordões.",
    price: 0.31,
    unitLabel: "por unidade no pacote",
    minimumQuantity: 1000,
    customizable: false,
    stock: "low",
    specs: { Argola: "22 mm", Material: "Metal", Pacote: "1.000 unidades" },
    image: "https://static.wixstatic.com/media/8cfa65_7c9955bdf2bb43998794e0180d5d4050~mv2.jpg/v1/fill/w_980,h_939,al_c,q_85/8cfa65_7c9955bdf2bb43998794e0180d5d4050~mv2.jpg",
    imageAlt: "Clip jacaré com argola"
  }
];

export const byChannel = (channel: Channel) => products.filter((product) => product.channel === channel);
export const findProduct = (channel: Channel, slug: string) => products.find((product) => product.channel === channel && product.slug === slug);
export const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
