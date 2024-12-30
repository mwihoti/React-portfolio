import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/theme';

export default function Footer() {
  const darkTheme = useTheme();
  return (
    <footer className={`py-8 ${darkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/mwihoti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:danielmwihoti@gmail.com"
              className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
            >
              <FaEnvelope className="h-6 w-6" />
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Daniel Mwihoti. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

