# Mount 7 Community Forest

A 50-minute governance simulation for a high school class. The class is the board of a
community forest above Golden, BC. Over four rounds (four years), they have to keep the forest
solvent while balancing wildfire risk, three stakeholder groups with conflicting interests, and a
co-management proposal from the First Nations whose territory it is. No path wins on every
meter. That is the lesson.

## To run it in a classroom

1. Open **`dist/mount7-dashboard.html`** in any browser (double-click it). It is one
   self-contained file: no internet, no install. Copy it to a USB stick if you like.
2. Put it on the projector, press **F** for fullscreen, and **?** to see the keys.
3. Print **`dist/mount7-printables.html`**: ballot slips, the three bloc signs, and the
   voiceless seat's card.

Chair's keys: **Space** next · **←** back · **A/B/C** apply the room's vote · **U** undo
(for re-votes) · **T** tick the Treasury down · **V** enter votes · **H** hide text ·
**I** chair's notes · **L** light theme · **R R** reset for the next class. A presentation
clicker works for next and back.

## Where things live

| Path | What it is |
|------|------------|
| `docs/` | The design: start with `CONCEPT.md`, then `RUN-OF-SHOW.md` and `CLASSROOM-MECHANICS.md` |
| `content/config.js` | **Every number and every word on screen.** Edit this to tune the game |
| `app/dashboard.html`, `app/engine.js` | The dashboard source (opens directly from the repo too) |
| `app/printables.html` | Printable ballots and signs, generated from the config |
| `tools/simulate.mjs` | Plays all 81 paths and flags tuning problems |
| `tools/build.mjs` | Rebuilds the single-file classroom versions in `dist/` |

## Tuning the numbers

Every number in `content/config.js` is a placeholder chosen so the game plays well. None of them
are real Golden figures yet (see `docs/OPEN-QUESTIONS.md`). After editing it:

```sh
node tools/simulate.mjs        # summary of endings, plus tuning warnings
node tools/simulate.mjs --all  # every path, round by round
node tools/build.mjs           # rebuild dist/ so the classroom file picks up your changes
```

You need [Node.js](https://nodejs.org) 18 or newer for the tools. You don't need it to run the dashboard.
