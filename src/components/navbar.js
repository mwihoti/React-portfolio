'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes, FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, useThemeUpdate } from '../context/theme';
import { CAL_URL } from '../data/site';
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

export default function Navbar() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome);

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
      className="rounded-lg p-2 text-muted transition-colors hover:bg-raised hover:text-ink"
      aria-label={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkTheme ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
    </button>
  );

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
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
              className={`relative px-3 py-2 font-mono text-[13px] transition-colors ${
                isActive(item) ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
              {isActive(item) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-accent"
                />
              )}
            </NextLink>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          {ThemeButton}
          <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline ml-2 !px-4 !py-2">
            Book a Call <FaArrowRight className="h-3 w-3" aria-hidden="true" />
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
