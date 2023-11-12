import React from 'react';
import './App.css';
import Skills from './components/skills';
import Work from './components/work';
import Profile from './components/profile';
import About from './components/about';
import Contact from './components/contact'
import { useState } from 'react';

function App() {   
  const [darkMode, setDarkMode] = useState(false);
    
  return (
    <div className={darkMode ? "dark" : ""}>
           <Profile />
           <About />  
           <Skills />
           <Work/>    
          <Contact />
          </div>
        
  );
}

export default App;

