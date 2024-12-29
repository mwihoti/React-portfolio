import React from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { AiFillGithub } from "react-icons/ai";
import { GoTriangleDown } from "react-icons/go";
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Switch from './Switch';
import resume from '../assets/DANIELEDWARDCV (1).pdf';
import { useTheme } from '../context/theme';
import me from '../assets/me.jpg';

export default function Profile() {
  const darkTheme = useTheme();

  return (
    <div>
      <section
        className={`min-h-screen flex flex-col items-center justify-center py-20 ${
          darkTheme ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-gray-100'
        }`}
      >
        <div className="text-center p-10">
          <h2 className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
            Daniel Edward Mwihoti
          </h2>
          <h3 className="text-2xl py-2 md:text-3xl dark:text-white">Software Developer</h3>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Solution-oriented and proactive developer skilled in designing scalable web applications
            and creating seamless user experiences.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center space-x-6"
        >
          <SocialLink href="https://github.com/mwihoti" icon={FaGithub} />
          <SocialLink href="https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/" icon={FaLinkedin} />
          <SocialLink href="mailto:danielmwihoti@gmail.com" icon={FaEnvelope} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <a
            href="#contact"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </section>
    </div>
  );
}

function SocialLink({ href, icon: Icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
    >
      <Icon className="h-8 w-8" />
    </motion.a>
  );
}
