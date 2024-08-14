import React from 'react';
import jsicon from '../assets/jsicon.png';
import devicon from '../assets/devicon.png';
import web from '../assets/web3.png';

export default function About() {
  return (
    <div>
        <section className='p-10 dark:bg-slate-900'>
          <div className='text-center'>
            <h3 className='text-4xl py-2 font-bold dark:text-white'>About</h3>
            <div className='text-center block text-xl mx-auto py-2 leading-8 text-gray-800 dark:text-gray-200'>
              As a Software Developer with expertise in <br/>
              <span className='font-bold text-teal-600 dark:text-teal-400'> React.js, JavaScript, Tailwind CSS, Docker, Nginx, Node.js, Python, FastAPI, MongoDB, NoSQL, MySQL, Rust, PostgreSQL, Postman, and Vite</span>.
              <br /> 
              I'm excited to offer my services to help businesses and individuals create stunning and functional web applications.
              
              I have specialized in React.js development, which allows me to build dynamic and interactive user interfaces.
             
              I thrive on solving complex challenges and finding innovative solutions.
              <br />
              Your unique project requirements are opportunities for me to showcase my problem-solving skills.
            </div>
          </div>
          
          <div className='lg:flex gap-10 justify-center dark:bg-slate-900'>
            <div className='text-center shadow-lg p-10 rounded-xl my-10 dark:text-white flex-1'>
              <div className='flex justify-center'>
                <img src={jsicon} width={100} height={100} alt="JavaScript icon" />
              </div>
              <h3 className='text-lg font-medium pt-8 pb-2'>JavaScript</h3>
              <p className='text-2xl'>
                Creating dynamic and interactive websites with JavaScript.
              </p>
              <p className='py-2'>
                With JavaScript, I leverage its power to enhance user experiences and add interactivity.
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
        </section>
    </div>
  )
}
