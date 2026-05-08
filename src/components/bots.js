'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import { useTheme } from '../context/theme';

const bots = [
  {
    handle: '@enter_memorabilia_musem_bot',
    name: 'Memorabilia',
    badge: 'Mini App',
    problem:
      'Make a fully on-chain Starknet game playable by anyone, without a wallet or gas.',
    description:
      'Telegram Mini App entry point for the Memorabilia memory-card game on Starknet. Account Abstraction handles wallet creation behind the scenes; players match cards across 3 eras and 15 levels with gasless transactions and NFT minting via Cartridge.',
    tech: ['Telegram Mini App', 'Starknet', 'Cairo', 'Dojo Engine', 'Cartridge'],
    telegram: 'https://t.me/enter_memorabilia_musem_bot',
    github: 'https://github.com/mwihoti/memorabilia',
  },
  {
    handle: '@danmwisecondbrainbot',
    name: 'Second Brain',
    badge: 'Live',
    problem:
      'Capture ideas, links, and notes the moment they hit — recall them later in plain language.',
    description:
      'Personal AI second-brain on Telegram. Forward links, drop voice notes, jot ideas; ask questions in natural language and the bot retrieves with context. Built around an LLM + vector store so semantic search beats keyword grep.',
    tech: ['Telegram Bot API', 'LLM', 'Vector DB', 'Python'],
    telegram: 'https://t.me/danmwisecondbrainbot',
    github: null,
  },
];

const badgeStyles = {
  'Mini App':
    'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
  Live: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  Building: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
};

export default function Bots() {
  const darkTheme = useTheme();

  return (
    <section
      id="bots"
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
            Telegram Bots
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Bots and Mini Apps shipped on Telegram. Tap any to chat — they&apos;re all live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bots.map((bot, index) => (
            <motion.div
              key={bot.handle}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="group relative bg-white dark:bg-gray-800/60 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700/50 card-glow"
            >
              <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl pointer-events-none">
                <p className="text-teal-400 text-center font-medium leading-relaxed">
                  {bot.problem}
                </p>
              </div>

              <div className="p-6">
                <span
                  className={`inline-block mb-2 px-2 py-0.5 text-xs font-semibold rounded-full ${
                    badgeStyles[bot.badge] || badgeStyles.Live
                  }`}
                >
                  {bot.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {bot.name}
                </h3>
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-3">
                  {bot.handle}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {bot.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {bot.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 rounded-full border border-teal-200 dark:border-teal-800/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={bot.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-[#229ED9] hover:bg-[#1a8cc2] text-white transition-colors shadow-md shadow-[#229ED9]/20"
                  >
                    <FaTelegramPlane className="h-4 w-4" />
                    Open in Telegram
                  </a>
                  {bot.github && (
                    <a
                      href={bot.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 text-sm"
                    >
                      <FaGithub className="h-4 w-4 mr-1.5" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
