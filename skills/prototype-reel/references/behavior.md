# Behavior: make it act like the real product

The test: if an engineer built exactly what the prototype does, would it ship? If a reviewer clicks something that looks clickable, does something sensible happen?

## Build as live DOM
- Rebuild screens in HTML/CSS. Screenshot-and-hotspot prototypes drift: tap targets miss, toasts cover the wrong thing, and nothing can change state.
- Use images only for photos, logos, covers and media.
- The tap target is the real element. If the overflow menu is a button on a card, the button opens it, not an invisible rectangle.
- Every screen is its own layer with `isolation: isolate` so headers and tab bars don't bleed between screens during transitions.

## One build, two modes
- Desktop and mobile come from the same file, switched by a segmented control and a deep link (`?mode=desktop|mobile`).
- Desktop gets hover states, dropdown menus and keyboard focus. Mobile gets sheets, a status bar, a home indicator and 44px touch targets.
- Don't fake mobile by shrinking desktop. Lay it out for the width.

## Transitions (defaults)
- **Push (mobile):** 500ms, `cubic-bezier(.3,.7,.1,1)`. The previous screen slides back 30% and dims about 12%. Park off-screen screens at `calc(100% + 40px)` so their shadow never shows.
- **Modal (desktop):** rises from the bottom, 420ms, `cubic-bezier(.32,.72,0,1)`.
- **Sheet:** opens with ease-out expo in about 350ms, closes faster in about 250ms. Scrim 40%.
- Exits are faster than entrances.
- Transitions are interruptible. Closing a sheet that's still opening reverses it from where it is.
- Run at product speed here (see `motion-tokens.md`, Two speeds). Reel pacing belongs in the video, not the clickable prototype.
- Interactions people repeat often (typing, toggles, row hovers) get little or no motion.

## Loading
- Skeletons stand in for data only. Chrome, headers and labels render immediately.
- Shimmer while loading, then rows resolve top to bottom about 80ms apart with a settle curve (`cubic-bezier(.25,1,.5,1)`).
- Loading copy describes real work ("Finding your filing…"), never a bare spinner.

## Feedback and overlays
- **Toasts overlay everything.** They never push content. Mobile: top, under the nav bar. Desktop: bottom-left, about 400px wide. Close button plus auto-dismiss around 6s.
- Pressed states are visible: a tint plus a small scale (0.97–0.98) for 100–160ms.
- Hover tints on rows and links on desktop.

## States people forget
Build these before calling the flow done:
- Empty (first use, nothing yet)
- Error and retry
- Partial results
- Long content (long names, many items, wrapping)
- Back and cancel from every step
- Success, held long enough to read

## Keep it honest
- Data looks real but is clearly fictional. Never use real people's photos or real customer names.
- Profile photos match the person's name.
- If something is illustrative, label it.
