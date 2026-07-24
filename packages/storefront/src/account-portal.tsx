"use client";

export function AccountPortal() {
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
