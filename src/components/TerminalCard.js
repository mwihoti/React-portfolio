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
          <p>
            <span className="text-[#3ecfbc]">$</span> whoami
          </p>
          <p className="mt-1 text-[#3ecfbc]">Daniel Mwihoti</p>
          <ul className="mt-1 text-white/70">
            {roles.map((r) => (
              <li key={r}>&gt; {r}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>
            <span className="text-[#3ecfbc]">$</span> git log --merged --upstream
          </p>
          <ul className="mt-1 text-white/70">
            {merged.map((m) => (
              <li key={m}>
                <span className="text-[#3ecfbc]">✓</span> {m}
              </li>
            ))}
          </ul>
        </div>
        <p>
          <span className="text-[#3ecfbc]">$</span>{' '}
          <span className="blink-cursor text-[#3ecfbc]" aria-hidden="true">
            ▍
          </span>
        </p>
      </div>
    </div>
  );
}
