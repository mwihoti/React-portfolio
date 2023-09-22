import React from 'react';
import './App.css';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube, AiFillGithub } from "react-icons/ai"

import resume from './assets/DANIELEDWARDRESUME.pdf';
import jsicon from './assets/jsicon.png';
import devicon from './assets/devicon.png';
import web from './assets/web3.png';
import me from './assets/me.ico'
import { useState } from 'react';
import Contact from './components/contact'

function App() {
  
  const [darkMode, setDarkMode] = useState(false);

 
   
    
  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-900'>
      <section className='min-h-screen'>
        <nav className='py-10 mb-12 flex justify-between dark:text-white'>
          <h1 className='text-xl font-bold'>Daniel Mwihoti Portfolio</h1>
          <ul className='flex items-center'>
            <li>
              <BsFillMoonStarsFill
                onClick={() => setDarkMode(!darkMode)}
                className='cursor-pointer text-2xl'
               
              />
             </li>
            <li>
              <a className='bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8' href={resume} target="_blank"> 
              Resume</a></li>
          </ul>
        </nav>
        <div className='text-center p-10'>
         <h2 className='text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl'>Daniel Edward Mwihoti </h2>
         <h3 className='text-2xl py-2 md:text-3xl dark:text-white'> Frontend Developer</h3>
         <p className='text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl' >
          Freelancer providing services for programming and website development. Besides that 
          I love learning new things. I also have expertise on other areas like computer and hardware maintenance and troubleshooting. 
          I have cisco certifications for CCNA.
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
        <section>
          <div className='p-10 text-center'>
            <h3 className='text-4xl py-2 font-bold  dark:text-white'>About</h3>
            <p className='text-md text-center py-2 leading-8 text-gray-800 dark:text-gray-200'>
            As a frontend developer with expertise in React.js, JavaScript, 
            Tailwind CSS, Docker, Node.js, writing smart webs, and Bootstrap, I'm 
            excited to offer my services to help businesses 
            and individuals create stunning and functional web experiences

            </p>
            <p className='text-center text-md py-2 leading-8 text-gray-800 dark:text-gray-200'>
            I have specialized in React.js development, which allows me to build dynamic and interactive user interfaces. Whether you need a 
            single-page application or a complex web platform, I can bring your ideas to life.
            <hr/>
            I thrive on solving complex frontend challenges and finding innovative solutions. Your unique project
             requirements are opportunities for me to showcase my problem-solving skills.

             <hr/>
             In the ever-evolving world of web development, I'm committed to continuous learning. I stay updated with the latest trends
              and technologies to ensure that your projects are future-proof.

            </p>
            
          </div>
          <div  className='lg:flex gap-10'>
            <div className='text-center shadow-lg p-10 rounded-xl  my-10 dark:bg-white flex-1'> 
              <img src={jsicon} width={100} height={100}/>
              <h3 className='text-lg font-medium pt-8 pb-2'> Javascript</h3>
              <p className='py-2'>
                Creating dynamic and interactive website with javascript

              </p>
              <p className='py-2 '>
              
               With  Javascript I leverage its power to enhance 
               user experiences and add interactivity.
              </p>
            </div>
            <div className='text-center shadow-lg p-10 rounded-xl  my-10 dark:bg-white flex-1'> 
              <img src={devicon} width={100} height={100}  />
              <h3 className='text-lg font-medium pt-8 pb-2'> Website development</h3>
              <p className='py-2'>
                Website development with React.js

              </p>
              <p className='py-2'>
                My expertise with React which is a <span className='py-10 text-teal-500'>Javascript framework  </span> has allowed
                me to build dynamic and interactive user interfaces.
              </p>
            </div>
            <div className='text-center shadow-lg p-10 rounded-xl  my-10 dark:bg-white flex-1'> 
              <img src={web} width={100} height={100} />
              <h3 className='text-lg font-medium pt-8 pb-2'> Web 3</h3>
              <p className='py-2'>
                Using Web 3 to interact with with the Ethereum blockchain.

              </p>
              <p className='py-2'>
                With web3 I develop  user-friendly interfaces for token-related actions within their DApps.
              </p>
            </div>
            </div>
        </section>
        <section>
          <div className='p-10 text-center'>
            <p className='text-4xl  font-bold '> Skills</p>
            <p className='text-2xl'>I enjoy diving into and learning new things. Here's a list of
            technologies I have worked with.</p>

          </div>
          <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>HTML</p>
              </div>
              <div className='shadow-md   hover:scale-110 duration-500'>
                  <p className='my-4'>CSS</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>JAVASCRIPT</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>REACT</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>GITHUB</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>NODE JS</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>MONGO DB / MONGOOSE</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>EXPRESS</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>DOCKER</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>C+</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>BLOCKCHAIN</p>
              </div>
              <div className='shadow-md  hover:scale-110 duration-500'>
                  <p className='my-4'>VMWARE</p>
              </div>
          </div>
        </section>
        <section>
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8 w-full flex justify-center items-center flex-col'>
          <p className='text-4xl font-bold '>
            Work
          </p>
          <p className='py-6 text-2xl'>Check out some of my most recent work</p>
        </div>
{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {/* Grid Item */}
         
          <div
        
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className=' flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold  tracking-wider'>
              Stopwatch 
              </span>
              <p className='text-center py-3'>A stopwatch web application built with reactjs.</p>
              <div className='pt-8 text-center'>
                <a href='https://mwihoti-stopwatch-app.vercel.app/' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Website:
                  </button>
                </a>
                <a href='https://github.com/mwihoti/React-projects/tree/master/stopwatch-app' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
        
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className=' flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold  tracking-wider'>
                Planner Application
              </span>
              <p className='text-center py-3'>Helps users Plan  activites on the online calendar and a timer.
              It was developed using react.js
              </p>
              <div className='pt-8 text-center'>
                <a href='https://mwihoti-planner-77kta5spw-mwihoti.vercel.app/' target= "_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Website
                  </button>
                </a>
                <a href='https://github.com/mwihoti/React-projects/tree/master/kanban-app'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold  tracking-wider'>
                Kanban app
              </span>
              <p className='text-center py-3'>

                Kanban app helps you keep track plans and goals. Created with React.js
              </p>
              <div className='pt-8 text-center'>
                <a href='https://mwihoti-kanban-app.vercel.app/' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Website
                  </button>
                </a>
                <a href='https://github.com/mwihoti/React-projects/tree/master/kanban-app' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          </div>

        </div>
        </section>
        
        <section>
          {/* 
        <div className='flex text-center mx-auto  flex-col max-w-[600px]'>
            <div className='flex flex-col justify-center  items-center'>
                <p className='py-3 text-4xl font-bold text-center'>Contact</p>
                <p className=' py-4'>Send me a message</p>
            </div>

            <input className=' p-2 border-2 text-black' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 border-2 text-black ' type="email" placeholder='Email' name='email' />
            <textarea className=' p-2 border-2' name="message" rows="10" placeholder='Message'></textarea>
            <button className=' border-2 p-4 bg-cyan-500 py-3 my-8 mx-auto flex items-center rounded-full'>Send</button>

            
        </div>
      
        */}
          <Contact />

          </section>
        </main>
    </div>
  );
}

export default App;

