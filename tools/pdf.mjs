#!/usr/bin/env node
// Render the facilitator guide (run of show + speaking notes) to a printable PDF.
// Run after `node tools/build.mjs`: `node tools/pdf.mjs`
// Needs Playwright with Chromium (local install, or a global one: `npm i -g playwright`).
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try { return require('playwright'); } catch {}
  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    return createRequire(join(globalRoot, 'noop.js'))('playwright');
  } catch {}
  console.error('Playwright is not installed. Install it (npm i -g playwright) or print the HTML page from a browser instead.');
  process.exit(1);
}

const { chromium } = loadPlaywright();
const src = join(root, 'dist/community-forest-facilitator-guide.html');
const out = join(root, 'dist/community-forest-facilitator-guide.pdf');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(src).href);
await page.pdf({
  path: out,
  format: 'Letter',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font-size:8pt;color:#666;padding:0 14mm;display:flex;justify-content:space-between;">' +
    '<span>Thunderhead Mountain Community Forest · Facilitator guide</span>' +
    '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
  margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' },
});
await browser.close();
console.log('built dist/community-forest-facilitator-guide.pdf');
