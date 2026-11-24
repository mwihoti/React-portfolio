'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, useThemeUpdate } from '../context/theme';
import { CAL_URL } from '../data/site';
import { DISTANCE, DURATION, EASE, STAGGER, TRANSITION } from '../lib/motion';
import { useReduceMotion } from './motion';
import { LogoMark } from './ui';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Case Studies', id: 'case-studies' },
  { label: 'Projects', id: 'projects' },
  { label: 'Focus', id: 'focus' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', id: 'contact' },
];

// Highlights the nav item for whichever homepage section is in view.
function useActiveSection(enabled) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const sections = NAV_ITEMS.filter((i) => i.id)
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

// True once the page has scrolled past the top. Read-only scroll listener,
// throttled to one read per frame; React skips re-renders when the value is
// unchanged. Starts false on server and client (no hydration mismatch).
function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

// Hamburger that morphs into a close icon (svg-animation skill: hand-authored
// toggle, transforms only). transform-box: fill-box makes each line rotate
// around its own center. Reduced motion: the lines snap, the middle line still
// fades.
function MenuIcon({ open }) {
  const line =
    'origin-center [transform-box:fill-box] transition-[transform,opacity] duration-moderate ease-move motion-reduce:transition-opacity';
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="6" x2="20" y2="6" className={`${line} ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
      <line x1="4" y1="12" x2="20" y2="12" className={`${line} ${open ? 'opacity-0' : ''}`} />
      <line x1="4" y1="18" x2="20" y2="18" className={`${line} ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
    </svg>
  );
}

// Sun/moon crossfade with a small turn. Driven purely by the `dark` class on
// <html> (set before paint), so the right icon is in the server HTML, nothing
// animates on load, and the swap plays only when the class actually changes.
// Reduced motion: opacity crossfade only. `theme-icon` exempts it from the
// one-frame colour swap in toggleTheme (src/context/theme.js).
const ICON_SWAP =
  'theme-icon absolute inset-0 h-4 w-4 transition-[opacity,transform] duration-moderate ease-enter motion-reduce:transition-opacity';

// Small press feedback for icon buttons. `scale` (not `transform`) so it never
// fights other transforms; dropped under reduced motion.
const ICON_BUTTON =
  'rounded-lg p-2 transition-[color,background-color,scale] duration-base ease-enter hover:bg-raised active:[scale:0.92] motion-reduce:active:[scale:1]';

export default function Navbar() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome);
  const scrolled = useScrolled();
  const reduce = useReduceMotion();

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const hrefFor = (item) => item.href ?? (onHome ? `#${item.id}` : `/#${item.id}`);
  const isActive = (item) =>
    item.href ? pathname.startsWith(item.href) : onHome && active === item.id;

  const ThemeButton = (
    <button
      onClick={toggleTheme}
      className={`${ICON_BUTTON} text-muted hover:text-ink`}
      aria-label={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="relative block h-4 w-4" aria-hidden="true">
        <FaSun className={`${ICON_SWAP} rotate-90 scale-75 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100`} />
        <FaMoon className={`${ICON_SWAP} opacity-100 dark:-rotate-90 dark:scale-75 dark:opacity-0`} />
      </span>
    </button>
  );

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color] duration-moderate ease-enter ${
        scrolled || isOpen ? 'border-line/70 bg-canvas/90' : 'border-transparent bg-canvas/70'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NextLink href="/" className="flex items-center gap-3" aria-label="Daniel Mwihoti — home">
          <LogoMark className="h-8 w-8" />
          <span className="font-mono text-sm font-medium tracking-wide text-ink">Daniel Mwihoti</span>
        </NextLink>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NextLink
              key={item.label}
              href={hrefFor(item)}
              aria-current={isActive(item) ? 'true' : undefined}
              className={`group relative px-3 py-2 font-mono text-[13px] transition-colors duration-base ease-enter ${
                isActive(item) ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
              {isActive(item) ? (
                // Shared-layout indicator glides between items (A to B move).
                // Reduced motion: MotionConfig snaps it into place.
                <motion.span
                  layoutId="nav-underline"
                  transition={TRANSITION.move}
                  aria-hidden="true"
                  className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-accent"
                />
              ) : (
                // Hover/focus preview of the indicator: a faint rule that draws
                // in from the left. Reduced motion: fades in, no draw.
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 -bottom-[13px] h-0.5 origin-left scale-x-0 bg-accent/35 opacity-0 transition-[transform,opacity] duration-moderate ease-enter group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100 motion-reduce:scale-x-100 motion-reduce:transition-opacity"
                />
              )}
            </NextLink>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          {ThemeButton}
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline ml-2 !px-4 !py-2">
            Book a Call <FaArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          {ThemeButton}
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="rounded-lg p-2 text-ink hover:bg-raised"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <NextLink
                  key={item.label}
                  href={hrefFor(item)}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 font-mono text-sm ${
                    isActive(item) ? 'bg-raised text-accent' : 'text-ink hover:bg-raised'
                  }`}
                >
                  {item.label}
                </NextLink>
              ))}
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="btn-primary mt-3 w-full"
              >
                Book a Call <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
