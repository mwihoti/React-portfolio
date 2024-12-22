import React from 'react';
import jsicon from '../assets/jsicon.png';
import devicon from '../assets/devicon.png';
import web from '../assets/web3.png';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div>
        <section className='py-20 px-4' id="about">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewPort={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx:auto space-y-8">
        <div className='text-center'>
            <h2 className='text-4xl py-2 font-bold dark:text-white'>About Me</h2>
            <p className="text-muted-foreground">Solution-oriented Full Stack Developer</p>

          </div>
          
          <div className='grid gap-6'>
          <div className="border rounded-lg shadow-md p-6 space-y-4 bg-white">
            <p className="text-gray-600 leading-relaxed">
              As a passionate Software Developer, I specialize in creating robust, user-centric web applications. With expertise in both front-end and back-end development, I bring a comprehensive approach to software development.
            </p>
            <p className="text-gray-600 leading-relaxed">
              My tech stack includes but is not limited to JavaScript, Node.js and its frameworks, Python, SQL/NoSQL databases, and Git. I also have experience in Machine Learning and AI, leveraging data-driven solutions to solve real-world problems.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Additionally, I have a strong understanding of Web3 technologies and enjoy building decentralized applications (dApps) that harness the power of blockchain to create innovative and secure solutions.
            </p>
          </div>

            <div className='text-center shadow-lg p-10 rounded-xl my-10 flex-1'>
              <div className='flex justify-center'>
                <img src={devicon} width={100} height={100} alt="React icon" />
              </div>
              <h3 className='text-lg font-medium pt-8 pb-2'>Website Development</h3>
              <p className='text-2xl'>
                Website development with React.js.
              </p>
              <p className='py-2'>
                My expertise with React, a JavaScript framework, has allowed me to build dynamic and interactive user interfaces.
              </p>
            </div>

            <div className='text-center shadow-lg p-10 rounded-xl my-10 flex-1'>
              <div className='flex justify-center'>
                <img src={web} width={100} height={100} alt="Web3 icon" />
              </div>
              <h3 className='text-lg font-medium pt-8 pb-2'>Web3</h3>
              <p className='text-2xl'>
              Utilizing Web3 to build decentralized applications.
              </p>
              <p className='py-2'>
                With Web3, I develop  decentralized applications (DApps) that operate on blockchain technology.
              </p>
            </div>
          </div>
        
    

          </motion.div>

          </section>
          </div>
  )
}
