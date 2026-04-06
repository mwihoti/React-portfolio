import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/theme";

export default function Work() {
  const darkTheme = useTheme();
  const projects = [
    {
      title: "Open Wallet Standard",
      badge: "OWS Hackathon",
      description:
        "Multi-chain AI agent wallet supporting 9 chains (EVM, Solana, Bitcoin, Cosmos, XRPL+). Policy-gated signing tokens — AI agents never hold raw keys. Includes Solana + EVM signature verification and live testnet transactions.",
      tech: ["TypeScript", "Rust", "React", "Solana", "EVM", "Bitcoin", "Cosmos", "XRPL"],
      live: "https://open-wallet-standard.onrender.com",
      github: "https://github.com/mwihoti/open-wallet-standard",
    },
    {
      title: "Bitcoin Wallet Lab",
      description:
        "secp256k1 + ECDSA cryptography built from scratch in Rust. Supports P2PKH, Nested SegWit, and Native SegWit. Live tx broadcast with confirmation tracking and a signature malleability demo.",
      tech: ["Rust", "JavaScript", "secp256k1", "ECDSA", "Bitcoin"],
      live: "https://wallet-lab.onrender.com",
      github: "https://github.com/mwihoti/btc",
    },
    {
      title: "Bitcoin Dojo",
      description:
        "Guided Bitcoin development learning platform with structured tracks: Cryptography Fundamentals, Addresses & Encoding, and Transactions. Hands-on interactive exercises for developers entering the Bitcoin ecosystem.",
      tech: ["TypeScript", "React", "Bitcoin"],
      live: "https://bitcoindojo.dev",
    },
    {
      title: "Memorabilia",
      description:
        "Fully on-chain memory card matching game on Starknet, playable as a Telegram Mini App — no wallet or gas fees to start. Features Account Abstraction, gasless transactions, 3 eras, 15 levels, daily challenges, and NFT minting via Cartridge.",
      tech: ["TypeScript", "Starknet", "Dojo Engine", "Cairo", "Telegram Mini App"],
      live: "https://memorabilia-game.vercel.app",
      github: "https://github.com/mwihoti/memorabilia",
    },
    {
      title: "Spotter AI",
      description:
        "AI-powered fitness spotter application built with TypeScript.",
      tech: ["TypeScript", "AI/ML"],
      github: "https://github.com/mwihoti/Spotter-AI",
    },
    {
      title: "AIAdvisory",
      description:
        "Web3 app with AI-powered assistants tailored for Kenya. AgriBot provides crop advice, disease diagnosis, weather insights, and market prices in KES. LegalBot guides users on land rights, legal processes, and document preparation.",
      tech: ["React", "TypeScript", "AI/ML", "Web3.js"],
      live: "https://yhfsc-maaaa-aaaad-aawba-cai.icp1.io/",
      github: "https://github.com/mwihoti/kenyaAdvisoryServices",
    },
    {
      title: "RaffleGame",
      description:
        "Decentralized raffle platform with Civic authentication and embedded wallet. Ensures transparent winning mechanisms for users.",
      tech: ["Solidity", "React", "Civic", "Web3.js"],
      live: "https://human-rafflewith-nft.vercel.app/",
      github: "https://github.com/mwihoti/humanRafflewithCivic",
    },
    {
      title: "MathWhiz",
      description:
        "AI-powered math learning app for students aged 13–17. Provides adaptive practice, generates guided questions when mistakes occur, and saves progress to the database.",
      tech: ["React", "AI/ML", "PostgreSQL"],
      github: "https://github.com/mwihoti/educationapp",
    },
    {
      title: "GestureAI",
      description:
        "Real-time gesture recognition and sign language interpretation app using TensorFlow.js and Gemini AI.",
      tech: ["TensorFlow.js", "Gemini AI", "React"],
      github: "https://github.com/mwihoti/gesture-ai--gemini",
    },
    {
      title: "Meeting Insights Generator",
      description:
        "App that records meetings, transcribes them, and generates AI-powered summaries and insights.",
      tech: ["React", "Tailwind CSS", "Speech Recognition", "AI/ML"],
      live: "https://meeting-insights-generator.vercel.app/",
      github: "https://github.com/mwihoti/meeting-insights-generator",
    },
    {
      title: "Guess Game Fullstack DApp",
      description:
        "Deployed on Arbitrum Sepolia, this decentralized guessing game integrates smart contracts and Web3.js for on-chain gameplay.",
      tech: ["Solidity", "TypeScript", "React", "Hardhat", "Web3.js"],
      live: "https://arbitrum-guess-game.vercel.app/",
      github: "https://github.com/mwihoti/arbitrum-guess-game",
    },
    {
      title: "MemoryGame",
      badge: "StackUp Hackathon Top 10",
      description:
        "Award-winning interactive memory game built with Rust and Slint library. Ranked top 10 in StackUp Hackathon 2024.",
      tech: ["Rust", "Slint library"],
      github: "https://github.com/mwihoti/MemoryGame",
    },
  ];

  return (
    <section
      id="projects"
      className={`py-20 ${darkTheme ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-teal-600 dark:text-white">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            A selection of my recent work in AI, Web3, Bitcoin, Starknet, and full-stack applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              {/*{project.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )} */}
              <div className="p-6">
                {project.badge && (
                  <span className="inline-block mb-2 px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 rounded-full">
                    {project.badge}
                  </span>
                )}
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
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
                    >
                      <FaGithub className="h-5 w-5 mr-2" />
                      Code
                    </a>
                  )}
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
