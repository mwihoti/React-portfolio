import React from 'react'
import { useTheme, useThemeUpdate } from '../context/theme';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar() {

    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Contacts'];


  return (
    <nav className='fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 dark:bg-gray-900/80 backdrop-blur-sm'>
    <div className='max-w-7xl mx-auto px4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
            <motion.div
                initial={{ opacity: 0, x: -20}}
                animate={{ opacity: 1, x: 0}}
                className='flex-shrink-0'
                >
                    <a href='#' className='text-2xl font-bold text-teal-600 dark:text-teal-400'>
                     DM   
                    </a>
                </motion.div>

                <div className='hidden md:block'>
                    <div className='ml-10 flex items-center space-x-4'>
                        {navItems.map((item, index) => (
                          <motion.a 
                          key={item}
                          href={`#${item.toLowerCase()}`}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0}}
                          transition={{delay: index * 0.1 }}
                          className='text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium'
                        >
                            {item}
                        </motion.a>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'>
                                {darkTheme ? (
                                    <FaSun className='h-5 w-5 text-yellow-500'/>
                                ) : (
                                    <FaMoon className='h-5 w-5 text-yellow-700'/>

                                )}
                            </button>
                    </div>
                </div>
        </div>

    </div>

    </nav>
  );
}
