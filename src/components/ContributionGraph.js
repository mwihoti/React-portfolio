'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DURATION, EASE, TRANSITION, VIEWPORT } from '../lib/motion';
import { CountUp, useReduceMotion } from './motion';

const LEVEL_COLORS = [
  'bg-line',
  'bg-accent/30',
  'bg-accent/55',
  'bg-accent/80',
  'bg-accent',
];

// Seconds between week columns: ~53 weeks sweep left-to-right in ~0.42s, so
// the year reads as filling in up to today.
const COLUMN_STAGGER = 0.008;

// Same footprint as the loaded graph (caption, 7 rows of 10px cells + 3px
// gaps + scroll padding, legend), so swapping the two never shifts layout.
function Skeleton() {
  return (
    <div className="mt-2" aria-hidden="true">
      <div className="mb-3 h-4 w-52 max-w-full animate-pulse rounded bg-raised" />
      <div className="h-[92px] animate-pulse rounded-md bg-raised" />
      <div className="mt-2 h-4 w-32 animate-pulse rounded bg-raised" />
    </div>
  );
}

export default function ContributionGraph() {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const reduce = useReduceMotion();

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

  const status = loading ? 'loading' : weeks.length === 0 ? 'error' : 'ready';

  // Loading -> loaded is a crossfade (opacity only, Tier 3): both states sit
  // in the same grid cell while the skeleton leaves and the result arrives.
  // The skeleton is the server/first render and never animates in
  // (initial={false}); everything after it mounts on the client only, so
  // varying timing with `reduce` cannot cause a hydration mismatch.
  const enter = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: reduce ? TRANSITION.reduced : TRANSITION.ui,
  };

  // Columns, not 365 cells, are the animated nodes: one opacity tween per
  // week. Reduced motion: no sweep, the grid fades in as one (150ms).
  const grid = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : COLUMN_STAGGER } },
  };
  const column = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce ? TRANSITION.reduced : { duration: DURATION.moderate, ease: EASE.out },
    },
  };

  return (
    <div className="grid grid-cols-1">
      <AnimatePresence initial={false}>
        {status === 'loading' && (
          <motion.div
            key="loading"
            className="col-start-1 row-start-1"
            exit={{ opacity: 0, transition: reduce ? TRANSITION.reduced : TRANSITION.exit }}
          >
            <Skeleton />
          </motion.div>
        )}

        {status === 'error' && (
          <motion.p key="error" {...enter} className="col-start-1 row-start-1 text-xs text-muted">
            GitHub activity unavailable &mdash; view at{' '}
            <a
              href="https://github.com/mwihoti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-base ease-enter hover:decoration-current focus-visible:decoration-current"
            >
              github.com/mwihoti
            </a>
          </motion.p>
        )}

        {status === 'ready' && (
          <motion.div key="ready" {...enter} className="col-start-1 row-start-1 mt-2 min-w-0">
            <p className="text-xs text-muted mb-3">
              <CountUp value={total} className="font-semibold text-accent" />{' '}
              contributions in the last year
            </p>
            <motion.div
              className="flex gap-[3px] overflow-x-auto pb-1"
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              variants={grid}
            >
              {weeks.map((week, wi) => (
                <motion.div key={wi} variants={column} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                      className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}`}
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-faint">Less</span>
              {LEVEL_COLORS.map((cls, i) => (
                <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
              ))}
              <span className="text-xs text-faint">More</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
