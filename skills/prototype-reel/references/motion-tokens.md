# Motion tokens

Defaults. Deviate on purpose, not by accident.

## Two speeds: product and reel
The same prototype runs at two speeds. Know which one you're tuning.
- **Product speed** (the clickable prototype): what the shipped UI would do. Fast and quiet. Most UI motion under 300ms, ease-out, interruptible. Frequent interactions get little or no motion.
- **Reel speed** (the video): staged for a first-time viewer who can't click. Same curves, but holds, a moving camera and one focus at a time. Time goes to holds, not to slower moves.

Design systems split it the same way: Carbon calls them *productive* and *expressive* motion. Never ship reel timing into the product, and never render a reel at product timing.

## Easing (one family per piece)
| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances, sheets rising |
| `--ease-camera-in` | `cubic-bezier(0.45, 0, 0.2, 1)` | Push-in. Soft start, long settle |
| `--ease-camera-out` | `cubic-bezier(0.3, 0, 0.2, 1)` | Pull-back. Quicker off the tap so it doesn't lag the action |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Something leaving one spot and landing in another |
| `--ease-settle` | `cubic-bezier(0.25, 1, 0.5, 1)` | Lists resolving, items making way, drops |
| `--ease-glide` | `cubic-bezier(0.33, 0, 0.12, 1)` | Video scrolls |
| `--ease-push` | `cubic-bezier(0.3, 0.7, 0.1, 1)` | iOS-style push |

Never ease-in on UI. No bounce or overshoot on UI, with one exception below.

The camera is not UI. It should feel heavier than what it films, so it never uses the UI ease-out: that curve covers most of the move in the first 100ms and reads as a snap.

## Play is for the payoff
Consumer products earn a little play on celebratory moments: the confirmation, the success, the thing the whole flow was for. There, and only there:
- A soft settle past full size (2–3%), after the element is in place, never while it travels.
- Pops start at 0.5–0.8 scale with a gentle overshoot curve (`cubic-bezier(0.34, 1.45, 0.64, 1)`).
- A short sequence of small rewards: icon pops, a ring draws, a badge lands, a few particles fan out and fade. Each one starts 0.1–0.2s after the last.
- Micro-interactions on the way there stay crisp: a "+" turning into a check (rotate, circular fill, check draws), a soft row flash, icon first then the label slides out of it.
Everything else keeps the no-bounce rule.

## Duration
| Token | Value | Use |
|---|---|---|
| `--dur-press` | 100–160ms | Pressed state |
| `--dur-ui` | 200–500ms | UI moves, sheets, toasts |
| `--dur-scene` | 250–500ms | Transitions between scenes in a video |
| `--dur-hero` | 400–800ms | Marketing and cover moves |
| `--dur-camera` | 800–1000ms push-in, 500–600ms pull-back | Camera moves. The push settles at least 0.2s before the tap. Its soft start counts toward the hold, so don't pad before it |
| `--hold-read` | 1–1.5s | Anything people need to read |
| `--hold-land` | 1.4s | After landing on a new screen |

Exits run faster than entrances, about 30–50% shorter.
Duration grows with distance, not linearly: a 400px move takes about 1.6× a 100px move.

## Distance, scale, stagger
- Moves 16–40px. Never slide in from far away.
- Scale-ins start at 0.96–0.98 with opacity. Never scale from 0.
- Stagger 40–80ms.
- Blur up to 8px hides an imperfect crossfade.
- Text fade-up: opacity 0→1, translateY 12→0, blur 8→0 over about 600ms.

## Patterns that make motion feel polished
Studied frame by frame from product launch reels.
1. **The camera never fully stops.** A slow 1–2% push between beats keeps holds alive.
2. **Overlapping hand-offs.** The next element starts entering while the last is still leaving.
3. **Depth of field.** Enter from blur, low opacity and scale 0.96. Leave to blur.
4. **Container first, then the interior.** The card lands, then its rows load top to bottom.
5. **Press = filled tint plus a small scale.** The consequence starts on release, as one continuous move.
6. **Push in before the action, push in to end.** Frame what's about to be clicked. End on a hero detail.
7. **Match cut.** The clicked thing becomes the next thing.
8. **Glow behind new content.** A soft radial tint behind the result.
9. **One background and one easing family throughout.**

## Build rules for live motion
- Animate `transform` and `opacity` only. Moving layout properties (width, margin, top) drops frames.
- Interruptible: use transitions, not fixed keyframes, for anything a person can reverse (open then close a sheet mid-motion). It should change direction smoothly, never jump.
- Motion is never the only signal. A state change also changes text, color or an icon.

## Reduced motion
Live prototypes respect `prefers-reduced-motion`: crossfade instead of slide, no camera moves, no shimmer.
