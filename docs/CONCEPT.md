# Concept and design rationale

Read this before touching anything else. It explains *why* the simulation is built
the way it is, so that later changes do not accidentally break the thing that makes
it work.

## The core problem being solved

The brief is a talk on entrepreneurial ethics for a high school class. Two facts
shape everything:

1. **Teenagers disengage from lecture fast.** A stranger at the front gets about one
   sentence of attention on credit. The rest is earned by handing them power, not by
   talking more. The design answer is to run a decision they cannot stay out of, not
   to deliver content.
2. **The facilitator sells alcohol for a living.** Rather than manage that awkwardly
   in front of minors, the topic sidesteps it: a community forest is a business that
   is not privately owned and not profit-maximizing, which lets us teach real
   entrepreneurship (revenue, costs, break-even, stakeholders, value capture) without
   selling anything to anyone in the room.

## Why a community forest specifically

It is the cleanest available contrast to a normal private business. It still has to
be commercially viable, but it exists to return value to a community and steward a
shared resource. That gap between "make money" and "why we exist" is where the honest
ethical tradeoffs live, and it maps directly onto ADST content the students already
have (profit vs break-even, social entrepreneurship, renewable vs non-renewable). See
`ADST-ALIGNMENT.md`.

## The setting: a fictional town, with the real story as the reveal

The game is set in **Cedar Bend**, a fictional mountain town, on **Thunderhead Mountain**,
whose lower slopes sit directly above the **Hillside** neighbourhood. It was first drafted on
Golden's Mount 7 and Selkirk Hill, and moved to a fictional setting deliberately:

- **The facilitator is a councillor.** A local game where students decide whether to log a
  real mountain can be heard as a council position, while a real community forest process
  (Kenpesq't) is under way near Golden.
- **A fictional town cannot be fact-checked.** Most real figures could only be partly verified.
- **The Partnership round is safer.** The partner is "the First Nation whose territory this is",
  unnamed, so nobody in the room stands in for a real Nation's government.
- **Students argue more freely** when it is not their neighbour's house or their parent's
  employer on the line, and the game can run in any mountain town.

What the fictional setting keeps: Cedar Bend is obviously *a place like ours* (a mountain
town, a bike scene, a mill, homes under the forest), so **wildfire** still arrives for free: a
dense forest directly uphill of homes is a real, current interior BC fear. And the local
relevance returns as a payoff, not a premise: the debrief closes on the true story that
Golden was allocated a community forest in 2006, lost it in 2010, and is trying again today.

The session opens with a welcome screen: the class **has been selected as the corporate board
of the town's community forest**, followed by a short "what is a community forest?"
explanation, before the meters are introduced.

## The headline score: what the forest gives back

The lesson is the *success* of social enterprise, so the most prominent number on the
dashboard is not the bank balance. It is **Given back to Cedar Bend**: every dollar the forest
returns to the town. Most of it comes from a standing **community dividend policy**, modelled on
real ones (Kaslo, Sechelt): once a year, half of everything above a reserve goes back to the
town. The rest comes from choices (grants, a FireSmart crew, a capital project). So the tally
grows *because* the board runs a healthy business, which is exactly the point: a community
forest makes a profit so it can give it away. Milestones name real BC equivalents (Clinton's
$40,000 Zamboni for the youth hockey club; Sechelt's grants to local groups), and the debrief
opens on "What worked?" with the full list.

Real events arrive as **breaking news** at the start of some years (the 2021 lumber price
record, US duties, a mill closing in the next valley, a wildfire prevention grant), each with a
"this really happened" line. They make setbacks feel like the world, not the game, and they are
all recoverable.

## The mechanic: four meters, no clean win

The class is the board. Alongside the given-back tally, they watch four things on the projected
dashboard. The lesson inside the game is that they cannot keep all four healthy at once.

- **Treasury ($).** The engine of urgency. A forest has fixed costs (staff, insurance,
  road maintenance) whether or not the board acts, so the treasury bleeds every round.
  This makes "leave everything untouched, protect it all" a live financial threat
  rather than the safe default teenagers reach for. It quietly teaches that a business
  dies from inaction, not just from bad ideas. Hit zero and the board cannot meet its obligations:
  the Province cancels the community forest agreement and the timber goes back to the
  Crown, to be auctioned to outside companies, with the profits going to Victoria. (A
  Community Forest Agreement is a Crown tenure; it cannot be sold.) Game over.
- **Segment sentiment**, as three separate bars so they can move in opposite
  directions and force real tradeoffs: **Recreation & Tourism**, **Hillside
  Residents**, **Forestry Sector**. The ethics lesson lives in the fact that a move
  which fills one bar drains another. You cannot please all three.
- **Forest Health / Wildfire Risk**, deliberately built as *one* slider with two ends
  rather than two independent bars, because in reality they are coupled: a dense,
  healthy-looking forest is also a high fuel load. The slider runs from "lush but a
  tinderbox" to "thinned but scarred." The coupling is itself the teaching point: the
  intuitive "protect the trees" move is also the "endanger the homes" move.

No path scores perfectly on the meters. That is the design, and the debrief reveals it: every
board sacrificed something, which is what ethics actually is. But every board that stayed
solvent also gave something back, and the debrief starts there.

## The urgency rule for the treasury

The treasury ticking down is the sharpest mechanic here, but it has to be controlled by
the facilitator, not by a real-time clock. A live countdown while students argue makes
the anxious kids panic and the slow ones check out. Tick it one visible notch per round,
or on a facilitator key press, so the *chair* controls the pressure and can lean on it
out loud ("while you are debating, you are paying staff").

## The participation cliff (the main failure mode)

In a big committee, the default outcome is that a few loud students run it and the rest
spectate. Left unaddressed, this is just a few kids talking with a nicer
projector. The design engineers against it structurally, not by hoping. See
`CLASSROOM-MECHANICS.md` for the full treatment. Students decide **as themselves**, never in
a role: the question is always "what would you do?" The defences:

1. **The community speaks through the screen.** Each year brings short public comments to the
   board from people in town, and the three support meters move in front of everyone. The
   segments (recreation, residents, forestry) are heard, not played.
2. **The voiceless seat, as a standing question.** Before every vote the chair asks: "who does
   this affect who is not in this room?" It guarantees the long view (the forest, people fifty
   years from now, the Nation whose territory this is) gets voiced even when the room wants
   quick money, without anyone speaking *as* them.
3. **Private ballots before public hands** on the big votes, to kill the
   follow-the-loud-kid effect and give a real number to put on screen.

## The close

End on the 80-year frame. You harvest trees planted before any of them were born and
plant ones they will never see cut. Ethics stops being "do not lie, do not steal" and
becomes: what do you owe people who cannot vote, complain, or thank you? For an audience
that plans in semesters, a decision measured in a century is the jolt to end on.

## What this is not

- Not a lecture on how community forest tenures are structured. Governance mechanics
  come out only when a scenario forces them. Leading with tenure structure kills the
  room.
- Not a branching choose-your-own-adventure with a different storyline per decision.
  With one committee that is not a risk, but keep the principle: the scenarios are
  fixed, the *consequences* (the meter state carried forward) are what vary.
