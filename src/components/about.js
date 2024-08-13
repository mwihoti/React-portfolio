import React from 'react';
import jsicon from '../assets/jsicon.png';
import devicon from '../assets/devicon.png';
import web from '../assets/web3.png';

export default function About() {
  return (
    <div>
        <section >
          <div className='p-10 text-center'>
            <h3 className='text-4xl py-2 font-bold  dark:text-white'>About</h3>
            <div className='text-center'>
            <p className=' text-center text-xl mx-auto py-2 leading-8 text-gray-800 dark:text-gray-200'>
            As a frontend developer with expertise in React.js, JavaScript, 
            Tailwind CSS, Docker, Node.js and writing smart webs.<br/> I'm 
            excited to offer my services to help businesses 
            and individuals create stunning and functional web applications<br/>

          
            I have specialized in React.js development, which allows me to build dynamic and interactive user interfaces.<br/> Whether you need a 
            single-page application or a complex web platform, I can bring your ideas to life.
            <br/>
            I thrive on solving complex frontend challenges and finding innovative solutions.<br/> Your unique project
             requirements are opportunities for me to showcase my problem-solving skills.

            </p>
            </div>
          </div>
          <div  className='lg:flex gap-10 dark:bg-slate-800'>
            <div className='text-center shadow-lg p-10 rounded-xl  my-10 dark:text-white flex-1'> 
              <img src={jsicon} width={100} height={100}/>
              <h3 className='text-lg font-medium pt-8 pb-2'> Javascript</h3>
              <p className='py-2 text-2xl'>
                Creating dynamic and interactive website with javascript

              </p>
              <p className='py-2 '>
              
               With  Javascript I leverage its power to enhance 
               user experiences and add interactivity.
              </p>
            </div>
            <div className='text-center shadow-lg p-10 rounded-xl  my-10  flex-1'> 
              <img src={devicon} width={100} height={100}  />
              <h3 className='text-lg font-medium pt-8 pb-2'> Website development</h3>
              <p className='py-2 text-2xl'>
                Website development with React.js

              </p>
              <p className='py-2 '>
                My expertise with React which is a <span className='py-10 text-teal-500'>Javascript framework  </span> has allowed
                me to build dynamic and interactive user interfaces.
              </p>
            </div>
            <div className='text-center shadow-lg p-10 rounded-xl  my-10  flex-1'> 
              <img src={web} width={100} height={100} />
              <h3 className='text-lg font-medium pt-8 pb-2'> Web 3</h3>
              <p className='py-2 text-2xl'>
                Using Web 3 to interact with with the Ethereum blockchain.

              </p>
              <p className='py-2'>
                With web3 I develop  user-friendly interfaces for token-related actions within their DApps.
              </p>
            </div>
            </div>
        </section>
      
    </div>
  )
}
