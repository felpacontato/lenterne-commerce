import { Arrow } from "@lenterne/ui";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";
import { ProductCarousel } from "./product-carousel";
import { loadCatalog } from "./runtime-catalog";

const homeContent = {
  brindes: {
    eyebrow: "Fabricação própria · Taboão da Serra",
    statement: "Brindes para acompanhar pessoas no evento, no trabalho e no dia a dia.",
    support: "Produtos úteis mantêm sua marca presente na rotina de clientes, equipes e convidados.",
    uses: [
      { title: "Eventos corporativos", image: "/media/occasions/eventos-corporativos.png" },
      { title: "Identificação de equipes", image: "/media/occasions/identificacao-equipes.png" },
      { title: "Festas e lembranças", image: "/media/occasions/festas-lembrancas.png" },
      { title: "Ações promocionais", image: "/media/occasions/acoes-promocionais.png" }
    ],
    productsTitle: "Produtos para personalizar",
    processTitle: "Da sua arte para a produção.",
    steps: ["Escolha o produto e informe a quantidade.", "Envie a identidade visual da empresa ou do evento.", "Confira e aprove antes de iniciarmos a fabricação."],
    processCta: "Solicitar orçamento"
  },
  ferragens: {
    eyebrow: "Fornecimento direto · Taboão da Serra",
    statement: "Ferragens para produzir, montar e entregar com padrão.",
    support: "Componentes de linha para chaveiros, cordões, crachás e operações que compram em volume.",
    uses: [
      { title: "Argolas para chaveiro", image: "/media/occasions/argolas-chaveiro.png" },
      { title: "Garras para cordão", image: "/media/occasions/garras-cordao.png" },
      { title: "Clips e conjuntos", image: "/media/occasions/clips-conjuntos.png" },
      { title: "Atacado e revenda", image: "/media/occasions/atacado-revenda.png" }
    ],
    productsTitle: "Componentes para sua produção",
    processTitle: "Da medida certa ao seu estoque.",
    steps: ["Escolha o componente e confira as medidas.", "Informe a quantidade e a frequência de compra.", "Confirme disponibilidade, prazo e condição comercial."],
    processCta: "Solicitar cotação"
  }
} as const;

export async function HomePage({ brand }: { brand: BrandConfig }) {
  const items = await loadCatalog(brand.channel);
  const content = homeContent[brand.channel];
  return <main id="conteudo" className={`gifts-home ${brand.channel}-home`}>
    <section className="gifts-hero">
      <MotionBackdrop />
      <div className="shell hero-copy"><p className="eyebrow">{content.eyebrow}</p><h1>{brand.headline}</h1><p>{brand.intro}</p><a className="button button-primary" href="/catalogo">{brand.primaryCta} <Arrow /></a></div>
      <div className="hero-main-video"><video autoPlay muted loop playsInline preload="metadata" aria-label="Produtos e produção da Lenterne em movimento"><source src="/media/lenterne-original.mp4" type="video/mp4" /></video></div>
    </section>
    <section className="occasion shell"><header><h2>{content.statement}</h2><p>{content.support}</p></header><div className="occasion-list">{content.uses.map((use, index) => <article key={use.title}><figure><img src={use.image} alt="" loading="lazy" /></figure><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{use.title}</h3></div></article>)}</div></section>
    <section className="featured-products shell" id="produtos-destaque"><div className="section-head"><h2>{content.productsTitle}</h2><a href="/catalogo">Ver catálogo completo <Arrow /></a></div><ProductCarousel products={items.slice(0, 6)} /></section>
    <section className="process"><MotionBackdrop /><div className="shell process-inner"><h2>{content.processTitle}</h2><ol>{content.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol><a className="button button-secondary" href="/orcamento">{content.processCta}</a></div></section>
  </main>;
}
