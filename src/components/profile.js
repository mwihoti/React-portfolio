'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { EMAIL, CAL_URL, GITHUB_URL, LINKEDIN_URL, X_URL, TIMEZONE } from '../data/site';
import TerminalCard from './TerminalCard';

// Rendered client-side only so server and browser clocks never disagree.
function LocalTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString('en-GB', { timeZone: TIMEZONE, hour: '2-digit', minute: '2-digit' });
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span>
      <span className="text-ink">{time}</span> in Nairobi
    </span>
  );
}

const socials = [
  { href: GITHUB_URL, icon: FaGithub, label: 'GitHub' },
  { href: LINKEDIN_URL, icon: FaLinkedin, label: 'LinkedIn' },
  { href: X_URL, icon: FaXTwitter, label: 'X (Twitter)' },
  { href: `mailto:${EMAIL}`, icon: FaEnvelope, label: 'Email' },
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function Profile() {
  return (
    <header id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          {/* h1 carries the name for search; the serif line below is the visual headline */}
          <motion.h1 {...fadeUp(0)} className="eyebrow">
            Daniel Mwihoti · Engineer &amp; builder
          </motion.h1>

          <motion.p
            {...fadeUp(0.08)}
            className="mt-5 font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            I build open systems, automate work, and{' '}
            <span className="italic text-accent">ship in public.</span>
          </motion.p>

          <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m a full-stack engineer in Nairobi. Most days I&apos;m building on Bitcoin,
            Cardano and Avalanche, wiring up AI automations, or sending small pull requests to
            open-source projects I rely on. I like hard problems and plain explanations.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to remote roles &amp; freelance work
            </span>
            <LocalTime />
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a discovery call
              <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href="#case-studies" className="link-arrow px-1">
              See what I&apos;ve built <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </motion.div>
          <motion.p {...fadeUp(0.36)} className="mt-3 text-sm text-faint">
            15 minutes, no pitch. We figure out whether I can actually help.
          </motion.p>

          <motion.ul {...fadeUp(0.4)} className="mt-9 flex gap-2" aria-label="Find me elsewhere">
            {socials.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent/60 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Photo + whoami card, overlapping on large screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <figure className="relative ml-auto flex w-[78%] flex-col sm:w-[70%] lg:w-[78%]">
            <figcaption className="order-first mb-3 text-right font-mono text-xs text-faint">
              that&apos;s me ↓ say hi at a Nairobi meetup
            </figcaption>
            <div className="panel overflow-hidden p-2">
              <Image
                src="/me.jpg"
                alt="Daniel Mwihoti smiling"
                width={600}
                height={600}
                priority
                className="aspect-square w-full rounded-lg object-cover"
              />
            </div>
          </figure>
          <div className="relative -mt-20 w-[88%] sm:w-[75%] lg:-mt-28 lg:w-[72%]">
            <TerminalCard />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
