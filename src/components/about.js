import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import ContributionGraph from './ContributionGraph';

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
    techs: ['Bitcoin', 'Haskell', 'Cardano', 'Data Eng.', 'Starknet', 'Lightning'],
    color: 'text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
  },
  {
    year: '2026',
    techs: ['Cairo', 'Cosmos', 'Solana', 'XRPL', 'AI Agents', 'LSM-tree'],
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

        {/* Split layout: bio left, stack timeline right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700/50 card-glow"
          >
            <p className="leading-8 text-lg text-gray-700 dark:text-gray-300 mb-5">
              I&apos;m a full-stack developer based in Nairobi, Kenya, with 3+ years of
              experience building scalable web applications, AI-powered tools, and
              blockchain systems. My work spans the MERN stack, TypeScript, Python, and
              Rust &mdash; from SaaS products to decentralized protocols.
            </p>
            <p className="leading-8 text-lg text-gray-700 dark:text-gray-300">
              Over the past year I&apos;ve gone deep into Bitcoin development (secp256k1,
              SegWit, live transaction broadcasting), Starknet gaming with the Dojo
              framework, and Cardano ecosystem tooling. I&apos;m an open source contributor to
              IntersectMBO&apos;s lsm-tree Haskell library, the Cardano Foundation, and Bitcoin
              Core. If you have an idea to bring to life &mdash; from a landing page to a
              production DApp &mdash; I&apos;m available to collaborate.
            </p>
          </motion.div>

          {/* Stack timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700/50 card-glow"
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
        </div>

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
