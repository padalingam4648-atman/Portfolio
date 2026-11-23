import React, { useEffect } from 'react';
import { X, ExternalLink, FileDown } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export default function ResumeModal({ isOpen, onClose }) {
 useEffect(() => {
 const handleKeyDown = (e) => {
 if (e.key === 'Escape') onClose();
 };

 if (isOpen) {
 document.body.style.overflow = 'hidden';
 window.addEventListener('keydown', handleKeyDown);
 }

 return () => {
 document.body.style.overflow = 'unset';
 window.removeEventListener('keydown', handleKeyDown);
 };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-y-auto animate-fadeIn"
 role="dialog"
 aria-modal="true"
 aria-labelledby="resume-modal-title"
 >
 {/* Backdrop */}
 <div
 onClick={onClose}
 className="fixed inset-0 bg-[#081A12]/80 backdrop-blur-md transition-opacity cursor-pointer"
 aria-hidden="true"
 />

 {/* Modal Card */}
 <div className="relative w-full max-w-4xl my-auto rounded-[2rem] bg-white border border-[#E2E8DC] shadow-2xl p-4 sm:p-6 z-10 max-h-[94vh] flex flex-col text-[#0D2B1D]">
 
 {/* Top Header Bar */}
 <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-[#F1F4ED]">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#133E29] uppercase">
 CURRICULUM VITAE · VERIFIED
 </span>
 </div>
 <h3 id="resume-modal-title" className="font-extrabold text-lg sm:text-2xl text-[#0D2B1D] leading-snug">
 {personalInfo.name} — Resume
 </h3>
 <p className="text-xs font-medium text-[#5B6D60] mt-0.5">
 AI Engineer &amp; Generative AI Developer · B.E. CSE (Cyber Security)
 </p>
 </div>

 <div className="flex items-center gap-2 shrink-0">
 {/* Download PDF button */}
 <a
 href="/resume.pdf"
 download="PADALINGAM_S_Resume.pdf"
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#A3E635] hover:bg-[#8CD818] text-[#0D2B1D] text-xs font-bold transition-all shadow-xs"
 title="Download Resume PDF"
 >
 <FileDown className="w-3.5 h-3.5" />
 <span className="hidden sm:inline">Download PDF</span>
 </a>

 {/* Open Full PDF in new tab */}
 <a
 href="/resume.pdf"
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1F4ED] hover:bg-[#E2E8DC] text-[#133E29] text-xs font-bold transition-colors"
 title="Open full PDF in new tab"
 >
 <ExternalLink className="w-3.5 h-3.5" />
 <span className="hidden sm:inline">Open PDF</span>
 </a>

 {/* Close Button */}
 <button
 type="button"
 onClick={onClose}
 className="p-1.5 sm:p-2 rounded-xl hover:bg-[#F1F4ED] text-[#5B6D60] hover:text-[#0D2B1D] transition-colors"
 aria-label="Close resume preview"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 </div>

 {/* Resume Preview Canvas / Image (Top-aligned so header & profile are immediately visible) */}
 <div className="my-3 overflow-y-auto max-h-[70vh] rounded-xl bg-[#F8FAF6] border border-[#E2E8DC] p-2 sm:p-4 flex flex-col items-center">
 <img
 src="/resume-preview.png"
 alt={`${personalInfo.name} Resume`}
 className="w-full max-w-2xl h-auto block rounded-lg shadow-sm border border-[#E2E8DC] shrink-0"
 />
 </div>

 {/* Bottom Details Row */}
 <div className="pt-3 border-t border-[#F1F4ED] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5B6D60]">
 <div className="flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
 <span className="font-semibold text-[#133E29]">Open to AI Engineer &amp; GenAI Roles</span>
 </div>

 <div className="flex items-center gap-2 text-xs font-semibold text-[#6A7B6E]">
 <span>Location: {personalInfo.contact.location}</span>
 </div>
 </div>

 </div>
 </div>
 );
}
