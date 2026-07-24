"use client";

import { useState, type ReactNode } from "react";
import { Logo } from "@lenterne/ui";
import { CartProvider, useCart } from "./cart";
import type { BrandConfig } from "./brand";
import { NeuralNoise } from "./neural-noise";
import styles from "./v1-commerce.module.css";

const navigation = {
  brindes: ["Copos", "Canecas", "Porta-crachás", "Cordões", "Eventos", "Empresas"],
  ferragens: ["Argolas", "Garras", "Clips", "Conjuntos", "Atacado", "Aplicações"],
} as const;

const announcements = {
  brindes: ["Personalização para empresas e eventos", "Arte aprovada antes da produção", "Atendimento direto de fábrica"],
  ferragens: ["Componentes para produção e montagem", "Condições para atacado e revenda", "Atendimento técnico direto"],
} as const;

const catalogLink = (item: string) => `/catalogo?busca=${encodeURIComponent(item)}`;

function Header({ brand }: { brand: BrandConfig }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const channelNavigation = navigation[brand.channel];
  const channelAnnouncements = announcements[brand.channel];

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className={styles.announcement}>
        <div className={`shell ${styles.announcementInner}`}>
          {channelAnnouncements.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <header className={styles.header}>
        <div className={`shell ${styles.headerMain}`}>
          <a href="/" className={styles.brand} aria-label={brand.title}>
            <Logo />
            <small>{brand.channel === "brindes" ? "BRINDES" : "FERRAGENS"}</small>
          </a>

          <form className={styles.search} action="/catalogo">
            <label><span>Buscar</span><input name="busca" placeholder={brand.channel === "brindes" ? "Buscar brindes, categorias ou ocasiões" : "Buscar componente, medida ou aplicação"} aria-label="Buscar produtos" /></label>
            <button aria-label="Pesquisar">⌕</button>
          </form>

          <div className={styles.actions}>
            <a href="/conta">Minha conta</a>
            <a href="/orcamento">Atendimento</a>
            <a className={styles.cart} href="/carrinho">Pedido <span>{count}</span></a>
          </div>

          <button className={styles.menuButton} type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
            {open ? "Fechar" : "Menu"}
          </button>
        </div>

        <nav id="main-navigation" className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Principal">
          <div className={`shell ${styles.navInner}`}>
            <div className={styles.categoryLinks}>
              <a href="/catalogo">Todas as categorias</a>
              {channelNavigation.map((item) => <a href={catalogLink(item)} key={item}>{item}</a>)}
            </div>
            <div className={styles.utilityLinks}>
              <a href="/sobre">Quem somos</a>
              <a href={brand.switchUrl}>{brand.switchLabel}</a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

function Footer({ brand }: { brand: BrandConfig }) {
  const channelNavigation = navigation[brand.channel];

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.footerLead}`}>
        <p>Fale direto com quem fabrica.</p>
        <a href="https://wa.me/5511952093303">WhatsApp (11) 95209-3303 →</a>
      </div>
      <div className={`shell ${styles.footerGrid}`}>
        <div>
          <strong>{brand.title}</strong>
          <p>{brand.descriptor}</p>
          <p>Rua José Maria de Melo, 133<br />Taboão da Serra — SP</p>
        </div>
        <div>
          <h3>Categorias</h3>
          {channelNavigation.slice(0, 4).map((item) => <a href={catalogLink(item)} key={item}>{item}</a>)}
        </div>
        <div>
          <h3>Atendimento</h3>
          <a href="/orcamento">Solicitar orçamento</a>
          <a href="mailto:vendas@lenternebrindes.com.br">vendas@lenternebrindes.com.br</a>
          <p>(11) 4787-3648<br />(11) 4771-1744</p>
        </div>
        <div>
          <h3>Institucional</h3>
          <a href="/sobre">Quem somos</a>
          <a href="/privacidade">Privacidade</a>
          <a href="/trocas">Trocas e devoluções</a>
          <p>CNPJ 12.121.377/0001-88</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ brand, children }: { brand: BrandConfig; children: ReactNode }) {
  return (
    <CartProvider channel={brand.channel}>
      <div className="ambient-background"><NeuralNoise /></div>
      <Header brand={brand} />
      {children}
      <Footer brand={brand} />
    </CartProvider>
  );
}
