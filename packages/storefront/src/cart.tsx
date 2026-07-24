"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@lenterne/catalog";
import { money } from "@lenterne/catalog";

type CartLine = { product: Product; quantity: number };
type CartContextValue = { lines: CartLine[]; count: number; total: number; add: (product: Product, quantity?: number) => void; remove: (id: string) => void; clear: () => void };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ channel, children }: { channel: string; children: ReactNode }) {
  const key = `lenterne-cart-${channel}`;
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(false);
    try {
      const saved = localStorage.getItem(key);
      const parsed = saved ? JSON.parse(saved) : [];
      setLines(Array.isArray(parsed) ? parsed : []);
    } catch {
      setLines([]);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(key, JSON.stringify(lines));
  }, [hydrated, key, lines]);

  const value = useMemo(() => ({
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    add(product: Product, quantity = product.minimumQuantity) {
      setLines((current) => {
        const line = current.find((item) => item.product.id === product.id);
        return line
          ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
          : [...current, { product, quantity }];
      });
    },
    remove(id: string) { setLines((current) => current.filter((line) => line.product.id !== id)); },
    clear() { setLines([]); }
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

export function AddToCart({ product, label }: { product: Product; label: string }) {
  const { add } = useCart();
  const [state, setState] = useState<"idle" | "success">("idle");
  return <button type="button" className="button button-primary" data-state={state} onClick={() => {
    add(product);
    setState("success");
    window.setTimeout(() => setState("idle"), 1800);
  }}>{state === "success" ? "Adicionado ✓" : label}</button>;
}

export function CartPage({ title }: { title: string }) {
  const { lines, total, remove, clear } = useCart();
  return <main id="conteudo" className="cart-page shell">
    <header><p className="eyebrow">Pedido em andamento</p><h1>{title}</h1></header>
    {lines.length === 0 ? <div className="empty-cart">
      <p>Seu pedido ainda está vazio.</p>
      <a className="button button-secondary" href="/catalogo">Voltar ao catálogo</a>
    </div> : <>
      <div className="cart-lines">{lines.map(({ product, quantity }) => <article key={product.id} className="cart-line">
        <img src={product.image} alt="" />
        <div><h2>{product.name}</h2><p>{quantity.toLocaleString("pt-BR")} unidades · {money(product.price)} {product.unitLabel}</p></div>
        <strong>{money(product.price * quantity)}</strong>
        <button type="button" className="text-action" onClick={() => remove(product.id)}>Remover</button>
      </article>)}</div>
      <footer className="cart-summary">
        <span>Total estimado</span><strong>{money(total)}</strong>
        <p>Frete, personalização e condições comerciais serão confirmados antes do pagamento.</p>
        <a className="button button-primary" href="/orcamento">Continuar pedido</a>
        <button type="button" className="text-action" onClick={clear}>Limpar pedido</button>
      </footer>
    </>}
  </main>;
}
