# content/

Scenario and meter configuration lives here, separate from the dashboard render logic so it
can be tuned without touching the app (per `docs/DASHBOARD-SPEC.md`). It should express, per
round: the scenario title and prompt text, the options (A/B/C), and each option's meter
deltas, plus the starting Treasury, the per-round fixed-cost bleed, the starting slider
position, and the epilogue outcomes. Source the values from `docs/SCENARIOS.md` and
`docs/OPEN-QUESTIONS.md`. Nothing built yet.
