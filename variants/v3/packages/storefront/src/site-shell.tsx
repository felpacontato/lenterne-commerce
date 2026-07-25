"use client";

import { useState, type ReactNode } from "react";
import { Logo } from "@lenterne/ui";
import { CartProvider, useCart } from "./cart";
import type { BrandConfig } from "./brand";
import { NeuralNoise } from "./neural-noise";

const links = {
  brindes: ["Copos", "Canecas", "Identificacao", "Cordoes", "Eventos"],
  ferragens: ["Argolas", "Garras", "Clips", "Atacado", "Tecnico"]
};

function Header({ brand }: { brand: BrandConfig }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteudo</a>
      <header className={`v3-header v3-${brand.channel}`}>
        <div className="v3-header-inner">
          <a href="/" className="v3-brand">
            <Logo />
            <span>{brand.channel === "brindes" ? "Brindes" : "Ferragens"}</span>
          </a>

          <form className="v3-search" action="/catalogo">
            <input name="busca" placeholder="Buscar no catalogo" aria-label="Buscar produtos" />
            <button aria-label="Pesquisar">⌕</button>
          </form>

          <nav className={open ? "open" : ""} aria-label="Navegacao principal">
            {links[brand.channel].map((item) => (
              <a key={item} href={`/catalogo?busca=${encodeURIComponent(item)}`}>{item}</a>
            ))}
            <a href="/sobre">Quem somos</a>
            <a href={brand.switchUrl}>{brand.switchLabel}</a>
          </nav>

          <div className="v3-actions">
            <a href="/conta">Conta</a>
            <a href="/carrinho">Pedido <span>{count}</span></a>
          </div>

          <button className="v3-menu" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
        </div>
      </header>
    </>
  );
}

function Footer({ brand }: { brand: BrandConfig }) {
  return (
    <footer className="v3-footer">
      <div className="v3-footer-grid">
        <div>
          <Logo />
          <p>{brand.descriptor}</p>
        </div>
        <div>
          <strong>Catalogo</strong>
          <a href="/catalogo">Produtos</a>
          <a href="/orcamento">Orcamento</a>
          <a href="/carrinho">Carrinho</a>
        </div>
        <div>
          <strong>Cliente</strong>
          <a href="/conta">Minha conta</a>
          <a href="/trocas">Trocas</a>
          <a href="/privacidade">Privacidade</a>
        </div>
        <div>
          <strong>Contato</strong>
          <a href="https://wa.me/5511952093303">WhatsApp (11) 95209-3303</a>
          <a href="mailto:vendas@lenternebrindes.com.br">vendas@lenternebrindes.com.br</a>
          <p>Taboao da Serra - SP</p>
        </div>
      </div>
      <div className="v3-footer-bottom">
        <span>2026 Lenterne</span>
        <span>CNPJ 12.121.377/0001-88</span>
      </div>
    </footer>
  );
}

export function SiteShell({ brand, children }: { brand: BrandConfig; children: ReactNode }) {
  return (
    <CartProvider channel={brand.channel}>
      <div className="v3-ambient"><NeuralNoise opacity={0.08} /></div>
      <Header brand={brand} />
      {children}
      <Footer brand={brand} />
    </CartProvider>
  );
}
