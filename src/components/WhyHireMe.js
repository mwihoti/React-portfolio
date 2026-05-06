'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCreditCard,
  FaRobot,
  FaLink,
  FaFileContract,
  FaGithub,
  FaCogs,
  FaArrowRight,
} from 'react-icons/fa';
import { useTheme } from '../context/theme';

const services = [
  {
    icon: FaCreditCard,
    title: 'Payment Integration',
    description:
      'Stripe, M-Pesa, PayPal, and on-chain payments — wired into your site or product, end to end.',
  },
  {
    icon: FaRobot,
    title: 'AI Integration',
    description:
      'LLM-powered features, chatbots, semantic search, and RAG pipelines using OpenAI, Groq, Gemini, or LLaMA.',
  },
  {
    icon: FaLink,
    title: 'Blockchain Integration',
    description:
      'Bitcoin, Cardano, EVM, Solana, Starknet — wallets, signing, transactions, and ecosystem tooling.',
  },
  {
    icon: FaFileContract,
    title: 'Smart Contracts',
    description:
      'Solidity, Plutus, Cairo — written, tested, audited, and deployed to mainnet with confidence.',
  },
  {
    icon: FaCogs,
    title: 'Agentic Automation',
    description:
      'AI agents, workflow automation, scheduled jobs, and bot infrastructure that actually ships.',
  },
  {
    icon: FaGithub,
    title: 'Open Source Contribution',
    description:
      'Active contributor to IntersectMBO, Bitcoin, and Cardano. I can ship inside your repo, not just around it.',
  },
];

export default function WhyHireMe() {
  const darkTheme = useTheme();

  return (
    <section
      id="hire"
      className={`py-20 ${darkTheme ? 'bg-[#0a0a0f]' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            Why Hire Me
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            I&apos;m a multidisciplinary engineer with the discipline to deliver. Whether
            you need payments, AI, blockchain, smart contracts, automation, or an
            open-source collaborator &mdash; I&apos;ll ship it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 card-glow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/30 mb-4">
                <service.icon className="h-5 w-5 text-teal-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-teal-500/25"
          >
            Let&apos;s build something together
            <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
