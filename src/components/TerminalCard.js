import React from 'react';

const roles = [
  'Full-stack engineer',
  'Bitcoin builder (Rust)',
  'Cardano builder & contributor',
  'Avalanche builder · Team1',
  'Midnight explorer',
  'AI automation tinkerer',
];

const merged = ['payjoin/rust-payjoin', 'IntersectMBO/lsm-tree #818', 'cardano-foundation/cardano-org'];

// Output timing (ms). The card itself rises in with the hero (profile.js,
// 150ms delay); its lines then print top to bottom like terminal output: a
// short pause after each command "runs", then the output lines in quick
// succession. Everything is done by ~1.1s.
const START = 350;
const EXEC = 120; // pause between a command and its first output line
const LINE = 35; // gap between consecutive output lines

// Precomputed once so render stays pure and server/client markup is identical.
const schedule = (() => {
  let t = START;
  const whoami = t;
  const name = (t += EXEC);
  const roleLines = roles.map(() => (t += LINE));
  const gitLog = (t += EXEC);
  const mergedLines = merged.map((_, i) => (i === 0 ? (t += EXEC) : (t += LINE)));
  const prompt = (t += EXEC);
  return { whoami, name, roleLines, gitLog, mergedLines, prompt };
})();

// One printed line. Opacity only (CSS `animate-fade-in`, fill-mode backwards),
// so the full text is always in the server HTML and in the accessibility tree,
// it runs on first paint without waiting for hydration, and it never moves
// layout. Reduced motion: no per-line sequence; the lines simply arrive with
// the card's own short fade.
function Line({ as: Tag = 'p', at, className = '', children }) {
  return (
    <Tag
      className={`animate-fade-in motion-reduce:animate-none ${className}`}
      style={{ animationDelay: `${at}ms`, animationDuration: 'var(--dur-fast)' }}
    >
      {children}
    </Tag>
  );
}

// The "$ whoami" window from the case study. Decorative, so it's plain text
// rather than an interactive terminal.
export default function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-accent/30 bg-[#0a0f11] font-mono text-[13px] leading-relaxed text-[#d7dcd9] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3ecfbc]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3ecfbc]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3ecfbc]/30" />
        <span className="ml-2 text-xs text-white/40">daniel@nairobi: ~</span>
      </div>
      <div className="space-y-3 px-5 py-4">
        <div>
          <Line at={schedule.whoami}>
            <span className="text-[#3ecfbc]">$</span> whoami
          </Line>
          <Line at={schedule.name} className="mt-1 text-[#3ecfbc]">
            Daniel Mwihoti
          </Line>
          <ul className="mt-1 text-white/70">
            {roles.map((r, i) => (
              <Line as="li" key={r} at={schedule.roleLines[i]}>
                &gt; {r}
              </Line>
            ))}
          </ul>
        </div>
        <div>
          <Line at={schedule.gitLog}>
            <span className="text-[#3ecfbc]">$</span> git log --merged --upstream
          </Line>
          <ul className="mt-1 text-white/70">
            {merged.map((m, i) => (
              <Line as="li" key={m} at={schedule.mergedLines[i]}>
                <span className="text-[#3ecfbc]">✓</span> {m}
              </Line>
            ))}
          </ul>
        </div>
        <Line at={schedule.prompt}>
          <span className="text-[#3ecfbc]">$</span>{' '}
          <span className="blink-cursor text-[#3ecfbc]" aria-hidden="true">
            ▍
          </span>
        </Line>
      </div>
    </div>
  );
}
