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

Setting it on Mount 7, abutting the Selkirk Hill neighbourhood, does two things a
generic forest cannot:

- It is **their** mountain. They have ridden it, hiked it, watched paragliders come
  off it. They are being asked to decide the fate of a place they already care about,
  which is most of the engagement battle won before the first scenario.
- The Selkirk Hill adjacency hands us **wildfire** for free. A dense forest directly
  uphill of homes is a real, current Kootenay fear, not a hypothetical. That turns the
  simulation from a business puzzle into a safety question with houses attached, which
  raises the stakes past anything a lecture could reach.

## The mechanic: four meters, no clean win

The class is the board. They run the forest across four rounds (four years), watching
four things on the projected dashboard. The entire lesson is that they cannot keep all
four healthy at once.

- **Treasury ($).** The engine of urgency. A forest has fixed costs (staff, insurance,
  road maintenance) whether or not the board acts, so the treasury bleeds every round.
  This makes "leave everything untouched, protect it all" a live financial threat
  rather than the safe default teenagers reach for. It quietly teaches that a business
  dies from inaction, not just from bad ideas. Hit zero and the forest is insolvent and
  gets sold to an outside company that does not care about the trails or the view. Game
  over.
- **Segment sentiment**, as three separate bars so they can move in opposite
  directions and force real tradeoffs: **Bikers / Tourism**, **Selkirk Hill
  Residents**, **Forestry Sector**. The ethics lesson lives in the fact that a move
  which fills one bar drains another. You cannot please all three.
- **Forest Health / Wildfire Risk**, deliberately built as *one* slider with two ends
  rather than two independent bars, because in reality they are coupled: a dense,
  healthy-looking forest is also a high fuel load. The slider runs from "lush but a
  tinderbox" to "thinned but scarred." The coupling is itself the teaching point: the
  intuitive "protect the trees" move is also the "endanger the homes" move.

No path scores perfectly. That is the design, and the debrief reveals it: every board
sacrificed something, which is what ethics actually is.

## The urgency rule for the treasury

The treasury ticking down is the sharpest mechanic here, but it has to be controlled by
the facilitator, not by a real-time clock. A live countdown while students argue makes
the anxious kids panic and the slow ones check out. Tick it one visible notch per round,
or on a facilitator key press, so the *chair* controls the pressure and can lean on it
out loud ("while you are debating, you are paying staff").

## The participation cliff (the main failure mode)

In a committee of thirty, the default outcome is that five loud students run it and
twenty-five spectate. Left unaddressed, this is just five kids talking with a nicer
projector. The design engineers against it structurally, not by hoping. See
`CLASSROOM-MECHANICS.md` for the full treatment. The three defences:

1. **Give the three sentiment segments to thirds of the room.** Sentiment stops being
   abstract and becomes *them*. When the Residents bar tanks, an actual group of
   students feels it.
2. **Assign the seat nobody volunteers for.** One small group speaks for what has no
   bar and no vote: the forest itself, the wildlife, the people living on Selkirk Hill
   in 50 years, and the Indigenous rights-holders whose territory this is. This is the
   ethics of the whole simulation hiding in a seating chart, and it guarantees the
   long-term view gets voiced even when the room wants quick money.
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
