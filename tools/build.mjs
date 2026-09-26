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
  ['app/dashboard.html', 'dist/mount7-dashboard.html'],
  ['app/printables.html', 'dist/mount7-printables.html'],
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
