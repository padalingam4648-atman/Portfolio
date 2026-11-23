import React from 'react';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { educationHeader, educationData } from '../data/education';

export default function Education() {
 const { eyebrow, heading, headingItalic, subtitle } = educationHeader;

 return (
 <section id="education" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Section Header */}
 <div className="mb-12">
 <div className="flex items-center gap-2 mb-3">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="text-xs font-bold tracking-widest text-[#133E29] uppercase">
 {eyebrow}
 </span>
 </div>

 <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D2B1D] tracking-tight leading-[1.12]">
 {heading}{' '}
 <span className="font-serif-italic font-normal text-[#133E29] text-[1.15em]">
 {headingItalic}
 </span>
 </h2>

 {subtitle && (
 <p className="mt-3 text-xs sm:text-sm text-[#5B6D60] max-w-2xl font-normal leading-relaxed">
 {subtitle}
 </p>
 )}
 </div>

 {/* Education Cards */}
 <div className="max-w-4xl mx-auto space-y-8">
 {educationData.map((edu) => (
 <div
 key={edu.id}
 className="rounded-[2.5rem] bg-white border border-[#E2E8DC] p-7 sm:p-10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
 >
 {/* Top Row: Degree, Institution, Duration & Status */}
 <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-6">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-2xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0 mt-0.5">
 <GraduationCap className="w-6 h-6 stroke-[2]" />
 </div>
 <div>
 <h3 className="font-extrabold text-2xl sm:text-3xl text-[#0D2B1D] leading-tight">
 {edu.degree}
 </h3>
 <div className="text-sm sm:text-base font-bold text-[#10B981] mt-1">
 {edu.department}
 </div>

 {/* Prominent Institution & Secondary University Affiliation */}
 <div className="mt-3 pt-3 border-t border-[#F1F4ED]">
 <div className="text-base sm:text-lg font-bold text-[#133E29]">
 {edu.institution}
 </div>
 <div className="text-xs font-semibold text-[#6A7B6E] mt-0.5">
 Affiliated to {edu.university}
 </div>
 </div>
 </div>
 </div>

 {/* Duration and Status Pill */}
 <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2.5 shrink-0 pt-2 sm:pt-0">
 <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6A7B6E]">
 <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
 <span>{edu.duration}</span>
 </div>
 <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#EBF7EE] text-[#133E29] border border-[#10B981]/30">
 {edu.status}
 </span>
 </div>
 </div>

 {/* Divider */}
 <div className="border-t border-[#F1F4ED] my-6" />

 {/* Core Coursework & Technical Foundations */}
 <div className="mb-6">
 <span className="text-xs font-semibold uppercase tracking-wider text-[#6A7B6E] font-bold block mb-3.5">
 {edu.courseworkHeading}
 </span>
 <div className="flex flex-wrap gap-2">
 {edu.coursework.map((course, idx) => (
 <span
 key={idx}
 className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#F1F4ED] text-[#133E29] hover:bg-[#E2E8DC] hover:-translate-y-0.5 transition-all cursor-default select-none shadow-2xs"
 >
 {course}
 </span>
 ))}
 </div>
 </div>

 {/* Divider */}
 <div className="border-t border-[#F1F4ED] my-6" />

 {/* Academic & Technical Highlights */}
 <div className="space-y-3">
 <span className="text-xs font-semibold uppercase tracking-wider text-[#6A7B6E] font-bold block mb-3.5">
 {edu.highlightsHeading}
 </span>
 <div className="space-y-3">
 {edu.highlights.map((highlight, idx) => (
 <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#0D2B1D]">
 <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
 <span className="leading-relaxed font-normal">{highlight}</span>
 </div>
 ))}
 </div>
 </div>

 </div>
 ))}
 </div>

 </section>
 );
}
