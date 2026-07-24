"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "@lenterne/catalog";

const api = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const emptyProduct = (): Product => ({ id: `product-${crypto.randomUUID()}`, slug: "", channel: "brindes", name: "", category: "", description: "", price: 0, unitLabel: "por unidade", minimumQuantity: 1, customizable: false, stock: "in_stock", stockQuantity: 0, specs: {}, image: "", imageAlt: "Produto Lenterne" });

export function ManagerPortal() {
  if (!api) {
    return <main id="conteudo" className="manager-login shell">
      <section>
        <p className="eyebrow">Área restrita</p>
        <h1>Gestão do catálogo</h1>
        <p>O painel online fica disponível quando a API administrativa estiver conectada. Os produtos publicados continuam funcionando normalmente.</p>
        <div className="manager-actions">
          <a className="button button-primary" href="/catalogo">Ver catálogo</a>
          <a className="button button-secondary" href="https://wa.me/5511952093303?text=Preciso%20de%20suporte%20com%20o%20cat%C3%A1logo%20Lenterne" target="_blank" rel="noreferrer">Solicitar suporte</a>
        </div>
      </section>
    </main>;
  }

  return <ConnectedManagerPortal api={api} />;
}

function ConnectedManagerPortal({ api }: { api: string }) {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (accessToken = token) => {
    const response = await fetch(`${api}/manager/products`, { headers: { authorization: `Bearer ${accessToken}` } });
    if (!response.ok) throw new Error();
    setProducts((await response.json()).items);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("lenterne-manager-token");
    if (saved) {
      setToken(saved);
      void load(saved).catch(() => {
        sessionStorage.removeItem("lenterne-manager-token");
        setToken("");
      });
    }
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch(`${api}/manager/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: data.get("username"), password: data.get("password") }),
      });
      if (!response.ok) return setMessage("Usuário ou senha incorretos.");
      const result = await response.json();
      sessionStorage.setItem("lenterne-manager-token", result.token);
      setToken(result.token);
      await load(result.token);
    } catch {
      setMessage("Não foi possível conectar ao painel.");
    } finally {
      setLoading(false);
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${api}/manager/products/${editing.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(editing),
      });
      if (!response.ok) return setMessage("Revise os campos obrigatórios antes de salvar.");
      setMessage("Produto salvo e catálogo atualizado.");
      setEditing(null);
      await load();
    } finally {
      setLoading(false);
    }
  }

  async function remove(product: Product) {
    if (!confirm(`Excluir ${product.name}?`)) return;
    const response = await fetch(`${api}/manager/products/${product.id}`, { method: "DELETE", headers: { authorization: `Bearer ${token}` } });
    if (response.ok) {
      if (editing?.id === product.id) setEditing(null);
      await load();
    }
  }

  const patch = <K extends keyof Product>(key: K, value: Product[K]) => setEditing((current) => current ? { ...current, [key]: value } : current);
  const readImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patch("image", String(reader.result));
    reader.readAsDataURL(file);
  };

  if (!token) return <main id="conteudo" className="manager-login shell"><section><p className="eyebrow">Área restrita</p><h1>Gerente Lenterne</h1><p>Entre para administrar os produtos das duas lojas.</p><form onSubmit={login}><label><span>Usuário</span><input name="username" autoComplete="username" required /></label><label><span>Senha</span><input name="password" type="password" autoComplete="current-password" required /></label><button className="button button-primary" disabled={loading}>{loading ? "Entrando…" : "Entrar"}</button>{message && <p role="alert">{message}</p>}</form></section></main>;

  return <main id="conteudo" className="manager-page shell"><header><div><p className="eyebrow">Área restrita</p><h1>Produtos</h1><p>Um catálogo para Brindes e Ferragens.</p></div><div className="manager-actions"><button type="button" className="button button-primary" onClick={() => setEditing(emptyProduct())}>Adicionar produto</button><button type="button" className="button button-secondary" onClick={() => { sessionStorage.removeItem("lenterne-manager-token"); setToken(""); }}>Sair</button></div></header><div className="manager-workspace"><section className="manager-list"><div className="manager-list-head"><strong>{products.length} produtos</strong><span>Selecione para editar</span></div>{products.map((product) => <article key={product.id} data-active={editing?.id === product.id}><img src={product.image} alt="" /><button type="button" onClick={() => { setEditing(structuredClone(product)); setMessage(""); }}><span>{product.channel === "brindes" ? "Brindes" : "Ferragens"} · {product.category}</span><strong>{product.name}</strong><small>R$ {product.price.toFixed(2).replace(".", ",")} · estoque {product.stockQuantity ?? "—"}</small></button><button type="button" className="manager-delete" onClick={() => void remove(product)}>Excluir</button></article>)}</section>{editing ? <form className="manager-editor" onSubmit={save}><div className="editor-head"><div><p className="eyebrow">{products.some((item) => item.id === editing.id) ? "Editar produto" : "Novo produto"}</p><h2>{editing.name || "Produto sem nome"}</h2></div><button type="button" className="text-action" onClick={() => setEditing(null)}>Fechar</button></div><div className="manager-image"><img src={editing.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%231b1716'/%3E%3C/svg%3E"} alt="Prévia" /><label className="button button-secondary">Escolher foto<input type="file" accept="image/*" onChange={(event) => readImage(event.target.files?.[0])} /></label><label><span>Ou URL da imagem</span><input value={editing.image.startsWith("data:") ? "" : editing.image} onChange={(event) => patch("image", event.target.value)} /></label></div><div className="manager-fields"><label><span>Loja</span><select value={editing.channel} onChange={(event) => patch("channel", event.target.value as Product["channel"])}><option value="brindes">Brindes</option><option value="ferragens">Ferragens</option></select></label><label><span>Nome</span><input required value={editing.name} onChange={(event) => patch("name", event.target.value)} /></label><label><span>Slug da URL</span><input value={editing.slug} onChange={(event) => patch("slug", event.target.value)} placeholder="gerado pelo nome" /></label><label><span>Categoria</span><input required value={editing.category} onChange={(event) => patch("category", event.target.value)} /></label><label><span>Preço unitário</span><input required type="number" min="0" step="0.001" value={editing.price} onChange={(event) => patch("price", Number(event.target.value))} /></label><label><span>Quantidade mínima</span><input required type="number" min="1" value={editing.minimumQuantity} onChange={(event) => patch("minimumQuantity", Number(event.target.value))} /></label><label><span>Estoque atual</span><input type="number" min="0" value={editing.stockQuantity ?? 0} onChange={(event) => patch("stockQuantity", Number(event.target.value))} /></label><label><span>Situação</span><select value={editing.stock} onChange={(event) => patch("stock", event.target.value as Product["stock"])}><option value="in_stock">Disponível</option><option value="low">Estoque baixo</option><option value="quote">Sob orçamento</option></select></label><label className="manager-wide"><span>Descrição</span><textarea required rows={5} value={editing.description} onChange={(event) => patch("description", event.target.value)} /></label><label className="manager-wide"><span>Texto da unidade</span><input required value={editing.unitLabel} onChange={(event) => patch("unitLabel", event.target.value)} /></label><label className="manager-check"><input type="checkbox" checked={editing.customizable} onChange={(event) => patch("customizable", event.target.checked)} /> Produto personalizável</label></div><button className="button button-primary" disabled={loading}>{loading ? "Salvando…" : "Salvar produto"}</button>{message && <p className="manager-message" role="status">{message}</p>}</form> : <aside className="manager-empty"><p>Selecione um produto para editar ou adicione um novo item.</p></aside>}</div></main>;
}
