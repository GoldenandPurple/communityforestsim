# Thunderhead Mountain Community Forest

A governance simulation for a high school class. The class is selected as the corporate board of
the community forest above Cedar Bend, a fictional BC mountain town under Thunderhead Mountain. Over seven years (or four, in the short game that fits a 50-minute period), they have to keep the forest
solvent while balancing wildfire risk, three stakeholder groups with conflicting interests, and a
co-management proposal from the First Nations whose territory it is. No path wins on every
meter. That is the lesson.

## To run it in a classroom

1. Open **`dist/community-forest-dashboard.html`** in any browser (double-click it). It is one
   self-contained file: no internet, no install. Copy it to a USB stick if you like.
2. Put it on the projector, press **F** for fullscreen, and **?** to see the keys. On the title
   screen, **G** switches between the full game (7 years, about 75 minutes) and the short game
   (4 years, fits a 50-minute period).
3. Print **`dist/community-forest-printables.html`**: ballot slips and a card for each table
   of directors.

Chair's keys: **Space** next · **←** back · **A/B/C** apply the room's vote · **U** undo
(for re-votes) · **T** tick the Treasury down · **V** enter votes · **H** hide text ·
**P** public comments · **I** chair's notes · **L** light theme · **R R** reset for the next class. A presentation
clicker works for next and back.

## Where things live

| Path | What it is |
|------|------------|
| `docs/` | The design: start with `CONCEPT.md`, then `RUN-OF-SHOW.md` and `CLASSROOM-MECHANICS.md` |
| `content/config.js` | **Every number and every word on screen.** Edit this to tune the game |
| `app/dashboard.html`, `app/engine.js` | The dashboard source (opens directly from the repo too) |
| `app/printables.html` | Printable ballots and signs, generated from the config |
| `tools/simulate.mjs` | Plays every path through both game lengths and flags tuning problems |
| `tools/build.mjs` | Rebuilds the single-file classroom versions in `dist/` |

## Tuning the numbers

The setting is fictional, but the numbers in `content/config.js` are rounded classroom figures sized
like a real small BC community forest: 20,000 m³ a year (what Golden was allocated for a community
forest in 2006), with the money modelled on Nakusp's community forest of the same size. Sources and confidence levels are in
`reports/Golden community forest real numbers.md`; open questions are in `docs/OPEN-QUESTIONS.md`. After editing it:

```sh
node tools/simulate.mjs        # summary of endings, plus tuning warnings
node tools/simulate.mjs --all  # every path, round by round
node tools/build.mjs           # rebuild dist/ so the classroom file picks up your changes
```

You need [Node.js](https://nodejs.org) 18 or newer for the tools. You don't need it to run the dashboard.
