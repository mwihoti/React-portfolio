'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

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
    setDarkTheme((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('darkTheme', next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
