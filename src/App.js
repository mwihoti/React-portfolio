import React, { useContext } from 'react';
import './App.css';
import Skills from './components/skills';
import Work from './components/work';
import Profile from './components/profile';
import About from './components/about';
import Contact from './components/contact';
import { useTheme } from './context/theme';
import Navbar from './components/navbar';
import  Experience  from './components/experience';

function App() {
  const darkTheme = useTheme();

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
      <Profile />
    
      <About />  
      <Experience />
      <Skills />
      <Work />    
      <Contact />
    </div>
    </div>
    
  );
}

export default App;
