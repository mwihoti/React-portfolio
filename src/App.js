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
  const theme = useContext(useTheme);  // Access the current theme state
  
  return (
    <div className={theme ? "dark" : ""}>
      <Navbar />
      <Profile />
    
      <About />  
      <Experience />
      <Skills />
      <Work />    
      <Contact />
    </div>
  );
}

export default App;
