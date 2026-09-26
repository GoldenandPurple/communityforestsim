# app/

The live dashboard, built to `docs/DASHBOARD-SPEC.md`.

- `dashboard.html`: layout, styles, rendering, and keyboard controls. Opens directly from the
  repo (it loads `../content/config.js` and `engine.js` from beside it).
- `engine.js`: the rules as pure functions with no DOM: round start (bleed, growth,
  carry-forwards), applying an option, the fire outcome, the epilogue. `tools/simulate.mjs`
  uses the same file, so what the simulator reports is exactly what the dashboard does.
- `printables.html`: ballot slips, bloc signs, and the voiceless seat card.

`node tools/build.mjs` inlines the scripts to produce the single-file versions in `dist/`,
which are the ones to take into a classroom.

State lives in memory only. Reloading the page resets the simulation (as does **R R**).
