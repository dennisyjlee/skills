# Feedback log: notes become rules

Every review note gets logged. If it would apply to the next prototype too, it becomes a rule in this skill. That's how taste turns into something repeatable.

## Format
```
Note:   what the reviewer said, in their words
Change: what was fixed this time
Rule:   the default from now on (and which reference file holds it)
```

## Examples from real rounds

**Note:** "Re-recording the walkthrough every time the design changes is painful."
**Change:** Rebuilt the flow as a coded prototype and rendered video from it.
**Rule:** The prototype is the video source. No screen recording. (`pacing.md`)

**Note:** "The swipes feel too realistic and slow. It looks like a live demo."
**Change:** Replaced multi-flick swipes and the finger-on-scroll with one eased glide per section.
**Rule:** One glide per section. Tap marker on taps only. (`pacing.md`)

**Note:** "It moves the second the page appears. Feels robotic."
**Change:** Tested 0.6s, 1.4s and 1.8s holds after landing.
**Rule:** Hold 1.4s after landing on a new screen. (`pacing.md`)

**Note:** "The cursor drifts backward a little before it moves."
**Change:** Removed the drift caused by the camera zoom easing against the cursor path.
**Rule:** Cursor movement eases forward only. (`pacing.md`)

**Note:** "The heading font changes between these two states."
**Change:** The font stack started with a system alias that resolved differently in the render. Put the real family first and set text from the style's values.
**Rule:** Text from tokens, real family first, compare crops across state changes. (`fidelity.md`, `qa.md`)

**Note:** "The table's top corners look square." (caught after delivery)
**Change:** Clipped the card so its toolbar follows the radius.
**Rule:** Corner audit at 4x before every export. (`qa.md`)

**Note:** "The form fields jump when the preview updates."
**Change:** Fields stay in place and only their contents change. Only the preview updates visibly.
**Rule:** Static chrome is pixel-identical across state swaps. (`qa.md`)

**Note:** "Too much zooming in and out."
**Change:** Kept only the zoom on the small form edit.
**Rule:** Zoom only where it helps a transition. (`pacing.md`)

**Note:** "The zoom loses the text it belongs to."
**Change:** Framed the whole row instead of the button, at a lower zoom, with lead room below.
**Rule:** Frame the tap with its context. (`pacing.md`)

**Note:** "The chip falling down looks like a bug. Check layer matching and z order."
**Change:** Removed the flying avatar. The tray rises with the release and its chip loads in on the tray's own layer.
**Rule:** Film language never overrides UI behavior. Layer and easing audit before every delivery. (`pacing.md`, `qa.md`)

**Note:** "Can the plus filling into a check be more creative? Can the confirmation be more playful?"
**Change:** Added a rotate-and-fill "+" with a drawn check, a row flash, an icon-first chip, and a celebratory sequence on the confirmation card (settle, avatar pop, ring, badge, particles).
**Rule:** Play is for the payoff. Bounce only on celebratory moments; everything on the way there stays crisp. (`motion-tokens.md`)

**Note:** "The title padding looks off."
**Change:** Aligned the title and card to the same 20px edge; 16px under the status bar, 20px to the card.
**Rule:** Measure alignment and spacing in the source before rendering; edges line up with something. (`fidelity.md`)

**Note:** "The captions read like ad copy."
**Change:** Rewrote as short, complete, plain sentences.
**Rule:** One plain sentence per beat. No comma-joined taglines. (`pacing.md`)

**Note:** "The zoom feels too fast. It's less polished."
**Change:** Gave the camera its own curves. The push-in went from 450ms on the UI ease-out to 900ms on a soft-start curve, and it settles before the tap. The pull-back runs 550ms on a quicker-start curve so it doesn't lag the release. The pad before the push was cut, since the soft start already reads as hold.
**Rule:** The camera is heavier than the UI. It eases in and settles. (`motion-tokens.md`)
