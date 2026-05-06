'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/theme';

const FILTERS = ['All', 'Bitcoin', 'Web3', 'AI', 'Fullstack', 'Game'];

const projects = [
  {
    title: 'Open Wallet Standard',
    badge: 'OWS Hackathon',
    problem: 'AI agents need to sign blockchain transactions without ever exposing raw private keys.',
    description:
      'Multi-chain AI agent wallet supporting 9 chains (EVM, Solana, Bitcoin, Cosmos, XRPL+). Policy-gated signing tokens — AI agents never hold raw keys. Includes Solana + EVM signature verification and live testnet transactions.',
    tech: ['TypeScript', 'Rust', 'React', 'Solana', 'EVM', 'Bitcoin', 'Cosmos', 'XRPL'],
    live: 'https://open-wallet-standard.onrender.com',
    github: 'https://github.com/mwihoti/open-wallet-standard',
    category: ['Web3', 'AI', 'Bitcoin'],
  },
  {
    title: 'Bitcoin Wallet Lab',
    problem: 'Show exactly how Bitcoin works at every layer — from key generation to signed, broadcast transactions on testnet.',
    description:
      'Educational Bitcoin wallet on testnet4 built on what I learned from Bitcoin Dojo. Generate all three address types (P2PKH, Nested SegWit, Native SegWit) from a single key, receive testnet coins, build and sign a real transaction, then broadcast and watch it confirm on-chain. secp256k1 + ECDSA + RFC 6979 implemented from scratch in a vendored bitcoin_dojo crate. Includes signature malleability demo.',
    tech: ['Rust', 'Axum', 'Tokio', 'secp256k1', 'ECDSA', 'Docker'],
    live: 'https://wallet-lab.onrender.com',
    github: 'https://github.com/mwihoti/wallet_lab',
    category: ['Bitcoin'],
  },
  {
    title: 'LiteCert — Blockchain Certificate Verification',
    problem: 'Give institutions a tamper-proof way to issue and instantly verify credentials without a centralised authority.',
    description:
      'Certificate verification platform anchored on the Cardano blockchain using Mesh SDK. Institutions issue digital credentials with unique identifiers (e.g. CAR_JOH_01); employers verify instantly via on-chain transaction hash. Privacy-first: certificate data is hashed before blockchain submission.',
    tech: ['TypeScript', 'React', 'Cardano', 'Mesh SDK', 'Plutus'],
    live: 'https://certified-chain.vercel.app',
    github: 'https://github.com/mwihoti/certified-chain',
    category: ['Web3'],
  },
  {
    title: 'Memorabilia',
    problem: 'Build a fully on-chain game for the Dojo Game Night hackathon, accessible via Telegram without crypto knowledge.',
    description:
      'Fully on-chain memory card matching game on Starknet, built for the Dojo Game Night hackathon. Playable as a Telegram Mini App (@enter_memorabilia_musem_bot) — no wallet or gas fees to start. Features Account Abstraction, gasless transactions, 3 eras, 15 levels, daily challenges, and NFT minting via Cartridge.',
    tech: ['TypeScript', 'Starknet', 'Dojo Engine', 'Cairo', 'Telegram Mini App'],
    live: 'https://memorabilia-game.vercel.app',
    github: 'https://github.com/mwihoti/memorabilia',
    category: ['Web3', 'Game'],
  },
  {
    title: 'Daily Habit Hub',
    problem: 'Build exercise habits through daily accountability, community support, and on-chain proof of progress on Avalanche.',
    description:
      'Modern fitness tracking app combining social accountability with Web3 rewards. Daily check-ins across gym, running, cycling, yoga and more. Visual streak tracking, community feed, professional coaching connections, and $HABIT token rewards + "Proof of Progress" NFT minting on the Avalanche network.',
    tech: ['Next.js', 'Supabase', 'Avalanche', 'Wagmi', 'RainbowKit', 'TanStack Query', 'shadcn/ui'],
    live: 'https://daily-habit-hub.vercel.app',
    github: 'https://github.com/mwihoti/daily-habit-hub',
    category: ['Web3', 'Fullstack'],
  },
  {
    title: 'Computer Vision — Traffic & Attendance',
    problem: 'Real-time vehicle speed, traffic jam detection, and person tracking at the edge with zero cloud latency.',
    description:
      'Edge-native CV system for real-time traffic sensing and multi-class object counting. Dual-stack architecture: Python (Ultralytics + DeepFace for gender analysis) for prototyping, and Rust (ort/ONNX Runtime + OpenCV) for high-performance edge inference. Homography-based pixel-to-meter calibration for science-grade speed data. Designed to run on NVIDIA Jetson.',
    tech: ['Python', 'Rust', 'YOLO', 'ONNX Runtime', 'OpenCV', 'DeepFace'],
    github: 'https://github.com/mwihoti/computer_vision',
    category: ['AI'],
  },
];

export default function Work() {
  const darkTheme = useTheme();
  const [selected, setSelected] = useState('All');

  const filtered =
    selected === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(selected));

  return (
    <section
      id="projects"
      className={`py-20 ${darkTheme ? 'bg-[#0d1117]' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Selected work in Bitcoin, Cardano, Starknet, AI, and full-stack.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelected(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selected === f
                  ? 'bg-teal-600 border-teal-600 text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-500 hover:text-teal-500 dark:hover:text-teal-400'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="group relative bg-gray-50 dark:bg-gray-800/60 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700/50 card-glow"
              >
                {/* Hover overlay showing the problem statement */}
                <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl pointer-events-none">
                  <p className="text-teal-400 text-center font-medium leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-6">
                  {project.badge && (
                    <span className="inline-block mb-2 px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 rounded-full">
                      {project.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 text-sm"
                      >
                        <FaGithub className="h-4 w-4 mr-1.5" />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 text-sm"
                      >
                        <FaExternalLinkAlt className="h-3.5 w-3.5 mr-1.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/mwihoti?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium border border-teal-500/40 text-teal-500 dark:text-teal-400 hover:bg-teal-500/10 transition-colors"
          >
            <FaGithub className="h-4 w-4" aria-hidden="true" />
            More projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
