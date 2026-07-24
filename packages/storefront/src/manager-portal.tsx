"use client";

export function ManagerPortal() {
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
