---
name: prototype-reel
description: Build coded prototypes that behave like the real product, share them for feedback, then turn them into polished walkthrough videos for case studies, decks and sites. Use when asked to prototype a flow, make a clickable demo, or make a product walkthrough or reel from a design.
---

# Prototype reel

Prototype it like it's real, then tell the story with video.

A static mock shows what a screen looks like. It can't show how the product feels: what loads first, where your thumb lands, what happens when it fails. This skill builds prototypes that behave like the thing being built, puts them in front of people for feedback, and then drives the same prototype frame by frame to render a walkthrough video. There's no screen recording, so a change to the design means a re-render, not a re-shoot.

The rules here came from real review rounds. Each one started as a note from a reviewer and became a default so the note never had to be given twice.

## When to use it (and when not to)

- **Prototype** when the idea depends on behavior: timing, loading, transitions, gestures, edge cases, or a multi-step flow. Also when reviewers keep reacting to pictures instead of the experience.
- **Make a video** when the audience can't click: a looping slide, a site tile, an async update, a case study. Video is how the prototype gets shared at scale.
- **Skip it** for layout or visual questions a static frame answers, and for very early ideas where a wireframe is cheaper. Prototype once the direction is chosen.

## Workflow

Do these in order. Don't skip ahead to rendering.

1. **Load context.** Get the real designs (design file, screenshots, design tokens), the flow and the goal. Ask what the audience should understand after watching or clicking. Read `references/fidelity.md`.
2. **List states and behaviors first.** Before code, write every screen, state and transition: loading, empty, error, success, back, the toast, the edge case. One line each. Confirm the list with the person.
3. **Build live HTML.** Start from `kit/shell.html`. Rebuild screens as real DOM with real tap targets, never screenshots with hotspots. Read `references/behavior.md`.
4. **Click through it yourself.** Run every path in both desktop and mobile with a headless browser. Screenshot each state. Zero console errors. Fix before sharing.
5. **Share for feedback.** Publish a link with captions and tap hints on (`references/sharing.md`). Log every note in `references/feedback-log.md` format: the note, the rule it becomes.
6. **Write the shot list.** One line per beat: `time | on screen | action | shot | story point`. Name each beat as a shot (establishing, insert, cut on action, match cut, payoff; see `references/pacing.md`, Film grammar). One idea per beat. Get an OK before building the video.
7. **Preview, then render.** Drive the prototype on a paused clock and capture frames. Send a low-res preview first (15fps, half size). Render full quality only after the timing is approved. Read `references/pacing.md` and `references/motion-tokens.md`.
8. **QA, then deliver.** Run every check in `references/qa.md` and say what you checked in the delivery message. A fix changes only what was flagged.

## Non-negotiables

- Live DOM, not images with hotspots. Images only for photos, logos and media.
- Text uses the design's tokens (family, size, line height, tracking), never hand-set values. Confirm the fonts are installed where you render.
- Toasts and overlays sit above content. They never push the page around.
- One easing family per piece. Ease-out for entrances, never ease-in on UI, never scale from 0. No bounce on UI, except the payoff moment (see `motion-tokens.md`, Play is for the payoff).
- Hold after landing on a new screen before anything moves: about 0.9s for a light screen, 1.4s by default, about 2.4s for text-heavy screens.
- Frame the tap with its context: push in on the row or group, not the button alone.
- Film language never overrides how the UI behaves. Every element animates on its own layer.
- Tap marker on taps only. No finger on scrolls.
- Slide loops stay at 20s or less unless the story needs more and the person agrees. Explainer clips loop only the moment they teach.
- Low-res preview before any full render.
- No delivery without the QA pass.
- When a reviewer gives a note, turn it into a rule and write it down.

## Files

- `references/behavior.md`: making the prototype behave like the real product
- `references/fidelity.md`: matching the source design exactly
- `references/sharing.md`: setting it up for feedback
- `references/pacing.md`: presentation pacing for walkthrough videos
- `references/motion-tokens.md`: easing, durations and motion patterns
- `references/qa.md`: the checks every delivery passes
- `references/feedback-log.md`: how notes become rules, with real examples
- `kit/shell.html`: neutral prototype shell (toolbar, desktop/mobile, device frame, captions, tap hints)
- `kit/proto.css`, `kit/proto.js`: transitions, sheets, toasts, skeletons, cursor
