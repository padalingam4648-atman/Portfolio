import React, { useState } from 'react';
import { ArrowUpRight, FileDown, Menu, X, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import HolographicArmor from './ui/HolographicArmor';
import ResumeModal from './ui/ResumeModal';

export default function Hero() {
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [resumeModalOpen, setResumeModalOpen] = useState(false);

 return (
 <section id="hero" className="hero-section">
 
 {/* =========================================================================
 THE HERO CONTAINER (Cohesive spacing, high contrast, relaxed word spacing)
 ========================================================================= */}
 <div className="hero-card relative rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#091F14] via-[#0D2B1D] to-[#07160F] text-white p-4 sm:p-6 lg:p-6 xl:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(11,37,24,0.35)] border border-[#1E4D34]/50">
 
 {/* Ambient background glows */}
 <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
 <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#133E29]/60 blur-[130px]" />
 <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[#A3E635]/10 blur-[120px]" />
 <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#10B981]/15 blur-[140px]" />
 <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
 </div>

 {/* =========================================================================
 NAVBAR: FLOATING WHITE PILL INSIDE THE HERO
 ========================================================================= */}
 <nav 
 className="relative z-30 shrink-0 flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-[#0D2B1D] shadow-[0_10px_35px_rgba(0,0,0,0.18)] border border-[#E2E8DC]"
 aria-label="Main Hero Navigation"
 >
 {/* Logo with Green Badge */}
 <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
 <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#A3E635] flex items-center justify-center text-[#0D2B1D] font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
 P
 </div>
 <div className="flex flex-col">
 <span 
 className="font-extrabold text-[#0D2B1D] text-xs sm:text-sm leading-none"
 style={{ wordSpacing: '0.22em', letterSpacing: '0.015em' }}
 >
 PADALINGAM S
 </span>
 <span className="text-[9px] sm:text-[10px] font-semibold text-[#5B6D60] tracking-wider uppercase mt-0.5">
 AI ENGINEER
 </span>
 </div>
 </a>

 {/* Nav Links (Desktop) */}
 <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#133E29]">
 <a 
 href="#hero" 
 className="px-3.5 py-1.5 rounded-full bg-[#A3E635] text-[#0D2B1D] font-extrabold shadow-xs transition-colors"
 style={{ wordSpacing: '0.08em' }}
 >
 Home
 </a>
 <a href="#about" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] hover:text-[#0D2B1D] transition-colors" style={{ wordSpacing: '0.08em' }}>
 About
 </a>
 <a href="#projects" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] hover:text-[#0D2B1D] transition-colors" style={{ wordSpacing: '0.08em' }}>
 Projects
 </a>
 <a href="#process" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] hover:text-[#0D2B1D] transition-colors" style={{ wordSpacing: '0.08em' }}>
 Process
 </a>
 <a href="#skills" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] hover:text-[#0D2B1D] transition-colors" style={{ wordSpacing: '0.08em' }}>
 Skills
 </a>
 <a href="#education" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] hover:text-[#0D2B1D] transition-colors" style={{ wordSpacing: '0.08em' }}>
 Education
 </a>
 <a href="#contact" className="px-3.5 py-1.5 rounded-full hover:bg-[#F1F4ED] hover:text-[#0D2B1D] transition-colors" style={{ wordSpacing: '0.08em' }}>
 Contact
 </a>
 </div>

 {/* Right Action: High-Contrast Status Pill + Get In Touch Button */}
 <div className="flex items-center gap-2.5">
 {/* High-Contrast "Open for AI Roles" Chip */}
 <div 
 className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4EA] text-[#062413] border border-[#34D399] text-xs font-bold shadow-xs"
 style={{ wordSpacing: '0.12em' }}
 >
 <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
 <span>Open for AI Roles</span>
 </div>

 <a
 href="#contact"
 className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-[#0D2B1D] hover:bg-[#133E29] transition-all transform active:scale-95 shadow-sm"
 >
 <span style={{ wordSpacing: '0.14em', letterSpacing: '0.01em' }}>Get In Touch</span>
 <span className="w-5 h-5 rounded-full bg-[#A3E635] flex items-center justify-center text-[#0D2B1D]">
 <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
 </span>
 </a>

 {/* Mobile Menu Toggle */}
 <button
 type="button"
 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
 className="lg:hidden p-1.5 rounded-lg text-[#0D2B1D] hover:bg-[#F1F4ED]"
 aria-label="Toggle navigation"
 >
 {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
 </button>
 </div>
 </nav>

 {/* Mobile Dropdown */}
 {mobileMenuOpen && (
 <div className="relative z-40 lg:hidden p-5 rounded-3xl bg-white text-[#0D2B1D] shadow-2xl border border-[#E2E8DC]">
 <div className="flex flex-col gap-2 font-bold text-xs">
 <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl bg-[#A3E635] text-[#0D2B1D]">Home</a>
 <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">About</a>
 <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Projects</a>
 <a href="#process" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Process</a>
 <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Skills</a>
 <a href="#education" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Education</a>
 <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-[#F1F4ED]">Contact</a>
 </div>
 </div>
 )}

 {/* =========================================================================
 TWO-COLUMN HERO CONTENT (Left: Text & CTAs, Right: Neural Visual)
 ========================================================================= */}
 <div className="relative z-20 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-1 sm:py-2">
 
 {/* Left Column (7 cols): Titles, High-Contrast Pills, and Actions */}
 <div className="lg:col-span-7 flex flex-col items-start justify-center">
 
 {/* High-Contrast Category Pills (Bright mint text on deep forest green with vibrant border) */}
 <div className="flex flex-wrap gap-2 mb-2 sm:mb-2.5">
 {['AI Engineering', 'Generative AI & LLMs', 'Autonomous Agents'].map((pill) => (
 <span
 key={pill}
 className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#133E26] text-[#ECFDF5] border border-[#6EE7B7]/50 shadow-xs whitespace-nowrap"
 style={{ wordSpacing: '0.12em', letterSpacing: '0.01em' }}
 >
 {pill}
 </span>
 ))}
 </div>

 {/* Signature Headline with Responsive Clamped Font Scaling */}
 <h1 
 className="hero-headline font-extrabold text-white hero-vertical-gap max-w-2xl"
 style={{ wordSpacing: '0.16em', letterSpacing: '0.012em' }}
 >
 Building intelligent AI solutions,{' '}
 <span className="font-serif-italic font-normal text-[#BEF264] text-[1.12em]">
 built to be useful
 </span>
 </h1>

 {/* Subtitle paragraph */}
 <p 
 className="hero-paragraph text-stone-200 font-normal max-w-xl hero-vertical-gap"
 style={{ wordSpacing: '0.08em' }}
 >
 {personalInfo.intro}
 </p>

 {/* Dual CTAs (Lime Pill Button + Download Resume link) with Relaxed Spacing */}
 <div className="flex flex-wrap items-center gap-3 sm:gap-4 hero-vertical-gap">
 {/* Primary Lime Pill Button */}
 <a
 href="#projects"
 className="inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full btn-lime text-xs sm:text-sm font-extrabold shadow-xl shadow-[#A3E635]/25 group"
 >
 <span style={{ wordSpacing: '0.14em', letterSpacing: '0.01em' }}>Explore My Projects</span>
 <span className="w-6 h-6 rounded-full bg-[#0D2B1D] text-[#A3E635] flex items-center justify-center group-hover:rotate-45 transition-transform">
 <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
 </span>
 </a>

 {/* Secondary action: Resume Modal Trigger */}
 <button
 type="button"
 onClick={() => setResumeModalOpen(true)}
 className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-[#A3E635] transition-colors py-1.5 px-1 border-b border-white/40 hover:border-[#A3E635] focus:outline-none focus:ring-2 focus:ring-[#A3E635] focus:ring-offset-2 focus:ring-offset-[#0D2B1D] rounded-sm group cursor-pointer"
 aria-label="View Resume Preview"
 >
 <FileDown className="w-4 h-4 mr-1 text-[#A3E635] group-hover:scale-110 transition-transform" />
 <span style={{ wordSpacing: '0.14em', letterSpacing: '0.01em' }}>Resume</span>
 <ArrowUpRight className="w-3.5 h-3.5" />
 </button>
 </div>

 {/* Grounded, Honest Highlight Checkmarks */}
 <div className="mt-1 sm:mt-2 lg:mt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-300">
 <div className="flex items-center gap-2">
 <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3E635] shrink-0" />
 <span className="font-semibold text-stone-200 text-[11px] sm:text-xs" style={{ wordSpacing: '0.12em' }}>
 RAG &amp; Agent Projects
 </span>
 </div>
 <div className="flex items-center gap-2">
 <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3E635] shrink-0" />
 <span className="font-semibold text-stone-200 text-[11px] sm:text-xs" style={{ wordSpacing: '0.12em' }}>
 Python + FastAPI
 </span>
 </div>
 <div className="flex items-center gap-2">
 <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3E635] shrink-0" />
 <span className="font-semibold text-stone-200 text-[11px] sm:text-xs" style={{ wordSpacing: '0.12em' }}>
 Final-Year Student
 </span>
 </div>
 </div>

 </div>

 {/* Right Column (5 cols): Interactive 3D Holographic Robotic Armor */}
 <div className="lg:col-span-5 h-full flex flex-col justify-center items-center relative min-h-0 w-full">
 
 {/* Ambient subtle cyan-emerald holographic backlight */}
 <div className="absolute -inset-4 bg-gradient-to-tr from-[#00f0ff]/15 via-[#10B981]/20 to-[#0284c7]/25 rounded-[3rem] blur-2xl -z-10 opacity-70 pointer-events-none" />

 {/* Interactive 3D Holographic Armor Model */}
 <HolographicArmor />

 </div>

 </div>

 </div>

 {/* Resume Lightbox Modal */}
 <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
 </section>
 );
}
