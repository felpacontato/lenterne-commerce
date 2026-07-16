# Shared layouts

- `apps/brindes/app/layout.tsx`: Next.js root layout using `SiteShell` with `giftsBrand`.
- `apps/ferragens/app/layout.tsx`: Next.js root layout using `SiteShell` with `hardwareBrand`.
- `packages/storefront/src/site-shell.tsx`: renders skip link, shared header, navigation, ambient neural-noise layer, page content, shared footer and cart provider.

Both storefronts intentionally share the same layout component and differ through `BrandConfig`.
