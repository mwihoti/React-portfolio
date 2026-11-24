'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { TRANSITION } from '../lib/motion';

const ThemeContext = createContext(true);
const ThemeUpdateContext = createContext(() => {});

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

// The `dark` class lives on <html> (set before paint by the inline script in
// app/layout.js) so every route and the page background follow the theme.
export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    setDarkTheme(document.documentElement.classList.contains('dark'));
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    // Swap all theme colors in one frame. Per-element color transitions would
    // otherwise tween on their own clocks while the canvas snaps. The sun/moon
    // icon (.theme-icon) keeps its crossfade. See html.theme-switching in
    // src/index.css.
    root.classList.add('theme-switching');
    root.classList.toggle('dark', next);
    try {
      localStorage.setItem('darkTheme', next);
    } catch (e) {
      // Storage unavailable (private mode): the theme still applies.
    }
    setDarkTheme(next);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove('theme-switching'))
    );
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {/* reducedMotion="user": for OS reduce-motion users framer snaps every
            positional value (x, y, scale, rotate, width, height, layout)
            instantly while opacity/color still animate, i.e. Tier 2.
            transition: house default (200ms ease-out tween, no spring) for any
            motion component that doesn't set its own. */}
        <MotionConfig reducedMotion="user" transition={TRANSITION.ui}>
          {children}
        </MotionConfig>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
