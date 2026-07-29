'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import {
  FaCreditCard,
  FaRobot,
  FaLink,
  FaFileContract,
  FaGithub,
  FaCogs,
  FaArrowRight,
} from 'react-icons/fa';
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiExpress, SiPython, SiNestjs,
  SiPostgresql, SiMongodb, SiRedis, SiDocker, SiGit, SiNginx, SiLinux,
  SiRust, SiHaskell, SiElixir,
  SiBitcoin, SiEthereum, SiSolidity,
} from 'react-icons/si';

function DotScale({ level }) {
  return (
    <div className="flex gap-[3px] mt-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= level ? 'bg-teal-400' : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

function SkillItem({ skill }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg border border-gray-200 dark:border-gray-700/40 hover:border-teal-500/40 transition-colors text-center">
      {skill.Icon ? (
        <skill.Icon style={{ color: skill.color }} className="h-6 w-6" />
      ) : (
        <span aria-hidden="true" className="h-6 w-6 flex items-center justify-center text-teal-400 text-sm font-bold">
          &#x2022;
        </span>
      )}
      <span className="text-xs text-gray-700 dark:text-gray-300 leading-tight">{skill.name}</span>
      <DotScale level={skill.dots} />
    </div>
  );
}

const services = [
  {
    icon: FaCreditCard,
    title: 'Payment Integration',
    description:
      'Stripe, M-Pesa, PayPal, and on-chain payments — wired into your site or product, end to end.',
  },
  {
    icon: FaRobot,
    title: 'AI Integration',
    description:
      'LLM-powered features, chatbots, semantic search, and RAG pipelines using OpenAI, Groq, Gemini, or LLaMA.',
  },
  {
    icon: FaLink,
    title: 'Blockchain Integration',
    description:
      'Bitcoin, Cardano, EVM, Solana, Starknet — wallets, signing, transactions, and ecosystem tooling.',
  },
  {
    icon: FaFileContract,
    title: 'Smart Contracts',
    description:
      'Solidity, Plutus, Cairo — written, tested, audited, and deployed to mainnet with confidence.',
  },
  {
    icon: FaCogs,
    title: 'Agentic Automation',
    description:
      'AI agents, workflow automation, scheduled jobs, and bot infrastructure that actually ships.',
  },
  {
    icon: FaGithub,
    title: 'Open Source Contribution',
    description:
      'Active contributor to IntersectMBO, Bitcoin, and Cardano. I can ship inside your repo, not just around it.',
  },
];

const skillCategories = [
  {
    title: 'Product Interfaces',
    summary: 'Clean, fast web apps for dashboards, wallets, marketplaces, and crypto workflows.',
    header: 'text-blue-400',
    border: 'border-blue-500/20',
    skills: [
      { name: 'HTML5', Icon: SiHtml5, color: '#e34f26', dots: 5 },
      { name: 'CSS3', Icon: SiCss3, color: '#1572b6', dots: 5 },
      { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e', dots: 5 },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6', dots: 4 },
      { name: 'React', Icon: SiReact, color: '#61dafb', dots: 5 },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff', dots: 4 },
    ],
  },
  {
    title: 'Backend Systems',
    summary: 'APIs, databases, queues, and service layers that stay reliable under real users.',
    header: 'text-green-400',
    border: 'border-green-500/20',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933', dots: 4 },
      { name: 'Express', Icon: SiExpress, color: '#ffffff', dots: 4 },
      { name: 'Python', Icon: SiPython, color: '#3776ab', dots: 4 },
      { name: 'NestJS', Icon: SiNestjs, color: '#e0234e', dots: 3 },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169e1', dots: 4 },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47a248', dots: 4 },
    ],
  },
  {
    title: 'Delivery & Infrastructure',
    summary: 'Practical deployment, observability, and tooling for teams that need to move.',
    header: 'text-orange-400',
    border: 'border-orange-500/20',
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ed', dots: 3 },
      { name: 'Git', Icon: SiGit, color: '#f05032', dots: 5 },
      { name: 'Redis', Icon: SiRedis, color: '#dc382d', dots: 3 },
      { name: 'Linux', Icon: SiLinux, color: '#fcc624', dots: 4 },
      { name: 'Nginx', Icon: SiNginx, color: '#009639', dots: 3 },
      { name: 'CI/CD', dots: 3 },
    ],
  },
  {
    title: 'Blockchain & Web3',
    summary: 'Wallet flows, smart contracts, signing logic, and on-chain product architecture.',
    header: 'text-purple-400',
    border: 'border-purple-500/20',
    skills: [
      { name: 'Bitcoin', Icon: SiBitcoin, color: '#f7931a', dots: 4 },
      { name: 'Ethereum/EVM', Icon: SiEthereum, color: '#627eea', dots: 4 },
      { name: 'Solidity', Icon: SiSolidity, color: '#a0a0a0', dots: 3 },
      { name: 'Solana', dots: 3 },
      { name: 'Starknet', dots: 3 },
      { name: 'Cairo', dots: 3 },
      { name: 'Cardano', dots: 3 },
      { name: 'Lightning Network', dots: 3 },
      { name: 'Dojo Framework', dots: 3 },
      { name: 'Account Abstraction', dots: 3 },
    ],
  },
  {
    title: 'Languages & Systems',
    summary: 'Rust, Haskell, and lower-level engineering for performance-sensitive code.',
    header: 'text-teal-400',
    border: 'border-teal-500/20',
    skills: [
      { name: 'Rust', Icon: SiRust, color: '#dea584', dots: 4 },
      { name: 'Haskell', Icon: SiHaskell, color: '#5e5086', dots: 3 },
      { name: 'Elixir', Icon: SiElixir, color: '#4b275f', dots: 2 },
      { name: 'C++', dots: 3 },
      { name: 'Vim', dots: 4 },
      { name: 'API Integration', dots: 4 },
    ],
  },
];

export default function Skills() {
  const darkTheme = useTheme();

  return (
    <section
      id="skills"
      className={`py-20 ${darkTheme ? 'bg-[#0a0a0f]' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400 glow-teal">
            How I Help
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Whether you need payments, AI, blockchain, smart contracts, automation,
            or an open-source collaborator &mdash; I&apos;ll ship it.
          </p>
        </motion.div>

        {/* Services — merged from the former "Why Hire Me" section; #hire is the nav target */}
        <div id="hire" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 card-glow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-lg bg-teal-500/10 border border-teal-500/30">
                  <service.icon className="h-4 w-4 text-teal-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The stack behind it</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The stack matters because it reduces delivery risk, not because it fills a badge wall.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-white dark:bg-gray-900/60 rounded-xl shadow-lg p-6 border ${category.border} card-glow`}
            >
              <h3 className={`text-lg font-bold ${category.header} mb-4`}>
                {category.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {category.summary}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {category.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-teal-500/25"
          >
            Let&apos;s build something together
            <FaArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
