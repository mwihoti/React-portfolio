import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';

export default function About() {
  const darkTheme = useTheme();
  return (
    
        <section id="about" className={`py-20 ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:pg-8'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewPort={{ once: true }}
         
          className="text-center mb-16">
        
            <h2 className='text-4xl text-teal-600 mb-4 font-bold dark:text-white'>About Me</h2>
            </motion.div>
        
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0}}
          viewPort={{ once: true }}
          className='prose prose-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
              <div className='text-gray-600 dark:text-gray-300'>
              <p >
            As a passionate Software Developer, I specialize in creating scalable web applications
            and seamless user experiences. My expertise spans both front-end and back-end development,
            with a strong foundation in JavaScript, React, Node.js, and various database technologies.
          </p>
          <p>
            I'm constantly improving my skills to stay up-to-date with the latest technologies and best practices.
            My approach to problem-solving is solution-oriented, and I thrive in collaborative environments
            where I can contribute to innovative projects.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
            or sharing my knowledge through tech blogs and community events.
          </p>
          </div>

            </motion.div>
        
    

          
          </div>
          </section>
        
  )
}
