'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import ContributionGraph from './ContributionGraph';
import TerminalCard from './TerminalCard';

const stackTimeline = [
  {
    year: '2023',
    techs: ['React', 'Node.js', 'PostgreSQL', 'Express', 'MongoDB'],
    color: 'text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-500/10',
  },
  {
    year: '2024',
    techs: ['Solidity', 'Web3.js', 'ICP', 'Arbitrum', 'Rust', 'Civic Auth'],
    color: 'text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-500/10',
  },
  {
    year: '2025',
    techs: ['JavaScript', 'Python', 'Fullstack', 'Data Eng.', 'ML', 'Deployment'],
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
  },
  {
    year: '2026',
    techs: ['Bitcoin', 'Rust', 'Cardano', 'Haskell', 'Starknet', 'AI Agents', 'LSM-tree'],
    color: 'text-teal-400',
    border: 'border-teal-500/40',
    bg: 'bg-teal-500/10',
  },
];

const openSourceStats = [
  { value: '5+', label: 'PRs Merged' },
  { value: '3', label: 'OS Orgs' },
  { value: '20+', label: 'Projects' },
  { value: '4', label: 'Communities' },
];

export default function About() {
  const darkTheme = useTheme();

  return (
    <section
      id="about"
      className={`py-20 w-full ${darkTheme ? 'bg-[#0d1117]' : 'bg-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            About Me
          </h2>
        </motion.div>

        {/* Bio + terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700/50 card-glow"
          >
            <p className="leading-8 text-lg text-gray-700 dark:text-gray-300 mb-5">
              I&apos;m a Bitcoin, Cardano, and Rust engineer based in Nairobi, Kenya. I
              build cryptography and consensus systems &mdash; secp256k1 wallets, Plutus
              smart contracts, on-chain games, and AI-augmented developer tooling.
            </p>
            <p className="leading-8 text-lg text-gray-700 dark:text-gray-300">
              I&apos;m an open-source contributor to IntersectMBO&apos;s lsm-tree (Haskell,
              used by the Cardano node), the Cardano Foundation, and rust-bitcoin. I also
              ship full-stack &mdash; Next.js, Supabase, Postgres &mdash; when the project
              calls for it. Open to remote contracts and collaborations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <TerminalCard />
          </motion.div>
        </div>

        {/* Tech Evolution timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700/50 card-glow mb-10"
        >
          <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-6">
            Tech Evolution
          </h3>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-700" />
            {stackTimeline.map((row, i) => (
              <motion.div
                key={row.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-5 mb-6 last:mb-0"
              >
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${row.border} ${row.bg} ${row.color} flex-shrink-0`}
                >
                  {row.year.slice(2)}
                </div>
                <div className="pt-1">
                  <span className={`text-sm font-semibold ${row.color}`}>{row.year}</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {row.techs.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {openSourceStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 card-glow"
            >
              <div className="text-3xl font-bold text-teal-400 glow-teal">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* GitHub contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50"
        >
          <h3 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-1">
            GitHub Activity
          </h3>
          <ContributionGraph />
        </motion.div>
      </div>
    </section>
  );
}
