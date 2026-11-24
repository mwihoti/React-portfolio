'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, X_URL } from '../data/site';
import { DISTANCE } from '../lib/motion';
import { Stagger, StaggerItem } from './motion';
import { LogoMark } from './ui';

const socials = [
  { href: GITHUB_URL, icon: FaGithub, label: 'GitHub' },
  { href: LINKEDIN_URL, icon: FaLinkedin, label: 'LinkedIn' },
  { href: X_URL, icon: FaXTwitter, label: 'X (Twitter)' },
  { href: `mailto:${EMAIL}`, icon: FaEnvelope, label: 'Email' },
];

// Text links: a 1px underline draws in from the left (.link-draw) while the
// color shifts to accent. Reduced motion: the underline fades instead.
const TEXT_LINK = 'link-draw text-muted transition-colors duration-base ease-enter hover:text-accent';

// Icon links: color shift plus a 2px lift on real pointers (.hover-lift sets
// its own transition, so no transition-colors here). Reduced motion: color only.
const ICON_LINK = 'hover-lift text-muted hover:text-accent';

export default function Footer() {
  // The <footer> itself is static on navigation, like the navbar. Only its
  // two columns reveal, lightly
  // (8px, one after the other), when the footer scrolls into view.
  return (
    <footer className="border-t border-line">
      <Stagger className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <StaggerItem y={DISTANCE.sm} className="flex items-center gap-3">
          <LogoMark className="h-8 w-8" />
          <div>
            <p className="font-mono text-sm text-ink">Daniel Mwihoti</p>
            <p className="text-sm text-muted">
              Bitcoin, Cardano, AI &amp; Rust developer. Nairobi, working with teams worldwide.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem y={DISTANCE.sm} className="flex flex-col gap-4 md:items-end">
          <div className="flex items-center gap-5 font-mono text-sm">
            <Link href="/writing" className={TEXT_LINK}>
              Writing
            </Link>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
              Resume
            </a>
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className={ICON_LINK}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="font-mono text-xs text-faint">
            &copy; {new Date().getFullYear()} Daniel Mwihoti · Built in the open with Next.js
          </p>
        </StaggerItem>
      </Stagger>
    </footer>
  );
}
