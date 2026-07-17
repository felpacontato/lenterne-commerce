"use client";

import { useRef } from "react";
import { money, type Product } from "@lenterne/catalog";

export function ProductCarousel({ products }: { products: Product[] }) {
  const track = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    const edgeTolerance = 8;
    const atStart = element.scrollLeft <= edgeTolerance;
    const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - edgeTolerance;

    if (direction === 1 && atEnd) {
      element.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === -1 && atStart) {
      element.scrollTo({ left: element.scrollWidth, behavior: "smooth" });
      return;
    }

    element.scrollBy({ left: direction * element.clientWidth * 0.82, behavior: "smooth" });
  }

  return <div className="product-carousel">
    <button className="carousel-control previous" type="button" onClick={() => move(-1)} aria-label="Ver produtos anteriores">←</button>
    <div className="carousel-track" ref={track} tabIndex={0} aria-label="Produtos em destaque">
      {products.map((product, index) => <a className="carousel-product" href={`/produto/${product.slug}`} key={product.id}>
        <figure><img src={product.image} alt={product.imageAlt} loading={index > 2 ? "lazy" : "eager"} /></figure>
        <div><span>{product.category}</span><h3>{product.name}</h3><p>A partir de {product.minimumQuantity.toLocaleString("pt-BR")} unidades</p><strong>{money(product.price)} <small>{product.unitLabel}</small></strong></div>
      </a>)}
    </div>
    <button className="carousel-control next" type="button" onClick={() => move(1)} aria-label="Ver próximos produtos">→</button>
  </div>;
}
