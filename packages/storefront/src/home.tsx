import { Arrow } from "@lenterne/ui";
import type { Product } from "@lenterne/catalog";
import { money } from "@lenterne/catalog";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";
import { loadCatalog } from "./runtime-catalog";

const content = {
  brindes: {
    label: "Brindes e personalizados",
    hero: "Lenterne Brindes",
    deck: "Catalogo comercial para eventos, empresas e acoes de marca com producao propria em Taboao da Serra.",
    primary: "Montar pedido",
    secondary: "Ver categorias",
    departments: ["Copos", "Canecas", "Porta-cracha", "Cordoes", "Sem personalizacao", "Eventos"],
    proof: ["Pedido minimo visivel", "Arte aprovada antes da producao", "Atendimento por WhatsApp", "Lotes para empresas"],
    bandTitle: "Da lembranca ao evento corporativo, tudo precisa parecer feito para aquela marca.",
    bandCopy: "A V3 organiza os produtos como vitrine de atacado: escolha rapida, categorias claras e caminho curto para orcamento.",
    featureTitle: "Produtos que resolvem evento, equipe e campanha.",
    featureCopy: "Itens plasticos, identificacao e presentes com fotos, descricoes e condicoes comerciais prontas para adaptar ao cliente."
  },
  ferragens: {
    label: "Ferragens e componentes",
    hero: "Lenterne Ferragens",
    deck: "Catalogo tecnico para argolas, garras, clips e componentes de montagem com compra em volume.",
    primary: "Cotacao tecnica",
    secondary: "Aplicacoes",
    departments: ["Argolas", "Garras", "Clips", "Conjuntos", "Atacado", "Recorrencia"],
    proof: ["Medidas destacadas", "Pacotes de 1.000 unidades", "Estoque tecnico", "Compra recorrente"],
    bandTitle: "Componente certo, medida certa e menos atrito na producao.",
    bandCopy: "A V3 deixa ferragens com cara de catalogo tecnico: leitura rapida, aplicacao evidente e foco em volume.",
    featureTitle: "Pecas para manter sua linha de montagem em movimento.",
    featureCopy: "Argolas, garras e clips organizados por medida, pacote, aplicacao e disponibilidade."
  }
} as const;

function pick(products: Product[], index: number) {
  return products[index % products.length];
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  return (
    <a className="v3-product-row" href={`/produto/${product.slug}`}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <img src={product.image} alt={product.imageAlt} loading="lazy" />
      <div>
        <small>{product.category}</small>
        <strong>{product.name}</strong>
      </div>
      <em>{money(product.price)}</em>
      <Arrow />
    </a>
  );
}

export async function HomePage({ brand }: { brand: BrandConfig }) {
  const products = await loadCatalog(brand.channel);
  const page = content[brand.channel];
  const heroProduct = pick(products, 0);
  const secondaryProduct = pick(products, 1);
  const tertiaryProduct = pick(products, 2);

  return (
    <main id="conteudo" className={`v3-home v3-${brand.channel}`}>
      <section className="v3-hero">
        <MotionBackdrop />
        <div className="v3-hero-grid">
          <aside className="v3-rail" aria-label="Departamentos">
            <span>{page.label}</span>
            {page.departments.map((item) => (
              <a key={item} href={`/catalogo?busca=${encodeURIComponent(item)}`}>{item}</a>
            ))}
          </aside>

          <div className="v3-hero-copy">
            <p>{page.label}</p>
            <h1>{page.hero}</h1>
            <p>{page.deck}</p>
            <div>
              <a className="v3-button v3-button-red" href="/catalogo">{page.primary} <Arrow /></a>
              <a className="v3-button v3-button-plain" href="/orcamento">{page.secondary}</a>
            </div>
          </div>

          <a className="v3-hero-product" href={`/produto/${heroProduct.slug}`}>
            <img src={heroProduct.image} alt={heroProduct.imageAlt} />
            <span>{heroProduct.category}</span>
            <strong>{heroProduct.name}</strong>
          </a>
        </div>
      </section>

      <section className="v3-departments">
        <div className="v3-section-head">
          <span>Entrada rapida</span>
          <h2>Departamentos primeiro, produto depois.</h2>
          <a href="/catalogo">Catalogo completo <Arrow /></a>
        </div>
        <div className="v3-department-grid">
          {page.departments.map((item, index) => (
            <a key={item} href={`/catalogo?busca=${encodeURIComponent(item)}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <img src={pick(products, index).image} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <section className="v3-feature">
        <div>
          <span>Vitrine principal</span>
          <h2>{page.featureTitle}</h2>
          <p>{page.featureCopy}</p>
        </div>
        <div className="v3-feature-board">
          <a className="v3-large-product" href={`/produto/${heroProduct.slug}`}>
            <img src={heroProduct.image} alt={heroProduct.imageAlt} loading="lazy" />
            <small>{heroProduct.category}</small>
            <strong>{heroProduct.name}</strong>
          </a>
          <a className="v3-small-product" href={`/produto/${secondaryProduct.slug}`}>
            <img src={secondaryProduct.image} alt={secondaryProduct.imageAlt} loading="lazy" />
            <strong>{secondaryProduct.name}</strong>
          </a>
          <a className="v3-small-product" href={`/produto/${tertiaryProduct.slug}`}>
            <img src={tertiaryProduct.image} alt={tertiaryProduct.imageAlt} loading="lazy" />
            <strong>{tertiaryProduct.name}</strong>
          </a>
        </div>
      </section>

      <section className="v3-motion-band">
        <MotionBackdrop />
        <div>
          <span>Movimento Lenterne</span>
          <h2>{page.bandTitle}</h2>
          <p>{page.bandCopy}</p>
        </div>
      </section>

      <section className="v3-listing">
        <div className="v3-section-head">
          <span>Produtos selecionados</span>
          <h2>Seis opcoes para abrir conversa comercial.</h2>
          <a href="/catalogo">Ver tudo <Arrow /></a>
        </div>
        <div className="v3-product-table">
          {products.slice(0, 6).map((product, index) => (
            <ProductRow key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="v3-proof">
        {page.proof.map((item, index) => (
          <article key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </article>
        ))}
      </section>

      <section className="v3-close">
        <h2>Pronto para comparar com as outras versoes.</h2>
        <a className="v3-button v3-button-red" href="/orcamento">Solicitar orcamento <Arrow /></a>
      </section>
    </main>
  );
}
