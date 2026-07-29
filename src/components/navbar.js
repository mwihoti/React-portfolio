'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes, FaCopy, FaCheck } from 'react-icons/fa';
import { useTheme, useThemeUpdate } from '../context/theme';
import { Link } from 'react-scroll';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { EMAIL } from '../data/site';

export default function Navbar() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  // Scroll links only work on the homepage; elsewhere fall back to /#anchor
  const onHome = usePathname() === '/';

  const navItems = ['About', 'Experience', 'Projects', 'Hire', 'Contact'];

  const toggleMenu = () => setIsOpen(!isOpen);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-[#0a0a0f]/90 backdrop-blur-md border-b border-transparent dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray-300">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
              DM
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <div key={item}>
                {onHome ? (
                  <Link
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    spy={true}
                    activeClass="!text-teal-600 dark:!text-teal-400"
                    className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium text-sm cursor-pointer"
                  >
                    {item}
                  </Link>
                ) : (
                  <NextLink
                    href={`/#${item.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium text-sm"
                  >
                    {item}
                  </NextLink>
                )}
              </div>
            ))}

            <NextLink
              href="/writing"
              className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium text-sm"
            >
              Writing
            </NextLink>

            <a
              href={onHome ? '#contact' : '/#contact'}
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 hover:bg-teal-500 transition-colors"
            >
              Book a Call
            </a>

            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-teal-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <FaCheck className="h-3 w-3 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="h-3 w-3" />
                  <span>Copy email</span>
                </>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkTheme ? (
                <FaSun className="h-5 w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={copyEmail}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Copy email"
              aria-label="Copy email address"
            >
              {copied ? (
                <FaCheck className="h-4 w-4 text-green-400" />
              ) : (
                <FaCopy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkTheme ? (
                <FaSun className="h-5 w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-5 w-5" />
              ) : (
                <FaBars className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={onHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              ))}
              <NextLink
                href="/writing"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 font-medium transition-colors"
                onClick={toggleMenu}
              >
                Writing
              </NextLink>
              <a
                href={onHome ? '#contact' : '/#contact'}
                className="mt-2 block rounded-md bg-teal-600 px-3 py-2 text-center font-semibold text-white hover:bg-teal-500 transition-colors"
                onClick={toggleMenu}
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
