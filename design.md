# Design — Lenterne Commerce

Sistema visual bloqueado para as duas plataformas. Todas as páginas devem ler este arquivo antes de introduzir novos padrões.

## Genre

Modern-minimal escuro com duas vozes coordenadas: editorial/fotográfica para Brindes e técnica/catalogal para Ferragens. Preto industrial como base, produto luminoso e vermelho institucional como acento.

## Macrostructure family

- Brindes: Photographic Catalogue; imagens amplas, recortes assimétricos e narrativa por ocasião.
- Ferragens: Technical Catalogue / Workbench; densidade legível, filtros e especificações.
- Admin: Workbench funcional, sem hero ou enriquecimento decorativo.
- Conteúdo: Long Document, tipografia e fotografia próprias.

## Theme

- `--color-paper`: oklch(13% 0.012 35)
- `--color-paper-2`: oklch(17% 0.015 35)
- `--color-ink`: oklch(96% 0.009 75)
- `--color-ink-2`: oklch(76% 0.012 70)
- `--color-rule`: oklch(31% 0.018 40)
- `--color-accent`: oklch(55% 0.19 28)
- `--color-accent-ink`: oklch(98% 0.006 85)
- `--color-focus`: oklch(78% 0.14 80)
- `--color-industrial`: oklch(10% 0.012 240)

Os valores são uma aproximação inicial da identidade observada. Devem ser recalibrados com os arquivos oficiais do logo antes da produção.

## Typography

- Display: Manrope, peso 700.
- Body: Inter, pesos 400–600.
- Mono/técnica: IBM Plex Mono, peso 500.
- Display tracking: -0.045em.
- Escala responsiva fluida, com títulos longos limitados para leitura móvel.

## Spacing

Escala nominal de 4 pontos em `tokens.css`. Nenhuma página deve improvisar espaçamento estrutural fora dos tokens.

## Motion

- Entrada: opacidade e deslocamento curto somente no primeiro viewport.
- Produto: zoom de imagem e deslocamento de seta em hover.
- Carrinho/drawer: transição curta de opacidade e transform.
- Reduced motion: opacidade, máximo de 150 ms.

## CTA voice

- Primário: sólido, cantos discretos, verbo específico da ação.
- Secundário: link sublinhado ou botão contornado.
- Brindes: “Personalizar” e “Pedir orçamento”.
- Ferragens: “Adicionar ao pedido” e “Comprar em quantidade”.

## What pages MUST share

Logo, cor de marca, pares tipográficos, estados de interação, grid, acessibilidade, rodapé institucional e linguagem comercial honesta.

## What pages MAY differ on

Composição, densidade, tratamento fotográfico, filtros e CTA principal de acordo com o canal.

## Exports

Os tokens canônicos estão em `tokens.css` e `packages/ui/src/tokens.css`.
