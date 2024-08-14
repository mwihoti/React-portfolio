import React from 'react';


export default function Work() {
  return (
    <div className='dark:bg-slate-900'>
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
        
            className='shadow-lg shadow-gray-700 dark:shadow-gray-400 group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className=' flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold  tracking-wider'>
              Stopwatch 
              </span>
              <p className='text-center py-3'>A stopwatch web application which I built using reactjs.</p>
              <div className='pt-8 text-center'>
                <a href='https://mwihoti-stopwatch-app.vercel.app/' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 border  font-bold text-lg'>
                    Website:
                  </button>
                </a>
                <a href='https://github.com/mwihoti/React-projects/tree/master/stopwatch-app' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 border font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
        
            className='shadow-lg shadow-gray-700 dark:shadow-gray-400 group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className=' flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold  tracking-wider'>
                Mood-Journal-Ai
              </span>
              <p className='text-center py-3'>
              Journal  your mood and get mood analysis with the help of AI
              </p>
              <div className='pt-8 text-center'>
                <a href='https://moodjournal-ai.vercel.app/' target= "_blank">
                  <button className='text-center rounded-lg px-4 py-3 m-2 border font-bold text-lg'>
                    Website
                  </button>
                </a>
                <a href='https://github.com/mwihoti/Moodjournal-AI.git'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 border font-bold text-lg'>
                    Code
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div
            
            className='shadow-lg shadow-gray-700 dark:shadow-gray-400 group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold  tracking-wider'>
               Neema Store
              </span>
              <p className='text-center py-3'>
              Ecommerce-React-application-with-stripe-Payment
                          
                Buy electronics online.
              </p>
              <div className='pt-8 text-center'>
                <a href=' https://ecommerce-react-application-with-stripe-payment.vercel.app' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 border font-bold text-lg'>
                    Website
                  </button>
                </a>
                <a href='https://github.com/mwihoti/Ecommerce-React-application-with-stripe-Payment.git' target='_blank'>
                  <button className='text-center rounded-lg px-4 py-3 m-2 border font-bold text-lg'>
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
