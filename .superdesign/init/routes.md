# Routes

Both `apps/brindes` and `apps/ferragens` use the Next.js App Router and expose:

- `/` → shared `HomePage`
- `/catalogo` → shared `CatalogPage`
- `/produto/[slug]` → shared `ProductPage`
- `/carrinho` → shared `CartPage`
- `/orcamento` → shared `QuotePage`
- `/sobre` → brand-specific entry using shared storefront styling
- `/gerente` → authenticated shared product manager for both channels
- `/privacidade` and `/trocas` → policy pages

Shared root layout: each app's `app/layout.tsx` → `packages/storefront/src/site-shell.tsx`.
