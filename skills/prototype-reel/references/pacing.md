# Pacing: walkthrough videos

These are presentation reels, not live demos. The viewer sees the product for the first time, on a loop, with no narration. Polished and tight beats realistic.

There are two ways to get it wrong:
- **Robotic:** no pause after landing, identical gaps, one stiff curve.
- **Too realistic:** multi-flick swipes with a finger and momentum, a finger on every scroll. Tested and rejected: it reads as a screen recording and adds seconds.

Aim between them.

## How the video is made
- Drive the prototype itself, not a recording. Pause the browser clock, advance it frame by frame, fire scroll and tap events on a timeline, and capture each frame. Composite with ffmpeg (device frame, background, captions).
- 30fps for UI walkthroughs. 1920×1080 by default. Covers and short loops can be 60fps.
- One background for the whole piece.

## Holds and pauses
- **Landing on a new screen: hold 1.4s** after the transition settles before anything moves. (0.6s felt robotic. 1.8s felt slow.)
- Pauses between beats 0.45–0.8s, slightly uneven. No two gaps in a row identical.
- A little longer on story content (a playing video about 1.8s, a card the viewer should read about 0.8s). Body copy doesn't get extra time.
- Text-heavy screens get about 1s more before the cursor moves.
- Holds scale with how much there is to read: about 0.9s for a light screen (a short list of names), 1.4s by default, about 2.4s for text-heavy screens. Cut a reel by trimming holds and the ending, never by speeding up moves.
- Explainer clips loop only the moment they teach (1.5–3.5s), not the whole flow.
- First 3s establish where we are, with real UI on screen. No logo intro. End on a resolved state (success, toast) held about 2s.
- Captions stay up long enough to read twice. The story has to work with the sound off.

## Scrolling: one glide per section
- One eased scroll per section, not several flicks: `cubic-bezier(.33,0,.12,1)`, duration `clamp(0.85s, 0.75s + px/2000, 1.1s)`.
- Land the target in the upper third, not flush with the header.
- The page fully settles before the next tap.

## Taps and the cursor
- **Mobile tap marker:** only on taps. 44px circle, about 16% black fill, 2px white ring, soft shadow. Appears about 0.4s before contact, press scale 0.84, the element shows its pressed state, then the marker fades. Hidden when idle.
- **Desktop cursor:** the standard arrow at the window's scale with a soft shadow. No cartoon hand. Movement eases in and out with no backward drift before it moves.
- Cursor and ripple always render above every other layer.

## Camera
- Animate one parent container's scale and position, never each child.
- Zoom in only where it helps a transition (a small form edit, a detail that won't read at full size). No zoom for its own sake.
- Frame the tap with its context: center on the whole row or group the target belongs to (the name next to the button), not the button alone. If the label leaves the frame, the zoom is too tight.
- When zoomed, keep the window filling the frame. A partial zoom that shows the window edge looks like a mistake.
- A slow 1–2% push between beats keeps holds alive.

## Film grammar
Write the shot list in film terms. Each beat is a shot with a job.
- **Establishing shot:** land on the screen and hold before anything moves.
- **Insert:** push in on a small detail, framed with its context (the row, not just the button).
- **Lead room:** frame the subject a little off center, leaving space where the next thing will happen.
- **Cut on action:** start the transition during the press, so it feels invisible.
- **Eye-trace:** put the next important thing where the eye already is. Do it with real UI patterns (a sheet rising, a container transform). Film language never overrides UI behavior: an element only travels if the product would move it that way, the destination already exists, and it stays on its own layer.
- **Match cut:** the tapped thing becomes the next thing (the button grows into the result).
- **Reaction hold:** hold on the consequence before the loop.
- **Screen direction:** forward is right-to-left and up; back is left-to-right and down. Stay consistent.
- **Shot size = importance:** the thing that matters most ends up largest in frame.
- **Motivated movement:** the camera moves only when the story gives it a reason.

## Captions
- Burned in by default. One short, plain sentence per beat ("Each member sees their own reasons").
- No comma-joined taglines. They read as ad copy.

## Length
- Slide loops 12–16s, at most 20s. Spend time on holds and story moments, not on slower movement.
- Covers tell one idea at a glance. Once it lands, hold about 2s and loop. Cut beats that are only motion.
- End calm so the loop back to frame 1 isn't jarring. Add a 300ms fade if needed.

## One source, many cuts
Render each placement from the same prototype and timeline instead of reusing one cut everywhere.
- **Slide loop:** 12–20s, captions burned in, 1920×1080 full width or 2× the slot size.
- **Site tile:** one interaction end to end, cropped for the card's ratio, small file, poster frame.
- **Cover:** one idea, hold and loop, safe area for the card crop.
- **Async update:** the full flow, can run longer.

## Review loop
1. Shot list approved.
2. Low-res preview: 15fps, half size, about a third of the render time. Judge timing here.
3. Contact sheet plus stills at every transition.
4. Full-quality render only after the preview is approved.
5. When presenting, state before/after length and hold values.
