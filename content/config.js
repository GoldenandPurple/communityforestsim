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
 *   recreation Recreation & Tourism sentiment, 0-100
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
 *   { sold: true }                                the Treasury hit zero and the Province took the forest back
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
      rule: 'One rule: if the Treasury hits zero, the Province takes the forest back. Game over.',
    },

    // When the Treasury hits zero. A Community Forest Agreement is a Crown tenure: it cannot be
    // sold. If the holder cannot meet its obligations, the Province cancels the agreement and the
    // timber goes back to the Crown, typically auctioned to outside companies, with the stumpage
    // going to general revenue. {cause} is replaced with what tipped the Treasury over.
    insolvency: {
      heading: 'The Province has taken the forest back.',
      text:
        'The Treasury hit zero ({cause}). The Province cancelled the community forest agreement. ' +
        'The timber goes back to the Crown, to be auctioned to outside companies, and the profits ' +
        'go to Victoria, not Cedar Bend.',
      status: 'Licence cancelled',
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
      recreation: { label: 'Recreation & Tourism', bloc: 'Left side', start: 50 },
      residents: { label: 'Hillside Residents', bloc: 'Middle', start: 50 },
      forestry: { label: 'Forestry Sector', bloc: 'Right side', start: 50 },
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
          'stand, right above the Hillside homes and beside the Ridgeline trail, is ready. ' +
          'How hard do you cut?',
        chairNote:
          'After the first vote, surface the Residents knot: they want it cut so they do not ' +
          'burn, and left standing so they keep their view and property values. Same people, ' +
          'two incompatible demands. Then press U to undo and vote again. Option D adds a new ' +
          'dimension: not just how much you cut, but where. It spares the view and the trail, ' +
          'but costs more to reach and does little for the homes. It also builds a road into the ' +
          'upper mountain, which matters later. Do not warn them that ' +
          'the trust they burn now narrows their options in The Partnership. Scale, if asked: the ' +
          'full harvest is about a year\u2019s 20,000 m\u00B3 netting roughly $13 a cubic metre after ' +
          'logging, hauling and stumpage; the selective thin is about 9,000 m\u00B3.',
        options: [
          {
            key: 'A',
            label: 'Leave it standing',
            detail: 'Cut nothing this year.',
            deltas: { treasury: 0, recreation: 10, residents: -5, forestry: -15, forest: 10 },
            consequence: 'The view stays. The fuel stays. The mill waits.',
          },
          {
            key: 'B',
            label: 'Selective thin',
            detail: 'Take the worst of it, leave the stand.',
            deltas: { treasury: 120000, recreation: -5, residents: 10, forestry: 0, forest: -8 },
            consequence: 'The boring, responsible option. The trail closes for a season. Nobody marches.',
          },
          {
            key: 'C',
            label: 'Full harvest of the lower stand',
            detail: 'Cut the whole block: a full year\u2019s harvest.',
            deltas: { treasury: 260000, recreation: -30, residents: -5, forestry: 20, forest: -25 },
            consequence: 'Big cheque. Fire risk down. A scar you can see from town.',
          },
          {
            key: 'D',
            label: 'Harvest the upper stand instead',
            detail: 'Cut higher up, away from the homes and the trail.',
            // Where you cut, not just how much: a new road, no scar over town, less fire benefit for the Hillside.
            deltas: { treasury: 170000, recreation: -5, residents: -5, forestry: 15, forest: -10 },
            consequence: 'No scar over town. A new road up the mountain. The fuel above the Hillside homes is still there.',
          },
        ],
      },
      {
        id: 'r2',
        title: 'The Windfall',
        prompt:
          'Two offers of fast money. An outside company wants the timber rights to part of the ' +
          'forest, long term: big money up front, but their crews, their mill, their profits. ' +
          'Or salvage the timber a windstorm flattened in Cedar Creek, where the town gets its ' +
          'drinking water, by building a road into the watershed.',
        chairNote:
          'Ask: who captures the value? Where does the money go after it leaves Cedar Bend? ' +
          'Option D is the other kind of fast money: the cost lands on someone else, later. Do ' +
          'not warn them: if they salvage, the next spring\u2019s runoff down the new road muddies ' +
          'the town\u2019s water (it arrives at the start of The Partnership). ' +
          'Hold the real parallel for the debrief: Golden\u2019s 20,000 m\u00B3 community forest ' +
          'allocation went back to the Province in 2010, before a licence was ever issued.',
        options: [
          {
            key: 'A',
            label: 'Take the buyout',
            detail: 'Sign a long-term timber lease.',
            deltas: { treasury: 300000, recreation: -10, residents: -5, forestry: 20, forest: -15 },
            consequence: 'The cheque clears. The logging trucks are not yours, and neither is anyone to call when the Hillside has concerns.',
          },
          {
            key: 'B',
            label: 'Decline, stay the course',
            detail: 'Keep every decision local.',
            deltas: { treasury: 0, recreation: 10, residents: 0, forestry: -10, forest: 0 },
            consequence: 'Independence kept. The bank balance did not move.',
          },
          {
            key: 'C',
            label: 'Negotiate a partial deal',
            detail: 'Shorter term, local hiring, trail buffers.',
            deltas: { treasury: 150000, recreation: -5, residents: 0, forestry: 10, forest: -6 },
            consequence: 'Half the money, most of the control.',
          },
          {
            key: 'D',
            label: 'Salvage the blowdown',
            detail: 'Build a road into the Cedar Creek watershed and log the fallen timber.',
            // Removes dead fuel now; the watershed cost arrives later (see The Partnership's start effects).
            deltas: { treasury: 200000, recreation: -5, residents: -5, forestry: 10, forest: -8 },
            consequence: 'Quick money, and the dead wood is off the mountain. There is a road where there was none.',
          },
        ],
      },
      {
        id: 'trails',
        fullGameOnly: true,
        title: 'The Trail Network',
        prompt:
          'Riders, hikers and paragliders are pouring into Cedar Bend. The trail groups want a ' +
          'new trail network on the upper mountain, and visitors are already parking all along ' +
          'the Hillside streets. Trails bring visitors and money to town. They also take stands ' +
          'out of the timber base, forever.',
        chairNote:
          'This is the pricing round: the forest has more than one product. Ask Recreation ' +
          'whether they would pay for a shuttle ride or a parking spot they now get free, and ' +
          'the Residents who pays for the parking on their streets. Good slot for the optional ' +
          '4 Ps exercise. If they cut the upper stand in The First Harvest, option C is closed: ' +
          'point at it. Early choices close doors.',
        options: [
          {
            key: 'A',
            label: 'Charge for access',
            detail: 'A paid shuttle up the mountain, and parking fees.',
            deltas: { treasury: 120000, recreation: -10, residents: 5, forestry: 0, forest: 0 },
            consequence: 'Visitors pay. Some stop coming. The Hillside streets get quieter.',
          },
          {
            key: 'B',
            label: 'Build it with the trail groups',
            detail: 'A grant-funded network, with a share of tourism revenue.',
            deltas: { treasury: 80000, recreation: 20, residents: -10, forestry: -10, forest: 3 },
            consequence: 'World-class riding. Those stands will never be logged.',
            variants: [
              {
                when: { choice: { round: 'r1', option: 'D' } },
                note: 'The logging road you built in The First Harvest gets the trail crews up the mountain. Cheaper to build.',
                deltas: { treasury: 110000 },
              },
              {
                when: { choice: { round: 'r2', option: 'A' } },
                note: 'The timber company holds the rights on the upper mountain. You pay to buy part of the lease back.',
                deltas: { treasury: -20000, recreation: 10 },
              },
            ],
          },
          {
            key: 'C',
            label: 'Keep it a working forest',
            detail: 'No new trails. Log the upper stands on schedule.',
            deltas: { treasury: 60000, recreation: -15, residents: 0, forestry: 10, forest: -6 },
            consequence: 'The upper mountain stays a timber block. The trail groups notice.',
            locked: {
              when: { choice: { round: 'r1', option: 'D' } },
              note: 'Already harvested: the board cut the upper stand in The First Harvest.',
            },
          },
        ],
      },
      {
        id: 'r3',
        title: 'The Partnership',
        startEffects: [
          {
            when: { choice: { round: 'r2', option: 'D' } },
            label: 'Runoff down the salvage road fouled the town\u2019s water: boil-water advisory, repairs',
            deltas: { treasury: -60000, residents: -15 },
          },
        ],
        // The partner is deliberately unnamed: nobody in the room stands in for a real Nation.
        // Framing is positive by design: an invitation and an opportunity. See docs/SCENARIOS.md
        // (facilitator guidance) before running it, and have your district's Indigenous Education
        // staff review it.
        prompt:
          'Thunderhead Mountain is in the territory of a First Nation that has cared for it for ' +
          'thousands of years, and never gave it up. The Nation\u2019s government invites the board ' +
          'into an equal partnership: shared board seats, shared decisions, and a plan written for ' +
          'the next hundred years, not the next four. It means doing things differently, and it ' +
          'may cost some flexibility and money at first. Whose forest is it?',
        chairNote:
          'Handle as a real governance decision, not a plot twist. Give the voiceless seat ' +
          'explicit standing to speak first. The partner is a government and a rights holder, not ' +
          'a stakeholder, and nobody in the room plays it. No homes or private land are part of ' +
          'this: the forest is Crown land the Province licensed to the town. Name option B for what ' +
          'it is: consultation without power. The partnership\u2019s benefits arrive in later years ' +
          '(funding, and cultural burning that lowers fire risk); declining makes every permit ' +
          'slower. Real parallels for the debrief: about half of BC\u2019s community forests involve ' +
          'First Nations, and forests like Cheakamus (Whistler) and Williams Lake are run as equal ' +
          'partnerships.',
        options: [
          {
            key: 'A',
            label: 'Full partnership',
            detail: 'Co-management: equal board seats and a shared plan, like the Cheakamus forest near Whistler.',
            // The costs are setting up joint governance (money) and reopening harvest plans (Forestry).
            deltas: { treasury: -40000, recreation: 0, residents: 0, forestry: -5, forest: -6 },
            consequence: 'Every decision is now made on a longer horizon. New doors open: funding and knowledge that arrive in the years ahead.',
            variants: [
              {
                when: { choice: { round: 'r2', option: 'A' } },
                note: 'The block you leased in The Windfall sits outside the partnership until the lease runs out.',
                deltas: { forest: -3 },
              },
              {
                when: { any: [{ meter: 'residents', below: 40 }, { meter: 'recreation', below: 35 }] },
                note:
                  'The board burned community trust in earlier years, so it has to rebuild it: a ' +
                  'public engagement process before the partnership starts, at the board\u2019s cost.',
                deltas: { treasury: -70000 },
              },
            ],
          },
          {
            key: 'B',
            label: 'Advisory role only',
            detail: 'They can advise. The board still decides.',
            deltas: { treasury: 0, recreation: 0, residents: 0, forestry: 0, forest: -2 },
            consequence: 'Consultation without power.',
          },
          {
            key: 'C',
            label: 'Decline',
            detail: 'Keep the board as it is.',
            deltas: { treasury: 0, recreation: 0, residents: 0, forestry: 5, forest: 0 },
            consequence: 'Nothing on this screen moved much. That is not the same as no cost.',
            // The costs come later (slower permits every year) and in legitimacy, which no meter
            // captures: raise it in the debrief.
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
          'A good year for timber prices left a surplus. Local clubs need a hand, the Town has ' +
          'aging assets it cannot afford to replace, and the Hillside wants fuel cleared. A ' +
          'private company would pay its owners. Who are yours?',
        chairNote:
          'Social enterprise in one question: the profit belongs to the community, but which ' +
          'part of it? Grants are aimed at specific groups; the capital project is spread across ' +
          'the whole town; the reserve looks boring. Do not tell them the reserve comes back when ' +
          'fire season arrives: it is insurance, and that is the lesson.',
        startEffects: [
          { label: 'Regular timber sales: a good year', deltas: { treasury: 200000, forest: -5 } },
          {
            when: { choice: { round: 'r3', option: 'A' } },
            label: 'The partnership qualifies for joint stewardship funding',
            deltas: { treasury: 40000 },
          },
          {
            when: { choice: { round: 'r3', option: 'A' } },
            label: 'Cultural burning program: a low, slow burn in the shoulder season',
            deltas: { forest: -4 },
          },
          {
            when: { choice: { round: 'r3', option: 'C' } },
            label: 'No partnership: consultation on every cutting permit starts from scratch',
            deltas: { treasury: -30000 },
          },
          {
            when: { choice: { round: 'r3', option: 'B' } },
            label: 'Advisory only: permits still need consultation on each cutblock',
            deltas: { treasury: -15000 },
          },
        ],
        options: [
          {
            key: 'A',
            label: 'Community grants',
            detail: 'Give local clubs and non-profits a hand.',
            deltas: { treasury: -80000, recreation: 10, residents: 5, forestry: 5, forest: 0 },
            consequence: 'The trail society, the ski club, and the food bank all send thank-you letters.',
          },
          {
            key: 'B',
            label: 'Rainy-day reserve',
            detail: 'Put the money aside for a bad year.',
            deltas: { treasury: -100000, recreation: 0, residents: 0, forestry: 0, forest: 0 },
            consequence: 'Nobody sees anything happen. Nobody thanks you.',
          },
          {
            key: 'C',
            label: 'Hire a FireSmart crew',
            detail: 'A local crew clearing fuel around the Hillside homes.',
            deltas: { treasury: -60000, recreation: 0, residents: 10, forestry: 5, forest: -8 },
            consequence: 'Local jobs, less fuel near the homes, less money in the bank.',
          },
          {
            key: 'D',
            label: 'Fund a Town capital project',
            detail: 'Bring forward the Town\u2019s unfunded water system upgrade.',
            deltas: { treasury: -100000, recreation: 5, residents: 15, forestry: 0, forest: 0 },
            consequence: 'A real asset for the whole town, years early. Nobody gets a cheque; everybody gets clean water.',
            variants: [
              {
                when: { choice: { round: 'r2', option: 'D' } },
                note: 'After the boil-water advisory from the salvage road, this is the project everyone was asking for.',
                deltas: { residents: 25 },
              },
            ],
          },
        ],
      },
      {
        id: 'mill',
        fullGameOnly: true,
        title: 'The Mill or the Carbon',
        startEffects: [
          {
            when: { choice: { round: 'r3', option: 'A' } },
            label: 'Cultural burning program: a low, slow burn in the shoulder season',
            deltas: { forest: -4 },
          },
          {
            when: { choice: { round: 'r3', option: 'C' } },
            label: 'No partnership: consultation on every cutting permit starts from scratch',
            deltas: { treasury: -30000 },
          },
          {
            when: { choice: { round: 'r3', option: 'B' } },
            label: 'Advisory only: permits still need consultation on each cutblock',
            deltas: { treasury: -15000 },
          },
        ],
        prompt:
          'Cedar Bend\u2019s mill, the town\u2019s biggest employer, says it will cut jobs unless it ' +
          'gets a guaranteed supply of logs for ten years. The same week, a carbon-offset buyer ' +
          'offers to pay you just as much to leave the trees standing. Same money. Opposite forests.',
        chairNote:
          'The carbon deal pays them to keep the forest dense, above the homes. Do not point ' +
          'that out; let the Residents find it. Carbon credits lock them in: thinning in fire ' +
          'season will break the contract (a game rule, not a documented real case), unless the ' +
          'board partnered in The Partnership: then cultural burning is written into the deal. ' +
          'Option D is the value-capture point again: fewer logs, but more local jobs per tree. ' +
          'Community forests really do create more jobs per cubic metre than the industry average. Real ' +
          'parallel: Whistler\u2019s Cheakamus Community Forest halved its harvest to sell carbon ' +
          'offsets, and is one of only two BC community forests that have.',
        options: [
          {
            key: 'A',
            label: 'Guarantee the mill\u2019s supply',
            detail: 'A ten-year log contract.',
            deltas: { treasury: 150000, recreation: -5, residents: 0, forestry: 20, forest: -12 },
            consequence: 'The mill stays open. The trucks keep rolling.',
            variants: [
              {
                when: { choice: { round: 'trails', option: 'B' } },
                note: 'To fill the contract, crews have to cut the stands beside the new trails.',
                deltas: { recreation: -15 },
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
            deltas: { treasury: 150000, recreation: 5, residents: -5, forestry: -20, forest: 10 },
            consequence: 'Paid to keep it dense. Directly above the Hillside homes.',
            variants: [
              {
                when: { choice: { round: 'r3', option: 'A' } },
                note: 'Your partnership\u2019s cultural burning plan is written into the carbon deal. Burning the understory will not breach it.',
                deltas: {},
              },
            ],
          },
          {
            key: 'C',
            label: 'Neither',
            detail: 'Keep your options open.',
            deltas: { treasury: 0, recreation: 0, residents: 0, forestry: -10, forest: 0 },
            consequence: 'The mill cuts a shift. Forty jobs go. Nobody pays you anything.',
          },
          {
            key: 'D',
            label: 'Sell to local makers',
            detail: 'Supply a timber-frame shop and a post-and-firewood business in town.',
            deltas: { treasury: 70000, recreation: 0, residents: 5, forestry: 5, forest: -5 },
            consequence: 'Less money, and the mill still cuts a shift. But every log becomes something made in Cedar Bend: more local jobs per tree.',
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
          'decides. If the slider is 80 or more, the controlled burn is closed: burning is done in ' +
          'cool, damp seasons, years ahead, not in a drought. Boards that partnered have been ' +
          'burning all along, which is why their slider is lower.',
        // Extra effects when this round starts, on top of the bleed and the growth.
        startEffects: [
          {
            when: { all: [{ choice: { round: 'r3', option: 'A' } }, { not: { choice: { round: 'r2', option: 'A' } } }] },
            label: 'Partnership: new funding, and a cultural burn before the dry season',
            deltas: { treasury: 100000, forest: -6 },
          },
          {
            when: { all: [{ choice: { round: 'r3', option: 'A' } }, { choice: { round: 'r2', option: 'A' } }] },
            label: 'Partnership funding, minus the leased block',
            deltas: { treasury: 50000, forest: -3 },
          },
          {
            when: { choice: { round: 'r3', option: 'C' } },
            label: 'No partnership: consultation on every cutting permit starts from scratch',
            deltas: { treasury: -30000 },
          },
          {
            when: { choice: { round: 'r3', option: 'B' } },
            label: 'Advisory only: permits still need consultation on each cutblock',
            deltas: { treasury: -15000 },
          },
          {
            when: { choice: { round: 'dividend', option: 'B' } },
            label: 'Rainy-day reserve released for fire season',
            deltas: { treasury: 100000 },
          },
        ],
        options: [
          {
            key: 'A',
            label: 'Emergency thin and fuel break',
            detail: 'Crews and machines on the slope now.',
            deltas: { treasury: -150000, recreation: -10, residents: 20, forestry: 10, forest: -25 },
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
            // Prescribed and cultural burns need cool, damp conditions and manageable fuel.
            locked: {
              when: { meter: 'forest', atLeast: 80 },
              note: 'Too dry and dense to burn safely this year.',
            },
            deltas: { treasury: -60000, recreation: -5, residents: 10, forestry: 0, forest: -15 },
            consequence: 'Smoke over town for a week. Less fuel on the hill.',
            variants: [
              {
                when: { all: [{ choice: { round: 'mill', option: 'B' } }, { not: { choice: { round: 'r3', option: 'A' } } }] },
                note: 'Burning the understory breaches part of your carbon contract. You pay a penalty.',
                deltas: { treasury: -110000 },
              },
            ],
          },
          {
            key: 'C',
            label: 'Do nothing, and hope',
            detail: 'Save the money.',
            deltas: { treasury: 0, recreation: 5, residents: 0, forestry: 0, forest: 0 },
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
            'orders, homes damaged at the interface, the trails closed for years.',
          deltas: { treasury: -150000, recreation: -25, residents: -40, forestry: -10, forestTo: 12 },
        },
        {
          id: 'held',
          when: { meter: 'forest', atLeast: 40 },
          title: 'Fire on the mountain, held',
          text:
            'A lightning fire on the upper slope. Crews held it before it reached the homes. ' +
            'A tense week, a big bill, some burned trail.',
          deltas: { treasury: -40000, recreation: -10, residents: -10, forest: -10 },
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
        id: 'reverted',
        when: { sold: true },
        // The community's story ended when the Province took the forest back: no addenda.
        noAddenda: true,
        title: 'Handed back to the Province',
        text:
          'The community forest agreement was cancelled and the timber went back to the Crown. ' +
          'Outside companies bid on it, and the money went to Victoria. Fifty years later, the ' +
          'lower slopes of Thunderhead have been cut twice, and Cedar Bend had no say either time.',
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
          { meter: 'recreation', atLeast: 25 }, { meter: 'residents', atLeast: 25 }, { meter: 'forestry', atLeast: 25 },
        ] },
        title: 'A thriving community asset',
        text:
          'Fifty years later, the forest still pays its own way. The trails are busier than ' +
          'ever, local wood still means local work, and the Hillside sleeps through fire season.',
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

    // Extra lines appended to the epilogue when their condition matches, in this order of
    // priority. At most epilogueAddendaMax are shown, so the screen stays readable.
    epilogueAddendaMax: 3,
    epilogueAddenda: [
      {
        when: { choice: { round: 'r3', option: 'A' } },
        text: 'The forest has been run as a partnership for two generations. Its plans are written in centuries, not years, and both governments sign them.',
      },
      {
        when: { choice: { round: 'r3', option: 'B' } },
        text: 'The Nation advised the board for fifty years. How often the board listened is still debated.',
      },
      {
        when: { choice: { round: 'r3', option: 'C' } },
        text: 'The partnership was offered once. Ask the voiceless seat what that cost.',
      },
      {
        when: { choice: { round: 'r2', option: 'A' } },
        text: 'The timber lease is a line in the history books. The profits never came back to town.',
      },
      {
        when: { choice: { round: 'r2', option: 'D' } },
        text: 'Cedar Creek still runs brown after every big rain. The salvage road is still there.',
      },
      {
        when: { choice: { round: 'mill', option: 'D' } },
        text: 'The timber-frame shop that started with your logs now employs thirty people.',
      },
      {
        when: { choice: { round: 'mill', option: ['B', 'C', 'D'] } },
        text: 'Without a guaranteed supply, the mill cut a shift that year. Some of those families left Cedar Bend.',
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
      { term: 'Pricing and revenue streams', line: 'Timber, shuttle rides, parking, carbon credits: what does a forest sell, and to whom?', when: { length: 'full' } },
      { term: 'Where the profit goes', line: 'A social enterprise decides who its surplus is for.', when: { length: 'full' } },
      { term: 'Market segmentation', line: 'Three blocs, three sets of needs. You could not please all of them.' },
      { term: 'Renewable vs non-renewable', line: 'A forest cut greedily is as gone as a mine.' },
      { term: 'Social entrepreneurship', line: 'A business run for a community, including First Nations communities.' },
      { term: 'Partnership', line: 'About half of BC\u2019s community forests involve First Nations. Shared decisions, longer horizons, and more certainty for everyone.' },
      { term: 'This is not made up', line: 'In 2006 the Province set aside a community forest for Golden, about 4% of the local cut, and took it back in 2010. Today the Shuswap Band, the Town and the regional district are trying again.' },
    ],

    // Used only by tools/simulate.mjs to check the tuning.
    tuning: {
      // One option key per round, per game length: the "cut nothing, protect it all" board.
      // It should go broke or burn.
      protectEverythingPath: { short: 'ABBC', full: 'ABCBBBC' },
      // The partnership must stay the strongest choice in its round: fewest forests lost and
      // most thriving endings, in both game lengths. The simulator warns if tuning breaks this.
      favouredOption: { round: 'r3', option: 'A' },
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = config;
  else root.MOUNT7_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
