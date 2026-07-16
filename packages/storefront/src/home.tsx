import { money } from "@lenterne/catalog";
import { Arrow } from "@lenterne/ui";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";
import { loadCatalog } from "./runtime-catalog";

const homeContent = {
  brindes: {
    eyebrow: "Fabricação própria · Taboão da Serra",
    statement: "Brindes para acompanhar pessoas no evento, no trabalho e no dia a dia.",
    support: "Produtos úteis mantêm sua marca presente na rotina de clientes, equipes e convidados.",
    uses: ["Eventos corporativos", "Identificação de equipes", "Festas e lembranças", "Ações promocionais"],
    productsTitle: "Produtos para personalizar",
    processTitle: "Da sua arte para a produção.",
    steps: ["Escolha o produto e informe a quantidade.", "Envie a identidade visual da empresa ou do evento.", "Confira e aprove antes de iniciarmos a fabricação."],
    processCta: "Solicitar orçamento"
  },
  ferragens: {
    eyebrow: "Fornecimento direto · Taboão da Serra",
    statement: "Ferragens para produzir, montar e entregar com padrão.",
    support: "Componentes de linha para chaveiros, cordões, crachás e operações que compram em volume.",
    uses: ["Argolas para chaveiro", "Garras para cordão", "Clips e conjuntos", "Atacado e revenda"],
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
      {brand.channel === "brindes" ? <div className="hero-main-video"><video autoPlay muted loop playsInline preload="metadata" aria-label="Produtos e produção da Lenterne em movimento"><source src="/media/lenterne-original.mp4" type="video/mp4" /></video></div> : <div className="hero-collage" aria-hidden="true"><img src={items[0].image} alt="" /><img src={items[1].image} alt="" /></div>}
    </section>
    <section className="occasion shell"><header><h2>{content.statement}</h2><p>{content.support}</p></header><div className="occasion-list">{content.uses.map((use) => <span key={use}>{use}</span>)}</div></section>
    <section className="featured-products shell"><div className="section-head"><h2>{content.productsTitle}</h2><a href="/catalogo">Ver catálogo completo <Arrow /></a></div><div className="editorial-grid">{items.slice(0, 3).map((product, index) => <a className={`editorial-product product-${index + 1}`} href={`/produto/${product.slug}`} key={product.id}><figure><img src={product.image} alt={product.imageAlt} /></figure><div><h3>{product.name}</h3><p>A partir de {product.minimumQuantity.toLocaleString("pt-BR")} unidades · {money(product.price)} por unidade</p></div></a>)}</div></section>
    <section className="process"><MotionBackdrop /><div className="shell process-inner"><h2>{content.processTitle}</h2><ol>{content.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}</ol><a className="button button-secondary" href="/orcamento">{content.processCta}</a></div></section>
  </main>;
}
