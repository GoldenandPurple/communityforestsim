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

const notes = readFileSync(join(root, 'docs/SPEAKING-NOTES.md'), 'utf8');
const notesHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Speaking notes</title>
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
  table { border-collapse: collapse; margin: 0.6rem 0; font-size: 11pt; }
  th, td { border: 1px solid #bbb; padding: 0.25rem 0.5rem; text-align: left; vertical-align: top; }
  .print { font: inherit; font-weight: 700; padding: 0.4em 1em; border: 2px solid #111; background: #fff; border-radius: 0.4em; cursor: pointer; }
  @media print {
    .print { display: none; }
    body { margin: 0; max-width: none; font-size: 11pt; }
    h2 { break-after: avoid; page-break-after: avoid; }
    h2:not(:first-of-type) { break-before: auto; }
    @page { size: letter; margin: 14mm; }
  }
</style></head><body>
<p><button class="print" onclick="window.print()">Print</button></p>
${markdownToHtml(notes)}
</body></html>
`;
writeFileSync(join(root, 'dist/community-forest-speaking-notes.html'), notesHtml);
console.log(`built dist/community-forest-speaking-notes.html (${(notesHtml.length / 1024).toFixed(0)} KB)`);
