# Lenterne Commerce

Plataforma de comércio eletrônico para duas operações complementares: brindes personalizados e ferragens. O monorepo reúne vitrines especializadas, administração central e uma API compartilhada.

## Visão geral

A arquitetura foi desenhada para manter identidade, catálogo e jornada de compra próprios em cada loja, enquanto produtos, orçamentos, pedidos e regras operacionais permanecem centralizados.

## Aplicações

| Aplicação | Responsabilidade | Desenvolvimento |
|---|---|---|
| `apps/brindes` | Loja de brindes e personalizados | `localhost:3000` |
| `apps/ferragens` | Loja de ferragens e atacado | `localhost:3001` |
| `apps/admin` | Gestão de catálogo, pedidos e operação | `localhost:3002` |
| `apps/api` | API compartilhada | `localhost:4100` |

## Destaques técnicos

- Monorepo com responsabilidades separadas por aplicação
- Catálogo inicial versionado para avaliação sem dependência do banco
- PostgreSQL e Prisma como camada persistente
- Adaptadores para pagamentos, frete e comunicação
- Estrutura preparada para produtos personalizados e solicitações de orçamento
- Configuração de ambiente independente de credenciais versionadas

## Execução local

1. Crie um arquivo `.env` a partir de `.env.example`.
2. Configure uma instância local do PostgreSQL em `DATABASE_URL`.
3. Instale as dependências:

```bash
npm install
```

4. Prepare o banco:

```bash
npm run db:generate
npm run db:migrate
```

5. Execute as aplicações necessárias usando os scripts `dev:*` disponíveis em `package.json`.

## Estrutura de produção

Domínios, pagamentos, e-mail e frete são conectados por adaptadores configuráveis. Segredos e credenciais devem permanecer no provedor de infraestrutura, fora do repositório.

## Autor

Felipe Fernandes Prates

- [Portfólio](https://www.portfolio.felpamusic.com.br)
- [GitHub](https://github.com/felpacontato)
