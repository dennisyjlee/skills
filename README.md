# Skills

Claude skills I use in my design work. Each one started as notes from real reviews and became a set of rules.

## prototype-reel

Build coded prototypes that behave like the real product, then turn them into walkthrough reels. The reel is rendered from the prototype frame by frame, so a design change is a re-render, not a re-shoot.

It covers:
- **Behavior and fidelity:** live HTML, real tap targets, loading and empty states, type from the design's tokens.
- **Shooting the reel like a film:** establishing shot, insert, cut on action, match cut and payoff. Holds scale with what's on screen.
- **Motion values:** one easing family, presses, sheets, staggers, and a little play saved for the payoff.
- **QA before every delivery:** frame checks, flicker and stall scans, a layer audit and a corner and type audit.
- **A neutral starter kit:** device frame, desktop and mobile, captions, tap hints, push, sheet, toast and skeleton.

The write-up with live examples: [dennisleedesign.com/prototype-reel](https://dennisleedesign.com/prototype-reel)

## Install

```
npx skills add dennisyjlee/skills
```

Or copy `skills/prototype-reel` into your skills folder.

## Layout

```
skills/
  prototype-reel/
    SKILL.md          the workflow and the rules that always apply
    references/       behavior, fidelity, sharing, pacing, motion tokens, QA, feedback log
    kit/              shell.html, proto.css, proto.js
```

Render scripts are coming in a later version.

## License

MIT
