"use client";

import { useEffect, useMemo, useState } from "react";
import { byChannel, money, type Channel, type Product } from "@lenterne/catalog";
import { Arrow } from "@lenterne/ui";

const api = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const stopWords = new Set(["e", "para", "de", "da", "do", "das", "dos", "em", "no", "na"]);

function matchesQuery(product: Product, rawQuery: string, channel: Channel) {
  const term = normalize(rawQuery);
  if (!term) return true;

  if (["personalizado", "personalizados", "personalizacao"].includes(term)) return product.customizable;
  if (term.includes("sem personalizacao")) return !product.customizable;

  const broadTerms = channel === "brindes"
    ? ["evento", "eventos", "empresa", "empresas", "presente", "presentes", "campanha", "campanhas"]
    : ["atacado", "revenda", "tecnico", "tecnica", "aplicacao", "aplicacoes", "recorrente"];

  if (broadTerms.some((item) => term === item || term.includes(item))) return true;

  const searchable = normalize([
    product.name,
    product.category,
    product.description,
    product.customizable ? "personalizado personalizacao" : "sem personalizacao",
    ...Object.entries(product.specs).flatMap(([key, value]) => [key, String(value)]),
  ].join(" "));

  const tokens = term.split(/\s+/).filter((token) => token.length > 1 && !stopWords.has(token));
  return tokens.length === 0 || tokens.some((token) => {
    const singular = token.endsWith("s") && token.length > 4 ? token.slice(0, -1) : token;
    return searchable.includes(token) || searchable.includes(singular);
  });
}

export function CatalogPage({ channel }: { channel: Channel }) {
  const [all, setAll] = useState(() => byChannel(channel));
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("busca") ?? params.get("categoria") ?? "");
  }, []);

  useEffect(() => {
    if (!api) return;
    const controller = new AbortController();
    fetch(`${api}/catalog/${channel}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => {
        if (Array.isArray(data?.items) && data.items.length > 0) setAll(data.items);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [channel]);

  const categories = ["Todos", ...Array.from(new Set(all.map((product) => product.category)))];
  const visible = useMemo(() => all.filter((product) => {
    if (category !== "Todos" && product.category !== category) return false;
    return matchesQuery(product, query, channel);
  }), [all, category, query, channel]);

  return <main id="conteudo" className={`catalog-page ${channel}`}>
    <header className="catalog-header shell">
      <p className="eyebrow">{channel === "brindes" ? "Brindes e personalizados" : "Ferragens e componentes"}</p>
      <h1>{channel === "brindes" ? "Encontre o formato para a sua marca." : "Catálogo técnico."}</h1>
      <p>{visible.length} itens nesta seleção</p>
    </header>
    <div className="catalog-tools shell">
      <label className="search-field">
        <span>Buscar produto</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, categoria, medida ou aplicação" />
      </label>
      <fieldset>
        <legend>Categoria</legend>
        {categories.map((item) => <label key={item}>
          <input type="radio" name="category" checked={category === item} onChange={() => setCategory(item)} />
          <span>{item}</span>
        </label>)}
      </fieldset>
    </div>
    <section className="product-list shell" aria-live="polite">
      {visible.map((product) => <a className="product-tile" href={`/produto/${product.slug}`} key={product.id}>
        <figure><img src={product.image} alt={product.imageAlt} loading="lazy" /></figure>
        <div className="product-meta">
          <span>{product.category}</span>
          <h2>{product.name}</h2>
          <p>Mínimo {product.minimumQuantity.toLocaleString("pt-BR")} un.</p>
          <strong>{money(product.price)} <small>{product.unitLabel}</small></strong>
          <span className="product-arrow"><Arrow /></span>
        </div>
      </a>)}
      {visible.length === 0 && <p className="no-results">Nenhum produto encontrado. Tente outro termo ou selecione “Todos”.</p>}
    </section>
  </main>;
}
