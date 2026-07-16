"use client";

import { useState, type ReactNode } from "react";
import { Logo } from "@lenterne/ui";
import { CartProvider, useCart } from "./cart";
import type { BrandConfig } from "./brand";
import { NeuralNoise } from "./neural-noise";

function Header({ brand }: { brand: BrandConfig }) {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><header className={`site-header ${brand.channel}`}><div className="shell header-inner"><a href="/" className="brand-lockup"><Logo /><small>{brand.channel === "brindes" ? "BRINDES" : "FERRAGENS"}</small></a><button className="menu-button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>Menu</button><nav id="main-navigation" className={open ? "open" : ""} aria-label="Principal"><a href="/catalogo">Catálogo</a><a href="/sobre">Quem somos</a><a href="/orcamento">Atendimento</a><a href={brand.switchUrl}>{brand.switchLabel}</a><a className="cart-link" href="/carrinho">Pedido <span>{count}</span></a></nav></div></header></>;
}

function Footer({ brand }: { brand: BrandConfig }) {
  return <footer className="site-footer"><div className="shell footer-lead"><p>Fale direto com quem fabrica.</p><a href="https://wa.me/5511952093303">WhatsApp (11) 95209-3303 →</a></div><div className="shell footer-grid"><div><strong>{brand.title}</strong><p>Rua José Maria de Melo, 133<br />Taboão da Serra — SP</p></div><div><a href="mailto:vendas@lenternebrindes.com.br">vendas@lenternebrindes.com.br</a><p>(11) 4787-3648<br />(11) 4771-1744</p></div><div><a href="/privacidade">Privacidade</a><a href="/trocas">Trocas e devoluções</a><p>CNPJ 12.121.377/0001-88</p></div></div></footer>;
}

export function SiteShell({ brand, children }: { brand: BrandConfig; children: ReactNode }) {
  return <CartProvider channel={brand.channel}><div className="ambient-background"><NeuralNoise /></div><Header brand={brand} />{children}<Footer brand={brand} /></CartProvider>;
}
