import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/experience';

export default function Experience() {
 return (
 <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Header */}
 <div className="mb-12">
 <div className="flex items-center gap-2 mb-3">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="text-xs font-bold tracking-widest text-[#133E29] uppercase">
 CAREER EXPERIENCE
 </span>
 </div>

 <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D2B1D] tracking-tight leading-[1.12]">
 Practical industry work,{' '}
 <span className="font-serif-italic font-normal text-[#133E29] text-[1.15em]">
 proven in action
 </span>
 </h2>
 </div>

 <div className="max-w-4xl mx-auto space-y-8">
 {experiences.map((exp) => (
 <div
 key={exp.id}
 className="rounded-[2.5rem] bg-white border border-[#E2E8DC] p-7 sm:p-10 shadow-sm relative overflow-hidden"
 >
 {/* Top row */}
 <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <h3 className="font-extrabold text-2xl text-[#0D2B1D]">
 {exp.company}
 </h3>
 <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7EE] text-[#133E29]">
 {exp.type}
 </span>
 </div>
 <div className="text-sm font-bold text-[#133E29]">
 {exp.role}
 </div>
 </div>

 <div className="flex flex-col sm:items-end text-xs font-semibold text-[#6A7B6E] gap-1">
 <div className="flex items-center gap-1.5">
 <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
 <span>{exp.period}</span>
 </div>
 <div className="flex items-center gap-1.5">
 <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
 <span>{exp.location}</span>
 </div>
 </div>
 </div>

 {/* Flagship Initiative Banner */}
 {exp.highlightProject && (
 <div className="mb-6 p-4 rounded-2xl bg-[#F8FAF6] border border-[#E2E8DC] flex items-center gap-3">
 <span className="w-8 h-8 rounded-xl bg-[#133E29] text-[#A3E635] flex items-center justify-center shrink-0">
 <Sparkles className="w-4 h-4" />
 </span>
 <div className="text-xs sm:text-sm">
 <span className="font-bold text-[#0D2B1D]">Flagship Initiative: </span>
 <span className="text-[#133E29] font-medium">{exp.highlightProject}</span>
 </div>
 </div>
 )}

 <p className="text-sm text-[#5B6D60] leading-relaxed mb-6 font-normal">
 {exp.description}
 </p>

 {/* Bullets */}
 <div className="space-y-3 mb-8">
 {exp.bullets.map((bullet, idx) => (
 <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0D2B1D]">
 <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
 <span>{bullet}</span>
 </div>
 ))}
 </div>

 {/* Tech chips */}
 <div className="pt-5 border-t border-[#F1F4ED] flex flex-wrap items-center gap-2">
 <span className="text-xs font-semibold text-[#6A7B6E] mr-2">Technologies:</span>
 {exp.technologies.map((t) => (
 <span
 key={t}
 className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F4ED] text-[#133E29]"
 >
 {t}
 </span>
 ))}
 </div>

 </div>
 ))}
 </div>

 </section>
 );
}
