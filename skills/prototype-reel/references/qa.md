# QA: before every delivery

Nothing goes out until it passes. Say what you checked in the delivery message.

## Prototype
- [ ] Every path clicked through in desktop and mobile with a headless browser. Screenshot of each state.
- [ ] Zero console errors.
- [ ] Tap targets line up with what they look like.
- [ ] Toasts and sheets overlay. Nothing shifts underneath.
- [ ] No layer bleeding between screens mid-transition.
- [ ] Skeletons only where data loads.
- [ ] Captions don't cover the UI.
- [ ] Fonts installed and rendering (no fallback lookalike).

## Video
1. **Automated scan.** Per frame and per half of the frame: sudden dark areas, one-frame flicker or blink, and dead frames where everything stops between two moves.
2. **Contact sheet.** One frame per second with timestamps, plus full-res stills at every transition, every overlay open and close, and the first and last frames.
   `ffmpeg -i out.mp4 -vf "fps=1,scale=400:-1,tile=6x6" -frames:v 1 sheet.png`
3. **Layout stability.** When the camera is still, static chrome (header, toolbar, column headers) is pixel-identical across state swaps.
4. **Type match.** Where an image export and live HTML show the same text across a state change, crop both at 2x and compare.
5. **UI detail audit.** Zoom 4x into every corner of cards, tables and modals. Check for squared-off corners, inconsistent radius between siblings, doubled borders, clipped text, off-center icons.
6. **Cursor and marker** are on top in every frame where they overlap an overlay.
7. **Layer audit.** List every layer's z-order (content < scrim < glow < sheet < lifted element < marker). Each element animates on the layer it lives on. Nothing crosses over unrelated content to reach a container that isn't on screen yet. When an element lifts off a container (container transform), the container holds still until the lift is mostly done.
8. **Easing audit.** One family. Press = down 0.1s, back 0.2s (never a one-frame jump). Entrances ease out. On-screen moves ease in-out. Exits are faster than entrances.
7. **Specs.** fps, size and duration match the previous final (`ffprobe`). Never guess render settings from memory.

## Common bugs and their fixes
- **One-frame blink:** re-entering a state that's already showing resets its opacity. Don't re-trigger the current state.
- **Stall between moves:** two moves easing to zero at the same instant. Overlap them by 0.1–0.2s.
- **Cursor hidden behind a modal:** give cursor and ripple a fixed z-index above anything the timeline raises.
- **Heading changes font mid-video:** the font stack resolved differently. See `fidelity.md`.
