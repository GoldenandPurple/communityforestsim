#!/usr/bin/env node
// Play every possible path through the simulation, for each game length, and print what happens.
// Use it while tuning content/config.js:
//   node tools/simulate.mjs                 summary for both lengths
//   node tools/simulate.mjs --all           also list every path
//   node tools/simulate.mjs --length=short  one length only
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const cfg = require('../content/config.js');
const E = require('../app/engine.js');

const showAll = process.argv.includes('--all');
const onlyLength = (process.argv.find((a) => a.startsWith('--length=')) || '').split('=')[1];

const problems = E.validateConfig(cfg);
if (problems.length) {
  console.error('Config problems:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const k = (n) => (n / 1000).toFixed(0).padStart(5) + 'k';
const pad = (x, n) => String(x).padEnd(n);

let totalWarnings = 0;
for (const length of cfg.gameLengths.map((l) => l.id)) {
  if (onlyLength && length !== onlyLength) continue;
  const rounds = E.activeRounds(cfg, length);

  const play = (path) => {
    let s = E.initialState(cfg, length);
    const treasuryByRound = [];
    for (let i = 0; i < rounds.length; i++) {
      s = E.startRound(s, rounds[i].id, cfg).state;
      // Paths through an option that earlier choices closed off are not playable.
      if (E.resolveOption(s, rounds[i].id, path[i], cfg).locked) return null;
      s = E.applyOption(s, rounds[i].id, path[i], cfg).state;
      treasuryByRound.push(s.treasury);
    }
    s = E.resolveFire(s, cfg).state;
    return { path: path.join(''), s, treasuryByRound, epilogue: E.epilogue(s, cfg).outcome.id };
  };

  // Every combination of option keys across the rounds.
  let paths = [[]];
  for (const round of rounds) paths = paths.flatMap((p) => round.options.map((o) => [...p, o.key]));
  const results = paths.map(play).filter(Boolean);

  console.log(`\n=== ${length} game: ${rounds.length} rounds (${rounds.map((r) => r.id).join(', ')}) ===`);

  if (showAll) {
    const w = rounds.length + 2;
    console.log(pad('path', w) + pad('treasury after each round', rounds.length * 6 + 2) + 'rec res for  forest  fire       ending');
    for (const r of results) {
      const m = r.s.meters;
      console.log(
        pad(r.path, w) +
          pad(r.treasuryByRound.map(k).join(''), rounds.length * 6 + 2) +
          [m.recreation, m.residents, m.forestry].map((v) => String(v).padStart(3)).join(' ') +
          String(r.s.forest).padStart(7) + '  ' +
          pad(r.s.fire, 10) + ' ' +
          r.epilogue + (r.s.sold ? ` (sold during: ${r.s.soldDuring})` : '')
      );
    }
  }

  console.log(`${results.length} paths.\n\nEndings:`);
  const byEnding = {};
  for (const r of results) (byEnding[r.epilogue] ||= []).push(r.path);
  for (const e of cfg.epilogues) {
    const list = byEnding[e.id] || [];
    const pct = ((list.length / results.length) * 100).toFixed(0).padStart(3);
    console.log(`  ${pad(e.id, 10)} ${String(list.length).padStart(5)} ${pct}%  e.g. ${list.slice(0, 5).join(' ')}`);
  }

  console.log('\nFire outcomes:');
  const byFire = {};
  for (const r of results) byFire[r.s.fire] = (byFire[r.s.fire] || 0) + 1;
  for (const t of cfg.fire.tiers) console.log(`  ${pad(t.id, 10)} ${String(byFire[t.id] || 0).padStart(5)}`);

  console.log('\nTuning checks:');
  let warnings = 0;
  const warn = (msg) => { warnings++; console.log('  ! ' + msg); };

  const protect = cfg.tuning?.protectEverythingPath?.[length];
  const preserve = results.find((r) => r.path === protect);
  if (protect && !preserve) warn(`tuning.protectEverythingPath.${length} "${protect}" is not a valid path for ${rounds.length} rounds.`);
  if (preserve && !preserve.s.sold && preserve.s.fire !== 'interface') {
    warn(`"Protect everything" (${preserve.path}) neither goes broke nor burns: ends "${preserve.epilogue}".`);
  }

  // A clean win: no sentiment bar ends 10+ below its start AND the Treasury ends no lower than it began.
  const painless = results.filter((r) =>
    !r.s.sold && r.s.fire !== 'interface' && r.s.treasury >= cfg.treasury.start &&
    !E.SENTIMENTS.some((m) => r.s.meters[m] <= cfg.meters[m].start - 10));
  // A handful is fine (boards that burned trust early and rebuilt it); more than 1% means an easy route.
  if (painless.length > results.length / 100) {
    warn(`${painless.length} path(s) cost nothing: every bar within 10 of its start and the Treasury intact, e.g. ${painless.slice(0, 5).map((r) => r.path).join(' ')}`);
  }

  rounds.forEach((round, i) => {
    for (const o of round.options) {
      const d = o.deltas;
      const costs = ['treasury', ...E.SENTIMENTS].some((m) => (d[m] || 0) < 0);
      if (!costs && (d.forest || 0) >= 0 && !o.freeOnPurpose) warn(`${round.id} ${o.key} "${o.label}" costs nothing on any meter.`);
      const theseEndings = new Set(results.filter((r) => r.path[i] === o.key).map((r) => r.epilogue));
      if (theseEndings.size === 1) warn(`${round.id} ${o.key} always leads to "${[...theseEndings][0]}" no matter what else happens.`);
    }
  });
  if (!warnings) console.log('  none');
  if (painless.length && painless.length <= results.length / 100) {
    console.log(`  (${painless.length} path(s) end with every bar within 10 of its start and the Treasury intact, e.g. ${painless[0].path}: fine at this rate)`);
  }
  totalWarnings += warnings;
}
