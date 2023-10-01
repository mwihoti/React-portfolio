import React from 'react';


export default function Work() {
  return (
    <div>
        <section>
        <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8 w-full flex justify-center items-center flex-col'>
          <p className='text-4xl font-bold '>
            Work
          </p>
          <p className='py-6 text-2xl'>Check out some of my most recent work.</p>
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
              <p className='text-center py-3'>A stopwatch web application which I built using reactjs.</p>
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
              <p className='text-center py-3'>Helps users Plan  activites on an online calendar and a timer.
              I  developed it  using react.js
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
        
      
    </div>
  )
}
