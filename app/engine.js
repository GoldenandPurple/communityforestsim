/*
 * Community forest simulation engine: pure state transitions, no DOM.
 * Shared by the dashboard (app/dashboard.html) and the path simulator (tools/simulate.mjs).
 * Every function takes a state and returns a new state plus a list of the changes made,
 * so the dashboard can animate them and keep an undo history.
 */
(function (root) {
  var SENTIMENTS = ['recreation', 'residents', 'forestry'];

  function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  // The rounds played in a game length: the short game skips rounds marked fullGameOnly.
  function activeRounds(cfg, length) {
    return cfg.rounds.filter(function (r) { return length !== 'short' || !r.fullGameOnly; });
  }

  function initialState(cfg, length) {
    var meters = {};
    SENTIMENTS.forEach(function (k) {
      meters[k] = cfg.meters[k].start;
    });
    return {
      length: length || cfg.defaultLength || 'full',
      treasury: cfg.treasury.start,
      meters: meters,
      forest: cfg.forest.start,
      choices: {}, // roundId -> option key
      started: {}, // roundId -> true once its start effects have been applied
      sold: false,
      soldDuring: null,
      fire: null, // id of the fire tier that happened
      ledger: [], // treasury movements: { label, amount, balance }
      votes: {}, // roundId -> { ballot: {A,B,C}, hands: {A,B,C} }
      roomVote: { opening: null, closing: null },
    };
  }

  function meterValue(state, name) {
    if (name === 'treasury') return state.treasury;
    if (name === 'forest') return state.forest;
    if (name === 'sentiment') {
      return SENTIMENTS.reduce(function (sum, k) { return sum + state.meters[k]; }, 0) / SENTIMENTS.length;
    }
    if (name in state.meters) return state.meters[name];
    throw new Error('Unknown meter in condition: ' + name);
  }

  function evalCond(cond, state) {
    if (!cond) return true;
    if (cond.all) return cond.all.every(function (c) { return evalCond(c, state); });
    if (cond.any) return cond.any.some(function (c) { return evalCond(c, state); });
    if (cond.not) return !evalCond(cond.not, state);
    if (cond.choice) {
      var chosen = state.choices[cond.choice.round];
      var wanted = [].concat(cond.choice.option);
      return wanted.indexOf(chosen) !== -1;
    }
    if ('sold' in cond) return state.sold === cond.sold;
    if ('fire' in cond) return state.fire === cond.fire;
    if ('length' in cond) return state.length === cond.length;
    if (cond.meter) {
      var v = meterValue(state, cond.meter);
      if ('below' in cond && !(v < cond.below)) return false;
      if ('atLeast' in cond && !(v >= cond.atLeast)) return false;
      return true;
    }
    throw new Error('Unknown condition: ' + JSON.stringify(cond));
  }

  // Apply a deltas object. Returns { state, changes } where changes lists every meter that moved.
  function applyDeltas(state, deltas, label, cfg) {
    var s = clone(state);
    var changes = [];
    Object.keys(deltas || {}).forEach(function (k) {
      var d = deltas[k];
      if (k === 'treasury') {
        if (!d) return;
        var before = s.treasury;
        s.treasury += d;
        s.ledger.push({ label: label, amount: d, balance: s.treasury });
        changes.push({ meter: 'treasury', from: before, to: s.treasury });
      } else if (k === 'forest' || k === 'forestTo') {
        var fb = s.forest;
        s.forest = clamp(k === 'forestTo' ? d : s.forest + d, 0, 100);
        if (s.forest !== fb) changes.push({ meter: 'forest', from: fb, to: s.forest });
      } else if (SENTIMENTS.indexOf(k) !== -1) {
        if (!d) return;
        var mb = s.meters[k];
        s.meters[k] = clamp(mb + d, 0, 100);
        if (s.meters[k] !== mb) changes.push({ meter: k, from: mb, to: s.meters[k] });
      } else {
        throw new Error('Unknown delta key: ' + k);
      }
    });
    if (!s.sold && s.treasury <= 0) {
      s.sold = true;
      s.soldDuring = label;
    }
    return { state: s, changes: changes };
  }

  function chain(state, steps, cfg) {
    var changes = [];
    var events = [];
    steps.forEach(function (step) {
      var r = applyDeltas(state, step.deltas, step.label, cfg);
      state = r.state;
      changes = changes.concat(r.changes);
      if (r.changes.length) events.push(step.label);
    });
    return { state: state, changes: changes, events: events };
  }

  function findRound(cfg, roundId) {
    for (var i = 0; i < cfg.rounds.length; i++) if (cfg.rounds[i].id === roundId) return cfg.rounds[i];
    throw new Error('Unknown round: ' + roundId);
  }

  // Start-of-round effects: fixed-cost bleed, forest growth, and any conditional start effects.
  function startRound(state, roundId, cfg) {
    var round = findRound(cfg, roundId);
    var steps = [
      { label: cfg.treasury.bleedLabel, deltas: { treasury: -cfg.treasury.bleed } },
      { label: cfg.forest.growthLabel, deltas: { forest: cfg.forest.growthPerRound } },
    ];
    (round.startEffects || []).forEach(function (e) {
      if (evalCond(e.when, state)) steps.push({ label: e.label, deltas: e.deltas });
    });
    var r = chain(state, steps, cfg);
    r.state.started[roundId] = true;
    return r;
  }

  // The option as it applies right now, with any matching variants folded in.
  function resolveOption(state, roundId, key, cfg) {
    var round = findRound(cfg, roundId);
    var opt = round.options.filter(function (o) { return o.key === key; })[0];
    if (!opt) return null;
    var deltas = clone(opt.deltas);
    var notes = [];
    (opt.variants || []).forEach(function (v) {
      if (!evalCond(v.when, state)) return;
      if (v.note) notes.push(v.note);
      Object.keys(v.deltas || {}).forEach(function (k) { deltas[k] = v.deltas[k]; });
    });
    return { key: opt.key, label: opt.label, detail: opt.detail, consequence: opt.consequence, deltas: deltas, notes: notes };
  }

  function applyOption(state, roundId, key, cfg) {
    var opt = resolveOption(state, roundId, key, cfg);
    if (!opt) throw new Error('No option ' + key + ' in ' + roundId);
    var round = findRound(cfg, roundId);
    var r = applyDeltas(state, opt.deltas, round.title + ': ' + opt.label, cfg);
    r.state.choices[roundId] = key;
    r.option = opt;
    return r;
  }

  function manualTick(state, cfg) {
    return applyDeltas(state, { treasury: -cfg.treasury.manualTick }, cfg.treasury.manualTickLabel, cfg);
  }

  function fireTier(state, cfg) {
    return cfg.fire.tiers.filter(function (t) { return evalCond(t.when, state); })[0];
  }

  function resolveFire(state, cfg) {
    var tier = fireTier(state, cfg);
    var r = applyDeltas(state, tier.deltas, 'Fire season: ' + tier.title, cfg);
    r.state.fire = tier.id;
    r.tier = tier;
    return r;
  }

  function epilogue(state, cfg) {
    var outcome = cfg.epilogues.filter(function (e) { return evalCond(e.when, state); })[0];
    var addenda = (cfg.epilogueAddenda || [])
      .filter(function (a) { return evalCond(a.when, state); })
      .map(function (a) { return a.text; });
    return { outcome: outcome, addenda: addenda };
  }

  function moodWord(value, cfg) {
    for (var i = 0; i < cfg.moods.length; i++) if (value >= cfg.moods[i].atLeast) return cfg.moods[i].word;
    return '';
  }

  // Catch config mistakes early: returns a list of human-readable problems.
  function validateConfig(cfg) {
    var problems = [];
    var probe = initialState(cfg);
    function tryCond(c, where) {
      try { evalCond(c, probe); } catch (e) { problems.push(where + ': ' + e.message); }
    }
    function tryDeltas(d, where) {
      try { applyDeltas(probe, d, where, cfg); } catch (e) { problems.push(where + ': ' + e.message); }
    }
    var lengthIds = (cfg.gameLengths || []).map(function (l) { return l.id; });
    ['full', 'short'].forEach(function (id) {
      if (lengthIds.indexOf(id) === -1) problems.push('gameLengths needs an entry with id "' + id + '"');
    });
    if (cfg.defaultLength && lengthIds.indexOf(cfg.defaultLength) === -1) problems.push('defaultLength must be one of the gameLengths ids');
    if (!activeRounds(cfg, 'short').length) problems.push('The short game has no rounds: mark fewer rounds fullGameOnly');
    (cfg.debrief || []).forEach(function (d, i) { tryCond(d.when, 'debrief item ' + (i + 1)); });
    var ids = {};
    cfg.rounds.forEach(function (r, i) {
      if (!r.id) problems.push('Round ' + (i + 1) + ' has no id');
      if (ids[r.id]) problems.push('Duplicate round id ' + r.id);
      ids[r.id] = true;
      if (!r.options || !r.options.length) problems.push(r.id + ' has no options');
      (r.options || []).forEach(function (o) {
        if (!/^[A-Z]$/.test(o.key) || 'FGHIKLRTUV'.indexOf(o.key) !== -1) {
          problems.push(r.id + ' option key "' + o.key + '" must be a single letter not used by another control (A, B, C are safest)');
        }
        tryDeltas(o.deltas, r.id + ' ' + o.key);
        (o.variants || []).forEach(function (v) {
          tryCond(v.when, r.id + ' ' + o.key + ' variant');
          tryDeltas(v.deltas, r.id + ' ' + o.key + ' variant');
        });
      });
      (r.startEffects || []).forEach(function (e) {
        tryCond(e.when, r.id + ' start effect');
        tryDeltas(e.deltas, r.id + ' start effect');
      });
    });
    cfg.fire.tiers.forEach(function (t) { tryCond(t.when, 'fire tier ' + t.id); tryDeltas(t.deltas, 'fire tier ' + t.id); });
    cfg.epilogues.forEach(function (e) { tryCond(e.when, 'epilogue ' + e.id); });
    (cfg.epilogueAddenda || []).forEach(function (a, i) { tryCond(a.when, 'epilogue addendum ' + (i + 1)); });
    var last = cfg.epilogues[cfg.epilogues.length - 1];
    if (!last || JSON.stringify(last.when) !== JSON.stringify({ meter: 'forest', atLeast: 0 })) {
      problems.push('The last epilogue should be a catch-all ({ meter: "forest", atLeast: 0 }) so every game gets an ending');
    }
    return problems;
  }

  var engine = {
    SENTIMENTS: SENTIMENTS,
    clone: clone,
    activeRounds: activeRounds,
    initialState: initialState,
    evalCond: evalCond,
    applyDeltas: applyDeltas,
    startRound: startRound,
    resolveOption: resolveOption,
    applyOption: applyOption,
    manualTick: manualTick,
    fireTier: fireTier,
    resolveFire: resolveFire,
    epilogue: epilogue,
    moodWord: moodWord,
    meterValue: meterValue,
    validateConfig: validateConfig,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  else root.Mount7Engine = engine;
})(typeof window !== 'undefined' ? window : globalThis);
