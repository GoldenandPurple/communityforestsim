# Open questions

Everything still unresolved, split into real-world facts to pull, numbers to tune, and design
decisions still open. Nothing in this repo invents Golden's figures; this file is where they get
tracked until they are real.

## Real-world facts to verify or pull

These make the difference between "our forest" and "imagine a forest," and they protect the
facilitator's credibility as a councillor in a room where a sharp student or the teacher might
check.

- [ ] **The 4% AAC set-aside.** Wesley recalls roughly 4% of the local Allowable Annual Cut was
  once set aside for a Golden community forest. Verify: the figure, the source, when, and whether
  it still stands. This is currently the framing hook, so it should not be stated as fact in the
  room until confirmed.
- [ ] **The actual AAC and Timber Supply Area** Golden sits in, so "4% of the AAC" can be
  expressed as a real annual volume (cubic metres) and, roughly, a dollar figure. This feeds the
  starting Treasury and the harvest options.
- [ ] **Mount 7 specifics.** Land status and tenure of the relevant slopes, what actually grows
  there, the trail network, and whether any of it is realistically harvestable. Enough to make the
  scenario legible without overclaiming.
- [ ] **Selkirk Hill wildfire interface.** The real wildland-urban interface picture: any FireSmart
  or community wildfire protection plan context for Golden, fuel types, recent local fire history.
  Round 4 rests on this being credible, not lurid.
- [ ] **Comparable BC community forests** (for example, other Kootenay or interior community forest
  agreements) for realistic revenue, cost, and governance numbers to anchor the Treasury and the
  meter tuning. A real comparable forest's rough annual budget is the best source for a believable
  starting Treasury and fixed-cost bleed.
- [ ] **Round 3 terminology and framing.** Confirm the correct nations and terminology for the
  territory (Ktunaxa, Secwépemc, others) and frame co-management accurately and respectfully.
  Ideally ground it in a real BC example of Indigenous community forest partnership. Get this right
  before the round is run.

Suggested next step: a focused research pass on the above, then feed the results into the Treasury
starting value and the `[tune]` deltas in `SCENARIOS.md`.

## Numbers to tune (after the dashboard runs)

- [ ] Starting **Treasury** value and the per-round **fixed-cost bleed**. The bleed has to be big
  enough that "do nothing" is genuinely threatening, but not so big that one bad round is
  unrecoverable. Only a play-through tells you.
- [ ] All `[tune]` deltas in `SCENARIOS.md`. Target: no option is a free win, and at least one
  meter meaningfully suffers on every path.
- [ ] Starting position of the **Forest Health / Wildfire Risk** slider, and how much each option
  moves it, so Round 4 lands as a real reckoning rather than an obvious loss or an obvious escape.
- [ ] The carry-forward links (Round 1 sentiment into Round 3 options; Round 2 choice into Round 3
  and Round 4 exposure). Decide the exact rules when tuning. *v1 placeholders, all in
  `content/config.js`: taking the buyout weakens co-management and its Round 4 dividend; low
  Residents or Bikers trust makes co-management cost more (a public process); a Forestry bloc
  already below 30 gains nothing when the board declines; co-management pays funding and a
  cultural burning program into Round 4. The forest grows every round, so fuel builds on its own.*

## Design decisions still open

- [ ] **Round 2 framing:** salvage windfall, outside buyout, or offer both and let the board pick
  which to entertain. Buyout is sharper for the value-capture lesson; salvage is more visceral.
  *v1 default: buyout (15-year timber lease). The salvage text is in the round's chair note.*
- [ ] **Real numbers vs deliberately simplified numbers.** A real AAC volume is credible but may be
  clumsy to run votes against. Consider round, legible figures that are clearly *based on* the real
  ones, and say so. Decide the balance.
- [ ] **Insolvency behaviour:** does hitting zero Treasury stop the sim, or continue it as a
  post-mortem with the forest now owned by an outside company? The latter is arguably a better
  lesson. *v1 default: "The forest has been sold" screen, then Space continues as a post-mortem
  (or U undoes). The epilogue is always "Sold off and logged out".*
- [ ] **Whether to show the ballot count on screen** or keep votes as hands only. Showing a private
  ballot count next to the public show of hands is a nice touch but adds operator load.
  *v1: optional. V opens the entry form; if nothing is entered, nothing is shown.*
- [ ] **Second-class reuse.** If this gets run in more than one period, does anything need to change
  between runs, or is a reset enough? *v1: R R (or a page reload) resets everything.*

## Format assumptions to confirm with the teacher

- [ ] Confirmed: 50-minute period, one classroom, projector, whole class as one committee. The whole
  design assumes this. If it turns into an assembly or loses the projector, the mechanic needs a
  rethink (a marker-on-whiteboard fallback exists but is much flatter).
- [ ] Class size and room layout (can the room actually be split into three blocs?).
- [ ] Whether student phones are allowed for the private ballots, or paper only.
- [ ] Which grade(s), so the ADST strand emphasis can be aimed (6-7 vs 8 vs 9 have different
  standards, see `ADST-ALIGNMENT.md`).
