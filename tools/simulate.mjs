#!/usr/bin/env node
// Play every possible path through the simulation and print what happens.
// Use it while tuning content/config.js: `node tools/simulate.mjs` (add --all to list every path).
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const cfg = require('../content/config.js');
const E = require('../app/engine.js');

const showAll = process.argv.includes('--all');

const problems = E.validateConfig(cfg);
if (problems.length) {
  console.error('Config problems:\n  ' + problems.join('\n  '));
  process.exit(1);
}

function play(path) {
  let s = E.initialState(cfg);
  const treasuryByRound = [];
  cfg.rounds.forEach((round, i) => {
    s = E.startRound(s, round.id, cfg).state;
    s = E.applyOption(s, round.id, path[i], cfg).state;
    treasuryByRound.push(s.treasury);
  });
  s = E.resolveFire(s, cfg).state;
  return { path: path.join(''), s, treasuryByRound, epilogue: E.epilogue(s, cfg).outcome.id };
}

// Every combination of option keys across the rounds.
let paths = [[]];
for (const round of cfg.rounds) {
  paths = paths.flatMap((p) => round.options.map((o) => [...p, o.key]));
}
const results = paths.map(play);

const k = (n) => (n / 1000).toFixed(0).padStart(5) + 'k';
const pad = (x, n) => String(x).padEnd(n);

if (showAll) {
  console.log(pad('path', 6) + 'treasury after each round'.padEnd(28) + 'bik res for  forest  fire       ending');
  for (const r of results) {
    const m = r.s.meters;
    console.log(
      pad(r.path, 6) +
        pad(r.treasuryByRound.map(k).join(''), 28) +
        [m.bikers, m.residents, m.forestry].map((v) => String(v).padStart(3)).join(' ') +
        String(r.s.forest).padStart(7) + '  ' +
        pad(r.s.fire, 10) + ' ' +
        r.epilogue + (r.s.sold ? ` (sold during: ${r.s.soldDuring})` : '')
    );
  }
  console.log();
}

console.log(`${results.length} paths.\n\nEndings:`);
const byEnding = {};
for (const r of results) (byEnding[r.epilogue] ||= []).push(r.path);
for (const e of cfg.epilogues) {
  const list = byEnding[e.id] || [];
  console.log(`  ${pad(e.id, 10)} ${String(list.length).padStart(3)}  e.g. ${list.slice(0, 6).join(' ')}`);
}

console.log('\nFire outcomes:');
const byFire = {};
for (const r of results) byFire[r.s.fire] = (byFire[r.s.fire] || 0) + 1;
for (const t of cfg.fire.tiers) console.log(`  ${pad(t.id, 10)} ${String(byFire[t.id] || 0).padStart(3)}`);

console.log('\nTuning checks:');
let warnings = 0;
const warn = (msg) => { warnings++; console.log('  ! ' + msg); };

const preserve = results.find((r) => r.path === cfg.tuning?.protectEverythingPath);
if (preserve && !preserve.s.sold) warn(`"Protect everything" (${preserve.path}) stays solvent: the bleed is not threatening enough.`);

for (const r of results) {
  const hurt = E.SENTIMENTS.some((m) => r.s.meters[m] <= cfg.meters[m].start - 10);
  if (!hurt && !r.s.sold && r.s.fire !== 'interface') warn(`Path ${r.path} hurts nobody: no sentiment bar ends 10+ below its start.`);
}

cfg.rounds.forEach((round, i) => {
  for (const o of round.options) {
    const d = o.deltas;
    const costs = ['treasury', ...E.SENTIMENTS].some((m) => (d[m] || 0) < 0);
    if (!costs && (d.forest || 0) >= 0 && !o.freeOnPurpose) warn(`${round.id} ${o.key} "${o.label}" costs nothing on any meter.`);
    const theseEndings = new Set(results.filter((r) => r.path[i] === o.key).map((r) => r.epilogue));
    if (theseEndings.size === 1) warn(`${round.id} ${o.key} always leads to "${[...theseEndings][0]}" no matter what else happens.`);
  }
});
if (!warnings) console.log('  none');
