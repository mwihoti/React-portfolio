import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "../context/theme";

export default function Work() {
  const darkTheme = useTheme();
  const projects = [
    {
      title: "AIAdvisory",
      description:
        "Web3 app with AI-powered assistants tailored for Kenya. AgriBot provides crop advice, disease diagnosis, weather insights, and market prices in KES. LegalBot guides users on land rights, legal processes, and document preparation.",
      tech: ["React", "TypeScript", "AI/ML", "Web3.js"],
      live: "https://yhfsc-maaaa-aaaad-aawba-cai.icp1.io/",
      github: "https://github.com/mwihoti/kenyaAdvisoryServices",
      image: "/projects/aiadvisory.png",
    },
    {
      title: "HomeElectronics",
      description:
        "E-commerce web app for electronics with Sanity CMS, dynamic product updates, image carousel, and smart pricing engine (0–15% discounts with real-time savings display).",
      tech: ["React", "Sanity CMS", "Tailwind CSS"],
      live: "https://home-of-electronics.vercel.app/",
      github: "https://github.com/mwihoti/home-electronics",
      image: "/projects/homeelectronics.png",
    },
    {
      title: "MuscleMind Gym",
      description:
        "Fitness platform recommending personalized workouts by body muscle group, helping users achieve fitness goals effectively.",
      tech: ["React", "Tailwind CSS", "Supabase"],
      live: "https://gymbuddy-39dwrsr7s-mwihotis-projects.vercel.app/",
      github: "https://github.com/mwihoti/musclemind-gym",
      image: "/projects/musclemind.png",
    },
    {
      title: "RaffleGame",
      description:
        "Decentralized raffle platform with Civic authentication and embedded wallet. Ensures transparent winning mechanisms for users.",
      tech: ["Solidity", "React", "Civic", "Web3.js"],
      live: "https://human-rafflewith-nft.vercel.app/",
      github: "https://github.com/mwihoti/humanRafflewithCivic",
      image: "/projects/rafflegame.png",
    },
    {
      title: "MathWhiz",
      description:
        "AI-powered math learning app for students aged 13–17. Provides adaptive practice, generates guided questions when mistakes occur, and saves progress to the database.",
      tech: ["React", "AI/ML", "PostgreSQL"],
      github: "https://github.com/mwihoti/educationapp",
      image: "/projects/mathwhiz.png",
    },
    {
      title: "GestureAI",
      description:
        "Real-time gesture recognition and sign language interpretation app using TensorFlow.js and Gemini AI.",
      tech: ["TensorFlow.js", "Gemini AI", "React"],
      github: "https://github.com/mwihoti/gesture-ai--gemini",
      image: "/projects/gestureai.png",
    },
    {
      title: "Meeting Insights Generator",
      description:
        "App that records meetings, transcribes them, and generates AI-powered summaries and insights.",
      tech: ["React", "Tailwind CSS", "Speech Recognition", "AI/ML"],
      live: "https://meeting-insights-generator.vercel.app/",
      github: "https://github.com/mwihoti/meeting-insights-generator",
      image: "/projects/meetinginsights.png",
    },
    {
      title: "Guess Game Fullstack DApp",
      description:
        "Deployed on Arbitrum Sepolia, this decentralized guessing game integrates smart contracts and Web3.js for on-chain gameplay.",
      tech: ["Solidity", "TypeScript", "React", "Hardhat", "Web3.js"],
      live: "https://arbitrum-guess-game.vercel.app/",
      github: "https://github.com/mwihoti/arbitrum-guess-game",
      image: "/projects/guessgame.png",
    },
    {
      title: "RemoteJob Platform",
      description:
        "Job platform with secure role-based access, optimized database queries, and smooth UX for recruiters and job seekers.",
      tech: ["React", "Tailwind CSS", "Prisma", "WorkOS"],
     // live: "https://remote-jobs-peach.vercel.app/",
      github: "https://github.com/mwihoti/remote-jobs",
      image: "/projects/remotejob.png",
    },
    {
      title: "MemoryGame",
      description:
        "Award-winning interactive memory game built with Rust and Slint library. Ranked top 10 in StackUp Hackathon 2024.",
      tech: ["Rust", "Slint library"],
      github: "https://github.com/mwihoti/MemoryGame",
      image: "/projects/memorygame.png",
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
            A selection of my recent work in AI, Web3, fullstack, and
            data-driven applications.
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
