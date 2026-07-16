# Lenterne Commerce

Reconstrução independente da operação atual no Wix. Este monorepo contém duas lojas, um painel administrativo e uma API compartilhada. Nenhum comando deste projeto altera `lenternebrindes.com.br`.

## Aplicações

- `apps/brindes` — brindes e personalizados (`localhost:3000`).
- `apps/ferragens` — ferragens e atacado (`localhost:3001`).
- `apps/admin` — administração central (`localhost:3002`).
- `apps/api` — catálogo, orçamentos e pedidos (`localhost:4100`).

## Primeira execução

1. Copie `.env.example` para `.env`.
2. Suba um PostgreSQL local e ajuste `DATABASE_URL`.
3. Execute `npm install`.
4. Execute `npm run db:generate` e `npm run db:migrate`.
5. Em terminais separados, execute os quatro scripts `dev:*`.

As lojas usam catálogo inicial versionado para poderem ser avaliadas sem banco. A API e o Prisma são a fonte de verdade na integração final.

## Segurança de lançamento

Domínios, pagamentos, e-mail e frete usam adaptadores configuráveis. Produção só deve ser ativada após homologação e inclusão das credenciais no provedor de deploy.
