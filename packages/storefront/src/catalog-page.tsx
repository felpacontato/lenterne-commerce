"use client";

import { useEffect, useMemo, useState } from "react";
import { byChannel, money, type Channel } from "@lenterne/catalog";
import { Arrow } from "@lenterne/ui";

export function CatalogPage({ channel }: { channel: Channel }) {
  const [all, setAll] = useState(() => byChannel(channel));
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100"}/catalog/${channel}`).then((response) => response.ok ? response.json() : Promise.reject()).then((data) => setAll(data.items)).catch(() => undefined); }, [channel]);
  const categories = ["Todos", ...Array.from(new Set(all.map((p) => p.category)))];
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  useEffect(() => { setQuery(new URLSearchParams(window.location.search).get("busca") ?? ""); }, []);
  const visible = useMemo(() => all.filter((p) => (category === "Todos" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [all, category, query]);
  return <main id="conteudo" className={`catalog-page ${channel}`}><header className="catalog-header shell"><p className="eyebrow">{channel === "brindes" ? "Brindes e personalizados" : "Ferragens e componentes"}</p><h1>{channel === "brindes" ? "Encontre o formato para a sua marca." : "Catálogo técnico."}</h1><p>{visible.length} itens nesta seleção</p></header><div className="catalog-tools shell"><label className="search-field"><span>Buscar produto</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite um nome" /></label><fieldset><legend>Categoria</legend>{categories.map((item) => <label key={item}><input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} /><span>{item}</span></label>)}</fieldset></div><section className="product-list shell" aria-live="polite">{visible.map((product) => <a className="product-tile" href={`/produto/${product.slug}`} key={product.id}><figure><img src={product.image} alt={product.imageAlt} loading="lazy" /></figure><div className="product-meta"><span>{product.category}</span><h2>{product.name}</h2><p>Mínimo {product.minimumQuantity.toLocaleString("pt-BR")} un.</p><strong>{money(product.price)} <small>{product.unitLabel}</small></strong><span className="product-arrow"><Arrow /></span></div></a>)}{visible.length === 0 && <p className="no-results">Nenhum produto encontrado. Tente outro termo ou categoria.</p>}</section></main>;
}
