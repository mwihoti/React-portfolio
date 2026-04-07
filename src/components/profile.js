import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import me from '../assets/me.jpg';
import Typewriter from 'typewriter-effect';
import './floatingElements.css';
import ParticleBackground from './ParticleBackground';

function TerminalCard() {
  return (
    <div className="terminal-card w-full max-w-xs text-left flex-shrink-0">
      <div className="terminal-header">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
        <span className="ml-2 text-xs text-gray-500">daniel@nairobi: ~</span>
      </div>
      <div className="terminal-body space-y-0.5">
        <div>
          <span className="text-teal-400">❯ </span>
          <span className="text-gray-400">whoami</span>
        </div>
        <div className="text-white pl-2">Full-stack Developer, Nairobi</div>
        <div className="mt-1">
          <span className="text-teal-400">❯ </span>
          <span className="text-gray-400">cat stats.txt</span>
        </div>
        <div className="text-green-400 pl-2">3+ years experience</div>
        <div className="text-green-400 pl-2">20+ projects shipped</div>
        <div className="mt-1">
          <span className="text-teal-400">❯ </span>
          <span className="text-gray-400">git log --merged</span>
        </div>
        <div className="text-yellow-400 pl-2 text-xs">&#x2713; IntersectMBO/lsm-tree #818</div>
        <div className="text-yellow-400 pl-2 text-xs">&#x2713; cardano-foundation/cardano-org</div>
        <div className="text-yellow-400 pl-2 text-xs">&#x2713; bitcoin-core/bitcoin</div>
        <div className="mt-1">
          <span className="text-teal-400">❯ </span>
          <span className="blink-cursor text-teal-400">&#x2588;</span>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, delay, icon: Icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        y: { delay: delay + 0.5, duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.2, y: -15, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
    >
      <Icon className="h-8 w-8" />
    </motion.a>
  );
}

export default function Profile() {
  const darkTheme = useTheme();

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center py-20 space-y-8 overflow-hidden ${
        darkTheme ? 'bg-[#0a0a0f]' : 'bg-gray-50'
      }`}
    >
      {darkTheme && <ParticleBackground />}
      {darkTheme && (
        <div
          className="absolute inset-0 dot-grid pointer-events-none"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Currently building badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <a
          href="https://gymbuddy-s.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-900/50 border border-teal-500/30 text-teal-400 text-sm hover:bg-teal-900/70 transition-colors"
        >
          <span className="animate-pulse">&#x26A1;</span>
          <span>Building: MuscleMind</span>
        </a>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="avatar">
            <img src={me} alt="Daniel Mwihoti" />
          </div>
        </motion.div>

        {/* Name + typewriter + terminal card */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4">
          <div className="text-center lg:text-left">
            <h2
              className={`text-5xl py-2 font-medium md:text-6xl glow-teal ${
                darkTheme ? 'text-teal-400' : 'text-teal-600'
              }`}
            >
              Daniel Edward Mwihoti
            </h2>
            <h3 className="text-2xl font-bold dark:text-gray-300 py-2 md:text-3xl">
              Software Developer
            </h3>
            <div className="max-w-xl font-semibold text-xl text-gray-600 dark:text-gray-300 min-h-[2rem]">
              <Typewriter
                options={{
                  strings: [
                    'Full-stack developer based in Nairobi, Kenya.',
                    'Building on Bitcoin, web, AI, and Cardano.',
                    'Open source contributor to IntersectMBO, Bitcoin & Cardano Foundation.',
                    'Web3 + AI. Always learning, always shipping.',
                    "3+ years. 20+ projects. Let's build something impactful.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TerminalCard />
          </motion.div>
        </div>
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center space-x-6 relative z-10"
      >
        <SocialLink href="https://github.com/mwihoti" icon={FaGithub} delay={0} />
        <SocialLink
          href="https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/"
          icon={FaLinkedin}
          delay={0.2}
        />
        <SocialLink href="mailto:danielmwihoti@gmail.com" icon={FaEnvelope} delay={0.4} />
      </motion.div>

      <div className="text-teal-400 text-xl font-bold relative z-10 min-h-[2rem]">
        <Typewriter
          options={{
            strings: ["Let's build something that lasts.", 'Open to collaborations.'],
            autoStart: true,
            loop: true,
            delay: 80,
            deleteSpeed: 50,
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative z-10"
      >
        <a
          href="#contact"
          className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-500 transition-colors shadow-lg hover:shadow-teal-500/25"
        >
          Get In Touch
        </a>
      </motion.div>
    </section>
  );
}
