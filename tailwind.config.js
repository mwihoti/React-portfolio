/** @type {import('tailwindcss').Config} */

// Colors are CSS variables (see src/index.css) so light and dark mode share
// one set of utility classes: bg-canvas, text-ink, border-line, text-accent…
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        raised: token('raised'),
        ink: token('ink'),
        muted: token('muted'),
        faint: token('faint'),
        line: token('line'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      // Motion tokens (values live in src/index.css :root, mirrored in
      // src/lib/motion.js). Named so they don't shadow Tailwind's ease-in/out.
      transitionTimingFunction: {
        enter: 'var(--ease-out)',
        exit: 'var(--ease-in)',
        move: 'var(--ease-in-out)',
      },
      transitionDuration: {
        instant: 'var(--dur-instant)',
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        moderate: 'var(--dur-moderate)',
        slow: 'var(--dur-slow)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Teal header rule drawn top-to-bottom (use with origin-top).
        'rule-draw': {
          from: { transform: 'scaleY(0)' },
          to: { transform: 'scaleY(1)' },
        },
      },
      // Mount-time CSS entrances (no JS; fine in server components). Use
      // `[animation-delay:120ms]` to sequence. Reduced motion: fade-up becomes a
      // 150ms fade (see src/index.css).
      animation: {
        'fade-in': 'fade-in var(--dur-moderate) var(--ease-out) backwards',
        'fade-up': 'fade-up var(--dur-slow) var(--ease-out) backwards',
        'rule-draw': 'rule-draw var(--dur-slower) var(--ease-out) backwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
