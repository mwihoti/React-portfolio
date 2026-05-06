'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import ParticleBackground from './ParticleBackground';

const me = '/me.jpg';

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
    >
      <Icon className="h-7 w-7" />
    </a>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="avatar">
            <img src={me} alt="Daniel Mwihoti" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-5xl md:text-6xl font-bold pb-3 glow-teal ${
            darkTheme ? 'text-teal-400' : 'text-teal-600'
          }`}
        >
          Daniel Edward Mwihoti
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          I build Bitcoin, Cardano, and AI infrastructure in Rust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-6 mt-8"
        >
          <SocialLink href="https://github.com/mwihoti" icon={FaGithub} label="GitHub" />
          <SocialLink
            href="https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/"
            icon={FaLinkedin}
            label="LinkedIn"
          />
          <SocialLink href="mailto:danielmwihoti@gmail.com" icon={FaEnvelope} label="Email" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-500 transition-colors shadow-lg hover:shadow-teal-500/25"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
