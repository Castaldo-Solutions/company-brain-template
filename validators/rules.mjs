// rules.mjs: the writing rules of your company, made executable.
//
// THIS IS THE FILE YOU EDIT. The engine in brand-lint.mjs stays as it is.
//
// A rule earns its place here only if it can be checked mechanically.
// "Write clearly" is not a rule. "Never use an em dash" is one.
//
// Each rule needs:
//   id     short slug, shown in the report
//   level  'error' blocks (exit 1), 'warn' only reports
//   re     a global regular expression
//   msg    what to do instead, not just what is wrong
//   skip   optional, (match, line, index, ctx) => boolean, to allow exceptions
//
// A note on the ones shipped here: they are a starting point, not a standard.
// Rules 1 and 2 are close to universal, rule 3 is ours and you may well
// disagree with it. Replace the lot.

// Typographic marks are text, not icons. In prose they are fine. In markup
// they are not: a checkmark character standing in for an <svg> is how an
// infographic ships looking like a chat message. The distinction is context,
// not the glyph itself.
export const TYPOGRAPHIC = new Set([
  0x2605, 0x2606, // filled and empty star
  0x2610, 0x2611, 0x2612, // ballot boxes
  0x2713, 0x2714, 0x2715, 0x2716, 0x2717, 0x2718, // checks and crosses
  0x2726, 0x2727, 0x2731, 0x2733, // decorative asterisks
  0x276e, 0x276f, // chevrons
]);

export const RULES = [
  {
    id: 'em-dash',
    level: 'error',
    re: /—/g, // brand-lint:ignore
    msg: 'em dash: use a comma, a colon, parentheses or a full stop',
  },
  {
    id: 'emoji',
    level: 'error',
    // Anything that reads as an icon rather than as text. The arrow ranges are
    // deliberately left out: an arrow is typography, not decoration.
    re: /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu,
    // In markup there is no way out. In prose a typographic mark passes, but
    // only if it does not carry the emoji presentation selector (U+FE0F),
    // which turns it into a coloured icon.
    skip: (match, text, i, ctx) => {
      if (match.codePointAt(0) === 0xfe0f) {
        const previous = Array.from(text.slice(0, i)).pop() || '';
        return /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u.test(previous);
      }
      return (
        !ctx.markup &&
        TYPOGRAPHIC.has(match.codePointAt(0)) &&
        text.codePointAt(i + match.length) !== 0xfe0f
      );
    },
    msg: 'emoji used as an icon: icons are SVG, always',
  },
  {
    id: 'buzzword',
    level: 'error',
    re: /\b(synergies|best[- ]in[- ]class|leverage our|paradigm shift|turnkey|game[- ]changer)\b/gi, // brand-lint:ignore
    msg: 'conference-room jargon: say the thing instead',
  },
  {
    id: 'vague-promise',
    level: 'warn',
    re: /\b(improve efficiency|boost productivity|innovative solution|cutting[- ]edge|state of the art)\b/gi, // brand-lint:ignore
    msg: 'vague promise: it needs a number with a source',
  },

  // --- Examples of language-specific rules, from our own Italian brain ---
  // Two things worth stealing here: enforcing a consistent form of address,
  // which no style guide ever survives without, and banning the specific
  // words that make your writing sound like everyone else's.
  //
  // {
  //   id: 'formal-register',
  //   level: 'error',
  //   re: /\b(La\s+ringraziamo|Le\s+confermiamo|Le\s+inviamo|Vi\s+ringraziamo)\b/g,
  //   msg: 'formal register: we always address the reader informally',
  // },
  // {
  //   id: 'jargon-it',
  //   level: 'error',
  //   re: /\b(sinergi[ae]|paradigm[ai]|chiavi in mano|a livello di)\b/gi,
  //   msg: 'gergo corporate vietato',
  // },
];
