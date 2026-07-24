import { Arrow } from "@lenterne/ui";
import type { BrandConfig } from "./brand";
import { MotionBackdrop } from "./motion-backdrop";
import { ProductCarousel } from "./product-carousel";
import { loadCatalog } from "./runtime-catalog";
import styles from "./v1-commerce.module.css";

const homeContent = {
  brindes: {
    eyebrow: "Fabricação própria em Taboão da Serra",
    heroBadgeTitle: "Produção própria",
    heroBadgeText: "Personalização, aprovação de arte e fabricação acompanhadas pela mesma equipe.",
    benefits: [
      ["Fábrica própria", "Mais controle de prazo, qualidade e reposição."],
      ["Arte antes de produzir", "Você confere a aplicação da marca antes da fabricação."],
      ["Atendimento para empresas", "Pedidos para eventos, equipes, campanhas e revenda."],
      ["Envios para todo o Brasil", "Condições de entrega definidas no orçamento."],
    ],
    sectionTitle: "Encontre o produto certo para cada ocasião.",
    sectionText: "Uma vitrine organizada por necessidade, como nas grandes lojas de festas e personalizados, mas com atendimento direto de fábrica.",
    categories: [
      { title: "Copos personalizados", label: "Eventos e campanhas", image: null, itemIndex: 0 },
      { title: "Canecas e lembranças", label: "Presentes e festas", image: null, itemIndex: 2 },
      { title: "Porta-crachás", label: "Identificação", image: null, itemIndex: 1 },
      { title: "Cordões personalizados", label: "Equipes e credenciais", image: null, itemIndex: 3 },
      { title: "Eventos corporativos", label: "Soluções completas", image: "/media/occasions/eventos-corporativos.png", itemIndex: 0 },
      { title: "Atacado e revenda", label: "Compra em volume", image: "/media/occasions/acoes-promocionais.png", itemIndex: 0 },
    ],
    productsTitle: "Produtos mais procurados",
    productsText: "Modelos para personalizar, comparar quantidades e iniciar seu pedido.",
    commercialTitle: "Sua ideia ganha forma dentro da própria fábrica.",
    commercialText: "A Lenterne reúne produto, personalização e produção em um único atendimento. Isso reduz ruído entre aprovação, fabricação e entrega.",
    metrics: [["+10 anos", "de experiência com produtos plásticos e identificação"], ["Arte aprovada", "antes do início da fabricação"]],
    solutionsTitle: "Comprar personalizado não precisa ser complicado.",
    solutionsText: "A jornada foi organizada para ajudar empresas e eventos a encontrarem produto, quantidade e acabamento com rapidez.",
    solutions: [
      ["01", "Escolha por ocasião", "Navegue por evento, equipe, presente, campanha ou revenda."],
      ["02", "Compare produtos", "Veja lote mínimo, aplicação, medidas e possibilidades de personalização."],
      ["03", "Envie sua identidade", "Compartilhe logotipo, cores e referências para preparação da arte."],
      ["04", "Aprove e produza", "A fabricação começa depois da validação comercial e visual."],
    ],
    processTitle: "Da sua marca para o produto final.",
    processText: "Um fluxo comercial claro, pensado para reduzir dúvidas e acelerar a aprovação.",
    steps: ["Escolha o produto e informe a quantidade desejada.", "Envie a identidade visual da empresa ou do evento.", "Receba a condição comercial e a prévia da personalização.", "Aprove a arte para iniciarmos a fabricação."],
    processCta: "Solicitar orçamento",
    finalTitle: "Pronto para montar seu pedido?",
    finalText: "Explore o catálogo ou fale com a equipe para receber orientação sobre produto, lote e personalização.",
  },
  ferragens: {
    eyebrow: "Fornecimento industrial direto",
    heroBadgeTitle: "Compra técnica",
    heroBadgeText: "Componentes para montagem, identificação, produção recorrente e revenda.",
    benefits: [
      ["Venda em volume", "Pacotes e condições para operações recorrentes."],
      ["Medidas organizadas", "Compare diâmetros, larguras, conjuntos e aplicações."],
      ["Atendimento técnico", "Ajuda para selecionar o componente adequado à montagem."],
      ["Reposição programada", "Condições para atacado, revenda e compras frequentes."],
    ],
    sectionTitle: "Componentes organizados por família e aplicação.",
    sectionText: "Uma navegação técnica inspirada em fornecedores industriais, com acesso rápido às peças mais usadas na produção.",
    categories: [
      { title: "Argolas", label: "Diâmetros e pacotes", image: null, itemIndex: 0 },
      { title: "Garras para cordão", label: "Fechamento e montagem", image: null, itemIndex: 1 },
      { title: "Clips jacaré", label: "Fixação e identificação", image: null, itemIndex: 2 },
      { title: "Conjuntos montados", label: "Componentes combinados", image: null, itemIndex: 3 },
      { title: "Atacado e revenda", label: "Compra em volume", image: "/media/occasions/atacado-revenda.png", itemIndex: 0 },
      { title: "Compra recorrente", label: "Reposição de estoque", image: "/media/occasions/clips-conjuntos.png", itemIndex: 0 },
    ],
    productsTitle: "Componentes em destaque",
    productsText: "Consulte medidas, pacotes mínimos e preços de referência para sua produção.",
    commercialTitle: "Fornecimento industrial com atendimento próximo.",
    commercialText: "A Lenterne atende fabricantes, montadores, distribuidores e operações que precisam manter componentes padronizados disponíveis no estoque.",
    metrics: [["1.000 un.", "lote comum para componentes de linha"], ["Compra recorrente", "condições comerciais para reposição e revenda"]],
    solutionsTitle: "Encontre a peça pela necessidade da sua linha.",
    solutionsText: "A escolha deixa de depender apenas do nome da peça e passa a considerar montagem, medida, volume e frequência de compra.",
    solutions: [
      ["01", "Montagem de chaveiros", "Argolas e conjuntos para brindes, acessórios e linhas de montagem."],
      ["02", "Produção de cordões", "Garras, clips e componentes para fechamento e identificação."],
      ["03", "Identificação", "Peças para crachás, credenciais, controles de acesso e equipes."],
      ["04", "Atacado e revenda", "Pacotes, recorrência e apoio comercial para operações em volume."],
    ],
    processTitle: "Da medida certa ao seu estoque.",
    processText: "Um fluxo técnico para reduzir erro de especificação e facilitar a recompra.",
    steps: ["Escolha a família do componente e confira as medidas.", "Informe a quantidade, aplicação e frequência de compra.", "Confirme disponibilidade, pacote, prazo e condição comercial.", "Finalize a cotação e programe a reposição quando necessário."],
    processCta: "Solicitar cotação",
    finalTitle: "Precisa comparar medidas ou montar um conjunto?",
    finalText: "Acesse o catálogo técnico ou envie sua necessidade para a equipe comercial.",
  },
} as const;

export async function HomePage({ brand }: { brand: BrandConfig }) {
  const items = await loadCatalog(brand.channel);
  const content = homeContent[brand.channel];
  const commercialImage = items[0]?.image ?? content.categories[0].image ?? "";

  return (
    <main id="conteudo">
      <section className={styles.hero}>
        <MotionBackdrop />
        <div className={`shell ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1>{brand.headline}</h1>
            <p>{brand.intro}</p>
            <div className={styles.buttons}>
              <a className={styles.primaryButton} href="/catalogo">{brand.primaryCta} <Arrow /></a>
              <a className={styles.secondaryButton} href="/orcamento">Falar com a equipe <Arrow /></a>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <div className={styles.heroVideo}>
              <video autoPlay muted loop playsInline preload="metadata" aria-label="Produtos e produção da Lenterne em movimento">
                <source src="/media/lenterne-original.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.heroBadge}>
              <strong>{content.heroBadgeTitle}</strong>
              <span>{content.heroBadgeText}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefits} aria-label="Benefícios comerciais">
        <div className={`shell ${styles.benefitGrid}`}>
          {content.benefits.map(([title, text], index) => (
            <div className={styles.benefit} key={title}>
              <span className={styles.benefitNumber}>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{title}</strong><span>{text}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>Navegação rápida</p><h2>{content.sectionTitle}</h2><p>{content.sectionText}</p></div>
          <a href="/catalogo">Ver catálogo completo <Arrow /></a>
        </div>
        <div className={styles.categoryGrid}>
          {content.categories.map((category, index) => {
            const image = category.image ?? items[category.itemIndex]?.image ?? commercialImage;
            return (
              <a className={styles.categoryCard} href="/catalogo" key={category.title}>
                <div className={styles.categoryImage}><img src={image} alt={category.title} loading={index < 3 ? "eager" : "lazy"} /></div>
                <div className={styles.categoryBody}><span>{category.label}</span><h3>{category.title}</h3></div>
              </a>
            );
          })}
        </div>
      </section>

      <section className={styles.featured} id="produtos-destaque">
        <div className="shell">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Vitrine principal</p><h2>{content.productsTitle}</h2><p>{content.productsText}</p></div>
            <a href="/catalogo">Todos os produtos <Arrow /></a>
          </div>
          <ProductCarousel products={items.slice(0, 8)} />
        </div>
      </section>

      <section className={styles.commercial}>
        <MotionBackdrop />
        <div className={`shell ${styles.commercialInner}`}>
          <div className={styles.commercialCopy}>
            <p className={styles.eyebrow}>Grupo Lenterne</p>
            <h2>{content.commercialTitle}</h2>
            <p>{content.commercialText}</p>
            <div className={styles.buttons}>
              <a className={styles.primaryButton} href="/sobre">Conhecer a Lenterne <Arrow /></a>
              <a className={styles.secondaryButton} href="/orcamento">Solicitar atendimento <Arrow /></a>
            </div>
          </div>
          <div className={styles.commercialMedia}>
            <div className={styles.metric}><strong>{content.metrics[0][0]}</strong><span>{content.metrics[0][1]}</span></div>
            <div className={styles.metric}><strong>{content.metrics[1][0]}</strong><span>{content.metrics[1][1]}</span></div>
            <div className={styles.photo}><img src={commercialImage} alt="Produto da Lenterne" loading="lazy" /></div>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.section}`}>
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>Soluções por necessidade</p><h2>{content.solutionsTitle}</h2><p>{content.solutionsText}</p></div>
        </div>
        <div className={styles.solutions}>
          {content.solutions.map(([number, title, text]) => (
            <article className={styles.solution} key={title}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.process}>
        <MotionBackdrop />
        <div className={`shell ${styles.processInner}`}>
          <div className={styles.processIntro}>
            <p className={styles.eyebrow}>Como funciona</p>
            <h2>{content.processTitle}</h2>
            <p>{content.processText}</p>
            <a className={styles.primaryButton} href="/orcamento">{content.processCta} <Arrow /></a>
          </div>
          <ol className={styles.steps}>
            {content.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`shell ${styles.finalInner}`}>
          <div><h2>{content.finalTitle}</h2><p>{content.finalText}</p></div>
          <div className={styles.buttons}>
            <a className={styles.primaryButton} href="/catalogo">Abrir catálogo <Arrow /></a>
            <a className={styles.outlineButton} href="https://wa.me/5511952093303">WhatsApp <Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
