import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('darkTheme');
    if (stored !== null) {
      setDarkTheme(stored === 'true');
    }
  }, []);

  function toggleTheme() {
    setDarkTheme(prevDarkTheme => {
      const newDarkTheme = !prevDarkTheme;
      localStorage.setItem('darkTheme', newDarkTheme);
      return newDarkTheme;
    });
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}

