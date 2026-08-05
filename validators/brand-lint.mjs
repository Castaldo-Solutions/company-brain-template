#!/usr/bin/env node
// brand-lint: makes the non-negotiable rules of CORE.md executable.
//
// Usage:
//   node validators/brand-lint.mjs file1.md file2.md ...
//   node validators/brand-lint.mjs <folder>
//   node validators/brand-lint.mjs --stdin [name]  < text
//   git diff --cached -U0 | node validators/brand-lint.mjs --diff
//
// Exits 1 when it finds blocking violations.
//
// The --diff mode is the one that matters at commit time: it looks ONLY at
// added lines, with real file names and line numbers. Existing debt is never
// charged to whoever touches the file today.
//
// The rules live in rules.mjs. That is the file you edit.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { RULES } from './rules.mjs';

// The perimeter is what a human reads as content. Code has its own rules and
// has nothing to do with tone of voice: an em dash in a JS comment is not a
// brand problem.
const CONTENT = /\.(md|markdown|html|htm|twig|txt)$/i;
const MARKUP = /\.(html?|twig|svg|php|js|mjs|css)$/i;

function context(name) {
  return { markup: MARKUP.test(name || '') };
}

// Lines that declare a rule necessarily contain the forbidden term. They opt
// out with the `brand-lint:ignore` pragma. Fenced code blocks are skipped.
function stripExempt(text) {
  let fence = false;
  const NL = String.fromCharCode(10);
  return text
    .split(NL)
    .map((l) => {
      if (/^\s*```/.test(l)) { fence = !fence; return ''; }
      if (fence) return '';
      if (l.includes('brand-lint:ignore')) return '';
      return l;
    })
    .join(NL);
}

function lineViolations(line, ctx) {
  const out = [];
  if (line.includes('brand-lint:ignore')) return out;
  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    let m;
    while ((m = rule.re.exec(line)) !== null) {
      if (m.index === rule.re.lastIndex) rule.re.lastIndex++;
      if (rule.skip && rule.skip(m[0], line, m.index, ctx)) continue;
      out.push({ ...rule, match: m[0] });
    }
  }
  return out;
}

function report(name, number, v) {
  console.log(
    `${v.level === 'error' ? 'ERROR ' : 'warn  '} ${name}:${number}  [${v.id}] "${v.match}" ${v.msg}`
  );
}

function lint(name, rawText) {
  const ctx = context(name);
  const NL = String.fromCharCode(10);
  let errors = 0;
  stripExempt(rawText)
    .split(NL)
    .forEach((line, i) => {
      for (const v of lineViolations(line, ctx)) {
        report(name, i + 1, v);
        if (v.level === 'error') errors++;
      }
    });
  return errors;
}

// Unified diff on stdin: only added lines are checked. Note that a diff does
// not tell you whether a line sits inside a fenced code block, so there the
// only way out is the `brand-lint:ignore` pragma on the line itself.
function lintDiff(raw) {
  const NL = String.fromCharCode(10);
  let name = null;
  let ctx = { markup: false };
  let line = 0;
  let errors = 0;

  for (const l of raw.split(NL)) {
    if (l.startsWith('+++ ')) {
      const p = l.slice(4).trim().replace(/^b\//, '');
      name = p !== '/dev/null' && CONTENT.test(p) ? p : null;
      ctx = context(name);
      continue;
    }
    if (l.startsWith('--- ') || l.startsWith('diff --git')) continue;
    if (l.startsWith('@@')) {
      const m = /\+(\d+)/.exec(l);
      line = m ? parseInt(m[1], 10) : 1;
      continue;
    }
    if (!name) continue;
    if (l.startsWith('+')) {
      for (const v of lineViolations(l.slice(1), ctx)) {
        report(name, line, v);
        if (v.level === 'error') errors++;
      }
      line++;
    } else if (l.startsWith(' ')) {
      line++;
    }
  }
  return errors;
}

const SKIP = /(^|[\\/])(node_modules|\.git|vendor|dist|build|out|.*\.min\.(js|css)|package-lock\.json)([\\/]|$)/;

// Pointing the linter at a folder checks content files only: an .mjs or a
// .php is code, and tone of voice does not apply. Pointing it at a specific
// file checks that file regardless: you know what you are doing.
function expand(path, out = [], explicit = false) {
  if (SKIP.test(path)) return out;
  let st;
  try { st = statSync(path); } catch { return out; }
  if (st.isDirectory()) {
    for (const n of readdirSync(path)) expand(join(path, n), out, false);
  } else if (explicit || CONTENT.test(path)) {
    out.push(path);
  }
  return out;
}

const args = process.argv.slice(2);
let errors = 0;

if (args[0] === '--diff') {
  errors = lintDiff(readFileSync(0, 'utf8'));
} else if (args[0] === '--stdin') {
  errors = lint(args[1] || '<stdin>', readFileSync(0, 'utf8'));
} else if (args.length === 0) {
  console.error('usage: node validators/brand-lint.mjs <file or folder...> | --stdin [name] | --diff');
  process.exit(2);
} else {
  const files = args.flatMap((a) => expand(a, [], true));
  if (files.length === 0) console.error('brand-lint: nothing to check in', args.join(' '));
  for (const f of files) errors += lint(f, readFileSync(f, 'utf8'));
}

if (errors === 0) console.log('brand-lint: no blocking violations');
process.exit(errors > 0 ? 1 : 0);
