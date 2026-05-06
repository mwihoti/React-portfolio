'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaBriefcase, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/theme';

const experiences = [
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

function TypeIcon({ type }) {
  if (type === 'opensource') {
    return <FaGithub className="h-4 w-4 text-teal-400" />;
  }
  if (type === 'community') {
    return <FaUsers className="h-4 w-4 text-purple-400" />;
  }
  return <FaBriefcase className="h-4 w-4 text-blue-400" />;
}

function TypeBadge({ type }) {
  if (type === 'opensource') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-teal-900/40 text-teal-300 border border-teal-700/40 rounded-full">
        <FaGithub className="h-2.5 w-2.5" /> Open Source
      </span>
    );
  }
  if (type === 'community') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-purple-900/40 text-purple-300 border border-purple-700/40 rounded-full">
        <FaUsers className="h-2.5 w-2.5" /> Community
      </span>
    );
  }
  return null;
}

export default function Experience() {
  const darkTheme = useTheme();

  return (
    <section
      id="experience"
      className={`py-20 ${darkTheme ? 'bg-[#0d1117]' : 'bg-gray-50'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/60 via-teal-500/30 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="relative flex gap-8 mb-8 last:mb-0"
            >
              <div className="relative flex-shrink-0 w-12 flex justify-center">
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                    exp.type === 'opensource'
                      ? 'border-teal-500 bg-teal-900/40'
                      : exp.type === 'community'
                      ? 'border-purple-500 bg-purple-900/40'
                      : 'border-blue-500 bg-blue-900/40'
                  }`}
                >
                  <TypeIcon type={exp.type} />
                </div>
              </div>

              <div className="flex-1 bg-white dark:bg-gray-800/60 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 shadow-md card-glow mb-2">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400">
                    {exp.title}
                  </h3>
                  <TypeBadge type={exp.type} />
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {exp.company}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 mb-3">
                  {exp.period}
                </p>
                <ul className="space-y-1.5">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-1.5 w-2 h-2 rounded-full bg-teal-500/60 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-teal-500 hover:text-teal-400 transition-colors"
                  >
                    <FaExternalLinkAlt className="h-3 w-3" />
                    {exp.link.replace('https://', '')}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
