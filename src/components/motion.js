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

// The teal vertical rule from the case study, drawn top-to-bottom on reveal.
// Place inside a `relative` parent with left padding (e.g. "relative pl-5"),
// replacing a static `border-l-2 border-accent`.
export function AccentRule({ className = '', delay = 0.1 }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-0.5 origin-top bg-accent ${className}`}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slower, delay, ease: EASE.out }}
      data-reveal=""
    />
  );
}

// SVG stroke draw-on when scrolled into view. Use inside an <svg> with
// fill="none" and a stroke. Reduced motion: no drawing, a 150ms fade.
export function DrawPath({ delay = 0, duration = DURATION.slower, className, ...pathProps }) {
  const reduce = useReduceMotion();
  return (
    <motion.path
      {...pathProps}
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={
        reduce
          ? { pathLength: { duration: 0 }, opacity: { duration: REDUCED.duration } }
          : {
              pathLength: { duration, delay, ease: EASE.out },
              opacity: { duration: 0.01, delay },
            }
      }
      data-reveal=""
    />
  );
}

// Number that counts up the first time it scrolls into view.
// The final value is always in the server HTML (crawlers and no-JS see it),
// and the accessible value (sr-only copy) is always final. If the number is
// already on screen when it mounts it stays put (no flash to 0); otherwise
// the visible digits reset to `from` off-screen and count up on entry.
// Reduced motion: no counting.
const defaultFormat = (n) => Math.round(n).toLocaleString('en-US');

export function CountUp({
  value,
  from = 0,
  duration = DURATION.slower,
  prefix = '',
  suffix = '',
  format = defaultFormat,
  className = '',
}) {
  const ref = useRef(null);
  const reduce = useReduceMotion();
  const finalText = `${prefix}${format(value)}${suffix}`;

  useEffect(() => {
    const node = ref.current?.firstChild; // the text node React owns
    if (!node) return undefined;
    // Undo any interrupted count or a previous effect's writes. A dependency
    // change runs the old cleanup first, so this always wins.
    node.nodeValue = finalText;
    if (reduce || typeof IntersectionObserver === 'undefined') return undefined;
    const write = (n) => {
      node.nodeValue = `${prefix}${format(n)}${suffix}`;
    };
    let controls;
    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting) {
            io.disconnect();
            return;
          }
          write(from);
          return;
        }
        if (entry.isIntersecting) {
          io.disconnect();
          controls = animateValue({
            keyframes: [from, value],
            duration: duration * 1000,
            ease: EASE.out,
            onUpdate: write,
          });
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      controls?.stop();
    };
  }, [value, from, duration, prefix, suffix, format, reduce, finalText]);

  // The visible digits are aria-hidden (they change every frame while
  // counting); the sr-only copy always holds the final value, so assistive
  // tech, find-in-page and copy never see the intermediate numbers.
  return (
    <span className="relative inline-block">
      <span
        ref={ref}
        aria-hidden="true"
        className={`inline-block tabular-nums ${className}`}
        style={{ minWidth: `${finalText.length}ch` }}
      >
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
