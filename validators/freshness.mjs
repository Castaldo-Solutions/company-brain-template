#!/usr/bin/env node
// freshness: reports facts that have gone stale.
//
// Usage: node validators/freshness.mjs
//
// Reads the frontmatter of every .md file and compares verified_on plus
// review_every against today. Exits 1 when an expired file is still marked
// `status: current`, which is a silent lie and the thing worth catching.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

// Artefacts and procedures are not facts: they carry no verified_on and do
// not expire.
const SKIP = new Set(['node_modules', '.git', 'validators', '.github']);

// Project documentation, not company facts.
const NOT_FACTS = new Set(['README.md', 'INSTALL.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md', 'CORE.md']);

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (SKIP.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.md')) out.push(p);
  }
  return out;
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+?)\s*$/);
    if (kv) fm[kv[1]] = kv[2];
  }
  return fm;
}

const DAYS = { d: 1, w: 7, m: 30, y: 365 };
function toDays(s) {
  const m = String(s || '').match(/^(\d+)([dwmy])$/);
  return m ? Number(m[1]) * DAYS[m[2]] : null;
}

const today = new Date();
let expired = 0;
let missing = 0;
const rows = [];

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  if (NOT_FACTS.has(rel)) continue;
  if (rel.endsWith('/README.md')) continue;      // folder documentation
  if (rel.startsWith('decisions/')) continue;     // append-only, they never expire

  const fm = frontmatter(readFileSync(file, 'utf8'));
  if (!fm || !fm.verified_on) {
    rows.push(['NO DATE', rel, '']);
    missing++;
    continue;
  }
  // A template still full of placeholders is not an expired fact.
  if (String(fm.verified_on).startsWith('[')) continue;

  const days = toDays(fm.review_every) ?? 90;
  const age = Math.floor((today - new Date(fm.verified_on)) / 86400000);
  if (fm.status === 'stale') rows.push(['STALE', rel, `${age}d`]);
  else if (age > days) {
    rows.push(['EXPIRED', rel, `${age}d of ${days}`]);
    expired++;
  }
}

if (rows.length === 0) {
  console.log('freshness: everything current');
} else {
  for (const [state, file, age] of rows) console.log(`${state.padEnd(9)} ${file} ${age}`);
  console.log(`\n${expired} expired, ${missing} without a date`);
}

process.exit(expired > 0 ? 1 : 0);
