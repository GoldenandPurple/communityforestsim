/*
 * Mount 7 Community Forest: scenario and meter configuration.
 *
 * This is the only file you should need to edit to tune the simulation. The dashboard
 * (app/dashboard.html) reads it; `node tools/build.mjs` inlines it into the single-file
 * classroom build in dist/; `node tools/simulate.mjs` plays every path through it.
 *
 * ALL NUMBERS ARE PLACEHOLDERS chosen to make the game play well, not real Golden figures.
 * Replace them once the research items in docs/OPEN-QUESTIONS.md are pulled.
 *
 * Meter keys used in `deltas`:
 *   treasury   dollars (+ adds cash)
 *   bikers     Bikers / Tourism sentiment, 0-100
 *   residents  Selkirk Hill Residents sentiment, 0-100
 *   forestry   Forestry Sector sentiment, 0-100
 *   forest     Forest Health / Wildfire Risk slider, 0-100
 *              100 = lush, high fuel load, high fire risk
 *                0 = thinned, scarred, low fire risk
 *   forestTo   (optional) set the forest slider to an absolute value, e.g. after a burn
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
 *   { all: [ ... ] }, { any: [ ... ] }, { not: { ... } }
 */
(function (root) {
  var config = {
    forestName: 'Mount 7 Community Forest',
    place: 'Golden, BC',

    titleScreen: {
      // Shown under the forest name on the cold open screen. Set to '' to show nothing.
      question: 'Who owns Mount 7?',
    },

    setupScreen: {
      heading: 'You are the board.',
      lines: [
        'Four years. Four decisions. One forest.',
        'The forest has to pay its own way, and it exists for the whole community.',
      ],
      rule: 'One rule: if the Treasury hits zero, the forest is sold. Game over.',
    },

    treasury: {
      label: 'Treasury',
      start: 300000,
      // Fixed costs deducted automatically at the start of every round.
      bleed: 90000,
      bleedLabel: 'Fixed costs: staff, insurance, roads',
      // Extra deduction on the T key, so the chair can lean on it mid-debate.
      manualTick: 10000,
      manualTickLabel: 'While you debate, you are paying staff',
      // Treasury value that fills the bar completely.
      barMax: 800000,
    },

    meters: {
      bikers: { label: 'Bikers / Tourism', bloc: 'Left side of the room', start: 50 },
      residents: { label: 'Selkirk Hill Residents', bloc: 'Middle of the room', start: 50 },
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
      // The interface-fire zone is drawn on the slider from this round onwards (1-based).
      showFireZoneFromRound: 4,
    },

    rounds: [
      {
        id: 'r1',
        title: 'The First Harvest',
        prompt:
          'You have just taken over the forest. It needs to fund itself this year. The lower ' +
          'stand, right above Selkirk Hill and beside a trail you have all ridden, is ready. ' +
          'How hard do you cut?',
        chairNote:
          'After the first vote, surface the Residents knot: they want it cut so they do not ' +
          'burn, and left standing so they keep their view and property values. Same people, ' +
          'two incompatible demands. Then press U to undo and vote again. Do not warn them that ' +
          'Round 1 trust carries into Round 3.',
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
            detail: 'Cut the whole block.',
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
          'Ask: who captures the value? Where does the money go after it leaves Golden? ' +
          '(Salvage alternative, if you prefer: a winter blowdown has killed a big block; ' +
          'salvaging it means roading into a sensitive area. Edit this round in content/config.js.)',
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
        id: 'r3',
        title: 'The Partnership',
        // Verify nations and terminology before running this round (docs/OPEN-QUESTIONS.md).
        prompt:
          'The Ktunaxa and Secwépemc, whose territory this was long before Golden existed, ' +
          'propose co-managing the forest. Co-management changes who decides, and the time ' +
          'horizon the forest is managed on. It may cost flexibility and money now. It may ' +
          'also be the most honest answer to the question: whose forest is it?',
        chairNote:
          'Handle as a real governance decision, not a plot twist. Give the voiceless seat ' +
          'explicit standing to speak first. Name option B for what it is: consultation ' +
          'without power. If they decline, raise the legitimacy cost in the debrief: no meter ' +
          'on this screen captures it.',
        options: [
          {
            key: 'A',
            label: 'Full co-management',
            detail: 'Shared decisions, shared board seats.',
            deltas: { treasury: -40000, bikers: 0, residents: -5, forestry: -5, forest: -6 },
            consequence: 'Every future decision is now made on a longer horizon.',
            variants: [
              {
                when: { choice: { round: 'r2', option: 'A' } },
                note: 'The block you leased in Round 2 sits outside the partnership for 15 years.',
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
                note: 'Forestry wrote this board off in Round 1. Declining wins you nothing back.',
                deltas: { forestry: 0 },
              },
            ],
          },
        ],
      },
      {
        id: 'r4',
        title: 'Fire Season',
        prompt:
          'A hot, dry summer. Lightning in the forecast. Your forest, the one your board built ' +
          'over three years, sits directly above the Selkirk Hill homes. Look at the slider. ' +
          'That is your starting position. What do you do?',
        chairNote:
          'Let the slider do the moralizing. The interface-fire zone is now drawn on it. If ' +
          'they are in the zone, "do nothing" burns Selkirk Hill. No dice: the board they ran ' +
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
        ],
        options: [
          {
            key: 'A',
            label: 'Emergency thin and fuel break',
            detail: 'Crews and machines on the slope now.',
            deltas: { treasury: -150000, bikers: -10, residents: 20, forestry: 10, forest: -25 },
            consequence: 'Expensive, ugly, and fast.',
          },
          {
            key: 'B',
            label: 'Controlled burn',
            detail: 'Burn the understory on a safe day.',
            deltas: { treasury: -60000, bikers: -5, residents: 10, forestry: 0, forest: -15 },
            consequence: 'Smoke over town for a week. Less fuel on the hill.',
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

    // Resolved on the Fire Season Outcome screen, after the Round 4 decision.
    // The first tier whose `when` matches is used; it is deterministic, never luck.
    fire: {
      title: 'Fire Season: what happened',
      tiers: [
        {
          id: 'interface',
          when: { meter: 'forest', atLeast: 65 },
          title: 'The fire reached Selkirk Hill',
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
          'the view. Fifty years later, the lower slopes of Mount 7 have been cut twice, and ' +
          'the money went somewhere else.',
      },
      {
        id: 'burned',
        when: { fire: 'interface' },
        title: 'The fire year',
        text:
          'Everyone in Golden still dates things from the fire. The houses were rebuilt. The ' +
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
          'ever, the mill still buys local logs, and Selkirk Hill sleeps through fire season.',
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
    ],

    closing:
      'The trees you cut this year were planted before any of you were born. The ones you ' +
      'plant, you will never see cut. What do you owe people who cannot vote, complain, or ' +
      'thank you?',

    // Opening and closing vote, shown side by side on the reveal screen.
    roomVote: {
      question: 'Should we log the lower slopes of Mount 7?',
      choices: ['Yes', 'No', 'Unsure'],
    },

    // Debrief screen: revealed one at a time with the Next key. Name, then move on.
    debrief: [
      { term: 'Profit vs break-even', line: 'You were never trying to get rich. You were trying not to die.' },
      { term: 'Who captures the value', line: 'Round 2: when the outsider buys in, the money leaves town.' },
      { term: 'Market segmentation', line: 'Three blocs, three sets of needs. You could not please all of them.' },
      { term: 'Renewable vs non-renewable', line: 'A forest cut greedily is as gone as a mine.' },
      { term: 'Social entrepreneurship', line: 'A business run for a community, including First Nations communities.' },
    ],

    // Used only by tools/simulate.mjs to check the tuning.
    tuning: {
      // One option key per round: the "cut nothing, protect it all" board. It should go broke.
      protectEverythingPath: 'ABBC',
    },
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = config;
  else root.MOUNT7_CONFIG = config;
})(typeof window !== 'undefined' ? window : globalThis);
