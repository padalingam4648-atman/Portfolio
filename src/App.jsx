import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechLogos from './components/TechLogos';
import About from './components/About';
import Projects from './components/Projects';
import ProcessBento from './components/ProcessBento';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import MediaGuild from './components/MediaGuild';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#122118] selection:bg-[#A3E635] selection:text-[#0D2B1D]">
      <Navbar />
      <main>
        <Hero />
        <TechLogos />
        <About />
        <Projects />
        <ProcessBento />
        <Skills />
        <Education />
        <Certifications />
        <MediaGuild />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
