import React from 'react';

export default function Skills() {
  return (
    <div className='dark:bg-slate-900  py-12'>
        <section>
          <div className='p-10 text-center'>
            <p className='text-4xl font-bold  dark:text-teal-400 mb-6'>Skills</p>
            <p className='text-2xl text-gray-700 dark:text-gray-300'>I have experience with:</p>
          </div>
          <div className='max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center'>
              {[
                'Python', 'C', 'Javascript', 'Reactjs', 
                'Github', 'FastAPI', 'SQL/NOSQL', 'Express', 
                'web3 Zetachain', 'Rust', 'Nestjs', 'Tailwindcss', 'Docker', 'Nginx', 'Vite'
              ].map((skill) => (
                <div key={skill} className='shadow-lg bg-gradient-to-r from-teal-500 to-teal-400 dark:from-teal-600 dark:to-teal-500 hover:scale-105 hover:shadow-xl transition-transform duration-300 rounded-lg p-6'>
                  <p className='text-lg font-semibold text-white'>{skill}</p>
                </div>
              ))}
          </div>
        </section>
    </div>
  )
}
