# Page dependency trees

## `/` Home — both storefronts

- `apps/{channel}/app/page.tsx`
  - `packages/storefront/src/home.tsx`
    - `packages/storefront/src/brand.ts`
    - `packages/storefront/src/motion-backdrop.tsx`
    - `packages/catalog/src/index.ts`
    - `packages/ui/src/index.tsx`
  - `apps/{channel}/app/layout.tsx`
    - `packages/storefront/src/site-shell.tsx`
    - `packages/storefront/src/neural-noise.tsx`
    - `packages/storefront/src/cart.tsx`
  - `packages/storefront/src/styles.css`
  - `packages/ui/src/base.css`
  - `packages/ui/src/tokens.css`

## `/sobre` — both storefronts

- `apps/{channel}/app/sobre/page.tsx`
  - `packages/storefront/src/about-page.tsx`
  - same shared layout and styling dependencies as Home.
