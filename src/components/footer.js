'use client';

import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaStar, FaCodeBranch } from 'react-icons/fa';
import { useTheme } from '../context/theme';

export default function Footer() {
  const darkTheme = useTheme();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/mwihoti')
      .then((r) => r.json())
      .then((data) => {
        if (data.public_repos !== undefined) {
          setStats({
            repos: data.public_repos,
            followers: data.followers,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className={`py-10 ${darkTheme ? 'bg-[#0a0a0f] border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* GitHub stats */}
          {stats && (
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <FaCodeBranch className="h-3.5 w-3.5 text-teal-400" />
                <span className="text-teal-400 font-semibold">{stats.repos}</span> public repos
              </span>
              <span className="flex items-center gap-1.5">
                <FaStar className="h-3.5 w-3.5 text-teal-400" />
                <span className="text-teal-400 font-semibold">{stats.followers}</span> followers
              </span>
            </div>
          )}

          {/* Social links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/mwihoti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:danielmwihoti@gmail.com"
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
