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
      <nav className='py-10 mb-12 flex justify-center  items-center bg-slate-200 dark:text-white'>
        <div className='flex '>
          <div className='p-2'>
  <h1 className='text-xl font-bold'>Daniel Mwihoti Portfolio</h1>
  </div>
 <div className='p-3 absolute right-0 '> <ul className='flex space-x-4'>
    <li><Switch  /></li>
    <li>
      <a className='bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md' href={'#'} target="_blank"> 
        Resume
      </a>
    </li>
  </ul>
  </div>
  </div>
</nav>

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
