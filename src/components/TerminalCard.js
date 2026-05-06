'use client';

import React from 'react';

export default function TerminalCard() {
  return (
    <div className="terminal-card w-full max-w-xs text-left flex-shrink-0">
      <div className="terminal-header">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
        <span className="ml-2 text-xs text-gray-500">daniel@nairobi: ~</span>
      </div>
      <div className="terminal-body space-y-0.5">
        <div>
          <span className="text-teal-400">❯ </span>
          <span className="text-gray-400">whoami</span>
        </div>
        <div className="text-white pl-2">Bitcoin · Cardano · Rust engineer, Nairobi</div>
        <div className="mt-1">
          <span className="text-teal-400">❯ </span>
          <span className="text-gray-400">cat stats.txt</span>
        </div>
        <div className="text-green-400 pl-2">3+ years experience</div>
        <div className="text-green-400 pl-2">20+ projects shipped</div>
        <div className="mt-1">
          <span className="text-teal-400">❯ </span>
          <span className="text-gray-400">git log --merged</span>
        </div>
        <div className="text-yellow-400 pl-2 text-xs">&#x2713; IntersectMBO/lsm-tree #818</div>
        <div className="text-yellow-400 pl-2 text-xs">&#x2713; cardano-foundation/cardano-org</div>
        <div className="text-yellow-400 pl-2 text-xs">&#x2713; bitcoin-core/bitcoin</div>
        <div className="mt-1">
          <span className="text-teal-400">❯ </span>
          <span className="blink-cursor text-teal-400">&#x2588;</span>
        </div>
      </div>
    </div>
  );
}
