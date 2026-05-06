'use client';

import { useEffect, useState } from 'react';

const LEVEL_COLORS = [
  'bg-gray-800',
  'bg-teal-900',
  'bg-teal-700',
  'bg-teal-500',
  'bg-teal-300',
];

export default function ContributionGraph() {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/mwihoti?y=last')
      .then((r) => r.json())
      .then((data) => {
        const contributions = data.contributions || [];
        const grouped = [];
        for (let i = 0; i < contributions.length; i += 7) {
          grouped.push(contributions.slice(i, i + 7));
        }
        setWeeks(grouped);
        setTotal(contributions.reduce((s, d) => s + d.count, 0));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="h-20 bg-gray-800/50 animate-pulse rounded-md" />;
  }

  if (weeks.length === 0) {
    return (
      <p className="text-xs text-gray-500">
        GitHub activity unavailable &mdash; view at{' '}
        <a
          href="https://github.com/mwihoti"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-400 hover:underline"
        >
          github.com/mwihoti
        </a>
      </p>
    );
  }

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-500 mb-3">
        <span className="text-teal-400 font-semibold">{total}</span>{' '}
        contributions in the last year
      </p>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-2">
        <span className="text-xs text-gray-600">Less</span>
        {LEVEL_COLORS.map((cls, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
        ))}
        <span className="text-xs text-gray-600">More</span>
      </div>
    </div>
  );
}
