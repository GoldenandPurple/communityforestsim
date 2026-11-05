#!/usr/bin/env node
// Build the single-file classroom versions in dist/: every <script src data-inline> is inlined,
// so the result runs from a double-click with no other files and no network.
// Run after editing content/config.js: `node tools/build.mjs`
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const problems = require('../app/engine.js').validateConfig(require('../content/config.js'));
if (problems.length) {
  console.error('Not building: content/config.js has problems:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const pages = [
  ['app/dashboard.html', 'dist/community-forest-dashboard.html'],
  ['app/printables.html', 'dist/community-forest-printables.html'],
];

mkdirSync(join(root, 'dist'), { recursive: true });
for (const [src, out] of pages) {
  const srcPath = join(root, src);
  const html = readFileSync(srcPath, 'utf8').replace(
    /<script src="([^"]+)" data-inline><\/script>/g,
    (_, file) => {
      // Keep a literal "</script>" inside the inlined code from closing the tag early.
      const code = readFileSync(join(dirname(srcPath), file), 'utf8').replace(/<\/script/gi, '<\\/script');
      return `<script>\n/* ${file} */\n${code}</script>`;
    }
  );
  if (/<script src=/.test(html)) throw new Error(`${src} still references an external script`);
  writeFileSync(join(root, out), html);
  console.log(`built ${out} (${(html.length / 1024).toFixed(0)} KB)`);
}

// The speaking notes: docs/SPEAKING-NOTES.md rendered as a printable page. The renderer covers
// only what that file uses (headings, paragraphs, lists, tables, rules, bold, italic, code).
function inline(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function markdownToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let para = [];
  let list = null; // 'ul' while inside a list
  let table = null; // rows of cells while inside a table
  const flushPara = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const flushList = () => { if (list) { out.push('</ul>'); list = null; } };
  const flushTable = () => {
    if (!table) return;
    const [head, , ...body] = table;
    out.push('<table><thead><tr>' + head.map((c) => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
      body.map((r) => '<tr>' + r.map((c) => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>');
    table = null;
  };
  const flushAll = () => { flushPara(); flushList(); flushTable(); };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\|.*\|$/.test(line)) {
      flushPara(); flushList();
      table = table || [];
      table.push(line.slice(1, -1).split('|').map((c) => c.trim()));
      continue;
    }
    flushTable();
    let m;
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if (line === '---') { flushAll(); out.push('<hr>'); continue; }
    if ((m = line.match(/^(#{1,3}) (.*)$/))) { flushAll(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); continue; }
    if ((m = line.match(/^- (.*)$/))) { flushPara(); if (!list) { out.push('<ul>'); list = 'ul'; } out.push('<li>' + inline(m[1]) + '</li>'); continue; }
    if (list && /^  \S/.test(line)) { out[out.length - 1] = out[out.length - 1].replace(/<\/li>$/, ' ' + inline(line.trim()) + '</li>'); continue; }
    flushList();
    para.push(line.trim());
  }
  flushAll();
  return out.join('\n');
}

// A printable page from one or more markdown documents. Each document after the first starts
// on a new printed page.
function printablePage(title, bodies, cover) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  body { font-family: "Segoe UI", "Helvetica Neue", Arial, system-ui, sans-serif; color: #111; background: #fff;
    max-width: 46rem; margin: 2rem auto; padding: 0 1.2rem; line-height: 1.45; font-size: 12pt; }
  h1 { font-size: 22pt; margin: 0 0 0.4rem; }
  h2 { font-size: 15pt; margin: 1.6rem 0 0.4rem; border-bottom: 2px solid #111; padding-bottom: 0.15rem; }
  hr { border: 0; border-top: 1px solid #bbb; margin: 1.4rem 0; }
  p { margin: 0.45rem 0; }
  ul { margin: 0.3rem 0 0.6rem 1.2rem; padding: 0; }
  li { margin: 0.2rem 0; }
  strong { font-weight: 800; }
  code { font-size: 0.92em; background: #f1f1f1; padding: 0 0.2em; border-radius: 3px; }
  table { border-collapse: collapse; margin: 0.6rem 0; font-size: 10.5pt; width: 100%; }
  th, td { border: 1px solid #bbb; padding: 0.25rem 0.5rem; text-align: left; vertical-align: top; }
  td:first-child { white-space: nowrap; }
  tr { break-inside: avoid; page-break-inside: avoid; }
  .doc + .doc { break-before: page; page-break-before: always; }
  .cover { min-height: 85vh; display: flex; flex-direction: column; justify-content: center; break-after: page; page-break-after: always; }
  .cover .kicker { font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #8a5a00; font-size: 11pt; }
  .cover h1 { font-size: 34pt; line-height: 1.05; margin: 0.6rem 0 1rem; }
  .cover p { font-size: 13pt; max-width: 32rem; }
  .cover ol { font-size: 13pt; }
  .print { font: inherit; font-weight: 700; padding: 0.4em 1em; border: 2px solid #111; background: #fff; border-radius: 0.4em; cursor: pointer; }
  @media print {
    .print { display: none; }
    body { margin: 0; max-width: none; font-size: 11pt; }
    h2 { break-after: avoid; page-break-after: avoid; }
    @page { size: letter; margin: 14mm; }
  }
</style></head><body>
<p><button class="print" onclick="window.print()">Print</button></p>
${cover || ''}
${bodies.map((b) => '<div class="doc">' + markdownToHtml(b) + '</div>').join('\n')}
</body></html>
`;
}

const runOfShow = readFileSync(join(root, 'docs/RUN-OF-SHOW.md'), 'utf8');
const notes = readFileSync(join(root, 'docs/SPEAKING-NOTES.md'), 'utf8');
const cfgForGuide = require('../content/config.js');

const outputs = [
  ['dist/community-forest-speaking-notes.html', printablePage('Speaking notes', [notes])],
  ['dist/community-forest-facilitator-guide.html', printablePage('Facilitator guide', [runOfShow, notes], `
<section class="cover">
  <div class="kicker">Facilitator guide</div>
  <h1>${cfgForGuide.forestName}</h1>
  <p>A governance simulation for a high school class. The class is the board of the community forest
  above ${cfgForGuide.town}, and has to keep it running while giving back to the town.</p>
  <ol>
    <li><strong>Run of show:</strong> the timing, for the full game (7 years) and the short game (4 years).</li>
    <li><strong>Speaking notes:</strong> what to say, ask and press on every screen.</li>
  </ol>
  <p>Real-world figures in the game come from research that could mostly read only search-result
  excerpts. Check them against <code>reports/BC community forest decisions and outcomes.md</code> before class.</p>
</section>`)],
];
for (const [out, html] of outputs) {
  writeFileSync(join(root, out), html);
  console.log(`built ${out} (${(html.length / 1024).toFixed(0)} KB)`);
}
