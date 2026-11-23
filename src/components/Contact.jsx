import React, { useState } from 'react';
import { Phone, Mail, MapPin, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import ResumeModal from './ui/ResumeModal';

export default function Contact() {
 const [copiedId, setCopiedId] = useState(null);
 const [resumeModalOpen, setResumeModalOpen] = useState(false);

 const handleCopy = (id, textToCopy) => {
 navigator.clipboard.writeText(textToCopy);
 setCopiedId(id);
 setTimeout(() => {
 setCopiedId(null);
 }, 2000);
 };

 const contactRows = [
 {
 id: 'phone',
 label: 'Phone',
 value: personalInfo.contact.phone,
 displayValue: personalInfo.contact.phone,
 href: `tel:${personalInfo.contact.phone.replace(/\s+/g, '')}`,
 isExternal: false,
 isLink: true,
 icon: Phone,
 },
 {
 id: 'email',
 label: 'Email',
 value: personalInfo.contact.email,
 displayValue: personalInfo.contact.email,
 href: `mailto:${personalInfo.contact.email}`,
 isExternal: false,
 isLink: true,
 icon: Mail,
 },
 {
 id: 'location',
 label: 'Location',
 value: personalInfo.contact.location,
 displayValue: personalInfo.contact.location,
 isLink: false,
 icon: MapPin,
 },
 {
 id: 'linkedin',
 label: 'LinkedIn',
 value: personalInfo.contact.linkedIn,
 displayValue: personalInfo.contact.linkedIn,
 href: personalInfo.contact.linkedIn,
 isExternal: true,
 isLink: true,
 icon: Linkedin,
 },
 {
 id: 'github',
 label: 'GitHub',
 value: personalInfo.contact.github,
 displayValue: personalInfo.contact.github,
 href: personalInfo.contact.github,
 isExternal: true,
 isLink: true,
 icon: Github,
 },
 ];

 return (
 <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Header */}
 <div className="mb-12">
 <div className="flex items-center gap-2 mb-3">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="text-xs font-bold tracking-widest text-[#133E29] uppercase">
 LET'S CONNECT
 </span>
 </div>

 <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D2B1D] tracking-tight leading-[1.12]">
 Have an idea?{' '}
 <span className="font-serif-italic font-normal text-[#133E29] text-[1.15em]">
 Let's build something intelligent.
 </span>
 </h2>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 
 {/* Left Column: Collaboration & Roles Overview (5 cols) */}
 <div className="lg:col-span-5 space-y-4">
 <div className="rounded-[2.5rem] bg-white border border-[#E2E8DC] p-7 sm:p-8 shadow-sm">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7EE] text-[#133E29] text-xs font-bold mb-4 border border-[#10B981]/20">
 <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
 <span>Available for Roles</span>
 </div>

 <h3 className="text-2xl font-extrabold text-[#0D2B1D] tracking-tight mb-3">
 Let's collaborate on AI &amp; Software Solutions
 </h3>

 <p className="text-sm text-[#5B6D60] leading-relaxed mb-6 font-normal">
 I'm actively seeking opportunities as an AI Engineer or Generative AI Developer. Whether you're exploring autonomous agent architectures, RAG pipelines, API microservices, or innovative AI applications, I'd love to connect.
 </p>

 <div className="pt-6 border-t border-[#F1F4ED] space-y-3">
 <div className="flex items-center justify-between text-xs">
 <span className="text-[#6A7B6E] font-semibold uppercase tracking-wider">Target Roles</span>
 <span className="font-bold text-[#0D2B1D]">AI Engineer / GenAI Developer</span>
 </div>
 <div className="flex items-center justify-between text-xs">
 <span className="text-[#6A7B6E] font-semibold uppercase tracking-wider">Location</span>
 <span className="font-bold text-[#0D2B1D]">{personalInfo.contact.location}</span>
 </div>
 <div className="flex items-center justify-between text-xs">
 <span className="text-[#6A7B6E] font-semibold uppercase tracking-wider">Response Time</span>
 <span className="font-bold text-[#133E29]">Within 24 Hours</span>
 </div>
 </div>

 <div className="mt-6 pt-5 border-t border-[#F1F4ED]">
 <button
 type="button"
 onClick={() => setResumeModalOpen(true)}
 className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0D2B1D] hover:bg-[#133E29] text-white text-xs sm:text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#133E29] focus:ring-offset-2 cursor-pointer"
 >
 <span>Resume</span>
 <ArrowUpRight className="w-4 h-4 text-[#A3E635]" />
 </button>
 </div>
 </div>
 </div>

 {/* Right Column: Contact Details Card (7 cols - same size and position as the old form card) */}
 <div className="lg:col-span-7">
 <div className="rounded-[2.5rem] bg-white border border-[#E2E8DC] p-7 sm:p-10 shadow-sm">
 
 <div className="mb-6">
 <h3 className="font-extrabold text-2xl text-[#0D2B1D]">
 Contact details
 </h3>
 <p className="text-xs sm:text-sm text-[#5B6D60] mt-1 font-normal">
 Reach me directly using any of these.
 </p>
 </div>

 {/* Rows */}
 <div className="space-y-3 sm:space-y-3.5">
 {contactRows.map((row) => {
 const Icon = row.icon;
 const isCopied = copiedId === row.id;

 return (
 <div
 key={row.id}
 className="rounded-2xl bg-[#F8FAF6] hover:bg-[#F0F4EC] border border-[#E2E8DC] p-3.5 sm:p-4 flex items-center justify-between gap-3.5 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 shadow-2xs group"
 >
 {/* Left: Icon Tile + Text Info */}
 <div className="flex items-center gap-3.5 min-w-0">
 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0">
 <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
 </div>

 <div className="min-w-0">
 <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#6A7B6E] block leading-none mb-1">
 {row.label}
 </span>

 {row.isLink ? (
 <a
 href={row.href}
 target={row.isExternal ? '_blank' : undefined}
 rel={row.isExternal ? 'noopener noreferrer' : undefined}
 className="font-bold text-[#0D2B1D] text-xs sm:text-sm hover:text-[#133E29] hover:underline focus:outline-none focus:ring-2 focus:ring-[#133E29] focus:ring-offset-1 rounded-sm transition-colors break-all block"
 >
 {row.displayValue}
 </a>
 ) : (
 <span className="font-bold text-[#0D2B1D] text-xs sm:text-sm break-all block">
 {row.displayValue}
 </span>
 )}
 </div>
 </div>

 {/* Right: Small Copy Icon Button */}
 <button
 type="button"
 onClick={() => handleCopy(row.id, row.value)}
 aria-label={`Copy ${row.label}: ${row.value}`}
 title={`Copy ${row.label}`}
 className="shrink-0 p-2 sm:px-2.5 sm:py-1.5 rounded-xl text-[#5B6D60] hover:text-[#0D2B1D] hover:bg-white border border-transparent hover:border-[#E2E8DC] focus:outline-none focus:ring-2 focus:ring-[#133E29] transition-all"
 >
 {isCopied ? (
 <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
 <Check className="w-3.5 h-3.5 stroke-[2.5]" />
 <span>Copied</span>
 </span>
 ) : (
 <Copy className="w-4 h-4" />
 )}
 </button>
 </div>
 );
 })}
 </div>

 {/* Below the rows: status line with green dot */}
 <div className="mt-6 pt-5 border-t border-[#F1F4ED] flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#133E29]">
 <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
 <span>Open to AI Engineer and Gen AI roles.</span>
 </div>

 </div>
 </div>

 </div>

 {/* Resume Lightbox Modal */}
 <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
 </section>
 );
}
