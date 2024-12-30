import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';

export default function Skills() {
  const darkTheme = useTheme();
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Responsive Design", "UI/UX Implementation"]
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Express.js", "NestJS", "Deno", "Python (Flask)", "RESTful APIs", "Microservices", "Solidity", "Web3.js"]
    },
    {
      title: "Database & DevOps",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "CI/CD", "Git/GitHub", "Nginx"]
    },
    {
      title: "Other Technologies",
      skills: ["Rust", "Web3", "Linux", "Vim", "API Integration", "Elixir"]
    }
  ];

  return (
    <section id="skills" className={`py-20 ${darkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-teal-600  dark:text-white">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

