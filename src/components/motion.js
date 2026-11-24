'use client';

// Shared motion primitives. Every component here:
//  - renders its content in the server HTML (opacity/transform initial states
//    only; nothing is injected after animation), and carries data-reveal so the
//    <noscript> rule in app/layout.js shows it when JS is off;
//  - keeps `initial` identical on server and client (no hydration mismatch) and
//    only varies *timing* with the reduced-motion preference;
//  - honors reduced motion as Tier 2: <MotionConfig reducedMotion="user"> (in
//    src/context/theme.js) snaps x/y/scale instantly, and these primitives
//    additionally shorten the remaining opacity fade to 150ms with no stagger
//    delays.
//
// These are client components but can be rendered from server components
// (e.g. app/writing/*) as long as props are serializable (strings, numbers,
// children).

import { useEffect, useRef } from 'react';
import { animateValue, motion, useReducedMotionConfig } from 'framer-motion';
import { DISTANCE, DURATION, EASE, REDUCED, STAGGER, VIEWPORT } from '../lib/motion';

// True when the user prefers reduced motion (respects the app MotionConfig).
// Returns null/false during SSR and the first client render can differ, so use
// it only for transition timing or for elements that mount after interaction,
// never for `initial` on server-rendered elements.
export const useReduceMotion = useReducedMotionConfig;

// Fade-up on first scroll into view. Backward compatible with the original
// <Reveal> (children, delay, className, as); extra props are optional.
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  y = DISTANCE.md,
  duration = DURATION.slow,
  once = VIEWPORT.once,
  margin = VIEWPORT.margin,
  amount,
  ...rest
}) {
  const reduce = useReduceMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin, amount }}
      transition={
        reduce
          ? { duration: REDUCED.duration, ease: 'linear' }
          : { duration, delay, ease: EASE.out }
      }
      className={className}
      data-reveal=""
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Container that reveals its <StaggerItem> descendants one after another when
// it scrolls into view. The container itself does not fade.
export function Stagger({
  children,
  as = 'div',
  className = '',
  stagger = STAGGER.base,
  delay = 0,
  once = VIEWPORT.once,
  margin = VIEWPORT.margin,
  amount,
  ...rest
}) {
  const reduce = useReduceMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? REDUCED.stagger : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Child of <Stagger>. May sit at any depth below it, as long as no other
// motion component with its own initial/animate sits in between.
export function StaggerItem({
  children,
  as = 'div',
  className = '',
  y = 12,
  duration = DURATION.slow,
  ...rest
}) {
  const reduce = useReduceMotion();
  const Tag = motion[as];
  return (
    <Tag
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce
            ? { duration: REDUCED.duration, ease: 'linear' }
            : { duration, ease: EASE.out },
        },
      }}
      className={className}
      data-reveal=""
      {...rest}
    >
      {children}
    </Tag>
  );
}

