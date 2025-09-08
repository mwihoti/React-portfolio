import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { delay, motion } from 'framer-motion';
import { useTheme } from '../context/theme';
import me from '../assets/me.jpg';
import Typewriter from 'typewriter-effect';
import './floatingElements.css'
export default function Profile() {
  const darkTheme = useTheme();

  return (
    <div>
      <section
        className={`min-h-screen flex flex-col items-center justify-center py-20 space-y-16 ${darkTheme ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gray-50'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-10 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto   flex  items-center justify-center overflow-hidden mb-8"
          >
            <div className='avatar'>
    <img
              src={me}
              objectFit="cover"
              layout="fill"
              alt="Daniel Edwardprof"
            />
            </div>
        
          </motion.div>
<div className='flex flex-col lg:flex-row justify-center items-center lg:space-x-48 space-y-8 lg:space-y-0'>

            <div className='floating-animation'>
              <h2 className="text-5xl  py-2 text-teal-900 font-medium  md:text-6xl">
                Daniel Edward Mwihoti
              </h2>
              <h3 className="text-2xl font-bold   py-2 md:text-3xl ">Software Developer,</h3>
              <p className="max-w-2xl font-bold mx-auto text-2xl text-gray-600 dark:text-gray-300 min-h">
                <Typewriter
                  options={{
                    strings: [
                      "Based in Nairobi, Kenya, I'm passionate about web development, Machine Learning, AI and Web3. Always learning."
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    deleteSpeed: 50,
                  }}
                />
              </p>
            </div>

            <div className='bg-gray-200 border-none  border-black  p-8 space-y-10 rounded-md floating-animation'>
               <text className='text font-bold text-lg '> 2+ <span className='text-indigo-500'>years</span> </text>
               <br/>
              <label className='text-lg font-bold'>Years of experience</label><br ></br>
              <text className='text text-lg font-bold  '> 15+ <span className='text-indigo-500'>Projects</span> </text>
              <br></br>
              <label className='space-y-3 font-bold text-lg'>Projects Completed</label>

            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center space-x-6"
        >
          <SocialLink href="https://github.com/mwihoti" icon={FaGithub} delay={0} />
          <SocialLink href="https://www.linkedin.com/in/daniel-mwihoti-3aaa652b9/" icon={FaLinkedin} delay={0.2} />
          <SocialLink href="mailto:danielmwihoti@gmail.com" icon={FaEnvelope} delay={0.4} />
        </motion.div>
                  <h3 className='text-blue-800 text-xl font-bold text'> 
                    
                    <Typewriter 
                    options={{
                      strings: ["Let's build something beautiful."],
                      autoStart: true,
                      loop: true,
                      delay: 80,
                      deleteSpeed: 50,
                    }}
                    />
                   </h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >

          <a
            href="#contact"
            className="inline-block bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </section>
    </div>
  );
}

function SocialLink({ href, delay = 0, icon: Icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: {delay, duration: 0.5},
        y: {
          delay: delay +  0.5,
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
      whileHover={{ scale: 1.2,
        y: -15,
        transition: { duration: 0.2}
       }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
    >
      <Icon className="h-8 w-8" />
    </motion.a>
  );
}
