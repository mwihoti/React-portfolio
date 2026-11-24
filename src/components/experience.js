'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import { DURATION, EASE, REDUCED, STAGGER } from '../lib/motion';
import { Stagger, StaggerItem, useReduceMotion } from './motion';

const experiences = [
  {
    title: 'Team1 Collaborator — Avalanche',
    company: 'Team1 Africa · Avalanche ecosystem',
    period: 'July 2026 – Present',
    type: 'community',
    description: [
      'Accepted as a Team1 Collaborator — a global network of builders, developers, and creators growing the Avalanche ecosystem.',
      'Contributing through Team1 Africa: community calls, ecosystem building across the region, and the Mini Hack Cohort 2 build program.',
    ],
  },
  {
    title: 'Author — Claude Code Setup Guide',
    company: 'Open source · Self-published',
    period: 'May 2026',
    type: 'community',
    link: 'https://github.com/mwihoti/claudecodesetup',
    description: [
      'Wrote and published an open-source guide showing developers how to use Claude Code for free.',
      'Shared on LinkedIn for the broader developer community.',
    ],
  },
  {
    title: 'Personal AI Agent — danpersonalagent',
    company: 'Personal Project',
    period: '2026 – Present',
    type: 'community',
    link: 'https://github.com/mwihoti/danpersonalagent',
    description: [
      'Building a personal AI agent for autonomous task delegation, research, and workflow automation.',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'rust-payjoin — Payjoin Protocol (BIP 77 / BIP 78)',
    period: '2026',
    type: 'opensource',
    description: [
      'Contributed to rust-payjoin, the reference Rust implementation of Payjoin — privacy-preserving Bitcoin payment batching.',
      'Pull request reviewed and merged into the upstream project.',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'IntersectMBO / lsm-tree',
    period: 'February – April 2026',
    type: 'opensource',
    description: [
      'Contributed to IntersectMBO\'s lsm-tree — a production-grade LSM database library used by Cardano, written in Haskell.',
      'PR #818 merged: refactored Internal.Arena with modern Haskell record extensions (DuplicateRecordFields, NoFieldSelectors, OverloadedRecordDot) replacing RecordWildCards.',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'Cardano Foundation',
    period: 'January – December 2025',
    type: 'opensource',
    description: [
      'PR merged to cardano-foundation/cardano-org: added Kenya-specific CEX list (Binance, Yellow Card, BingX, OKX) for users looking to buy ADA.',
      'Contributed Docker containerisation for the cardano-org documentation platform, enabling reproducible local development.',
    ],
  },
  {
    title: 'Open Source Contributor',
    company: 'rust-bitcoin / stx-labs/explorer',
    period: 'January 2026',
    type: 'opensource',
    description: [
      'Contributed to rust-bitcoin, the foundational Rust library for Bitcoin development used across the ecosystem.',
      'Contributed to stx-labs/explorer, a Bitcoin/Stacks blockchain explorer.',
    ],
  },
  {
    title: 'Bitcoin Lightning Network Attack Contest — Warnet: Wrath of Nalo',
    company: 'Boss Challenge / Bitcoin Dev Project',
    period: 'February 2026',
    type: 'community',
    description: [
      'Competed in a live Bitcoin Lightning Network attack simulation on Signet as part of Team Libra.',
      'Executed channel jamming attacks via hold invoices against designated LND target nodes.',
      'Performed DoS exploits on vulnerable LND versions: gossip timestamp filter DoS (v18.2-beta) and onion bomb (v16.4-beta).',
      'Deployed and commanded 3 armada nodes on live Signet using Warnet CLI and lncli.',
    ],
  },
  {
    title: 'Blockchain Ambassador',
    company: 'Blockchain Centre NBO',
    period: 'October 2025 – Present',
    type: 'work',
    description: [
      'Worked across Tech & Research and Events & Legal departments as both a builder and community support.',
      'Built Cardano DApps (Plutus, Mesh SDK) and Next.js projects; conducted research across blockchain ecosystems.',
      'Represented Blockchain Centre NBO as ambassador at the Cardano Africa Tech Summit.',
    ],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Freelancer — Remote',
    period: '2024 – Present',
    type: 'work',
    description: [
      'Designed, developed, and deployed a Guess Game DApp on Arbitrum Sepolia with on-chain gameplay mechanics.',
      'Architected a PYUSD dApp with integrated blockchain explorer and marketplace, leveraging GCP Blockchain Node Engine.',
      'Built the Kenyan AI Advisory Project on ICP using Motoko, TypeScript, React, and llama3 LLM agents.',
      'Top 10 at StackUp August 2024 Hackathon for a Rust + Slint memory game.',
    ],
  },
];

const TYPE_LABEL = {
  work: 'Work',
  opensource: 'Open source',
  community: 'Community',
};

const INITIAL_COUNT = 4;
const LIST_ID = 'experience-list';

// One timeline row. The divider lives on the row (not the <li>) so a
// collapsing <li> at height 0 hides it too.
function ExperienceRow({ exp, divided }) {
  return (
    <div
      className={`grid gap-2 py-6 md:grid-cols-[13rem_1fr] md:gap-8 ${divided ? 'border-t border-line' : ''}`}
    >
      <div className="font-mono text-xs text-faint">
        <p>{exp.period}</p>
        <p className="mt-1 text-accent">{TYPE_LABEL[exp.type]}</p>
      </div>
      <div className="max-w-3xl">
        <h4 className="font-semibold text-ink">{exp.title}</h4>
        <p className="text-sm text-muted">{exp.company}</p>
        <ul className="mt-3 space-y-1.5">
          {exp.description.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {exp.link && (
          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="link-arrow mt-3 text-xs">
            <FaExternalLinkAlt className="arrow-nudge-up h-3 w-3" aria-hidden="true" />
            {exp.link.replace('https://', '')}
          </a>
        )}
      </div>
    </div>
  );
}

// Expand/collapse for the extra entries (micro-interaction + 60fps skills):
// height:auto + opacity on a handful of rows, only on user click, so the
// layout cost is bounded and justified (content below must move anyway).
// overflow is hidden only while animating, then restored, so keyboard focus
// rings on links inside the row are never clipped.
// Reduced motion: MotionConfig snaps height; what is left is a 150ms fade.
function collapseMotion(reduce) {
  const open = reduce ? { duration: REDUCED.duration, ease: 'linear' } : { duration: DURATION.moderate, ease: EASE.out };
  const close = reduce ? { duration: REDUCED.duration, ease: 'linear' } : { duration: DURATION.base, ease: EASE.in };
  return {
    initial: { height: 0, opacity: 0, overflow: 'hidden' },
    animate: { height: 'auto', opacity: 1, transition: open, transitionEnd: { overflow: 'visible' } },
    exit: { height: 0, opacity: 0, overflow: 'hidden', transition: close },
  };
}

// Compact timeline rendered inside the About section.
export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  const reduce = useReduceMotion();
  const buttonRef = useRef(null);
  const first = experiences.slice(0, INITIAL_COUNT);
  const extra = experiences.slice(INITIAL_COUNT);
  const rowMotion = collapseMotion(reduce);

  // After "Show less" the list shrinks above the button; bring the button
  // (which keeps focus) back into view so keyboard users are not stranded.
  // scrollIntoView honors scroll-padding-top and the reduced-motion
  // scroll-behavior set in index.css.
  const keepButtonInView = () => {
    const btn = buttonRef.current;
    if (!btn || showAll) return;
    // The fixed navbar covers the top scroll-padding (5rem) of the viewport.
    const navOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const { top, bottom } = btn.getBoundingClientRect();
    if (top < navOffset || bottom > window.innerHeight) btn.scrollIntoView({ block: 'nearest' });
  };

  return (
    <div id="experience">
      {/* Rows rise in one after another the first time the list is seen. */}
      <Stagger as="ol" id={LIST_ID} stagger={STAGGER.base} className="border-y border-line">
        {first.map((exp, i) => (
          <StaggerItem as="li" key={exp.title + exp.period}>
            <ExperienceRow exp={exp} divided={i > 0} />
          </StaggerItem>
        ))}
        <AnimatePresence initial={false} onExitComplete={keepButtonInView}>
          {showAll &&
            extra.map((exp) => (
              <motion.li key={exp.title + exp.period} {...rowMotion}>
                <ExperienceRow exp={exp} divided />
              </motion.li>
            ))}
        </AnimatePresence>
      </Stagger>

      {extra.length > 0 && (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          aria-controls={LIST_ID}
          className="btn-outline mt-6 !py-2"
        >
          {showAll ? 'Show less' : `Show all ${experiences.length} entries`}
          {/* One chevron that turns over, instead of swapping icons. */}
          <FaChevronDown
            className={`h-3 w-3 transition-transform duration-moderate ease-move motion-reduce:transition-none ${showAll ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
}
