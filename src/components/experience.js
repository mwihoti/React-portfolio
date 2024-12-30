import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';


export default function Experience() {
  const darkTheme = useTheme();

  const experiences = [
    {
      title: "Backend Developer Intern",
      company: "HNG",
      period: "May 2024 - August 2024",
      description: [
        "Contributed to scalable backend systems using Node.js, Express.js, and PostgreSQL",
        "Optimized APIs for performance and reliability in an Agile team environment",
        "Reached Stage 5 certification, showcasing advanced technical skills"
      ]
    },
    {
      title: "Fullstack Developer",
      company: "KejaSpace",
      period: "February 2024 - May 2024",
      description: [
        "Designed and developed responsive web applications using React.js and Node.js",
        "Implemented secure role-based access control",
        "Collaborated with backend teams to improve data accuracy"
      ]
    },
    {
      title: "Business Systems Administrator Intern",
      company: "KTDA",
      period: "May 2023 - September 2023",
      description: [
        "Installed Pesa-Ulipo app on KTDA Wizarpos",
        "Assisted in network configuration and maintenance",
        "Utilized SQL for data analysis and insights"
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
              className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
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
