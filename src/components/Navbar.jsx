import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, FileDown } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export default function Navbar() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const handleScroll = () => {
 // Only show this sticky navbar once user scrolls past hero (e.g. 500px down)
 setIsVisible(window.scrollY > 480);
 };
 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 if (!isVisible) return null;

 return (
 <header className="fixed top-0 left-0 right-0 z-50 pt-3 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-top-4 duration-300">
 <div className="max-w-7xl mx-auto">
 <nav 
 className="flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8DC] shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
 aria-label="Sticky Navigation"
 >
 {/* Logo with Green Badge */}
 <a href="#hero" className="flex items-center gap-2.5 group">
 <div className="w-8 h-8 rounded-xl bg-[#A3E635] flex items-center justify-center text-[#0D2B1D] font-extrabold text-xs shadow-sm">
 P
 </div>
 <div className="flex flex-col">
 <span className="font-extrabold text-[#0D2B1D] text-xs sm:text-sm tracking-normal leading-none">
 PADALINGAM S
 </span>
 <span className="text-[9px] font-semibold text-[#5B6D60] tracking-wider uppercase mt-0.5">
 AI ENGINEER
 </span>
 </div>
 </a>

 {/* Links */}
 <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#133E29]">
 <a href="#hero" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">Home</a>
 <a href="#about" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">About</a>
 <a href="#projects" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">Projects</a>
 <a href="#process" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">Process</a>
 <a href="#skills" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">Skills</a>
 <a href="#education" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">Education</a>
 <a href="#contact" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] tracking-normal">Contact</a>
 </div>

 {/* Right Action */}
 <div className="flex items-center gap-2">
 <a
 href="#contact"
 className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#0D2B1D] hover:bg-[#133E29] transition-all shadow-sm"
 >
 <span className="tracking-normal">Get In Touch</span>
 <span className="w-4 h-4 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0D2B1D]">
 <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
 </span>
 </a>

 <button
 type="button"
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="lg:hidden p-1.5 rounded-lg text-[#0D2B1D] hover:bg-[#F1F4ED]"
 aria-label="Toggle menu"
 >
 {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>
 </nav>

 {mobileMenuOpen && (
 <div className="lg:hidden mt-2 p-5 rounded-3xl bg-white text-[#0D2B1D] shadow-2xl border border-[#E2E8DC]">
 <div className="flex flex-col gap-2 font-bold text-xs tracking-normal">
 <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Home</a>
 <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">About</a>
 <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Projects</a>
 <a href="#process" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Process</a>
 <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Skills</a>
 <a href="#education" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Education</a>
 <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Contact</a>
 </div>
 </div>
 )}
 </div>
 </header>
 );
}
