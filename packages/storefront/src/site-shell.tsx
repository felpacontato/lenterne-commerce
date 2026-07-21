"use client";

import { useState, type ReactNode } from "react";
import { Logo } from "@lenterne/ui";
import { CartProvider, useCart } from "./cart";
import type { BrandConfig } from "./brand";
import { NeuralNoise } from "./neural-noise";

const categoryLinks = {
  brindes: ["Copos e canecas", "Identificação", "Cordões", "Personalizados", "Sem personalização", "Empresas e eventos"],
  ferragens: ["Argolas", "Garras dentadas", "Clips", "Conjuntos", "Atacado", "Compra recorrente"]
};

function Header({ brand }: { brand: BrandConfig }) {
  const [open, setOpen] = useState(false); const { count } = useCart();
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div className="commerce-topbar"><div className="shell"><span>5% de desconto no PIX para pedidos elegíveis</span><span>Fabricação própria em Taboão da Serra</span><a href="https://wa.me/5511952093303">Dúvidas pelo WhatsApp</a></div></div><header className={`commerce-header ${brand.channel}`}><div className="shell commerce-header-main"><a href="/" className="brand-lockup"><Logo /><small>{brand.channel === "brindes" ? "BRINDES" : "FERRAGENS"}</small></a><form className="commerce-search" action="/catalogo"><select name="categoria" aria-label="Categoria"><option value="">Todas as categorias</option>{categoryLinks[brand.channel].map(item=><option key={item}>{item}</option>)}</select><input name="busca" placeholder="Busque pelo produto, medida ou aplicação" aria-label="Buscar produtos" /><button aria-label="Pesquisar">⌕</button></form><div className="header-actions"><a href="/conta"><small>Olá, entre</small><strong>Minha conta</strong></a><a href="/orcamento"><small>Atendimento</small><strong>Orçamentos</strong></a><a className="cart-link" href="/carrinho"><small>Meu pedido</small><strong>Carrinho <span>{count}</span></strong></a></div><button className="menu-button" aria-expanded={open} onClick={()=>setOpen(!open)}>Menu</button></div><nav className={open ? "open" : ""}><div className="shell"><a className="all-categories" href="/catalogo">☰ Todos os produtos</a>{categoryLinks[brand.channel].map(item=><a key={item} href={`/catalogo?busca=${encodeURIComponent(item)}`}>{item}</a>)}<a className="channel-switch" href={brand.switchUrl}>{brand.switchLabel} →</a></div></nav></header></>;
}

function Footer({ brand }: { brand: BrandConfig }) {
  return <footer className="site-footer"><div className="newsletter shell"><div><strong>Receba novidades e condições comerciais</strong><span>Cadastre seu e-mail para acompanhar lançamentos.</span></div><form><input type="email" placeholder="Seu melhor e-mail" aria-label="Seu melhor e-mail" /><button className="button button-primary">Cadastrar</button></form></div><div className="shell footer-grid"><div><Logo /><p>{brand.descriptor}</p><a href="https://wa.me/5511952093303">WhatsApp (11) 95209-3303</a></div><div><strong>Atendimento</strong><a href="/orcamento">Solicitar orçamento</a><a href="/conta">Meus pedidos</a><a href="/trocas">Trocas e devoluções</a></div><div><strong>Institucional</strong><a href="/sobre">Quem somos</a><a href="/privacidade">Privacidade</a><a href="/gerente">Área de gestão</a></div><div><strong>Contato</strong><a href="mailto:vendas@lenternebrindes.com.br">vendas@lenternebrindes.com.br</a><p>Rua José Maria de Melo, 133<br />Taboão da Serra — SP</p></div></div><div className="shell footer-bottom"><span>© 2026 Lenterne</span><span>CNPJ 12.121.377/0001-88</span></div></footer>;
}

export function SiteShell({ brand, children }: { brand: BrandConfig; children: ReactNode }) { return <CartProvider channel={brand.channel}><div className="ambient-background"><NeuralNoise opacity={0.1} /></div><Header brand={brand}/>{children}<Footer brand={brand}/></CartProvider>; }
