import React, { useContext } from 'react';
import './App.css';
import Skills from './components/skills';
import Work from './components/work';
import Profile from './components/profile';
import About from './components/about';
import Contact from './components/contact';

import { ThemeContext } from './context/theme';

function App() {
  const theme = useContext(ThemeContext);  // Access the current theme state
  
  return (
    <div className={theme ? "dark" : ""}>
   
      <Profile />
      <About />  
      <Skills />
      <Work />    
      <Contact />
    </div>
  );
}

export default App;
