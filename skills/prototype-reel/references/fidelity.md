# Fidelity: match the source design

Reviewers notice a heading that changes font between two states before they notice anything else. Small drift makes the whole thing feel fake.

## Use the design's tokens
- Pull color, radius, spacing and type values from the design system or design file. Put them in `:root` as CSS variables. Never hard-code a one-off value.
- Set every text element from its text style: family, weight, size, line height and tracking. Read them from the design file rather than eyeballing.
- Font stacks start with the real family, then fallbacks: `--f: "Inter", system-ui, sans-serif`. Putting `-apple-system` or `system-ui` first resolves to different fonts on different machines and in headless renders.

## Make sure fonts actually load
- Before any render, confirm the font is installed where the browser runs (`fc-list | grep "<Family>"`). A missing font silently falls back to a lookalike and everything looks slightly off.
- Self-host web fonts in the prototype folder instead of relying on a CDN during renders.

## Hierarchy with shadows, not lines
- Separate sticky headers and bottom bars from content with soft shadows instead of gray divider lines. Defaults: header `0 1px 0 rgba(0,0,0,.08)`; bottom bar 1px top stroke at 8% plus `0 -2px 4px rgba(0,0,0,.08)`.

## Keep the design file and the code in sync
- When the design changes, update the prototype. When the prototype reveals a problem, fix the design too.
- Export real assets at 2x (photos, logos, illustrations). Rebuild only what needs to move or change state.
- Wherever an exported image and live HTML show the same thing across a state change, crop both at 2x and compare. Glyph width and position must match.

## Small things that read as wrong
- Corner radius that doesn't nest (inner radius = outer radius minus the inset).
- A filled child squaring off its rounded parent's corner (clip the parent).
- Buttons whose label sits a pixel or two high. Compare against the design at 3x and adjust padding.
- Icons off-center in their containers.
