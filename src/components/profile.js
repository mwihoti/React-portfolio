import React from 'react';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import { AiFillGithub } from "react-icons/ai"
import { GoTriangleDown } from "react-icons/go";
import Switch from './Switch';
import resume from '../assets/DANIELEDWARDCV (1).pdf';


import me from '../assets/me.jpg'


export default function Profile() {
 
  return (
    <div >
      <section className='min-h-screen dark:bg-slate-900' >
        <nav className='py-10 mb-12 flex justify-between dark:text-white'>
          <h1 className='text-xl font-bold'>Daniel Mwihoti Portfolio</h1>
          <ul className='flex items-center'>
            <li><Switch /></li>
            
            <li>
              <a className='bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8' href={resume} target="_blank"> 
              Resume</a></li>
          </ul>
          
        </nav>
        <div className='text-center p-10 '>
         <h2 className='text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl'>Daniel Edward Mwihoti </h2>
         <h3 className='text-2xl py-2 md:text-3xl dark:text-white'> Frontend Developer</h3>
         <p className='text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl' >
         Are you looking to create a compelling and user-friendly website or 
         web application that captivates your audience? Look no further!
          Besides that 
          I love learning new things.
          <br />
           Join me below ! 
             </p>
            
          </div>
        
          <div className='text-5xl flex justify-center gap-10 py-3 text-blue-600 dark:text-gray-400'>
            
            <div>
            <a href='https://github.com/mwihoti' target='_blank'>
            <AiFillGithub />
            </a>
            </div>
            </div>
          <div className='relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 overflow-hidden'>
          <img src={me} alt='Daniel' className='w-full h-full objectfit-cover' />


          </div>
        </section>
    </div>
  )
}
