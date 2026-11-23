import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Sparkles, Terminal, Code2, Bot, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

export default function About() {
 return (
 <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Top Section Tag with Green Dot */}
 <div className="flex items-center gap-2 mb-8">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="text-xs font-bold tracking-widest text-[#133E29] uppercase">
 {personalInfo.about.sectionTag}
 </span>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
 
 {/* Left Column: Rounded Profile Card (5 cols - stacks above text on mobile) */}
 <div className="lg:col-span-5">
 <div className="rounded-[2.5rem] bg-white border border-[#E2E8DC] p-5 shadow-lg relative">
 
 {/* Photo frame: matching border-radius and overflow-hidden to eliminate stray corner arcs */}
 <div className="relative rounded-[2rem] overflow-hidden aspect-[4/4.5] mb-4">
 <img
 src="/profile.jpg"
 alt={personalInfo.name}
 className="w-full h-full object-cover object-top rounded-[2rem] hover:scale-105 transition-transform duration-500"
 />

 <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

 <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
 <div>
 <span className="text-xs font-bold block">{personalInfo.name}</span>
 <span className="text-[10px] font-semibold text-[#A3E635]">{personalInfo.about.roleLabel}</span>
 </div>
 {/* Final-Year Student Badge (replaces old Verified badge) */}
 <div className="flex items-center gap-1.5 text-[10px] bg-black/40 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-semibold text-white">
 <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635] shrink-0" />
 <span>{personalInfo.about.photoBadge}</span>
 </div>
 </div>
 </div>

 {/* Social Icons row */}
 <div className="flex items-center justify-between pt-1">
 <div className="flex items-center gap-2">
 <a
 href={personalInfo.contact.github}
 target="_blank"
 rel="noopener noreferrer"
 className="w-9 h-9 rounded-xl bg-[#F1F4ED] hover:bg-[#A3E635] hover:text-[#0D2B1D] text-[#133E29] flex items-center justify-center transition-colors"
 aria-label="GitHub Profile"
 >
 <Github className="w-4 h-4" />
 </a>

 <a
 href={personalInfo.contact.linkedIn}
 target="_blank"
 rel="noopener noreferrer"
 className="w-9 h-9 rounded-xl bg-[#F1F4ED] hover:bg-[#A3E635] hover:text-[#0D2B1D] text-[#133E29] flex items-center justify-center transition-colors"
 aria-label="LinkedIn Profile"
 >
 <Linkedin className="w-4 h-4" />
 </a>

 <a
 href="#contact"
 className="w-9 h-9 rounded-xl bg-[#F1F4ED] hover:bg-[#A3E635] hover:text-[#0D2B1D] text-[#133E29] flex items-center justify-center transition-colors"
 aria-label="Send Message"
 >
 <Mail className="w-4 h-4" />
 </a>
 </div>

 <div className="text-xs font-semibold text-[#6A7B6E]">
 @padalingam4648-atman
 </div>
 </div>

 </div>
 </div>

 {/* Right Column: First-Person Story + Hierarchy + Action Buttons (7 cols) */}
 <div className="lg:col-span-7 flex flex-col items-start">
 
 {/* Large Statement (subordinate to hero headline, accent word in italic serif) */}
 <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#122118] leading-[1.3] mb-5 tracking-tight">
 {personalInfo.about.statementPrefix}
 <span className="font-serif-italic font-normal text-[#15803D] text-[1.14em]">
 {personalInfo.about.statementAccent}
 </span>
 {personalInfo.about.statementSuffix}
 </h2>

 {/* Supporting Paragraph (High contrast WCAG AA compliant on off-white, 3-4 lines) */}
 <p className="text-sm sm:text-base text-[#2D3F33] leading-relaxed font-normal mb-8 max-w-2xl">
 {personalInfo.about.supportingParagraph}
 </p>

 {/* Action CTAs: Explore My Projects + Get In Touch unchanged */}
 <div className="flex flex-wrap items-center gap-4">
 <a
 href="#projects"
 className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full btn-lime text-xs sm:text-sm font-bold shadow-md shadow-[#A3E635]/25 group"
 >
 <span>Explore My Projects</span>
 <span className="w-5 h-5 rounded-full bg-[#0D2B1D] text-[#A3E635] flex items-center justify-center group-hover:rotate-45 transition-transform">
 <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
 </span>
 </a>

 <a
 href="#contact"
 className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#133E29] hover:text-[#0D2B1D] border-b-2 border-[#133E29]/20 hover:border-[#133E29] pb-0.5 transition-all"
 >
 <span>Get In Touch</span>
 <ArrowUpRight className="w-4 h-4" />
 </a>
 </div>

 </div>

 </div>
 </section>
 );
}
