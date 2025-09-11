import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';


export default function Experience() {
  const darkTheme = useTheme();

  const experiences = [
      { 
    title: "Full-Stack Developer",
    company: "Freelancer  - Remote",
    period: "2024 - Present",
    description: [
      "Designed, developed, and deployed a Guess Game DApp on Arbitrum Sepolia with on-chain gameplay mechanics to boost user engagement",
      "Created a Memory Game using Rust and the Slint library, ranking in the top 10 at the StackUp August 2024 Hackathon for innovation and code quality",
      "Architected and built a PYUSD dApp with an integrated blockchain explorer and marketplace for PYUSD on Ethereum, leveraging GCP’s Blockchain Node Engine for enterprise-grade performance",
      "Developed HumanRaffle, a decentralized raffle platform with Civic Auth verification, on-chain ETH payments, NFT ticketing, dynamic prize pools, and a responsive UI (Next.js 14, Tailwind, shadcn/ui, wagmi, Framer Motion)",
      "Built the Kenyan AI Advisory Project on the Internet Computer (ICP) using Motoko, TypeScript, React, and ICP canisters, deploying AI-powered chatbots for agriculture and legal aid integrated with llama3 LLM agents",
          "Created WorldView Blog, a platform for movies, global news, and football updates, built with React and Hashnode to deliver engaging content and smooth user experience"

    ]
  },
  { 
  title: "Data Analyst & Engineer ",
  company: "Remote - FaithTech",
  period: "August - September 2025",
  description: [
    "Developed a comprehensive data analysis and visualization to understand participant demographics, technology access, and course preferences using pandas and matplotlib",
    "Created demographic insights with pie charts, bar charts, KDE plots, and multi-panel dashboards to guide program planning, diversity tracking, and curriculum design",
    "Built a robust ETL pipeline to standardize messy survey data from multiple CSVs into clean, analysis-ready datasets",
    "Implemented regex-based mapping to convert unstructured technology responses into a structured Yes/No matrix for 40+ tools (e.g., Python, Zoom, Microsoft 365)",
    "Standardized demographics (church denominations, education levels, location data) across datasets and automated merging via email identifiers",
    "Delivered consolidated outputs including CSVs, Excel reports, and LaTeX-generated PDFs for reporting and decision-making",
    "Enabled advanced analytics preparation including clustering, statistical profiling, and exploratory data analysis for participant segments"
  ]
},

    { 
      title: "Backend Developer Intern",
      company: "HNG",
      period: "April 2024 - August 2024",
      description: [
        "Contributed to scalable backend systems using Node.js, Express.js, and PostgreSQL",
        "Optimized APIs for performance and reliability in an Agile team environment",
        "Reached Stage 5 certification, showcasing advanced technical skills"
      ]
    },
  {
    title: "Fullstack Developer",
    company: "KejaSpace",
    period: "May 2024 - July 2024",
    description: [
      "Designed and developed responsive web applications using React.js and Node.js, enhancing system efficiency and user satisfaction",
      "Implemented secure role-based access control to strengthen authentication and authorization",
      "Redesigned the real estate platform UI with React.js and Tailwind CSS, improving navigation and usability",
      "Improved mobile responsiveness, boosting user engagement across devices",
      "Collaborated with backend teams to optimize API endpoints and improve data accuracy"
    ]
  },
  {
    title: "Business Systems Administrator Intern",
    company: "KTDA, Nairobi, Kenya",
    period: "May 2023 - September 2023",
    description: [
      "Installed and configured the Pesa-Ulipo app on KTDA Wizarpos for seamless financial integration",
      "Assisted in network configuration and maintenance, ensuring system reliability",
      "Debugged and resolved issues in Microsoft Dynamics NAV, improving system performance",
      "Utilized SQL to analyze large datasets, identify trends, and generate actionable insights that supported decision-making and improved operational efficiency"
      ]
    }
  ];

  return (
    <section id="experience" className={`py-20 ${darkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:pg-8'>
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'>
            <h2 className='text-4xl text-teal-600 mb-4 font-bold dark:text-white'>Experience</h2>

          </motion.div>
          <div className='space-y-12'>
            {experiences.map((exp, index) => (
              <motion.div
              initial={{opacity: 0, x: -20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.2}}
              className='bg-white dark:text-gray-300  dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h3 className='text-2xl text-teal-600 font-bold'>{exp.title}</h3>
                <p className='text-lg text-gray-600 dark:text-gray-400 mt-2'>{exp.company}</p>
                <p className='text-lg text-gray-500 dark:text-gray-500 mt-2'>{exp.period}</p>
                <ul className='mt-4 space-y-2'>
                  {exp.description.map((item, i) => (
                    <li key={i} className='flex items-start'>
                      <span className='h-6 flex items-center'>
                        <span className='relative w-3 h-3  rounded-full bg-teal-500 dark:teal-400 mr-3 ' />
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{item}</span>

                    </li>
                  ))}
                </ul>

              </motion.div>
            )) }
          </div>
        </div>

      </section>
  )
}
