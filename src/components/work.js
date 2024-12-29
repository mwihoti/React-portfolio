import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/theme';


export default function Work() {
  const darkTheme = useTheme();
  const projects = [
    {
      title: "Guess Game Fullstack DApp",
      description: "A guessing game DApp deployed on Arbitrum Sepolia test network",
      tech: ["Solidity", "TypeScript", "Next.js", "Hardhat", "Web3.js"],
      live: "https://arbitrum-guess-game.vercel.app/",
      github: "https://github.com/mwihoti/arbitrum-guess-game"
    },
    {
      title: "RemoteJob Platform",
      description: "Platform listing remote job opportunities with role-based access",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "Vercel", "WorkOS"],
      live: "https://remote-jobs-peach.vercel.app/",
      github: "https://github.com/mwihoti/remote-jobs"
    },
    {
      title: "KitchenGym",
      description: "Fitness management platform for personalized workout plans",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "Supabase"],
      live: "https://gymbuddy-mmd4t5gt5-mwihotis-projects.vercel.app/",
      github: "https://github.com/mwihoti/gymbuddy"
    },
    {
      title: "MemoryGame",
      description: "Award-Winning interactive memory game using Rust",
      tech: ["Rust", "Slint library"],
      github: "https://github.com/mwihoti/MemoryGame"
    }
  ];

  return (
    <section id="projects" className={`py-20 ${darkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    <FaGithub className="h-5 w-5 mr-2" />
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
                    >
                      <FaExternalLinkAlt className="h-5 w-5 mr-2" />
                      Live Demo
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