'use client';

import { motion } from 'framer-motion';

// Gentle fade-up used for every section; runs once and respects reduced motion
// through the MotionConfig in ThemeProvider.
export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </Tag>
  );
}

// Section heading from the case study: teal rule on the left, serif title,
// short plain-language intro.
export function SectionHeader({ eyebrow, title, intro, id, children }) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl border-l-2 border-accent pl-5">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
      </div>
      {children}
    </Reveal>
  );
}

// Brand mark from the case study: a white triangle in a dark circle.
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" className="fill-ink" />
      <path d="M20 11 29 27H11Z" className="fill-canvas" />
    </svg>
  );
}

export function AvalancheIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.2 4.1a1.4 1.4 0 0 0-2.4 0L2.3 18.9A1.4 1.4 0 0 0 3.5 21h4.6c.5 0 1-.3 1.2-.7l5-8.7a1.4 1.4 0 0 0 0-1.4Zm2.9 8.2a1.1 1.1 0 0 0-1.9 0l-2.8 4.9a1.1 1.1 0 0 0 1 1.7h5.6a1.1 1.1 0 0 0 1-1.7Z" />
    </svg>
  );
}

export function MidnightIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
