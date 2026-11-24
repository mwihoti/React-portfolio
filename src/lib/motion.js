// Motion tokens: the single source of truth for timing across the site.
// Plain data (no 'use client'), so it can be imported from server and client
// components alike. The CSS custom properties in src/index.css (--ease-*,
// --dur-*) and the Tailwind theme (ease-enter, duration-base, ...) mirror these
// values; keep them in sync if you change anything here.
//
// House style: editorial and restrained. Short (150–600ms), ease-out entrances,
// quicker ease-in exits, small distances (<= 24px), no bouncy springs on content.

// Cubic-bezier curves as framer-motion arrays.
export const EASE = {
  // Entrances / reveals: fast start, long gentle settle.
  out: [0.22, 1, 0.36, 1],
  // Exits: leave promptly.
  in: [0.4, 0, 1, 1],
  // State changes / things moving from A to B on screen.
  inOut: [0.65, 0, 0.35, 1],
};

// Seconds (framer-motion units). CSS equivalents are --dur-* in ms.
export const DURATION = {
  instant: 0.1, // press feedback
  fast: 0.15, // exits, hover color changes
  base: 0.2, // small UI enter (menus, tooltips)
  moderate: 0.3, // panels, layout moves
  slow: 0.5, // section reveals
  slower: 0.6, // hero / draw-on, upper bound
};

// Pixels. Never exceed lg (24px) for content.
export const DISTANCE = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

// Seconds between staggered children.
export const STAGGER = {
  tight: 0.04,
  base: 0.06,
  loose: 0.09,
};

// Tier 2 reduced-motion values: displacement is removed (MotionConfig
// reducedMotion="user" snaps x/y/scale/rotate/width/height instantly), and
// what remains is a short opacity fade with little or no delay.
export const REDUCED = {
  duration: 0.15,
  stagger: 0.02,
};

// Default in-view trigger used by every reveal primitive.
export const VIEWPORT = { once: true, margin: '-60px' };

// Ready-made transition objects.
export const TRANSITION = {
  enter: { duration: DURATION.slow, ease: EASE.out },
  exit: { duration: DURATION.fast, ease: EASE.in },
  ui: { duration: DURATION.base, ease: EASE.out },
  move: { duration: DURATION.moderate, ease: EASE.inOut },
  reduced: { duration: REDUCED.duration, ease: 'linear' },
};

// Convert an EASE array to a CSS timing function string.
export const cssEase = (curve) => `cubic-bezier(${curve.join(', ')})`;

// Enter/exit prop bundles for AnimatePresence children (menus, popovers,
// toasts, chat panels). These elements mount after an interaction, so they
// never hydrate and it is safe to vary `initial` with the reduced-motion flag.
//
//   const reduce = useReduceMotion();
//   <AnimatePresence>{open && <motion.div key="menu" {...presence('dropdown', { reduce })} />}</AnimatePresence>
const PRESENCE = {
  fade: { from: {}, to: {} },
  fadeUp: { from: { y: DISTANCE.sm }, to: { y: 0 } },
  fadeDown: { from: { y: -DISTANCE.sm }, to: { y: 0 } },
  // Small surfaces anchored to a trigger (menu, chat panel, tooltip).
  dropdown: { from: { y: -DISTANCE.xs, scale: 0.98 }, to: { y: 0, scale: 1 } },
  popover: { from: { y: DISTANCE.xs, scale: 0.98 }, to: { y: 0, scale: 1 } },
};

export function presence(kind = 'fadeUp', { reduce = false } = {}) {
  const preset = PRESENCE[kind] ?? PRESENCE.fadeUp;
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: TRANSITION.reduced },
      transition: TRANSITION.reduced,
    };
  }
  return {
    initial: { opacity: 0, ...preset.from },
    animate: { opacity: 1, ...preset.to },
    exit: { opacity: 0, ...preset.from, transition: TRANSITION.exit },
    transition: TRANSITION.ui,
  };
}
