"use client";

import { useState, type FormEvent } from "react";
import type { Channel } from "@lenterne/catalog";
import { Field } from "@lenterne/ui";
import { useCart } from "./cart";

export function QuotePage({ channel }: { channel: Channel }) {
  const { lines, total } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setState("loading"); const form = new FormData(event.currentTarget); const payload = { channel, customer: Object.fromEntries(form), lines: lines.map(({ product, quantity }) => ({ productId: product.id, quantity })), estimatedTotal: total }; try { const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/quotes`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); if (!response.ok) throw new Error(); setState("success"); } catch { setState("error"); } }
  return <main id="conteudo" className="quote-page shell"><header><h1>{channel === "brindes" ? "Conte sua ideia para a gente." : "Informe o que sua produção precisa."}</h1><p>Responderemos com disponibilidade, prazo e valor final. Nenhuma cobrança acontece neste formulário.</p></header>{state === "success" ? <section className="form-success" role="status"><h2>Solicitação recebida.</h2><p>Nossa equipe vai conferir os dados e retornar pelos contatos informados.</p><a href="/catalogo" className="button button-secondary">Voltar ao catálogo</a></section> : <form onSubmit={submit}><Field label="Nome completo" name="name" required /><Field label="Empresa" name="company" /><Field label="WhatsApp" name="phone" type="tel" required /><Field label="E-mail" name="email" type="email" required /><Field label="CEP de entrega" name="postalCode" /><Field label="Mensagem" name="message"><textarea name="message" rows={5} placeholder="Quantidade, prazo desejado e outras informações" /></Field>{channel === "brindes" && <Field label="Link da arte (opcional nesta fase)" name="artworkUrl" type="url" />}<label className="consent"><input type="checkbox" required /> Autorizo o uso destes dados para responder à solicitação.</label><button className="button button-primary" data-state={state} disabled={state === "loading"}>{state === "loading" ? "Enviando…" : "Enviar solicitação"}</button>{state === "error" && <p className="form-error" role="alert">Não foi possível enviar agora. Ligue para (11) 4787-3648 ou tente novamente.</p>}</form>}</main>;
}
