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
              <p className='leading-8 text-xl font-bold mb-4'>
                I&apos;m a full-stack developer based in Nairobi, Kenya, with 3+ years of experience building scalable web applications, AI-powered tools, and blockchain systems. My work spans the MERN stack, TypeScript, Python, and Rust &mdash; from SaaS products to decentralized protocols.
              </p>
              <p className='leading-8 text-xl font-bold'>
                Over the past year I&apos;ve gone deep into Bitcoin development (secp256k1, SegWit, live transaction broadcasting), Starknet gaming with the Dojo framework, and Cardano ecosystem tooling. I&apos;m an open source contributor to IntersectMBO&apos;s lsm-tree Haskell library (production database for Cardano), the Cardano Foundation, and Bitcoin Core. I&apos;m also an active member of CardanoHubNBO &mdash; building on-chain games for the Nairobi blockchain community. If you have an idea to bring to life &mdash; from a landing page to a production DApp &mdash; I&apos;m available to collaborate.
              </p>
          </div>

            </motion.div>
        
    

          
          </div>
          </section>
        
  )
}
