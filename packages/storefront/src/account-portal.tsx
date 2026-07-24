"use client";

import { useEffect, useState, type FormEvent } from "react";

type Address = { id: string; label: string; recipient: string; postalCode: string; street: string; number: string; complement?: string; district: string; city: string; state: string };
type Customer = { name: string; email: string; phone?: string; company?: string; addresses: Address[]; subscriptions: { offers: boolean; orderUpdates: boolean } };

const api = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export function AccountPortal() {
  if (!api) {
    return <main id="conteudo" className="account-auth shell">
      <section>
        <p className="eyebrow">Área do cliente</p>
        <h1>Seu pedido continua disponível neste navegador.</h1>
        <p>A conta online está em configuração. Enquanto isso, use o carrinho para revisar os produtos e envie o pedido diretamente para a equipe.</p>
      </section>
      <section className="empty-state">
        <strong>Atendimento sem bloqueio.</strong>
        <p>Você pode montar o pedido, solicitar orçamento e falar pelo WhatsApp normalmente.</p>
        <a className="button button-primary" href="/carrinho">Abrir meu pedido</a>
        <a className="button button-secondary" href="/orcamento">Solicitar orçamento</a>
        <a className="button button-secondary" href="https://wa.me/5511952093303" target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </section>
    </main>;
  }

  return <ConnectedAccountPortal api={api} />;
}

function ConnectedAccountPortal({ api }: { api: string }) {
  const [token, setToken] = useState("");
  const [customer, setCustomer] = useState<Customer>();
  const [tab, setTab] = useState("pedidos");
  const [mode, setMode] = useState<"login" | "cadastro">("login");
  const [message, setMessage] = useState("");

  const request = async (path: string, options: RequestInit = {}) => {
    const response = await fetch(`${api}${path}`, {
      ...options,
      headers: { "content-type": "application/json", authorization: `Bearer ${token}`, ...options.headers },
    });
    if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error ?? "request_failed");
    return response.status === 204 ? undefined : response.json();
  };

  useEffect(() => {
    const saved = localStorage.getItem("lenterne-customer-token") ?? "";
    if (!saved) return;
    setToken(saved);
    fetch(`${api}/account/me`, { headers: { authorization: `Bearer ${saved}` } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(setCustomer)
      .catch(() => localStorage.removeItem("lenterne-customer-token"));
  }, [api]);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const result = await fetch(`${api}/account/${mode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (!response.ok) throw new Error((await response.json()).error);
        return response.json();
      });
      localStorage.setItem("lenterne-customer-token", result.token);
      setToken(result.token);
      setCustomer(result.customer);
    } catch (error) {
      setMessage(error instanceof Error && error.message === "email_in_use" ? "Este e-mail já possui cadastro." : "Não foi possível entrar. Confira os dados.");
    }
  }

  async function addAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await request("/account/addresses", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      setCustomer(await request("/account/me"));
      event.currentTarget.reset();
    } catch {
      setMessage("Revise os dados do endereço.");
    }
  }

  const logout = () => {
    localStorage.removeItem("lenterne-customer-token");
    setToken("");
    setCustomer(undefined);
  };

  if (!customer) return <main id="conteudo" className="account-auth shell">
    <section><p className="eyebrow">Área do cliente</p><h1>Seus pedidos, dados e preferências em um só lugar.</h1><p>Acompanhe solicitações e mantenha os dados de entrega atualizados.</p></section>
    <form onSubmit={authenticate}>
      <div className="auth-switch">
        <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Entrar</button>
        <button type="button" className={mode === "cadastro" ? "active" : ""} onClick={() => setMode("cadastro")}>Criar conta</button>
      </div>
      {mode === "cadastro" && <><label>Nome<input required name="name" /></label><label>Empresa<input name="company" /></label><label>Telefone<input name="phone" /></label></>}
      <label>E-mail<input required type="email" name="email" /></label>
      <label>Senha<input required minLength={8} type="password" name="password" /></label>
      {message && <p className="form-message" role="alert">{message}</p>}
      <button className="button button-primary">{mode === "login" ? "Entrar" : "Criar minha conta"}</button>
    </form>
  </main>;

  const tabs = [["pedidos", "Pedidos"], ["enderecos", "Endereços"], ["carteira", "Carteira"], ["assinaturas", "Assinaturas"], ["conta", "Minha conta"]];

  return <main id="conteudo" className="account-page shell">
    <header><p className="eyebrow">Área do cliente</p><h1>Olá, {customer.name.split(" ")[0]}.</h1><p>{customer.email}</p></header>
    <div className="account-layout">
      <nav>{tabs.map(([id, label]) => <button type="button" className={tab === id ? "active" : ""} key={id} onClick={() => { setTab(id); setMessage(""); }}>{label}</button>)}<button type="button" onClick={logout}>Sair</button></nav>
      <section className="account-panel">
        {tab === "pedidos" && <><h2>Meus pedidos</h2><div className="empty-state"><strong>Nenhum pedido vinculado ainda.</strong><p>Novos pedidos aparecerão aqui assim que forem enviados pela loja.</p><a className="button button-secondary" href="/catalogo">Ir ao catálogo</a></div></>}
        {tab === "enderecos" && <><h2>Meus endereços</h2><div className="address-list">{customer.addresses.map((address) => <article key={address.id}><strong>{address.label}</strong><p>{address.street}, {address.number}<br />{address.district} · {address.city}/{address.state}<br />CEP {address.postalCode}</p><button type="button" onClick={async () => { await request(`/account/addresses/${address.id}`, { method: "DELETE" }); setCustomer(await request("/account/me")); }}>Remover</button></article>)}</div><form className="account-form" onSubmit={addAddress}><label>Identificação<input name="label" required /></label><label>Destinatário<input name="recipient" required /></label><label>CEP<input name="postalCode" required /></label><label>Rua<input name="street" required /></label><label>Número<input name="number" required /></label><label>Complemento<input name="complement" /></label><label>Bairro<input name="district" required /></label><label>Cidade<input name="city" required /></label><label>UF<input name="state" maxLength={2} required /></label><button className="button button-primary">Salvar endereço</button></form></>}
        {tab === "carteira" && <><h2>Minha carteira</h2><div className="empty-state"><strong>Nenhum método de pagamento salvo.</strong><p>O cadastro seguro será ativado junto ao gateway de pagamento.</p><button type="button" className="button button-secondary" disabled>Adicionar método — em configuração</button></div></>}
        {tab === "assinaturas" && <><h2>Minhas assinaturas</h2>{[["orderUpdates", "Atualizações sobre pedidos e orçamentos"], ["offers", "Novidades e condições comerciais"]].map(([key, label]) => <label className="check-row" key={key}><input type="checkbox" checked={customer.subscriptions[key as keyof typeof customer.subscriptions]} onChange={async (event) => { const updated = { ...customer.subscriptions, [key]: event.target.checked }; setCustomer(await request("/account/subscriptions", { method: "PUT", body: JSON.stringify(updated) })); }} /> {label}</label>)}</>}
        {tab === "conta" && <><h2>Minha conta</h2><form className="account-form" onSubmit={async (event) => { event.preventDefault(); setCustomer(await request("/account/me", { method: "PUT", body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) })); setMessage("Dados atualizados."); }}><label>Nome<input name="name" defaultValue={customer.name} required /></label><label>Empresa<input name="company" defaultValue={customer.company} /></label><label>Telefone<input name="phone" defaultValue={customer.phone} /></label><label>E-mail<input value={customer.email} disabled readOnly /></label><button className="button button-primary">Salvar alterações</button>{message && <p role="status">{message}</p>}</form></>}
      </section>
    </div>
  </main>;
}
