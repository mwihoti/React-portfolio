import React from 'react';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import { AiFillGithub } from "react-icons/ai"
import { GoTriangleDown } from "react-icons/go";
import Switch from './Switch';
import resume from '../assets/DANIELEDWARDCV (1).pdf';
import { useTheme } from '../context/theme';
import me from '../assets/me.jpg';

export default function Profile() {

  const darkTheme = useTheme();

 
  return (
    <div >
      <section className={`min-h-screen flex  flex-col items-center justify-center py-20 ${darkTheme ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-gray-100'}`} >
      
        <div className='text-center p-10 '>
         <h2 className='text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl'>Daniel Edward Mwihoti </h2>
         <h3 className='text-2xl py-2 md:text-3xl dark:text-white'> Software developer</h3>
         <p className='text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl' >
         As a passionate Software Developer,I am continuously improving my skills  to deliver robust, user-centric web applications. I am a proficient developer capable of designing and developing web applications.

         Let's collaborate to turn complex problems into simple, elegant solutions.
          <br />
          
             </p>
             
          </div>
       
          <div className='flex flex-col items-center justify-center gap-10 py-3 '>
          <p className='text-md'>Join me below ! </p>
             <div className='text-5xl text-blue-600 dark:text-gray-200'>
            <a href='https://github.com/mwihoti' target='_blank'>
            <AiFillGithub className=''/>
            </a>
            </div>
          
            </div>
          <div className='relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-50 overflow-hidden'>
          <img src={me} alt='Daniel' className='w-full h-full objectfit-cover' />


          </div>
        </section>
    </div>
  )
}
