'use client';

import { useTheme } from '../context/theme';

// Applies the `dark` class from ThemeContext so server-rendered pages
// (like /writing) can use dark: variants and the shared Navbar/Footer.
export default function ThemeWrapper({ children }) {
  const darkTheme = useTheme();
  return <div className={darkTheme ? 'dark' : ''}>{children}</div>;
}
