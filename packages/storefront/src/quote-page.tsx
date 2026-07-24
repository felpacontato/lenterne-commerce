"use client";

import { useState, type FormEvent } from "react";
import { money, type Channel } from "@lenterne/catalog";
import { Field } from "@lenterne/ui";
import { useCart } from "./cart";

const api = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const whatsappNumber = "5511952093303";

type SubmitState = "idle" | "loading" | "success" | "fallback" | "error";

export function QuotePage({ channel }: { channel: Channel }) {
  const { lines, total } = useCart();
  const [state, setState] = useState<SubmitState>("idle");
  const [whatsappUrl, setWhatsappUrl] = useState(`https://wa.me/${whatsappNumber}`);

  function buildWhatsappUrl(customer: Record<string, FormDataEntryValue>) {
    const products = lines.length > 0 ? lines.map(({ product, quantity }) => `• ${product.name}: ${quantity.toLocaleString("pt-BR")} un.`).join("\n") : "• Nenhum produto adicionado ao pedido.";
    const message = [
      channel === "brindes" ? "Olá! Quero solicitar um orçamento de brindes." : "Olá! Quero solicitar uma cotação de ferragens.",
      "",
      `Nome: ${String(customer.name ?? "")}`,
      customer.company ? `Empresa: ${String(customer.company)}` : "",
      `WhatsApp: ${String(customer.phone ?? "")}`,
      `E-mail: ${String(customer.email ?? "")}`,
      customer.postalCode ? `CEP: ${String(customer.postalCode)}` : "",
      "",
      "Produtos:",
      products,
      total > 0 ? `Total estimado do catálogo: ${money(total)}` : "",
      customer.message ? `Detalhes: ${String(customer.message)}` : "",
      customer.artworkUrl ? `Arte ou referência: ${String(customer.artworkUrl)}` : "",
    ].filter(Boolean).join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = new FormData(event.currentTarget);
    const customer = Object.fromEntries(form) as Record<string, FormDataEntryValue>;
    const fallbackUrl = buildWhatsappUrl(customer);
    setWhatsappUrl(fallbackUrl);

    if (!api) {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      setState("fallback");
      return;
    }

    try {
      const response = await fetch(`${api}/quotes`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ channel, customer, lines: lines.map(({ product, quantity }) => ({ productId: product.id, quantity })), estimatedTotal: total }) });
      if (!response.ok) throw new Error();
      setState("success");
    } catch {
      setState("fallback");
    }
  }

  return <main id="conteudo" className="quote-page shell"><header><h1>{channel === "brindes" ? "Conte sua ideia para a gente." : "Informe o que sua produção precisa."}</h1><p>Responderemos com disponibilidade, prazo e valor final. Nenhuma cobrança acontece neste formulário.</p></header>{state === "success" ? <section className="form-success" role="status"><h2>Solicitação recebida.</h2><p>Nossa equipe vai conferir os dados e retornar pelos contatos informados.</p><a href="/catalogo" className="button button-secondary">Voltar ao catálogo</a></section> : state === "fallback" ? <section className="form-success" role="status"><h2>Solicitação preparada.</h2><p>Confira a mensagem no WhatsApp e toque em enviar para concluir o atendimento.</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-primary">Abrir WhatsApp</a><a href="/catalogo" className="button button-secondary">Voltar ao catálogo</a></section> : <form onSubmit={submit}><Field label="Nome completo" name="name" required /><Field label="Empresa" name="company" /><Field label="WhatsApp" name="phone" type="tel" required /><Field label="E-mail" name="email" type="email" required /><Field label="CEP de entrega" name="postalCode" /><Field label="Mensagem" name="message"><textarea name="message" rows={5} placeholder="Quantidade, prazo desejado e outras informações" /></Field>{channel === "brindes" && <Field label="Link da arte (opcional nesta fase)" name="artworkUrl" type="url" />}<label className="consent"><input type="checkbox" required /> Autorizo o uso destes dados para responder à solicitação.</label><button className="button button-primary" data-state={state} disabled={state === "loading"}>{state === "loading" ? "Enviando…" : "Enviar solicitação"}</button>{state === "error" && <p className="form-error" role="alert">Não foi possível preparar o atendimento. Ligue para (11) 4787-3648.</p>}</form>}</main>;
}
