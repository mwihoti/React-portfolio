'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/theme';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data/site';

export default function Footer() {
  const darkTheme = useTheme();

  return (
    <footer className={`py-10 ${darkTheme ? 'bg-[#0a0a0f] border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Site links */}
          <div className="flex gap-6 text-sm">
            <Link
              href="/writing"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors font-medium"
            >
              Writing
            </Link>
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors font-medium"
            >
              Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex space-x-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Daniel Mwihoti. Built with React &amp; Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
