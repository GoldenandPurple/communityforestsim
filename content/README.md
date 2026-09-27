# content/

`config.js` holds every number and every word the dashboard shows, kept apart from the render
logic so it can be tuned without touching the app. For each round it holds the title, the
prompt, the chair's note, whether it is played only in the full game (`fullGameOnly`), and options A/B/C with their meter deltas, variants, and
carry-forward conditions. It also holds the starting Treasury, the per-round fixed-cost bleed,
forest growth, the fire tiers, the epilogues, the room vote question, and the debrief lines.
The comment at the top of the file explains the delta keys and the condition syntax.

**The setting (Cedar Bend, Thunderhead Mountain) is fictional; the figures are rounded classroom
numbers sized like a real small BC community forest**: 20,000 m³/yr, what Golden was allocated in 2006, and the money is modelled on Nakusp's community forest
(see `reports/Golden community forest real numbers.md`). They were tuned with
`node tools/simulate.mjs` so that:

- "protect everything" goes broke in both game lengths;
- every ending is reachable in both game lengths. Full game, 2,187 paths: 30% sold, 8% burned,
  9% thriving, 53% scarred. Short game, 81 paths: 30% sold, 4% burned, 20% thriving, 47% scarred;
- no path leaves every stakeholder group happy;
- a board that keeps the forest dense faces the interface-fire zone in Round 4.

After changing anything, run `node tools/simulate.mjs` and then `node tools/build.mjs`.
