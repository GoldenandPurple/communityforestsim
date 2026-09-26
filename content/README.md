# content/

`config.js` holds every number and every word the dashboard shows, kept apart from the render
logic so it can be tuned without touching the app. For each round it holds the title, the
prompt, the chair's note, and options A/B/C with their meter deltas, variants, and
carry-forward conditions. It also holds the starting Treasury, the per-round fixed-cost bleed,
forest growth, the fire tiers, the epilogues, the room vote question, and the debrief lines.
The comment at the top of the file explains the delta keys and the condition syntax.

**All figures are placeholders**, not real Golden numbers. They were tuned with
`node tools/simulate.mjs` so that:

- "protect everything" (A, B, then do nothing) goes broke;
- every ending is reachable (of the 81 paths: 24 sold, 3 burned, 16 thriving, 38 scarred);
- no path leaves every stakeholder group happy;
- a board that keeps the forest dense faces the interface-fire zone in Round 4.

After changing anything, run `node tools/simulate.mjs` and then `node tools/build.mjs`.
