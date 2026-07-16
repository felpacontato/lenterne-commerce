# Arquitetura

## Decisão

Monorepo TypeScript, duas aplicações Next.js independentes, painel Next.js e API Fastify. PostgreSQL/Prisma centraliza catálogo, canais, clientes, pedidos e orçamentos.

## Limites

- Storefronts nunca acessam o banco diretamente em produção; consomem a API.
- Dados iniciais locais permitem revisão visual antes das credenciais.
- Pagamento, frete, fiscal e e-mail são adaptadores, nunca chamadas espalhadas pela interface.
- Cada registro de produto possui `channel`: `GIFTS`, `HARDWARE` ou `BOTH`.
- Produtos personalizados usam orçamento e arte; produtos padronizados podem seguir checkout direto.

## Domínios

O host é configuração de deploy. Nenhum domínio atual aparece como destino de escrita. A publicação final usará variáveis de ambiente, redirects 301 e janela de rollback.

