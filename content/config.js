/*
 * Thunderhead Mountain Community Forest: scenario and meter configuration.
 *
 * This is the only file you should need to edit to tune the simulation. The dashboard
 * (app/dashboard.html) reads it; `node tools/build.mjs` inlines it into the single-file
 * classroom build in dist/; `node tools/simulate.mjs` plays every path through it.
 *
 * The setting is fictional: the town of Cedar Bend under Thunderhead Mountain. The dollar figures
 * are rounded classroom numbers sized like a real small BC community forest: 20,000 m3/yr (what
 * Golden was allocated in 2006), with money modelled on Nakusp's community forest of the same
 * size. Anchors, sources and confidence are in "reports/Golden community forest real numbers.md".
 * The real Golden story is kept for the debrief reveal, not the premise.
 *
 * Meter keys used in `deltas`:
 *   treasury   dollars (+ adds cash)
 *   bikers     Bikers / Tourism sentiment, 0-100
 *   residents  Hillside Residents sentiment, 0-100
 *   forestry   Forestry Sector sentiment, 0-100
 *   forest     Forest Health / Wildfire Risk slider, 0-100
 *              100 = lush, high fuel load, high fire risk
 *                0 = thinned, scarred, low fire risk
 *   forestTo   (optional) set the forest slider to an absolute value, e.g. after a burn
 *
 * Game length: rounds marked `fullGameOnly: true` are skipped in the short game. Conditions
 * about a skipped round's choice are simply false.
 *
 * Option `variants` apply when their `when` matches: their note is shown after the vote, and
 * each key in their `deltas` REPLACES the option's value for that key.
 *
 * Conditions (`when`) can be:
 *   { choice: { round: 'r2', option: 'A' } }      option may also be an array ['A', 'C']
 *   { meter: 'residents', below: 40 }             or atLeast: 40; meter may also be treasury,
 *                                                 forest, or sentiment (average of the three bars)
 *   { sold: true }                                the forest went insolvent
 *   { fire: 'interface' }                         id of the fire tier that happened
 *   { length: 'full' }                            the game length the chair picked
 *   { all: [ ... ] }, { any: [ ... ] }, { not: { ... } }
 */
(function (root) {
  var config = {
    forestName: 'Thunderhead Mountain Community Forest',
    town: 'Cedar Bend',

    // Picked on the title screen with the G key, before Year 1 starts.
    gameLengths: [
      { id: 'full', label: 'Full game', note: 'about 75 minutes (a double block)' },
      { id: 'short', label: 'Short game', note: 'fits a 50-minute period' },
    ],
    defaultLength: 'full',

    titleScreen: {
      // Shown under the forest name on the cold open screen. Set to '' to show nothing.
      question: 'Who owns Thunderhead Mountain?',
      // Shown with the I key on the opening screens.
      chairNote:
        'Cold open: no introduction. Ask the question and let them guess (the answer: the land is ' +
        'provincial Crown land, on a First Nation\u2019s unceded territory, and the Province has ' +
        'licensed it to the town\u2019s community forest). Then introduce yourself and move on to ' +
        'the welcome screen. Cedar Bend and Thunderhead Mountain are made up, but modelled on a ' +
        'real small BC community forest. Save the real local story for the debrief. Consider ' +
        'opening with the real territorial acknowledgement for the land you are on.',
    },

    // The welcome screen, after the title: who the class is, and what a community forest is.
    introScreen: {
      kicker: 'Welcome to the board',
      heading: 'You have been selected as the board of directors of the Thunderhead Mountain Community Forest.',
      lines: [
        'The company is owned by the Town of Cedar Bend. For the next {years} years, you run it.',
      ],
      whatIs: {
        heading: 'What is a community forest?',
        points: [
          'The Province licenses a forest to a local community for the long term, instead of to a big outside company.',
          'The community decides how it is logged, protected, and used, and keeps the profits.',
          'It has to pay its own way like any business, but it exists for the whole town: jobs, trails, fire safety, and money back to the community.',
          'BC has about 60 of them. About half involve First Nations.',
        ],
      },
      chairNote:
        'Keep this under two minutes. The point is the gap between "make money" and "why we ' +
        'exist": a business that is not trying to get rich. Take the opening vote here if you ' +
        'have not already (V).',
    },

    setupScreen: {
      heading: 'How the board keeps score.',
      lines: [
        // {years} becomes the number of years in the chosen game length.
        '{years} years. {years} decisions. One forest.',
        'The forest has to pay its own way, and it exists for the whole community.',
      ],
      rule: 'One rule: if the Treasury hits zero, the forest is sold. Game over.',
    },

    treasury: {
      label: 'Treasury',
      start: 300000,
      // Fixed costs deducted automatically at the start of every round.
      bleed: 90000,
      bleedLabel: 'Fixed costs: manager, planning, insurance, road upkeep',
      // Extra deduction on the T key, so the chair can lean on it mid-debate.
      manualTick: 10000,
      manualTickLabel: 'While you debate, you are paying staff',
      // Treasury value that fills the bar completely.
      barMax: 800000,
    },

    meters: {
      bikers: { label: 'Bikers / Tourism', bloc: 'Left side of the room', start: 50 },
      residents: { label: 'Hillside Residents', bloc: 'Middle of the room', start: 50 },
      forestry: { label: 'Forestry Sector', bloc: 'Right side of the room', start: 50 },
    },

    // Words shown beside each sentiment bar so its state never relies on colour alone.
    moods: [
      { atLeast: 80, word: 'Delighted' },
      { atLeast: 60, word: 'Supportive' },
      { atLeast: 40, word: 'Uneasy' },
      { atLeast: 20, word: 'Unhappy' },
      { atLeast: 0, word: 'Furious' },
    ],

    forest: {
      label: 'Forest Health / Wildfire Risk',
      start: 61,
      // The forest keeps growing whether or not you act: fuel builds up every round.
      growthPerRound: 4,
      growthLabel: 'The forest grew. Fuel load builds.',
      lushEnd: { health: 'Lush, dense, healthy-looking', risk: 'High fuel load, high fire risk' },
      thinEnd: { health: 'Thinned, scarred, logged', risk: 'Low fuel load, low fire risk' },
    },

    rounds: [
      {
        id: 'r1',
        title: 'The First Harvest',
        prompt:
          'You have just taken over the forest. It needs to fund itself this year. The lower ' +
          'stand, right above the Hillside homes and beside the town\u2019s most popular trail, is ready. ' +
          'How hard do you cut?',
        chairNote:
          'After the first vote, surface the Residents knot: they want it cut so they do not ' +
          'burn, and left standing so they keep their view and property values. Same people, ' +
          'two incompatible demands. Then press U to undo and vote again. Do not warn them that ' +
          'the trust they burn now narrows their options in The Partnership. Scale, if asked: the ' +
          'full harvest is about a year\u2019s 20,000 m\u00B3 netting roughly $13 a cubic metre after ' +
          'logging, hauling and stumpage; the selective thin is about 9,000 m\u00B3.',
        options: [
          {
            key: 'A',
            label: 'Leave it standing',
            detail: 'Cut nothing this year.',
            deltas: { treasury: 0, bikers: 10, residents: -5, forestry: -15, forest: 10 },
            consequence: 'The view stays. The fuel stays. The mill waits.',
          },
          {
            key: 'B',
            label: 'Selective thin',
            detail: 'Take the worst of it, leave the stand.',
            deltas: { treasury: 120000, bikers: -5, residents: 10, forestry: 0, forest: -8 },
            consequence: 'The boring, responsible option. The trail closes for a season. Nobody marches.',
          },
          {
            key: 'C',
            label: 'Full harvest of the lower stand',
            detail: 'Cut the whole block: a full year\u2019s harvest.',
            deltas: { treasury: 260000, bikers: -20, residents: -5, forestry: 20, forest: -25 },
            consequence: 'Big cheque. Fire risk down. A scar you can see from town.',
          },
        ],
      },
      {
        id: 'r2',
        title: 'The Windfall',
        prompt:
          'An outside forestry company offers a lump sum for the timber rights to part of the ' +
          'forest for the next 15 years. Big money up front. But their crews, their mill, and ' +
          'their profits: the value, and the decisions, leave the community.',
        chairNote:
          'Ask: who captures the value? Where does the money go after it leaves Cedar Bend? ' +
          '(Salvage alternative, if you prefer: a winter blowdown has killed a big block; ' +
          'salvaging it means roading into a sensitive area. Edit this round in content/config.js.) ' +
          'Hold the real parallel for the debrief: Golden\u2019s 20,000 m\u00B3 community forest ' +
          'allocation went back to the Province in 2010, before a licence was ever issued.',
        options: [
          {
            key: 'A',
            label: 'Take the buyout',
            detail: 'Sign the 15-year timber lease.',
            deltas: { treasury: 300000, bikers: -10, residents: 0, forestry: 20, forest: -15 },
            consequence: 'The cheque clears. The logging trucks are not yours.',
          },
          {
            key: 'B',
            label: 'Decline, stay the course',
            detail: 'Keep every decision local.',
            deltas: { treasury: 0, bikers: 10, residents: 0, forestry: -10, forest: 0 },
            consequence: 'Independence kept. The bank balance did not move.',
          },
          {
            key: 'C',
            label: 'Negotiate a partial deal',
            detail: 'Shorter term, local hiring, trail buffers.',
            deltas: { treasury: 150000, bikers: -5, residents: 0, forestry: 10, forest: -6 },
            consequence: 'Half the money, most of the control.',
          },
        ],
      },
      {
        id: 'trails',
        fullGameOnly: true,
        title: 'The Trail Network',
        prompt:
          'Mountain biking in Cedar Bend is booming. The bike club wants to build a new trail ' +
          'network on the upper mountain, and riders are already parking all along the ' +
          'Hillside streets. Trails bring visitors and money to town. They also take stands out of ' +
          'the timber base, forever.',
        chairNote:
          'This is the pricing round: the forest has more than one product. Ask the Bikers ' +
          'whether they would pay for what they now get free, and the Residents who pays for ' +
          'the parking. Good slot for the optional 4 Ps exercise.',
        options: [
          {
            key: 'A',
            label: 'Charge for access',
            detail: 'Paid parking and a trail pass.',
            deltas: { treasury: 120000, bikers: -10, residents: 5, forestry: 0, forest: 0 },
            consequence: 'Riders pay. Some stop coming.',
          },
          {
            key: 'B',
            label: 'Build it with the club',
            detail: 'A grant-funded network, with a share of tourism revenue.',
            deltas: { treasury: 80000, bikers: 20, residents: -10, forestry: -10, forest: 3 },
            consequence: 'World-class riding. Those stands will never be logged.',
            variants: [
              {
                when: { choice: { round: 'r2', option: 'A' } },
                note: 'The timber company holds the rights on the upper mountain. You pay to buy part of the lease back.',
                deltas: { treasury: -20000, bikers: 10 },
              },
            ],
          },
          {
            key: 'C',
            label: 'Keep it a working forest',
            detail: 'No new trails. Log the upper stands on schedule.',
            deltas: { treasury: 60000, bikers: -15, residents: 0, forestry: 10, forest: -6 },
            consequence: 'The upper mountain stays a timber block. The riders notice.',
          },
        ],
      },
      {
        id: 'r3',
        title: 'The Partnership',
        // The partner is deliberately unnamed: nobody in the room stands in for a real Nation.
        // Have your district's Indigenous Education staff review this round before running it.
        prompt:
          'Thunderhead Mountain is on the territory of a First Nation that never gave it up. ' +
          'The Nation\u2019s government proposes managing the forest as an equal partner: shared ' +
          'board seats, shared decisions, a longer time horizon. It may cost flexibility and money ' +
          'now. It may also be the most honest answer to the question: whose forest is it?',
        chairNote:
          'Handle as a real governance decision, not a plot twist. Give the voiceless seat ' +
          'explicit standing to speak first. Name option B for what it is: consultation ' +
          'without power. If they decline, raise the legitimacy cost in the debrief: no meter ' +
          'on this screen captures it. Nobody plays the Nation: it is a government and a rights ' +
          'holder, not a stakeholder. Real parallels for the debrief: about half of BC\u2019s ' +
          'community forests involve First Nations; the Cheakamus forest near Whistler has equal ' +
          'board seats for two Nations and the municipality; near Golden, the Shuswap Band, the ' +
          'Town and the regional district are working toward the Kenpesq\u2019t Community Forest.',
        options: [
          {
            key: 'A',
            label: 'Full co-management',
            detail: 'Equal board seats and a shared plan, like the Cheakamus forest near Whistler.',
            deltas: { treasury: -40000, bikers: 0, residents: -5, forestry: -5, forest: -6 },
            consequence: 'Every future decision is now made on a longer horizon.',
            variants: [
              {
                when: { choice: { round: 'r2', option: 'A' } },
                note: 'The block you leased in The Windfall sits outside the partnership for 15 years.',
                deltas: { forest: -3 },
              },
              {
                when: { any: [{ meter: 'residents', below: 40 }, { meter: 'bikers', below: 35 }] },
                note:
                  'Trust burned earlier: council will not back a change this big without a ' +
                  'public process you now have to pay for.',
                deltas: { treasury: -70000 },
              },
            ],
          },
          {
            key: 'B',
            label: 'Advisory role only',
            detail: 'They can advise. The board still decides.',
            deltas: { treasury: 0, bikers: 0, residents: 0, forestry: 0, forest: -2 },
            consequence: 'Consultation without power.',
          },
          {
            key: 'C',
            label: 'Decline',
            detail: 'Keep the board as it is.',
            deltas: { treasury: 0, bikers: 0, residents: 0, forestry: 10, forest: 0 },
            consequence: 'Nothing on this screen moved much. That is not the same as no cost.',
            // The cost is legitimacy, which no meter captures: raise it in the debrief.
            freeOnPurpose: true,
            variants: [
              {
                when: { meter: 'forestry', below: 30 },
                note: 'Forestry wrote this board off in The First Harvest. Declining wins you nothing back.',
                deltas: { forestry: 0 },
              },
            ],
          },
        ],
      },
      {
        id: 'dividend',
        fullGameOnly: true,
        title: 'Where the Profit Goes',
        prompt:
          'A good year for timber prices: the regular harvest brought in more than planned. ' +
          'The school, the trail society, and the fire department are all at the next board ' +
          'meeting with their hands out. A private company would pay its owners. Who are yours?',
        chairNote:
          'Social enterprise in one question: the profit belongs to the community, but which ' +
          'part of it? The reserve looks boring; do not tell them it pays back in fire season.',
        startEffects: [
          { label: 'Regular timber sales: a good year', deltas: { treasury: 180000, forest: -5 } },
        ],
        options: [
          {
            key: 'A',
            label: 'Community dividend',
            detail: 'Grants to the school, trail society, and local groups.',
            deltas: { treasury: -80000, bikers: 10, residents: 10, forestry: 5, forest: 0 },
            consequence: 'Everyone gets a thank-you letter. The bank balance drops.',
          },
          {
            key: 'B',
            label: 'Rainy-day reserve',
            detail: 'Lock the money away in a reserve fund.',
            deltas: { treasury: -100000, bikers: -5, residents: -5, forestry: 0, forest: 0 },
            consequence: 'Nobody sees anything happen. Nobody thanks you.',
          },
          {
            key: 'C',
            label: 'Hire a FireSmart crew',
            detail: 'A local crew clearing fuel around the Hillside homes.',
            deltas: { treasury: -60000, bikers: 0, residents: 10, forestry: 5, forest: -8 },
            consequence: 'Local jobs, less fuel near the homes, less money in the bank.',
          },
        ],
      },
      {
        id: 'mill',
        fullGameOnly: true,
        title: 'The Mill or the Carbon',
        prompt:
          'Cedar Bend\u2019s mill, the town\u2019s biggest employer, says it will close unless it ' +
          'gets a guaranteed supply of logs for ten years. The same week, a carbon-offset buyer ' +
          'offers to pay you just as much to leave the trees standing. Same money. Opposite forests.',
        chairNote:
          'The carbon deal pays them to keep the forest dense, above the homes. Do not point ' +
          'that out; let the Residents find it. Carbon credits lock them in: thinning in fire ' +
          'season will break the contract (a game rule, not a documented real case). Real ' +
          'parallel: Whistler\u2019s Cheakamus Community Forest halved its harvest to sell carbon ' +
          'offsets, and is one of only two BC community forests that have.',
        options: [
          {
            key: 'A',
            label: 'Guarantee the mill\u2019s supply',
            detail: 'A ten-year log contract.',
            deltas: { treasury: 150000, bikers: -5, residents: 0, forestry: 20, forest: -12 },
            consequence: 'The mill stays open. The trucks keep rolling.',
            variants: [
              {
                when: { choice: { round: 'trails', option: 'B' } },
                note: 'To fill the contract, crews have to cut the stands beside the new trails.',
                deltas: { bikers: -15 },
              },
              {
                when: { choice: { round: 'r2', option: 'A' } },
                note: 'The leased block still feeds the outside company\u2019s mill, so you can only promise half the logs.',
                deltas: { treasury: 70000, forestry: 5 },
              },
            ],
          },
          {
            key: 'B',
            label: 'Sell carbon credits',
            detail: 'Paid to leave the forest standing.',
            deltas: { treasury: 150000, bikers: 5, residents: -5, forestry: -20, forest: 10 },
            consequence: 'Paid to keep it dense. Directly above the Hillside homes.',
          },
          {
            key: 'C',
            label: 'Neither',
            detail: 'Keep your options open.',
            deltas: { treasury: 0, bikers: 0, residents: 0, forestry: -15, forest: 0 },
            consequence: 'The mill closes. Nobody pays you anything.',
          },
        ],
      },
      {
        id: 'r4',
        title: 'Fire Season',
        // Draws the interface-fire zone on the slider from this round on.
        showFireZone: true,
        prompt:
          'A hot, dry summer. Lightning in the forecast. Your forest, the one your board built ' +
          'year by year, sits directly above the Hillside homes. Look at the slider. ' +
          'That is your starting position. What do you do?',
        chairNote:
          'Let the slider do the moralizing. The interface-fire zone is now drawn on it. If ' +
          'they are in the zone, "do nothing" burns the Hillside homes. No dice: the board they ran ' +
          'decides.',
        // Extra effects when this round starts, on top of the bleed and the growth.
        startEffects: [
          {
            when: { all: [{ choice: { round: 'r3', option: 'A' } }, { not: { choice: { round: 'r2', option: 'A' } } }] },
            label: 'Partnership opens new funding and a cultural burning program',
            deltas: { treasury: 100000, forest: -6 },
          },
          {
            when: { all: [{ choice: { round: 'r3', option: 'A' } }, { choice: { round: 'r2', option: 'A' } }] },
            label: 'Partnership funding, minus the leased block',
            deltas: { treasury: 50000, forest: -3 },
          },
          {
            when: { choice: { round: 'dividend', option: 'B' } },
            label: 'Reserve fund released, with interest',
            deltas: { treasury: 130000 },
          },
        ],
        options: [
          {
            key: 'A',
            label: 'Emergency thin and fuel break',
            detail: 'Crews and machines on the slope now.',
            deltas: { treasury: -150000, bikers: -10, residents: 20, forestry: 10, forest: -25 },
            consequence: 'Expensive, ugly, and fast.',
            variants: [
              {
                when: { choice: { round: 'mill', option: 'B' } },
                note: 'Thinning breaks your carbon contract. The buyer wants their money back.',
                deltas: { treasury: -250000 },
              },
            ],
          },
          {
            key: 'B',
            label: 'Controlled burn',
            detail: 'Burn the understory on a safe day.',
            deltas: { treasury: -60000, bikers: -5, residents: 10, forestry: 0, forest: -15 },
            consequence: 'Smoke over town for a week. Less fuel on the hill.',
            variants: [
              {
                when: { choice: { round: 'mill', option: 'B' } },
                note: 'Burning the understory breaches part of your carbon contract. You pay a penalty.',
                deltas: { treasury: -110000 },
              },
            ],
          },
          {
            key: 'C',
            label: 'Do nothing, and hope',
            detail: 'Save the money.',
            deltas: { treasury: 0, bikers: 5, residents: 0, forestry: 0, forest: 0 },
            consequence: 'The slider decides what happens next.',
            // The cost, if any, comes from the fire season outcome.
            freeOnPurpose: true,
          },
        ],
      },
    ],

    // Resolved on the Fire Season Outcome screen, after the Fire Season decision.
    // The first tier whose `when` matches is used; it is deterministic, never luck.
    fire: {
      title: 'Fire Season: what happened',
      tiers: [
        {
          id: 'interface',
          when: { meter: 'forest', atLeast: 65 },
          title: 'The fire reached the Hillside homes',
          text:
            'A lightning strike on the upper slope. The fuel load did the rest. Evacuation ' +
            'orders, homes lost at the interface, the trails closed for years.',
          deltas: { treasury: -150000, bikers: -25, residents: -40, forestry: -10, forestTo: 12 },
        },
        {
          id: 'held',
          when: { meter: 'forest', atLeast: 40 },
          title: 'Fire on the mountain, held',
          text:
            'A lightning fire on the upper slope. Crews held it before it reached the homes. ' +
            'A tense week, a big bill, some burned trail.',
          deltas: { treasury: -40000, bikers: -10, residents: -10, forest: -10 },
        },
        {
          id: 'quiet',
          when: { meter: 'forest', atLeast: 0 },
          title: 'A quiet season',
          text:
            'Lightning came through. With the fuel load down, the one start that caught went ' +
            'out on its own.',
          deltas: { residents: 5 },
        },
      ],
    },

    // The first outcome whose `when` matches is shown.
    epilogues: [
      {
        id: 'sold',
        when: { sold: true },
        title: 'Sold off and logged out',
        text:
          'The forest was sold to an outside company. They did not care about the trails or ' +
          'the view. Fifty years later, the lower slopes of Thunderhead have been cut twice, and ' +
          'the money went somewhere else.',
      },
      {
        id: 'burned',
        when: { fire: 'interface' },
        title: 'The fire year',
        text:
          'Everyone in Cedar Bend still dates things from the fire. The houses were rebuilt. The ' +
          'forest is coming back, fifty years young, and the kids who ride it now have never ' +
          'seen it old.',
      },
      {
        id: 'thriving',
        when: { all: [
          { meter: 'forest', atLeast: 30 }, { meter: 'forest', below: 60 }, { meter: 'treasury', atLeast: 100000 },
          { meter: 'sentiment', atLeast: 45 },
          { meter: 'bikers', atLeast: 30 }, { meter: 'residents', atLeast: 30 }, { meter: 'forestry', atLeast: 30 },
        ] },
        title: 'A thriving community asset',
        text:
          'Fifty years later, the forest still pays its own way. The trails are busier than ' +
          'ever, the mill still buys local logs, and the Hillside sleeps through fire season.',
      },
      {
        id: 'scarred',
        when: { meter: 'forest', atLeast: 0 },
        title: 'Scarred but standing',
        text:
          'Fifty years later, the forest is still community-owned. It has been through some ' +
          'hard years and it shows: on the slopes, and in who still trusts the board.',
      },
    ],

    // Extra lines appended to the epilogue when their condition matches.
    epilogueAddenda: [
      {
        when: { choice: { round: 'r2', option: 'A' } },
        text: 'The 15-year timber lease is a line in the history books. The profits never came back to town.',
      },
      {
        when: { choice: { round: 'r3', option: 'A' } },
        text: 'The forest has been co-managed for two generations. Its plans are written in centuries, not years.',
      },
      {
        when: { choice: { round: 'r3', option: 'C' } },
        text: 'The partnership was offered once. Ask the voiceless seat what that cost.',
      },
      {
        when: { choice: { round: 'mill', option: ['B', 'C'] } },
        text: 'Cedar Bend\u2019s mill closed that year, and hundreds of jobs went with it.',
      },
      {
        when: { all: [{ choice: { round: 'mill', option: 'B' } }, { fire: 'interface' }] },
        text: 'The carbon you were paid to store went up in smoke over the Hillside.',
      },
      {
        when: { choice: { round: 'trails', option: 'B' } },
        text: 'The trail network is famous. People move to Cedar Bend for it.',
      },
    ],

    closing:
      'The trees you cut this year were planted before any of you were born. The ones you ' +
      'plant, you will never see cut. What do you owe people who cannot vote, complain, or ' +
      'thank you?',

    // Opening and closing vote, shown side by side on the reveal screen.
    roomVote: {
      question: 'Should we log the lower slopes of Thunderhead Mountain?',
      choices: ['Yes', 'No', 'Unsure'],
    },

    // Debrief screen: revealed one at a time with the Next key. Name, then move on.
    debrief: [
      { term: 'Profit vs break-even', line: 'You were never trying to get rich. You were trying not to die.' },
      { term: 'Who captures the value', line: 'The Windfall: when the outsider buys in, the money leaves town.' },
      { term: 'Pricing and revenue streams', line: 'Timber, trail passes, carbon credits: what does a forest sell, and to whom?', when: { length: 'full' } },
      { term: 'Where the profit goes', line: 'A social enterprise decides who its surplus is for.', when: { length: 'full' } },
      { term: 'Market segmentation', line: 'Three blocs, three sets of needs. You could not please all of them.' },
      { term: 'Renewable vs non-renewable', line: 'A forest cut greedily is as gone as a mine.' },
      { term: 'Social entrepreneurship', line: 'A business run for a community, including First Nations communities.' },
      { term: 'This is not made up', line: 'In 2006 the Province set aside a community forest for Golden, about 4% of the local cut, and took it back in 2010. Today the Shuswap Band, the Town and the regional district are trying again.' },
    ],

    // Used only by tools/simulate.mjs to check the tuning.
    tuning: {
      // One option key per round, per game length: the "cut nothing, protect it all" board.
      // It should go broke or burn.
      protectEverythingPath: { short: 'ABBC', full: 'ABCBBBC' },
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = config;
  else root.MOUNT7_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
