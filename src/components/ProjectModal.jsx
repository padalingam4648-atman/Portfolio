import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ShieldCheck, CheckCircle2, ArrowRight, Layers, Cpu, Code2 } from 'lucide-react';
import ProjectThumbnail from './ui/ProjectThumbnails';

export default function ProjectModal({ project, isOpen, onClose }) {
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

 if (!isOpen || !project) return null;

 return (
 <AnimatePresence>
 <div 
 className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto"
 role="dialog"
 aria-modal="true"
 aria-labelledby="modal-title"
 >
 {/* Backdrop blur overlay */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="fixed inset-0 bg-[#081A12]/60 backdrop-blur-md transition-opacity"
 aria-hidden="true"
 />

 {/* Modal Window */}
 <motion.div
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 20 }}
 transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
 className="relative w-full max-w-3xl my-8 rounded-[2.5rem] bg-white border border-[#E2E8DC] shadow-2xl p-6 sm:p-10 z-10 max-h-[90vh] overflow-y-auto text-[#122118]"
 >
 {/* Top Bar */}
 <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#F1F4ED]">
 <div className="flex items-center gap-2">
 <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7EE] text-[#133E29] font-semibold">
 {project.category}
 </span>
 {project.badge && (
 <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F4ED] text-[#133E29]">
 {project.badge}
 </span>
 )}
 </div>

 <button
 onClick={onClose}
 className="p-2 rounded-full text-stone-400 hover:text-[#0D2B1D] hover:bg-[#F1F4ED] transition-colors"
 aria-label="Close modal"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 {/* Project Visual Header */}
 {project.visualType && (
 <div className="mt-5 rounded-2xl overflow-hidden shadow-inner border border-[#E2E8DC]">
 <ProjectThumbnail visualType={project.visualType} title={project.title} />
 </div>
 )}

 {/* Title & Tagline */}
 <div className="mt-6">
 <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#0D2B1D] leading-tight">
 {project.title}
 </h3>
 <p className="mt-2 text-sm sm:text-base text-[#133E29] font-semibold">
 {project.tagline}
 </p>
 </div>

 {/* Full Description */}
 <div className="mt-5 text-[#5B6D60] text-sm leading-relaxed space-y-3 font-normal">
 <p>{project.longDescription || project.description}</p>
 </div>

 {/* Problem Statement Box */}
 {project.problemStatement && (
 <div className="mt-6 p-4 rounded-2xl bg-[#F8FAF6] border border-[#E2E8DC]">
 <span className="text-xs font-semibold uppercase tracking-wider text-[#6A7B6E] font-bold block mb-1">
 The Engineering Challenge
 </span>
 <p className="text-sm text-[#0D2B1D] font-medium">
 {project.problemStatement}
 </p>
 </div>
 )}

 {/* Key Features */}
 {project.keyFeatures && (
 <div className="mt-6">
 <h4 className="text-xs font-semibold uppercase tracking-wider text-[#133E29] font-bold mb-3 flex items-center gap-2">
 <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
 <span>Key Technical Features</span>
 </h4>
 <ul className="grid grid-cols-1 gap-2">
 {project.keyFeatures.map((feat, idx) => (
 <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5B6D60] font-normal">
 <span className="w-1.5 h-1.5 rounded-full bg-[#133E29] mt-2 shrink-0" />
 <span>{feat}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 {/* Architecture / Execution Stages */}
 {project.architecture && (
 <div className="mt-6">
 <h4 className="text-xs font-semibold uppercase tracking-wider text-[#133E29] font-bold mb-3 flex items-center gap-2">
 <Layers className="w-4 h-4 text-[#133E29]" />
 <span>Architecture &amp; Pipeline Flow</span>
 </h4>
 <div className="space-y-2">
 {project.architecture.map((step, idx) => (
 <div key={idx} className="p-3 rounded-xl bg-[#F1F4ED] text-xs font-semibold text-[#0D2B1D]">
 {step}
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Tech Stack Chips */}
 <div className="mt-6 pt-5 border-t border-[#F1F4ED]">
 <span className="text-xs font-semibold uppercase tracking-wider text-[#6A7B6E] block mb-3 font-bold">
 Technologies &amp; Libraries
 </span>
 <div className="flex flex-wrap gap-2">
 {project.technologies.map((tech) => (
 <span
 key={tech}
 className="px-3 py-1 rounded-full text-xs font-bold bg-[#F1F4ED] text-[#133E29]"
 >
 {tech}
 </span>
 ))}
 </div>
 </div>

 {/* CTAs */}
 <div className="mt-8 pt-6 border-t border-[#F1F4ED] flex flex-wrap items-center justify-between gap-4">
 <div className="flex items-center gap-3">
 {project.githubUrl && (
 <a
 href={project.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-[#0D2B1D] bg-[#F1F4ED] hover:bg-[#E5EAE0] transition-colors"
 >
 <Github className="w-4 h-4" />
 <span>GitHub Repository</span>
 </a>
 )}

 {project.liveUrl && (
 <a
 href={project.liveUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#0D2B1D] btn-lime shadow-sm"
 >
 <span>Live Demo</span>
 <ExternalLink className="w-3.5 h-3.5" />
 </a>
 )}
 </div>

 <button
 onClick={onClose}
 className="px-4 py-2 rounded-full text-xs font-bold text-[#6A7B6E] hover:text-[#0D2B1D]"
 >
 Close Preview
 </button>
 </div>

 </motion.div>
 </div>
 </AnimatePresence>
 );
}
