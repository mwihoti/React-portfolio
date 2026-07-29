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

  return (
    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
      <span className="flex items-center gap-1.5">
        <FaCodeBranch className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
        <span className="text-teal-400 font-semibold">{stats.repos}</span> public repos
      </span>
      <span className="flex items-center gap-1.5">
        <FaStar className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
        <span className="text-teal-400 font-semibold">{stats.followers}</span> followers
      </span>
    </div>
  );
}
