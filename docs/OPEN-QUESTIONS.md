# Open questions

Everything still unresolved, split into real-world facts to pull, numbers to tune, and design
decisions still open.

**Setting decision (made):** the game is set in the fictional town of Cedar Bend under
Thunderhead Mountain (see `CONCEPT.md`). The real Golden facts below now matter in two places
only: the debrief reveal ("this is not made up") and sizing the numbers like a real small BC
community forest. Only the reveal is stated as fact in the room, so it is the part to confirm.

## Real-world facts to verify or pull

These make the difference between "our forest" and "imagine a forest," and they protect the
facilitator's credibility as a councillor in a room where a sharp student or the teacher might
check.

A research pass was done in September 2026: see `reports/Golden community forest real numbers.md`
(notes in `research_notes/`). **Caveat:** the research could only read search-result excerpts, not
the full pages, so each item below is marked "found" rather than checked off. Open the primary
documents listed at the end of the report before stating any of it as fact in the room.

- [ ] **The 4% AAC set-aside.** *Found:* in 2006 the minister allocated 20,000 m³/yr to a
  Golden-area community forest (about 4.1% of the Golden TSA's 485,000 m³ cut); in 2010 the
  Province reallocated it to BC Timber Sales before any licence was issued. Revived as the
  Kenpesq't Community Forest (Shuswap Band, Town of Golden, CSRD Area A; MOU 21 Nov 2022), no
  licence confirmed. *To confirm:* the goldenareacf.com / Golden Star wording and date.
- [ ] **The actual AAC and Timber Supply Area.** *Found:* Golden TSA, 485,000 m³/yr effective
  3 June 2010. A new determination was due around 2025 and was not found. *To confirm:* the
  current figure on the gov.bc.ca Golden TSA page. Dollar conversion is an estimate (about
  $13/m³ net, anchored to Nakusp's dividends), not a sourced figure.
- [ ] **Mount 7 specifics.** *Found:* mostly provincial Crown land with Town-owned and one private
  parcel low down; a woodlot licence, a timber sale licence and a small-scale permit are active;
  ICHmk1 zone, lodgepole pine with Douglas-fir and larch low down; Golden Cycling Club maintains
  180+ km of trail; wildfire fuel mulching on Mount 7 (11 ha, then a $271,500 Phase 2 grant, June
  2026). *To confirm:* the GCC Mount 7 Trail Plan (Nov 2023).
- [ ] **Selkirk Hill wildfire interface.** *Found:* Town and CSRD Area A Community Wildfire
  Resiliency Plans exist; 2024 Dogtooth fire (5,680 ha, at least 6 homes lost near Parson);
  2026 Sea Lion Mountain fire (1,144 ha, no structures). *Gap:* Selkirk Hill risk ratings and fuel
  types (the plans could not be opened).
- [ ] **Comparable BC community forests.** *Found:* Nakusp (NACFOR, 20,000 m³/yr, village-owned)
  paid its village $250k (2025) to $582k (2014) a year; grants of $50k–$77k/yr are typical
  (Nakusp, Kaslo, Valemount). The game's money is modelled on this. *Gap:* no line-item operating
  costs found, so the $90k fixed-cost bleed is the weakest number.
- [ ] **Round 3 terminology and framing.** *Found:* local bodies name the unceded territory of the
  Ktunaxa and Secwépemc peoples and the chosen home of the Métis; Round 3 now uses that wording and
  a generic First Nation government as the partner, with Kenpesq't in the chair's note.
  *To do:* have SD6 Indigenous Education review the round before it is run.

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
  Residents or Recreation trust makes co-management cost more (a public process); a Forestry bloc
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
