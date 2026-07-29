"use client";

import Skills from "../src/components/skills";
import Work from "../src/components/work";
import Bots from "../src/components/bots";
import Profile from "../src/components/profile";
import About from "../src/components/about";
import Contact from "../src/components/contact";
import Footer from "../src/components/footer";
import Navbar from "../src/components/navbar";
import Experience from "../src/components/experience";
import ChatBot from "../src/components/ChatBot";
import VideoShowcase from "../src/components/video";
import { useTheme } from "../src/context/theme";
import { MotionConfig } from "framer-motion";

export default function Home() {
  const darkTheme = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <ChatBot />
      <div className={darkTheme ? "dark" : ""}>
        <div className="bg-white dark:bg-[#0a0a0f] transition-colors duration-300">
          <Navbar />
          <Profile />
          <VideoShowcase />
          <About />
          <Experience />
          <Skills />
          <Work />
          <Bots />
          <Contact />
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}
