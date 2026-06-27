'use client';

import React from 'react';
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
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
  const proofPoints = [
    { value: '20+', label: 'Products shipped' },
    { value: '5+', label: 'Open-source PRs merged' },
    { value: '4', label: 'Blockchain communities' },
  ];
  const valuePoints = [
    'Map the riskiest product decision first',
    'Choose the right stack for speed and security',
    'Leave with a clear build or feature plan',
  ];

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden ${
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex justify-center mb-6"
        >
          <a
            href="https://github.com/mwihoti/danpersonalagent"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase border-2 bg-gradient-to-r from-teal-200 to-cyan-200 border-teal-600 text-teal-900 shadow-[3px_3px_0_0_rgba(15,118,110,0.9)] hover:shadow-[5px_5px_0_0_rgba(15,118,110,0.9)] hover:-translate-x-0.5 hover:-translate-y-0.5 dark:from-teal-900/60 dark:to-cyan-900/60 dark:border-teal-400 dark:text-teal-200 dark:shadow-[3px_3px_0_0_rgba(45,212,191,0.5)] dark:hover:shadow-[5px_5px_0_0_rgba(45,212,191,0.7)] glow-teal transition-all duration-200"
          >
            <span aria-hidden="true" className="animate-pulse text-base">&#x26A1;</span>
            <span className="relative">
              Currently Building
              <span aria-hidden="true" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </span>
            <span className="text-teal-700 dark:text-teal-300">/</span>
            <span className="font-extrabold">Personal AI Agent</span>
            <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <div className="avatar">
                <img src={me} alt="Daniel Mwihoti" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300"
            >
              Daniel Mwihoti
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight pb-3 glow-teal ${
                darkTheme ? 'text-teal-400' : 'text-teal-600'
              }`}
            >
              Building blockchain and AI products that don&apos;t just work.
              They move forward.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto lg:mx-0 leading-relaxed"
            >
              I help businesses, institutions, and startups turn product ideas
              into shipped applications using web, cloud, AI automation,
              crypto, and full-stack engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <a
                href="https://cal.com/daniel-mwihoti-5cceb2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-teal-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-teal-500 transition-colors shadow-lg hover:shadow-teal-500/25"
              >
                Book Your Free Blockchain Discovery Call
                <FaArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400 lg:text-left">
              No obligation, just a 15-minute call to map the next practical move.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-8 flex justify-center lg:justify-start gap-6"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto lg:mx-0"
            >
              {proofPoints.map((point) => (
                <div
                  key={point.label}
                  className="rounded-lg border border-gray-200 bg-white/80 p-4 text-center dark:border-gray-700/60 dark:bg-gray-900/60"
                >
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {point.value}
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {point.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-xl shadow-teal-900/5 dark:border-gray-700/60 dark:bg-gray-900/70"
          >
            <div className="flex items-center gap-3 text-teal-600 dark:text-teal-400">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/40">
                <FaCalendarAlt className="h-4 w-4" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Build the right thing first
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  For founders and teams turning rough ideas into usable products.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {valuePoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700/60 dark:bg-gray-950/50"
                >
                  <FaCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 text-sm text-gray-600 dark:text-gray-300">
              <a href="https://cal.com/daniel-mwihoti-5cceb2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 font-semibold text-white hover:bg-teal-500 transition-colors">
                Book the 15-minute call
                <FaArrowRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="rounded-lg border border-gray-200 px-4 py-3 text-center hover:border-teal-500 hover:text-teal-600 dark:border-gray-700 dark:hover:text-teal-400 transition-colors">
                View selected projects
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
