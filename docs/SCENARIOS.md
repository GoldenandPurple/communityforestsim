# Scenarios

The short game plays the four core rounds below. The full game (7 years) adds three rounds,
described in [Full game rounds](#full-game-rounds): The Trail Network (after The Windfall),
Where the Profit Goes and The Mill or the Carbon (after The Partnership). The live values for
everything here are in `content/config.js`.

The four core rounds. Round 1 is fully built as the reference pattern. Rounds 2 to 4 give the
dilemma, the options, and the *direction* each option pushes the meters. Exact numeric
deltas are marked `[tune]` because they can only be set properly once the dashboard runs
and a full play-through has been watched. See `OPEN-QUESTIONS.md`.

## Meter legend

- **Treasury** ($): the board's cash. Bleeds each round from fixed costs before any
  decision is applied.
- **Bikers / Tourism** (sentiment bar)
- **Selkirk Hill Residents** (sentiment bar)
- **Forestry Sector** (sentiment bar)
- **Forest Health / Wildfire Risk** (one coupled slider: high forest health means high
  fuel load means high fire risk)

Notation below: `+` improves the meter, `-` worsens it, `++`/`--` is a large move. For the
coupled slider, "toward lush" means denser forest and higher fire risk; "toward thinned"
means lower fire risk and a more scarred, harvested look.

---

## Round 1: The First Harvest

**Setup read to the room.** You have just taken over the forest. It needs to fund itself
this year. The lower stand, right above Selkirk Hill and beside a trail you have all
ridden, is ready. How hard do you cut?

**Fixed-cost tick before the vote:** Treasury `-[tune]` (staff, insurance, roads, paid
whether or not you act).

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Leave it standing** | 0 | + | mixed | - | toward lush (fire risk up) |
| **B. Selective thin** (the boring, responsible option) | + | neutral | + | neutral | slightly toward thinned |
| **C. Full harvest of the lower stand** | ++ | -- | mixed | ++ | hard toward thinned (fire risk down, but a scar visible from town) |

**Note on Residents being "mixed":** this is deliberate and it is the knot. The Selkirk
Hill homeowners want it cut so they do not burn, *and* want it left so they keep their
view and property value. Same people, two incompatible demands. Surface this after the
first vote, then make them vote again.

**Carry-forward consequence:** whatever they did to any sentiment bar in Round 1 changes
what is available to them in Round 3. Burn trust early and options narrow later. Do not
tell them this in advance. That is the intergenerational lesson in miniature: decisions
made by people who could not see the whole board.

---

## Round 2: The Windfall

**Dilemma.** Pick one framing (or offer both and let the board choose which offer to
entertain):

- **Salvage.** A beetle infestation or a winter blowdown has killed a big block of timber.
  Salvage-logging it now is a cash windfall, but it means roading into a sensitive area and
  taking more than a normal year.
- **Buyout.** An outside forestry company offers a lump sum for the timber rights for a
  term of years. Big money up front, but the value (and the decisions) leave the community.

**What it tests.** Whether they trade the long game for fast money, and "who captures the
value" when an outsider wants in. The buyout framing is the sharper one for the ADST
"flow of goods and services from producers to consumers" thread.

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Take the windfall / buyout** | ++ `[tune]` | - | neutral | ++ | toward thinned, but ecological cost `[tune]` |
| **B. Decline, stay the course** | -/0 | + | neutral | - | little change |
| **C. Partial / negotiated** | + | neutral | neutral | + | small move |

**Carry-forward:** a buyout accepted here should visibly constrain Round 3 (harder to
partner on land whose rights you have already leased out). Salvage accepted here should
raise the starting fire exposure going into Round 4 in the roaded area, or lower it if you
frame the deadwood as the fuel. Decide which when tuning.

---

## Round 3: The Partnership

**Dilemma.** The Ktunaxa and/or Secwépemc propose a co-management partnership over the
forest. This is the ethical center of the simulation. Handle it as a real governance
decision with real tradeoffs, not a box to tick.

Frame honestly: the land is and was their territory before Golden existed. Co-management
changes who decides, and can change the whole horizon the forest is managed on. It may cost
short-term flexibility or revenue; it may also be the most legitimate answer to "whose
forest is it?" and open access to different funding and relationships.

**What it tests.** This is literally the ADST "social entrepreneurship in First Nations
communities" content turned into a decision the students make rather than a fact they are
told. It reframes the word "community" that has been sitting unexamined in the room's name
for two rounds.

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider | Notes |
|--------|----------|----------------|-----------|----------|--------------------|-------|
| **A. Full co-management** | - short / + long `[tune]` | neutral | mixed | mixed | toward better long-term stewardship | changes the horizon of every later decision |
| **B. Advisory role only** | 0 | neutral | neutral | neutral | small | the "consultation without power" option, worth naming as such |
| **C. Decline** | 0 | neutral | mixed | + | neutral | has a legitimacy cost that no meter fully captures, raise this in debrief |

**Facilitator caution.** This must be handled with care and not as a plot twist. Get the
framing right (see `OPEN-QUESTIONS.md`, which flags checking terminology and, ideally, real
local context before running this round). The voiceless-seat group should be given explicit
standing to speak here.

---

## Round 4: Fire Season

**Dilemma.** It is a hot, dry summer. The board's accumulated Forest Health / Wildfire Risk
slider now sets their exposure. This round is less a free choice than a reckoning with the
earlier ones: the boards that preserved everything are sitting on the highest fuel load,
directly above the Selkirk Hill homes.

Give them a real-time-ish choice under pressure (an emergency thinning, a controlled burn, a
prevention spend) but let the *slider* they built determine how bad the starting position is.

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Emergency thin / fuel break now** | -- | - | ++ | + | toward thinned fast |
| **B. Controlled burn** | - | mixed | + | neutral | toward thinned, some risk |
| **C. Do nothing, hope** | 0 | + | -- if it burns | neutral | unchanged, high exposure |

**Outcome logic.** If the slider sits in the high-fire-risk zone entering this round, the
"do nothing" path should trigger a bad epilogue (a fire that reaches the interface). If they
spent earlier rounds thinning, they can afford to protect the view now. Either way, the meter
they built is what decides, not luck. That is the point: the past comes home.

---

## Epilogue: 50 years later

Read a short outcome off their **final** meter state, especially the Forest Health slider and
whether the Treasury survived. Two or three canned outcomes are enough (thriving community
asset / sold-off and logged out / scarred but standing). This is where the 80-year frame
lands: the trees cut this year were planted before they were born.

---

## Full game rounds

Played only in the full game (`fullGameOnly: true` in the config). Order: First Harvest,
Windfall, **Trail Network**, Partnership, **Where the Profit Goes**, **Mill or the Carbon**,
Fire Season.

### The Trail Network (after The Windfall)

Biking is booming; the club wants a new network on the upper mountain, and riders already park
all along Selkirk Hill. Tests pricing and revenue diversification (ADST: pricing a product,
the decision to seek profit or break even; optional 4 Ps).

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Charge for access** (parking, trail pass) | + | - | + (small) | 0 | 0 |
| **B. Build it with the club** | + (small) | ++ | - | - | slightly toward lush (stands leave the timber base) |
| **C. Keep it a working forest** | + (small) | - | 0 | + | slightly toward thinned |

**Carry-forward:** if the buyout was taken, B means buying part of the lease back (costs money).
B also makes the mill contract in Year 6 hurt the Bikers more (the contract needs the trail-side
stands).

### Where the Profit Goes (after The Partnership)

A good timber year (automatic income and some harvest at the start of the round) leaves a
surplus. The school, trail society and fire department all want it. Social enterprise in one
question: who is the profit for?

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Community dividend** (grants to local groups) | - | + | + | + (small) | 0 |
| **B. Rainy-day reserve** | - now, ++ back at the start of Fire Season | - (small) | - (small) | 0 | 0 |
| **C. Hire a FireSmart crew** | - | 0 | + | + (small) | toward thinned |

### The Mill or the Carbon (before Fire Season)

The sawmill will close without a ten-year log contract; a carbon-offset buyer offers the same
money to leave the trees standing. Same money, opposite forests.

| Option | Treasury | Bikers/Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Guarantee the mill's supply** | ++ | - (small) | 0 | ++ | toward thinned |
| **B. Sell carbon credits** | ++ | + (small) | - (small) | -- | toward lush (fire risk up) |
| **C. Neither** | 0 | 0 | 0 | - | 0 |

**Carry-forward:** carbon credits make Fire Season thinning expensive: emergency thinning or a
controlled burn breaks the contract and costs a repayment. If the buyout was taken, the mill
contract pays less (the leased block feeds the outside company's own mill).
