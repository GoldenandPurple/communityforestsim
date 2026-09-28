# Dashboard build spec

The live projected web app. This is the centerpiece and the thing that makes the gamified
version worth doing over a plain talk. Build it against this spec.

## Non-negotiables

- **Single self-contained file, runs offline.** One HTML file, all CSS and JS inline, no build
  step, no CDN, no network calls. It must run from a double-click in a browser on the
  facilitator's own laptop with no classroom internet. Fonts must degrade to system fonts if a
  web font is not available.
- **Projector-legible from the back of a classroom.** Very large type, high contrast, thick
  meter bars. Assume a dim, washed-out projector and a student in the back row. Test at the
  back before relying on it.
- **Facilitator-operable by single key presses from the front.** No mouse-hunting mid-argument.
  Every core action is one key. Fiddling breaks the spell.
- **Config-driven.** All numbers, scenario text, meter labels, and deltas live in a separate
  config object or file (`content/`), not hardcoded in the render logic, so they can be tuned
  without touching the app. See `SCENARIOS.md` for what the config must express.

## The four meters

1. **Treasury** ($). A number and a bar. Starts at a configured value. Has a per-round fixed-cost
   deduction applied at the start of each round (the bleed). Reaching zero triggers the insolvency
   end state.
2. **Recreation & Tourism** sentiment. A 0 to 100 bar.
3. **Hillside Residents** sentiment. A 0 to 100 bar.
4. **Forestry Sector** sentiment. A 0 to 100 bar.
5. **Forest Health / Wildfire Risk.** A single slider with two labeled ends: one end "lush /
   high fuel load / high fire risk," the other "thinned / scarred / low fire risk." One control,
   two meanings. Make the coupling visually obvious (for example, a gradient from green to
   orange), because the coupling is the lesson.

Each meter should **animate** when it changes, so the room watches the bar move. The animation is
part of the theatre. Do not make it instant.

## Controls (keyboard)

Suggested bindings, adjust to taste but keep them single-key:

- Advance to next round / next scenario screen.
- Apply a named option's deltas to the meters (the config defines options A/B/C per round; the
  facilitator presses the key for whichever the room voted for, and the meters animate).
- Tick the treasury down manually (the fixed-cost bleed), so the chair can lean on it during
  debate.
- Enter/adjust a vote tally to display (optional, if showing the ballot count on screen).
- Reset the whole simulation to the start (for running it a second class).

Show the current key map somewhere discreet on screen, or in a facilitator-only overlay toggled
by a key, so you are never guessing mid-session.

## Screens / states

- **Title / cold open screen.** Minimal. The "who owns Thunderhead Mountain?" question or just the forest name
  and the four dormant meters. Nothing that pre-empts the cold open.
- **Round screen.** Shows the four meters prominently and the current scenario title. The scenario
  prompt text can be on screen or read aloud (config should carry the text either way).
- **Apply / reaction.** After a vote, applying the option animates the meters. This is the money
  moment, give it room.
- **Insolvency end state.** If treasury hits zero at any point, a clear "the Province has taken the forest back"
  screen. The simulation can continue as a post-mortem or stop, facilitator's call.
- **Epilogue screen.** Reads the final meter state into one of a few canned "50 years later"
  outcomes (see `SCENARIOS.md`).
- **Vote-comparison.** A way to show the opening vote beside the closing vote, so the room sees it
  moved. This can be as simple as two stored numbers the chair enters.

## Theming and legibility

- Support a dark background by default (projectors handle dark scenes better in a lit room, and it
  reads as "control room"). Ensure it still works if the room is bright.
- Define colors as CSS variables so the palette is easy to change.
- No reliance on color alone to convey a meter's state (a student who is colorblind, or a bad
  projector, should still read it from the bar length and the number).

## Explicitly out of scope for v1

- No persistence across sessions, no accounts, no backend, no multiplayer. State lives in memory
  and resets on reload. That is fine and correct for a single classroom run.
- No student devices connecting to it. Voting happens in the room (ballots and hands); the chair
  enters results. Keep it a single-operator instrument.
