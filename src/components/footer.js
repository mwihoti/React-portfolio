'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, X_URL } from '../data/site';
import { LogoMark } from './ui';

const socials = [
  { href: GITHUB_URL, icon: FaGithub, label: 'GitHub' },
  { href: LINKEDIN_URL, icon: FaLinkedin, label: 'LinkedIn' },
  { href: X_URL, icon: FaXTwitter, label: 'X (Twitter)' },
  { href: `mailto:${EMAIL}`, icon: FaEnvelope, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <LogoMark className="h-8 w-8" />
          <div>
            <p className="font-mono text-sm text-ink">Daniel Mwihoti</p>
            <p className="text-sm text-muted">
              Bitcoin, Cardano, AI &amp; Rust developer. Nairobi, working with teams worldwide.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex items-center gap-5 font-mono text-sm">
            <Link href="/writing" className="text-muted hover:text-accent">
              Writing
            </Link>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
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
                className="text-muted hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="font-mono text-xs text-faint">
            &copy; {new Date().getFullYear()} Daniel Mwihoti · Built in the open with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
