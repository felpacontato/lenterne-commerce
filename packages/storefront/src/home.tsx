import { Arrow } from "@lenterne/ui";
import type { Product } from "@lenterne/catalog";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";
import { ProductCarousel } from "./product-carousel";
import { loadCatalog } from "./runtime-catalog";

const channelContent = {
  brindes: {
    kicker: "Brindes personalizados direto da fábrica",
    hero: "Produtos que fazem sua marca circular.",
    heroBody: "Copos, canecas, identificação e acessórios produzidos para eventos, empresas e ações promocionais.",
    heroCta: "Comprar brindes",
    shelf: "Mais procurados para personalizar",
    categoryTitle: "Compre por categoria",
    categories: ["Copos", "Canecas", "Identificação", "Cordões", "Presentes", "Sem personalização"],
    promoTitle: "Sua arte aplicada com acompanhamento de fábrica.",
    promoBody: "Envie sua identidade, aprove a prévia e acompanhe o pedido até a produção.",
    companyTitle: "Há mais de 10 anos transformando ideias em produtos.",
    companyBody: "Produção própria em Taboão da Serra, atendimento direto e soluções para pedidos de diferentes escalas.",
    uses: ["Eventos e feiras", "Equipes e empresas", "Festas e lembranças", "Campanhas promocionais"]
  },
  ferragens: {
    kicker: "Componentes e ferragens para produção",
    hero: "Estoque técnico para sua operação continuar.",
    heroBody: "Argolas, garras e clips com fornecimento direto, compra em volume e atendimento para demandas recorrentes.",
    heroCta: "Comprar ferragens",
    shelf: "Componentes mais solicitados",
    categoryTitle: "Encontre pela aplicação",
    categories: ["Argolas 13 mm", "Argolas 16 mm", "Argolas 19 mm", "Garras", "Clips", "Atacado"],
    promoTitle: "Medida, volume e prazo confirmados antes da compra.",
    promoBody: "Solicite uma cotação técnica para lotes, recorrência e condições de revenda.",
    companyTitle: "Fornecimento industrial com atendimento próximo.",
    companyBody: "Componentes para chaveiros, cordões, crachás e linhas de montagem com controle de medidas e disponibilidade.",
    uses: ["Montagem de chaveiros", "Produção de cordões", "Identificação", "Atacado e revenda"]
  }
} as const;

function categoryProducts(products: Product[], labels: readonly string[]) {
  return labels.map((label, index) => ({ label, product: products[index % Math.max(products.length, 1)] }));
}

export async function HomePage({ brand }: { brand: BrandConfig }) {
  const products = await loadCatalog(brand.channel);
  const page = channelContent[brand.channel];
  const categories = categoryProducts(products, page.categories);

  return <main id="conteudo" className={`commerce-home ${brand.channel}`}>
    <section className="commerce-hero">
      <div className="hero-banner shell">
        <div className="hero-banner-copy">
          <p className="eyebrow">{page.kicker}</p>
          <h1>{page.hero}</h1>
          <p>{page.heroBody}</p>
          <div>
            <a className="button button-primary" href="/catalogo">{page.heroCta} <Arrow /></a>
            <a className="button button-ghost" href="/orcamento">Solicitar orçamento</a>
          </div>
        </div>
        <div className="hero-banner-media">
          <video autoPlay muted loop playsInline preload="metadata" poster="/media/liquid-red-poster.jpg"><source src="/media/lenterne-original.mp4" type="video/mp4" /></video>
          <span>Produção Lenterne</span>
        </div>
      </div>
      <div className="commerce-benefits shell">
        <div><strong>Produção própria</strong><span>Atendimento direto da fábrica</span></div>
        <div><strong>Pedido acompanhado</strong><span>Da escolha à aprovação da arte</span></div>
        <div><strong>Compra em volume</strong><span>Condições para empresas e revenda</span></div>
        <div><strong>Atendimento rápido</strong><span>WhatsApp e orçamento online</span></div>
      </div>
    </section>

    <section className="category-showcase shell">
      <div className="store-section-title"><div><p className="eyebrow">Navegue pela loja</p><h2>{page.categoryTitle}</h2></div><a href="/catalogo">Todas as categorias <Arrow /></a></div>
      <div className="category-circles">{categories.map(({ label, product }) => <a key={label} href={`/catalogo?busca=${encodeURIComponent(label)}`}><figure>{product && <img src={product.image} alt="" />}</figure><strong>{label}</strong><span>Ver produtos</span></a>)}</div>
    </section>

    <section className="store-shelf shell">
      <div className="store-section-title"><div><p className="eyebrow">Destaques Lenterne</p><h2>{page.shelf}</h2></div><a href="/catalogo">Ver catálogo completo <Arrow /></a></div>
      <ProductCarousel products={products.slice(0, 6)} />
    </section>

    <section className="promo-grid shell">
      <article className="promo-primary"><MotionBackdrop /><div><p className="eyebrow">Atendimento personalizado</p><h2>{page.promoTitle}</h2><p>{page.promoBody}</p><a className="button button-light" href="/orcamento">Começar um orçamento <Arrow /></a></div></article>
      <article className="promo-product"><img src={products[1]?.image ?? products[0]?.image} alt="" /><div><span>Compra facilitada</span><h3>Pedido mínimo e valor por unidade sempre visíveis.</h3><a href="/catalogo">Explorar catálogo <Arrow /></a></div></article>
    </section>

    <section className="use-store shell">
      <div className="store-section-title"><div><p className="eyebrow">Soluções por necessidade</p><h2>Encontre o produto certo para o seu projeto</h2></div></div>
      <div>{page.uses.map((use, index) => <a href={`/catalogo?busca=${encodeURIComponent(use)}`} key={use}><span>0{index + 1}</span><strong>{use}</strong><Arrow /></a>)}</div>
    </section>

    <section className={`factory-band factory-band-${brand.channel}`}>
      <MotionBackdrop />
      <div className="shell"><div><p className="eyebrow">Grupo Lenterne</p><h2>{page.companyTitle}</h2><p>{page.companyBody}</p><a className="button button-secondary" href="/sobre">Conhecer a Lenterne <Arrow /></a></div><figure><img src={brand.channel === "brindes" ? "/media/about/producao-propria.png" : "/media/about/moldes-injecao.png"} alt="Produção e experiência da Lenterne" loading="lazy" /></figure></div>
    </section>
  </main>;
}
