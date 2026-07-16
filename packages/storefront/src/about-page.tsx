import { byChannel } from "@lenterne/catalog";
import { Arrow } from "@lenterne/ui";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";

const institutionalImages = {
  mission: "https://static.wixstatic.com/media/8cfa65_34132f7b8c614cf9af33fc3d4d3e9ae8~mv2.jpg/v1/fill/w_945,h_948,al_c,q_85/8cfa65_34132f7b8c614cf9af33fc3d4d3e9ae8~mv2.jpg",
  vision: "https://static.wixstatic.com/media/8cfa65_3d598d6819a4481a8f91c0ad334120e1~mv2.jpg/v1/fill/w_947,h_1013,al_c,q_85/8cfa65_3d598d6819a4481a8f91c0ad334120e1~mv2.jpg"
};

const showcase = [
  { title: "Canecas personalizadas", tag: "Presentes · eventos · ações de marca", text: "Produzidas em acrílico resistente, com sistema rosqueável que facilita o uso e a higienização. A personalização transforma cada peça em uma lembrança exclusiva ou em um brinde estratégico, útil e durável.", image: "https://static.wixstatic.com/media/8cfa65_0262b8d63b2943e8b055a09d399a6072~mv2.png/v1/fill/w_864,h_858,al_c,q_90/Canecas%20Personalizadas%20A%20Fazendinha-5%20(1).png" },
  { title: "Porta-crachá retrátil", tag: "Organização · acesso · identidade", text: "Mantém o crachá acessível para controle de acesso, ponto e identificação. Personalizado com a marca da empresa, ajuda a padronizar a equipe e reforça a apresentação profissional.", image: "https://static.wixstatic.com/media/8cfa65_082c5095f77e4c40bb5c9e284b871e95~mv2.jpeg/v1/fill/w_1026,h_1016,al_c,q_85/WhatsApp%20Image%202025-01-16%20at%2014_42_07.jpeg" },
  { title: "Copo Twister", tag: "Leve · reutilizável · personalizável", text: "Uma opção prática para festas, eventos e brindes. Sem tampa e sem canudo, é leve, resistente e pode receber a identidade visual da marca ou da ocasião.", image: "https://static.wixstatic.com/media/8cfa65_8e0b223ba5f7456fb0929f98f08533f9~mv2.jpeg/v1/fill/w_1026,h_1026,al_c,q_85/WhatsApp%20Image%202025-02-03%20at%2015_08_41.jpeg" },
  { title: "Porta-óculos", tag: "Praticidade · proteção · rotina", text: "Compacto e funcional, protege os óculos contra riscos, quedas e danos. Pode ser fixado no para-sol do carro para deixar óculos de grau ou de sol sempre ao alcance.", image: "https://static.wixstatic.com/media/8cfa65_2f017b813bc141a2bf1b87d09cdb9fff~mv2.jpeg/v1/fill/w_680,h_680,al_c,q_85/8cfa65_2f017b813bc141a2bf1b87d09cdb9fff~mv2.jpeg" }
];

const content = {
  brindes: { eyebrow: "Lenterne · fabricação própria", capabilities: ["Produção própria", "Personalização", "Conferência de arte", "Atendimento direto"], showcaseTitle: "Produtos pensados para acompanhar pessoas e marcas.", closing: "Um pedido bem produzido começa com uma conversa clara." },
  ferragens: { eyebrow: "Lenterne · fabricação e fornecimento", capabilities: ["Atacado e revenda", "Compras recorrentes", "Moldes de injeção", "Hora-máquina"], showcaseTitle: "Componentes pensados para manter sua produção em movimento.", closing: "A peça certa mantém a sua produção em movimento." }
} as const;

export function AboutPage({ brand }: { brand: BrandConfig }) {
  const copy = content[brand.channel]; const items = byChannel(brand.channel);
  const channelShowcase = brand.channel === "brindes" ? showcase : items.slice(0, 4).map((item) => ({ title: item.name, tag: `${item.category} · fornecimento direto`, text: item.description, image: item.image }));
  const values = [{ title: "Missão", text: "Proporcionar a melhor experiência aos clientes com produtos de alta qualidade, inovação e acabamentos cuidadosos. Cada pedido é acompanhado com dedicação, rapidez e atenção aos detalhes.", image: institutionalImages.mission }, { title: "Visão", text: "Ser referência em brindes, personalização e componentes, com excelência no atendimento, respeito aos prazos, preços competitivos e compromisso constante com a qualidade.", image: institutionalImages.vision }];
  return <main id="conteudo" className={`about-page ${brand.channel}-about`}>
    <section className="about-hero"><MotionBackdrop /><div className="shell about-hero-inner"><div><p className="eyebrow">{copy.eyebrow}</p><h1>Mais de 10 anos transformando ideias em produtos.</h1><p>Qualidade, personalização e atendimento próximo, da escolha do produto à entrega final.</p><a className="button button-primary" href="/orcamento">Falar com a Lenterne <Arrow /></a></div><figure><img src={items[0].image} alt={items[0].imageAlt} /></figure></div></section>
    <section className="about-story shell" id="quem-somos"><p className="eyebrow">Quem somos</p><div><h2>Experiência de fábrica em cada pedido.</h2><p>O grupo Lenterne se consolidou no fornecimento e na fabricação de acessórios para cordões de crachá, ferragens e produtos plásticos. Em Taboão da Serra, combinamos experiência, tecnologia e acompanhamento direto para atender empresas, eventos, revendas e operações de produção.</p></div></section>
    <section className="about-capabilities shell" id="capacidades" aria-label="Capacidades da Lenterne">{copy.capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</section>
    <section className="about-values shell">{values.map((value, index) => <article key={value.title} className={index % 2 ? "reverse" : ""}><figure><img src={value.image} alt={`${value.title} da Lenterne`} loading="lazy" /></figure><div><p className="eyebrow">Nosso compromisso</p><h2>{value.title}</h2><p>{value.text}</p></div></article>)}</section>
    <section className="about-showcase shell"><header><p className="eyebrow">O que produzimos</p><h2>{copy.showcaseTitle}</h2></header><div>{channelShowcase.map((item) => <article key={item.title}><figure><img src={item.image} alt={item.title} loading="lazy" /></figure><div><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p><a href="/catalogo">Ver no catálogo <Arrow /></a></div></article>)}</div></section>
    <section className="about-closing"><MotionBackdrop /><div className="shell"><h2>{copy.closing}</h2><a className="button button-secondary" href="/orcamento">Começar uma conversa <Arrow /></a></div></section>
  </main>;
}
