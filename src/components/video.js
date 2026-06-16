'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';

export default function VideoShowcase() {
  const darkTheme = useTheme();

  return (
    <section
      id="video"
      className={`py-20 ${darkTheme ? 'bg-[#0a0a0f]' : 'bg-gray-50'}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            Let Me Show You What I Can Do
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            A quick video introduction to my work and approach to development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 card-glow shadow-2xl"
        >
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              controls
              className="absolute top-0 left-0 w-full h-full"
              poster={undefined}
            >
              <source src="/intro-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm"
        >
          <p>
            Watch this introduction to learn about my background, skills, and what
            makes me excited about building amazing products.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
