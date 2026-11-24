'use client';

import { useEffect, useState } from 'react';
import { FaStar, FaCodeBranch } from 'react-icons/fa';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/mwihoti')
      .then((r) => r.json())
      .then((data) => {
        if (data.public_repos !== undefined) {
          setStats({ repos: data.public_repos, followers: data.followers });
        }
      })
      .catch(() => {});
  }, []);

  if (!stats) return null;

  // Data arrives client-side, so the row fades in (opacity only, Tier 3) when
  // it mounts.
  return (
    <div className="flex animate-fade-in gap-6 font-mono text-xs text-muted">
      <span className="flex items-center gap-1.5">
        <FaCodeBranch className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        <span className="font-semibold tabular-nums text-accent">{stats.repos}</span> public repos
      </span>
      <span className="flex items-center gap-1.5">
        <FaStar className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        <span className="font-semibold tabular-nums text-accent">{stats.followers}</span> followers
      </span>
    </div>
  );
}
