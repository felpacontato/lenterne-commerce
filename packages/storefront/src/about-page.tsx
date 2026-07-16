import { byChannel } from "@lenterne/catalog";
import { Arrow } from "@lenterne/ui";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";

const aboutContent = {
  brindes: {
    eyebrow: "Lenterne · fabricação própria",
    headline: "Mais de 10 anos transformando ideias em produtos.",
    intro: "Em Taboão da Serra, acompanhamos cada pedido da escolha do produto à aprovação da personalização.",
    storyTitle: "Sua marca passa por mãos que conhecem a produção.",
    story: "Fabricamos produtos plásticos e acessórios para identificação e personalizamos pedidos para empresas, eventos e ações promocionais. A equipe orienta materiais, quantidades e arte antes de iniciar a produção.",
    capabilities: ["Produção própria", "Personalização", "Conferência de arte", "Atendimento direto"],
    closing: "Um pedido bem produzido começa com uma conversa clara."
  },
  ferragens: {
    eyebrow: "Lenterne · fabricação e fornecimento",
    headline: "Componentes direto de quem conhece a produção.",
    intro: "Há mais de 10 anos atendemos montagens, revendas e compras recorrentes com orientação técnica próxima.",
    storyTitle: "Da ferragem de linha ao desenvolvimento plástico.",
    story: "Fornecemos argolas, garras e clips para chaveiros, cordões e identificação. Também desenvolvemos projetos, moldes de injeção plástica e serviços por hora-máquina conforme a necessidade de cada operação.",
    capabilities: ["Atacado e revenda", "Compras recorrentes", "Moldes de injeção", "Hora-máquina"],
    closing: "A peça certa mantém a sua produção em movimento."
  }
} as const;

export function AboutPage({ brand }: { brand: BrandConfig }) {
  const content = aboutContent[brand.channel];
  const items = byChannel(brand.channel);
  return <main id="conteudo" className={`about-page ${brand.channel}-about`}>
    <section className="about-hero"><MotionBackdrop /><div className="shell about-hero-inner"><div><p className="eyebrow">{content.eyebrow}</p><h1>{content.headline}</h1><p>{content.intro}</p><a className="button button-primary" href="/orcamento">Falar com a Lenterne <Arrow /></a></div><figure><img src={items[0].image} alt={items[0].imageAlt} /></figure></div></section>
    <section className="about-story shell"><p className="eyebrow">Quem somos</p><div><h2>{content.storyTitle}</h2><p>{content.story}</p></div></section>
    <section className="about-capabilities shell" aria-label="Capacidades da Lenterne">{content.capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</section>
    <section className="about-closing"><MotionBackdrop /><div className="shell"><h2>{content.closing}</h2><a className="button button-secondary" href="/orcamento">Começar uma conversa <Arrow /></a></div></section>
  </main>;
}
