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
- **Recreation & Tourism** (sentiment bar)
- **Hillside Residents** (sentiment bar)
- **Forestry Sector** (sentiment bar)
- **Forest Health / Wildfire Risk** (one coupled slider: high forest health means high
  fuel load means high fire risk)

Notation below: `+` improves the meter, `-` worsens it, `++`/`--` is a large move. For the
coupled slider, "toward lush" means denser forest and higher fire risk; "toward thinned"
means lower fire risk and a more scarred, harvested look.

---

## Round 1: The First Harvest

**Setup read to the room.** You have just taken over the forest. It needs to fund itself
this year. The lower stand, right above the Hillside homes and beside the Ridgeline
trail, is ready. How hard do you cut?

**Fixed-cost tick before the vote:** Treasury `-[tune]` (staff, insurance, roads, paid
whether or not you act).

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Leave it standing** | 0 | + | mixed | - | toward lush (fire risk up) |
| **B. Selective thin** (the boring, responsible option) | + | neutral | + | neutral | slightly toward thinned |
| **C. Full harvest of the lower stand** | ++ | --- | mixed | ++ | hard toward thinned (fire risk down, but a scar visible from town) |
| **D. Harvest the upper stand instead** | + | - (small) | mixed | + | somewhat toward thinned, but not above the homes |

**Option D adds a dimension:** not just how much you cut, but where. It spares the view and the
Ridgeline trail, costs more to reach, and does little for the Hillside homes' fire risk. Its new
logging road carries forward: in the full game it makes building trails with the club cheaper.

**Note on Residents being "mixed":** this is deliberate and it is the knot. The Hillside homeowners want it cut so they do not burn, *and* want it left so they keep their
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

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------|-----------|----------|--------------------|
| **A. Take the windfall / buyout** | ++ `[tune]` | - | neutral | ++ | toward thinned, but ecological cost `[tune]` |
| **B. Decline, stay the course** | -/0 | + | neutral | - | little change |
| **C. Partial / negotiated** | + | neutral | neutral | + | small move |
| **D. Salvage the blowdown** (road into the Cedar Creek watershed) | ++ | - (small) | - (small), then -- later | + | toward thinned (dead fuel removed) |

**Buyout detail:** the Residents lose a little on the buyout: an outside operator above their
homes, and no local board to take their concerns to. The lease term is left vague.

**Salvage carry-forward:** the cost lands later and on someone else. At the start of The
Partnership, runoff down the new road fouls the town's drinking water (boil-water advisory,
repairs: Treasury down, Residents down hard). This can also tip Residents' trust low enough to
make co-management cost more.

**Carry-forward:** a buyout accepted here should visibly constrain Round 3 (harder to
partner on land whose rights you have already leased out). Salvage accepted here should
raise the starting fire exposure going into Round 4 in the roaded area, or lower it if you
frame the deadwood as the fuel. Decide which when tuning.

---

## Round 3: The Partnership

**Dilemma.** The First Nation whose territory includes Thunderhead Mountain (deliberately
unnamed; see `CONCEPT.md`) invites the board into an equal partnership: shared board seats,
shared decisions, and a plan written for the next hundred years. This is the ethical centre of
the simulation. Handle it as a real governance decision, not a box to tick.

**The framing is positive by design.** The partnership is presented as an invitation and an
opportunity, with concrete, business-relevant benefits: long-term stewardship knowledge,
cultural burning that lowers fire risk, funding that only partnerships qualify for, and more
certainty for the forest's plans. Its costs are short-term and practical: setting up joint
governance, and reopening harvest plans.

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------------|-----------|----------|--------------------|
| **A. Full partnership** (co-management) | - now, + later | 0 | 0 | - (small) | toward better long-term stewardship |
| **B. Advisory role only** | 0 now, - later (small) | 0 | 0 | 0 | small |
| **C. Decline** | 0 now, - later | 0 | 0 | + (small) | 0 |

**What happens later:**
- **Full partnership:** joint stewardship funding (full game), then new funding and a cultural
  burning program at the start of Fire Season. Halved if the board leased timber rights in The
  Windfall. The result text hints at this ("New doors open…") so the choice does not read as
  pure cost.
- **Advisory or decline:** every later year starts with a permitting cost, because
  consultation on each cutblock starts from scratch without a partnership. This is framed as
  lost certainty and slower process, **never as the Nation obstructing the board.**
- If the board burned community trust earlier (Residents below 40 or Recreation below 35), the
  partnership costs more: the board must rebuild trust through public engagement first. The
  cause is the board's own earlier conduct, not the partnership.
- `tuning.favouredOption` in the config makes the simulator warn if tuning ever stops the
  partnership being the strongest choice (fewest forests handed back to the Province, most thriving endings).

### Facilitator guidance (read before running this round)

This round runs in a sensitive moment. Since the 2025 BC Supreme Court decision in the Cowichan
Tribes Aboriginal title case, questions about title and private property have been prominent
and emotional in BC, and some students will have heard strong views at home.

- **Keep the scenario's facts in front.** The forest is Crown land that the Province licensed to
  the town. No homes, private land, or anyone's property is part of this decision. Your on-screen
  notes say this too.
- **Do not raise court cases yourself.** If a student does, acknowledge it is a real and ongoing
  conversation in BC, say this scenario is about a forest licence rather than title to private
  land, and that partnerships like this are one way communities and Nations build certainty
  together. Do not speculate about legal outcomes; offer to follow up if needed.
- **Nobody plays the Nation.** The partner is a government and a rights holder, not a stakeholder
  or a bloc. The voiceless seat may speak to the long view and to the fact that this is someone's
  territory, but does not speak *as* a Nation.
- **Name option B for what it is:** consultation without power. The screen says so; that is
  intended.
- **Get a review first.** Have your district's Indigenous Education staff look at this round
  before you run it.

--------|----------|----------------|-----------|----------|--------------------|-------|
| **A. Full co-management** | - short / + long `[tune]` | neutral | mixed | mixed | toward better long-term stewardship | changes the horizon of every later decision |
| **B. Advisory role only** | 0 | neutral | neutral | neutral | small | the "consultation without power" option, worth naming as such |
| **C. Decline** | 0 | neutral | mixed | + | neutral | has a legitimacy cost that no meter fully captures, raise this in debrief |

**Facilitator caution.** This must be handled with care and not as a plot twist. Get the
framing right (see `OPEN-QUESTIONS.md`, which flags checking terminology and, ideally, real
local context before running this round). The voiceless-seat group should be given explicit
standing to speak here.

---

## Round 4: Fire Season

The last year in both game lengths. It is a hot, dry summer, and the board's accumulated Forest
Health / Wildfire Risk slider sets its exposure. The interface-fire zone (slider 65 and up)
appears on the slider for the first time. This round is less a free choice than a reckoning:
the boards that preserved everything are sitting on the highest fuel load, directly above the
Hillside homes.

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------------|-----------|----------|--------------------|
| **A. Emergency thin / fuel break now** | -- | - | ++ | + | toward thinned fast |
| **B. Controlled burn** | - | - (small) | + | 0 | toward thinned |
| **C. Do nothing, hope** | 0 | + (small) | 0 | 0 | unchanged |

**Rules:**
- **Controlled burn is closed at a slider of 80 or more** ("Too dry and dense to burn safely this
  year"). Burning is done in cool, damp seasons, years ahead, not in a drought.
- **Boards that chose the full partnership have been burning all along:** the cultural burning
  program runs every year after the partnership (full game), plus a burn before the dry season
  at the start of this round. Their slider is lower, and their burn stays available.
- Carbon credits make thinning cost more (and burning too, unless the board partnered).

**Outcome, read straight off the slider after the decision (no dice):**

| Slider | Outcome |
|--------|---------|
| 65 and up | The fire reached the Hillside homes: evacuation orders, homes damaged, trails closed for years |
| 40 to 64 | Fire on the mountain, held before the homes |
| below 40 | A quiet season |

"Homes damaged" (not "lost") is deliberate: some students will have lived through recent
evacuations, such as the 2024 Dogtooth fire near Golden.

--------|----------|----------------|-----------|----------|--------------------|
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
asset / handed back to the Province / scarred but standing). This is where the 80-year frame
lands: the trees cut this year were planted before they were born.

---

## Full game rounds

Played only in the full game (`fullGameOnly: true` in the config). Order: First Harvest,
Windfall, **Trail Network**, Partnership, **Where the Profit Goes**, **Mill or the Carbon**,
Fire Season.

### The Trail Network (after The Windfall)

Riders, hikers and paragliders are booming; the trail groups want a new network on the upper
mountain, and visitors already park all along the Hillside streets. Tests pricing and revenue
diversification (ADST: pricing a product, the decision to seek profit or break even; optional
4 Ps).

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------------|-----------|----------|--------------------|
| **A. Charge for access** (paid shuttle, parking fees) | + | - | + (small) | 0 | 0 |
| **B. Build it with the trail groups** | + (small) | ++ | - | - | slightly toward lush (stands leave the timber base) |
| **C. Keep it a working forest** | + (small) | - | 0 | + | slightly toward thinned |

**Carry-forward:**
- If the board cut the upper stand in The First Harvest (option D), **C is greyed out** ("Already
  harvested"), and B is much cheaper because the logging road gets trail crews up the mountain.
- If the buyout was taken, B means buying part of the lease back (costs money).
- B makes the mill contract in Year 6 hurt Recreation more (the contract needs the trail-side
  stands).

Any option can be closed off like C with a `locked: { when, note }` entry in the config.

### Where the Profit Goes (after The Partnership)

A good timber year (automatic income and some harvest at the start of the round) leaves a
surplus. Social enterprise in one question: who is the profit for? The asks are ones a
community forest really faces: local clubs and non-profits, the Town's aging assets, and fuel
clearing around homes. (Schools are left out on purpose: they are the Province's
responsibility.)

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------------|-----------|----------|--------------------|
| **A. Community grants** (local clubs and non-profits) | - | + | + (small) | + (small) | 0 |
| **B. Rainy-day reserve** | - now, same amount back at the start of Fire Season | 0 | 0 | 0 | 0 |
| **C. Hire a FireSmart crew** | - | 0 | + | + (small) | toward thinned |
| **D. Fund a Town capital project** (bring forward the unfunded water system upgrade) | - | + (small) | ++ | 0 | 0 |

**Carry-forward:**
- The reserve returns exactly what went in (no interest) when Fire Season starts. Its value is
  insurance: boards that save go broke least often, while boards that spend the surplus thrive
  more often but carry more risk. That trade-off is the lesson.
- If the board salvaged in Cedar Creek in The Windfall (and fouled the town's water), the water
  upgrade is the project everyone was asking for: Residents gain much more.

### The Mill or the Carbon (before Fire Season)

The town's mill will cut jobs without a ten-year log contract; a carbon-offset buyer offers the
same money to leave the trees standing. Same money, opposite forests. A fourth option brings
back the Year 2 question of who captures the value.

| Option | Treasury | Recreation & Tourism | Residents | Forestry | Health/Fire slider |
|--------|----------|----------------------|-----------|----------|--------------------|
| **A. Guarantee the mill's supply** | ++ | - (small) | 0 | ++ | toward thinned |
| **B. Sell carbon credits** | ++ | + (small) | - (small) | -- | toward lush (fire risk up) |
| **C. Neither** (the mill cuts a shift) | 0 | 0 | 0 | - | 0 |
| **D. Sell to local makers** (timber-frame shop, posts and firewood) | + | 0 | + (small) | + (small) | slightly toward thinned |

**Carry-forward:**
- Carbon credits make Fire Season thinning expensive: emergency thinning or a controlled burn
  breaks the contract and costs a repayment. **Exception:** if the board chose the full
  partnership, its cultural burning plan is written into the carbon deal, so a controlled burn
  carries no penalty. This is shown on screen when carbon is chosen.
- If the buyout was taken, the mill contract pays less (the leased block feeds the outside
  company's own mill).
- If the board built trails with the trail groups, the mill contract costs Recreation more.
- Without the mill contract (B, C or D), the mill cuts a shift rather than closing: a real cost,
  not a catastrophe. Option D's local makers grow over the epilogue ("now employs thirty people").
