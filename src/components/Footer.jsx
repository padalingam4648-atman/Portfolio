import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export default function Footer() {
 const currentYear = new Date().getFullYear();

 const scrollToTop = () => {
 window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 return (
 <footer className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E2E8DC]">
 <div className="rounded-[2.5rem] bg-[#0D2B1D] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
 
 {/* Brand */}
 <div className="flex flex-col items-center md:items-start text-center md:text-left">
 <div className="flex items-center gap-2.5 mb-2">
 <div className="w-8 h-8 rounded-xl bg-[#A3E635] text-[#0D2B1D] flex items-center justify-center font-extrabold text-sm">
 P
 </div>
 <span className="font-extrabold text-white text-lg">
 {personalInfo.name}
 </span>
 </div>
 <p className="text-xs text-stone-300 max-w-sm font-normal">
 Building intelligent solutions with AI, automation &amp; innovation.
 </p>
 </div>

 {/* Links & Socials */}
 <div className="flex items-center gap-3">
 <a
 href={personalInfo.contact.github}
 target="_blank"
 rel="noopener noreferrer"
 className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#A3E635] hover:text-[#0D2B1D] text-white flex items-center justify-center transition-colors"
 aria-label="GitHub Profile"
 >
 <Github className="w-4 h-4" />
 </a>

 <a
 href={personalInfo.contact.linkedIn}
 target="_blank"
 rel="noopener noreferrer"
 className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#A3E635] hover:text-[#0D2B1D] text-white flex items-center justify-center transition-colors"
 aria-label="LinkedIn Profile"
 >
 <Linkedin className="w-4 h-4" />
 </a>

 <a
 href="#contact"
 className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#A3E635] hover:text-[#0D2B1D] text-white flex items-center justify-center transition-colors"
 aria-label="Contact Me"
 >
 <Mail className="w-4 h-4" />
 </a>

 {/* Back to top button */}
 <button
 onClick={scrollToTop}
 className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors ml-2"
 >
 <span>Back to Top</span>
 <ArrowUp className="w-3.5 h-3.5 text-[#A3E635]" />
 </button>
 </div>

 </div>

 <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6A7B6E] font-semibold gap-2 text-center sm:text-left">
 <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
 <p>Engineered for High-Stakes Autonomous Systems</p>
 </div>
 </footer>
 );
}
