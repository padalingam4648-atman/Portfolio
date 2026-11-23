import React, { useState, useEffect } from 'react';
import {
 FileText,
 Award,
 Calendar,
 ExternalLink,
 Eye,
 X,
 Sparkles,
} from 'lucide-react';
import {
 certificationsHeader,
 researchPublicationsData,
 courseCertificationsData,
} from '../data/certifications';

// ============================================================================
// CERTIFICATE LIGHTBOX MODAL
// Displays the actual uploaded certificate image with responsive preview
// ============================================================================
function CertificateModal({ item, isOpen, onClose }) {
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

 if (!isOpen || !item) return null;

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto animate-fadeIn"
 role="dialog"
 aria-modal="true"
 aria-labelledby="cert-modal-title"
 >
 {/* Backdrop */}
 <div
 onClick={onClose}
 className="fixed inset-0 bg-[#081A12]/80 backdrop-blur-md transition-opacity cursor-pointer"
 aria-hidden="true"
 />

 {/* Modal Card */}
 <div className="relative w-full max-w-4xl my-auto rounded-[2rem] bg-white border border-[#E2E8DC] shadow-2xl p-5 sm:p-7 z-10 max-h-[92vh] flex flex-col justify-between text-[#0D2B1D]">
 
 {/* Top Bar */}
 <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F1F4ED]">
 <div className="pr-4">
 <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] block mb-1">
 {item.journal ? 'Research Publication Certificate' : 'Course Completion Certificate'}
 </span>
 <h3 id="cert-modal-title" className="font-extrabold text-lg sm:text-xl text-[#0D2B1D] leading-snug">
 {item.title}
 </h3>
 <p className="text-xs font-bold text-[#133E29] mt-0.5">
 {item.journal || (item.platform ? `${item.provider} · ${item.platform}` : item.provider)}
 </p>
 </div>

 <div className="flex items-center gap-2 shrink-0">
 {/* View Full Size Original Image */}
 <a
 href={item.certificateImage}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1F4ED] hover:bg-[#E2E8DC] text-[#133E29] text-xs font-bold transition-colors"
 title="Open full-resolution image in new tab"
 >
 <ExternalLink className="w-3.5 h-3.5" />
 <span className="hidden sm:inline">Full Size</span>
 </a>

 {/* Close Button */}
 <button
 type="button"
 onClick={onClose}
 className="p-2 rounded-xl hover:bg-[#F1F4ED] text-[#5B6D60] hover:text-[#0D2B1D] transition-colors"
 aria-label="Close certificate preview"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 </div>

 {/* Certificate Image View (Original Aspect Ratio Preserved) */}
 <div className="my-4 rounded-xl overflow-hidden bg-[#F8FAF6] border border-[#E2E8DC] p-2 sm:p-3 flex items-center justify-center">
 <img
 src={item.certificateImage}
 alt={`Certificate for ${item.title}`}
 className="max-h-[64vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
 />
 </div>

 {/* Bottom Details Row */}
 <div className="pt-3 border-t border-[#F1F4ED] flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#6A7B6E]">
 <div className="flex flex-wrap items-center gap-3">
 <span>Date: {item.date}</span>
 {item.volume && <span>· {item.volume}</span>}
 {item.doi && <span>· DOI: {item.doi}</span>}
 {item.paperId && <span>· Paper ID: {item.paperId}</span>}
 {item.certificateSerial && <span>· Serial: {item.certificateSerial}</span>}
 {item.code && <span>· Certificate Code: {item.code}</span>}
 {item.blockchainId && <span>· Blockchain ID: {item.blockchainId}</span>}
 </div>

 {item.doiUrl && (
 <a
 href={item.doiUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1 text-xs font-bold text-[#10B981] hover:underline"
 >
 <span>View Official DOI</span>
 <ExternalLink className="w-3.5 h-3.5" />
 </a>
 )}
 </div>

 </div>
 </div>
 );
}

// ============================================================================
// MAIN CERTIFICATIONS SECTION
// Subsection A: 4 Research Publications
// Subsection B: 4 Professional Course Certifications
// ============================================================================
export default function Certifications() {
 const [selectedItem, setSelectedItem] = useState(null);
 const { eyebrow, heading, headingItalic, subtitle } = certificationsHeader;

 return (
 <section id="certifications" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Main Section Header */}
 <div className="mb-14 sm:mb-16">
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

 {/* =====================================================================
 SUBSECTION A — RESEARCH PUBLICATIONS (4 Cards)
 ===================================================================== */}
 <div className="mb-16 sm:mb-20">
 
 {/* Subsection Header */}
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#E2E8DC]">
 <div>
 <span className="text-xs font-bold text-[#10B981] block mb-1 tracking-wider uppercase">
 {researchPublicationsData.subheading}
 </span>
 <p className="text-xs sm:text-sm text-[#5B6D60] font-normal">
 {researchPublicationsData.description}
 </p>
 </div>
 <span className="text-[11px] font-semibold text-[#6A7B6E] shrink-0">
 {researchPublicationsData.publications.length} peer-reviewed publications
 </span>
 </div>

 {/* 4-Card Grid on Desktop */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {researchPublicationsData.publications.map((pub) => (
 <div
 key={pub.id}
 className="rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
 >
 <div>
 {/* Card Top Row */}
 <div className="flex items-center justify-between mb-4">
 <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] group-hover:text-[#0D2B1D] transition-colors">
 <FileText className="w-5 h-5 stroke-[2]" />
 </div>
 <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6A7B6E]">
 <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
 <span>{pub.date}</span>
 </div>
 </div>

 {/* Number & Title */}
 <span className="text-[10px] font-bold text-[#10B981] block mb-1">
 PUBLICATION {pub.num}
 </span>
 <h4 className="font-extrabold text-base text-[#0D2B1D] mb-2 leading-snug group-hover:text-[#10B981] transition-colors">
 {pub.title}
 </h4>

 {/* Journal & Metadata */}
 <p className="text-xs font-bold text-[#133E29] mb-1">
 {pub.journal}
 </p>
 <p className="text-[11px] font-semibold text-[#6A7B6E] mb-3">
 {pub.volume}
 </p>

 {/* DOI or Paper ID */}
 {pub.doi && (
 <div className="mb-4">
 {pub.doiUrl ? (
 <a
 href={pub.doiUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] hover:underline"
 title="Open DOI external record"
 >
 <span className="truncate max-w-[200px]">DOI: {pub.doi}</span>
 <ExternalLink className="w-3 h-3 shrink-0" />
 </a>
 ) : (
 <span className="text-[11px] font-semibold text-[#6A7B6E]">
 DOI: {pub.doi}
 </span>
 )}
 </div>
 )}

 {pub.paperId && (
 <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
 Paper ID: {pub.paperId}
 </p>
 )}

 {pub.certificateSerial && (
 <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
 Serial: {pub.certificateSerial}
 </p>
 )}

 {/* Research Tags */}
 <div className="flex flex-wrap gap-1.5 mb-6">
 {pub.tags.map((tag) => (
 <span
 key={tag}
 className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F1F4ED] text-[#133E29]"
 >
 {tag}
 </span>
 ))}
 </div>
 </div>

 {/* Action Button: View Certificate */}
 <div className="pt-4 border-t border-[#F1F4ED]">
 <button
 type="button"
 onClick={() => setSelectedItem(pub)}
 className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAF6] hover:bg-[#133E29] hover:text-[#A3E635] text-[#133E29] border border-[#E2E8DC] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group/btn"
 >
 <Eye className="w-3.5 h-3.5" />
 <span>View Certificate</span>
 </button>
 </div>

 </div>
 ))}
 </div>
 </div>

 {/* =====================================================================
 SUBSECTION B — COURSES & CERTIFICATIONS (4 Cards)
 ===================================================================== */}
 <div>
 
 {/* Subsection Header */}
 <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-4 border-b border-[#E2E8DC]">
 <div>
 <span className="text-xs font-bold text-[#10B981] block mb-1 tracking-wider uppercase">
 {courseCertificationsData.subheading}
 </span>
 <p className="text-xs sm:text-sm text-[#5B6D60] font-normal">
 {courseCertificationsData.description}
 </p>
 </div>
 <span className="text-[11px] font-semibold text-[#6A7B6E] shrink-0">
 {courseCertificationsData.courses.length} verified programs
 </span>
 </div>

 {/* 4-Card Grid on Desktop */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {courseCertificationsData.courses.map((course) => (
 <div
 key={course.id}
 className="rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
 >
 <div>
 {/* Card Top Row */}
 <div className="flex items-center justify-between mb-4">
 <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] group-hover:text-[#0D2B1D] transition-colors">
 <Award className="w-5 h-5 stroke-[2]" />
 </div>
 <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6A7B6E]">
 <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
 <span>{course.date}</span>
 </div>
 </div>

 {/* Number & Title */}
 <span className="text-[10px] font-bold text-[#10B981] block mb-1">
 CERTIFICATION {course.num}
 </span>
 <h4 className="font-extrabold text-base text-[#0D2B1D] mb-2 leading-snug group-hover:text-[#10B981] transition-colors">
 {course.title}
 </h4>

 {/* Provider / Platform */}
 <p className="text-xs font-bold text-[#133E29] mb-1">
 {course.provider}
 </p>
 {course.platform && (
 <p className="text-[11px] font-semibold text-[#6A7B6E] mb-2">
 Platform: {course.platform}
 </p>
 )}

 {/* Certificate Code or Blockchain ID */}
 {course.code && (
 <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
 Code: {course.code}
 </p>
 )}

 {course.blockchainId && (
 <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
 Blockchain ID: {course.blockchainId}
 </p>
 )}

 {/* Skill Tags */}
 <div className="flex flex-wrap gap-1.5 mb-6">
 {course.skills.map((skill) => (
 <span
 key={skill}
 className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F1F4ED] text-[#133E29]"
 >
 {skill}
 </span>
 ))}
 </div>
 </div>

 {/* Action Button: View Certificate */}
 <div className="pt-4 border-t border-[#F1F4ED]">
 <button
 type="button"
 onClick={() => setSelectedItem(course)}
 className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAF6] hover:bg-[#133E29] hover:text-[#A3E635] text-[#133E29] border border-[#E2E8DC] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs group/btn"
 >
 <Eye className="w-3.5 h-3.5" />
 <span>View Certificate</span>
 </button>
 </div>

 </div>
 ))}
 </div>
 </div>

 {/* Certificate Image Lightbox Modal */}
 <CertificateModal
 item={selectedItem}
 isOpen={Boolean(selectedItem)}
 onClose={() => setSelectedItem(null)}
 />

 </section>
 );
}
