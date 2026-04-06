import React from 'react';
import './App.css';
import Skills from './components/skills';
import Work from './components/work';
import Profile from './components/profile';
import About from './components/about';
import Contact from './components/contact';
import Footer from './components/footer';
import { useTheme } from './context/theme';
import Navbar from './components/navbar';
import Experience from './components/experience';
import CustomCursor from './components/CustomCursor';

function App() {
  const darkTheme = useTheme();

  return (
    <>
      <CustomCursor />
      <div className={darkTheme ? 'dark' : ''}>
        <div className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
          <Navbar />
          <Profile />
          <About />
          <Experience />
          <Skills />
          <Work />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
