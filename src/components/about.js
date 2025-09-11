import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/theme';

export default function About() {
  const darkTheme = useTheme();
  return (
    
        <section id="about" className={`py-20  w-full ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
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
          className='prose prose-lg w-full min-h  rounded-lg shadow-lg p-8'>
              <div className='text-gray-600 dark:text-gray-300 p-8 rounded  dark:bg-gray-800'>
              <p className='leading-8 text-xl font-bold'>
         I’m a software developer specializing in full-stack development. I bring ideas and innovations to life through code by building scalable web applications. I help startups grow and achieve their vision. My expertise includes the MERN stack, Next.js, JavaScript, and TypeScript, as well as Python for machine learning, data engineering, and backend development. Recently, I’ve been diving deeper into Web3 and AI.

If you have an idea you’d like to bring to life, or if you’re looking for development services—from a simple landing page to a full SaaS product—I’m available to collaborate.
          </p>
          </div>

            </motion.div>
        
    

          
          </div>
          </section>
        
  )
}
