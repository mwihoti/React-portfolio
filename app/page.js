'use client';

import Skills from '../src/components/skills';
import Work from '../src/components/work';
import Bots from '../src/components/bots';
import Profile from '../src/components/profile';
import About from '../src/components/about';
import Contact from '../src/components/contact';
import Footer from '../src/components/footer';
import Navbar from '../src/components/navbar';
import Experience from '../src/components/experience';
import ChatBot from '../src/components/ChatBot';
import WhyHireMe from '../src/components/WhyHireMe';
import { useTheme } from '../src/context/theme';

export default function Home() {
  const darkTheme = useTheme();

  return (
    <>
      <ChatBot />
      <div className={darkTheme ? 'dark' : ''}>
        <div className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
          <Navbar />
          <Profile />
          <About />
          <Experience />
          <Skills />
          <Work />
          <Bots />
          <WhyHireMe />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}
