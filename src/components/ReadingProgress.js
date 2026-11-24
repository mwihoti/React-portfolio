'use client';

// Reading progress for /writing/[slug]. Renders the post's <article> (so the
// scroll target is a real ref, and the server-rendered markdown passes straight
// through as children) plus a thin accent bar pinned under the navbar.
//
// Motion rules (60fps + accessible-animation skills):
//  - The bar animates scaleX only (compositor transform, no layout/paint),
//    driven by a MotionValue, so scrolling never re-renders React.
//  - A critically-overdamped spring smooths wheel jumps without any overshoot.
//  - Reduced motion: no spring, the bar follows scroll 1:1. It is direct
//    feedback for the user's own scrolling, not decorative motion, so it stays.
//  - Decorative (the scrollbar already conveys position), so aria-hidden.
//  - SSR renders scaleX(0) in both modes, so there is no hydration mismatch and
//    nothing shows without JS.

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useReduceMotion } from './motion';

export default function ReadingProgressArticle({ children, className = '' }) {
  const ref = useRef(null);
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <>
      {/* Sits on the navbar's bottom border (nav is h-16 + 1px border). Later
          in the DOM than the nav at the same z-index, so it paints on top. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-16 z-50 h-0.5 origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : smooth }}
      />
      <article ref={ref} className={className}>
        {children}
      </article>
    </>
  );
}
