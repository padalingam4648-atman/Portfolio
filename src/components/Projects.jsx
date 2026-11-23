import React, { useState, useRef } from 'react';
import {
 ArrowUpRight,
 ChevronLeft,
 ChevronRight,
 Bot,
 Car,
 FileText,
 GraduationCap,
 Mail,
 Repeat,
 Users,
 Smartphone,
 Sparkles,
 ExternalLink,
 Github,
} from 'lucide-react';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';

// Dedicated icons for each of the 8 projects
const ICONS = {
 'graduated-autonomy-engine': Bot,
 'dealerdesk': Car,
 'ai-document-assistant-rag': FileText,
 'placement-mentor-ai': GraduationCap,
 'ai-career-email-agent': Mail,
 'agentic-loop-faq': Repeat,
 'alumni-hub': Users,
 'mobiadmin-remote-device-security': Smartphone,
};

// Rich atmospheric card gradients matching reference image
const CARD_BACKGROUNDS = {
 'graduated-autonomy-engine': 'linear-gradient(180deg, #0e3b26 0%, #092618 45%, #05140d 100%)',
 'dealerdesk': 'linear-gradient(180deg, #152d42 0%, #0c1c2a 45%, #060f17 100%)',
 'ai-document-assistant-rag': 'linear-gradient(180deg, #281a3d 0%, #180f26 45%, #0b0713 100%)',
 'placement-mentor-ai': 'linear-gradient(180deg, #11363a 0%, #0b2225 45%, #051214 100%)',
 'ai-career-email-agent': 'linear-gradient(180deg, #183b23 0%, #0f2617 45%, #07150c 100%)',
 'agentic-loop-faq': 'linear-gradient(180deg, #203b12 0%, #13240a 45%, #081204 100%)',
 'alumni-hub': 'linear-gradient(180deg, #123d34 0%, #0b2620 45%, #051512 100%)',
 'mobiadmin-remote-device-security': 'linear-gradient(180deg, #172642 0%, #0e182a 45%, #070c17 100%)',
};

// Custom decorative SVG art for each project card's upper visual area
function CardVisualArt({ projectId }) {
 switch (projectId) {
 case 'graduated-autonomy-engine':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <circle cx="140" cy="80" r="54" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
 <circle cx="140" cy="80" r="36" stroke="#A3E635" strokeWidth="2" opacity="0.8" />
 <circle cx="140" cy="80" r="16" fill="#10B981" fillOpacity="0.25" stroke="#A3E635" strokeWidth="2.5" />
 <path d="M60 80 L104 80 M176 80 L220 80 M140 26 L140 44 M140 116 L140 134" stroke="#A3E635" strokeWidth="1.5" strokeDasharray="4 2" />
 <circle cx="60" cy="80" r="5" fill="#A3E635" />
 <circle cx="220" cy="80" r="5" fill="#10B981" />
 <circle cx="140" cy="26" r="4" fill="#A3E635" />
 <circle cx="140" cy="134" r="4" fill="#10B981" />
 </svg>
 );

 case 'dealerdesk':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <path d="M50 120 A 90 90 0 0 1 230 120" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.6" />
 <path d="M75 120 A 65 65 0 0 1 205 120" stroke="#0284C7" strokeWidth="3" opacity="0.8" />
 <line x1="140" y1="120" x2="195" y2="75" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
 <circle cx="140" cy="120" r="10" fill="#38BDF8" />
 <rect x="100" y="35" width="80" height="24" rx="6" fill="#0284C7" fillOpacity="0.3" stroke="#38BDF8" strokeWidth="1.5" />
 <text x="140" y="51" textAnchor="middle" fill="#E0F2FE" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold">CRM v2.4</text>
 </svg>
 );

 case 'ai-document-assistant-rag':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <rect x="70" y="30" width="60" height="85" rx="6" fill="#A855F7" fillOpacity="0.15" stroke="#C084FC" strokeWidth="2" />
 <line x1="82" y1="50" x2="118" y2="50" stroke="#E9D5FF" strokeWidth="2.5" strokeLinecap="round" />
 <line x1="82" y1="65" x2="110" y2="65" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" />
 <line x1="82" y1="80" x2="115" y2="80" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" />
 <path d="M135 72 L165 72" stroke="#C084FC" strokeWidth="2" strokeDasharray="3 2" />
 <circle cx="195" cy="72" r="28" fill="#9333EA" fillOpacity="0.25" stroke="#E879F9" strokeWidth="2" />
 <text x="195" y="70" textAnchor="middle" fill="#F5D0FE" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold">FAISS</text>
 <text x="195" y="81" textAnchor="middle" fill="#F5D0FE" fontSize="8" fontFamily="'Plus Jakarta Sans', sans-serif">RAG</text>
 </svg>
 );

 case 'placement-mentor-ai':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <rect x="75" y="35" width="130" height="90" rx="8" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
 <path d="M85 45 L95 45 M85 45 L85 55" stroke="#2DD4BF" strokeWidth="2.5" />
 <path d="M195 45 L185 45 M195 45 L195 55" stroke="#2DD4BF" strokeWidth="2.5" />
 <path d="M85 115 L95 115 M85 115 L85 105" stroke="#2DD4BF" strokeWidth="2.5" />
 <path d="M195 115 L185 115 M195 115 L195 105" stroke="#2DD4BF" strokeWidth="2.5" />
 <circle cx="140" cy="72" r="22" stroke="#2DD4BF" strokeWidth="2" />
 <circle cx="140" cy="72" r="6" fill="#14B8A6" />
 <text x="140" y="112" textAnchor="middle" fill="#5EEAD4" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold">YOLO CV : 98%</text>
 </svg>
 );

 case 'ai-career-email-agent':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <rect x="80" y="45" width="120" height="70" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#34D399" strokeWidth="2" />
 <path d="M82 48 L140 92 L198 48" stroke="#34D399" strokeWidth="2" />
 <circle cx="140" cy="92" r="14" fill="#059669" stroke="#6EE7B7" strokeWidth="2" />
 <path d="M135 92 L138 95 L146 87" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
 <path d="M50 80 L76 80 M204 80 L230 80" stroke="#34D399" strokeWidth="2" strokeDasharray="3 3" />
 </svg>
 );

 case 'agentic-loop-faq':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <circle cx="140" cy="80" r="42" stroke="#A3E635" strokeWidth="2.5" strokeDasharray="14 6" opacity="0.9" />
 <circle cx="140" cy="38" r="7" fill="#A3E635" />
 <circle cx="182" cy="80" r="7" fill="#84CC16" />
 <circle cx="140" cy="122" r="7" fill="#65A30D" />
 <circle cx="98" cy="80" r="7" fill="#4D7C0F" />
 <text x="140" y="84" textAnchor="middle" fill="#D9F99D" fontSize="10" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="bold">LOOP</text>
 </svg>
 );

 case 'alumni-hub':
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <circle cx="90" cy="65" r="14" fill="#0D9488" fillOpacity="0.3" stroke="#2DD4BF" strokeWidth="2" />
 <circle cx="190" cy="65" r="14" fill="#0D9488" fillOpacity="0.3" stroke="#2DD4BF" strokeWidth="2" />
 <circle cx="140" cy="115" r="16" fill="#14B8A6" fillOpacity="0.4" stroke="#5EEAD4" strokeWidth="2.5" />
 <line x1="90" y1="65" x2="190" y2="65" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="4 3" />
 <line x1="90" y1="65" x2="140" y2="115" stroke="#2DD4BF" strokeWidth="2" />
 <line x1="190" y1="65" x2="140" y2="115" stroke="#2DD4BF" strokeWidth="2" />
 </svg>
 );

 case 'mobiadmin-remote-device-security':
 default:
 return (
 <svg className="w-full h-40 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" viewBox="0 0 280 160" fill="none">
 <rect x="105" y="32" width="70" height="96" rx="10" fill="#3B82F6" fillOpacity="0.15" stroke="#60A5FA" strokeWidth="2" />
 <line x1="125" y1="42" x2="155" y2="42" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
 <circle cx="140" cy="114" r="5" stroke="#93C5FD" strokeWidth="1.5" />
 <circle cx="140" cy="78" r="20" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
 <circle cx="140" cy="78" r="8" fill="#38BDF8" />
 </svg>
 );
 }
}

export default function Projects() {
 const [selectedProject, setSelectedProject] = useState(null);
 const scrollContainerRef = useRef(null);

 const scrollLeft = () => {
 if (scrollContainerRef.current) {
 scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
 }
 };

 const scrollRight = () => {
 if (scrollContainerRef.current) {
 scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
 }
 };

 return (
 <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Top Header Row with Heading & Carousel Left/Right Buttons */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
 <div>
 <div className="flex items-center gap-2 mb-3">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="text-xs font-bold tracking-widest text-[#133E29] uppercase">
 FEATURED PROJECTS &amp; CAPABILITIES
 </span>
 </div>

 <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D2B1D] tracking-tight leading-[1.12]">
 Everything your{' '}
 <span className="font-serif-italic font-normal text-[#133E29] text-[1.15em]">
 intelligent system
 </span>{' '}
 needs
 </h2>
 </div>

 {/* Right Controls: Subtitle + Chevron Scroll Arrows */}
 <div className="flex flex-col sm:items-end gap-3.5">
 <p className="text-xs sm:text-sm text-[#5B6D60] max-w-xs font-normal sm:text-right leading-relaxed">
 From risk-routed autonomy engines and local RAG to autonomous email agents.
 </p>

 <div className="flex items-center gap-2">
 <button
 type="button"
 onClick={scrollLeft}
 className="w-10 h-10 rounded-full border border-[#CBD5C5] hover:border-[#133E29] hover:bg-white text-[#133E29] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
 aria-label="Previous project"
 >
 <ChevronLeft className="w-5 h-5 stroke-[2]" />
 </button>
 <button
 type="button"
 onClick={scrollRight}
 className="w-10 h-10 rounded-full border border-[#CBD5C5] hover:border-[#133E29] hover:bg-white text-[#133E29] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
 aria-label="Next project"
 >
 <ChevronRight className="w-5 h-5 stroke-[2]" />
 </button>
 </div>
 </div>
 </div>

 {/* Horizontal Carousel of Tall Cards (Exact Match to Reference Image media_1795166017594_67ee354a.jpg) */}
 <div
 ref={scrollContainerRef}
 className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
 >
 {projects.map((project) => {
 const Icon = ICONS[project.id] || Sparkles;
 const bgStyle = CARD_BACKGROUNDS[project.id] || 'linear-gradient(180deg, #133E29 0%, #07170E 100%)';

 return (
 <div
 key={project.id}
 className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[360px] flex-shrink-0 snap-start rounded-[2rem] sm:rounded-[2.25rem] overflow-hidden relative flex flex-col justify-between p-6 sm:p-7 min-h-[490px] sm:min-h-[530px] border border-white/10 shadow-2xl group transition-all duration-300 hover:-translate-y-2 select-none"
 style={{ background: bgStyle }}
 >
 {/* Subtle Dot Matrix & Glow Overlay */}
 <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
 <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none group-hover:bg-white/10 transition-all duration-500" />

 {/* Bottom Gradient for Text Legibility (Matches Reference Image) */}
 <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none" />

 {/* Top Row: Pill Tag on Left + Circular White Icon on Right */}
 <div className="relative z-10 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-black/45 backdrop-blur-md text-white border border-white/20 tracking-wide">
 {project.badge || project.category}
 </span>
 {project.liveUrl && (
 <a
 href={project.liveUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#A3E635] text-[#0D2B1D] shadow-xs hover:scale-105 transition-transform"
 title="Open Live Host Application"
 >
 <span className="w-1.5 h-1.5 rounded-full bg-[#0D2B1D] animate-ping" />
 <span>Live Host</span>
 <ExternalLink className="w-2.5 h-2.5 stroke-[2.5]" />
 </a>
 )}
 </div>

 {/* White Round Icon Button on Right */}
 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0D2B1D] shadow-md group-hover:scale-105 transition-transform shrink-0">
 <Icon className="w-5 h-5 stroke-[2]" />
 </div>
 </div>

 {/* Center Decorative Visual Graphic */}
 <div className="relative z-10 my-auto py-2 flex items-center justify-center">
 <CardVisualArt projectId={project.id} />
 </div>

 {/* Bottom Content Area */}
 <div className="relative z-10 pt-2">
 {/* Title */}
 <h3 className="font-extrabold text-xl sm:text-2xl text-white mb-2 leading-snug group-hover:text-[#A3E635] transition-colors">
 {project.title}
 </h3>

 {/* Description */}
 <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-normal mb-5 line-clamp-3">
 {project.description}
 </p>

 {/* Actions: "Learn More ↗" Button (Exact Match to Reference Image) */}
 <div className="flex items-center gap-3">
 <button
 type="button"
 onClick={() => setSelectedProject(project)}
 className="inline-flex items-center gap-3 py-2.5 px-5 rounded-full bg-white hover:bg-[#A3E635] text-[#0D2B1D] text-xs sm:text-sm font-bold transition-all shadow-md group/btn cursor-pointer"
 >
 <span>Learn More</span>
 <span className="w-6 h-6 rounded-full bg-[#0D2B1D] text-white flex items-center justify-center group-hover/btn:scale-105 transition-transform">
 <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
 </span>
 </button>

 {/* Quick GitHub direct link button */}
 <a
 href={project.githubUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 hover:border-white/40 transition-colors shadow-xs"
 title="View GitHub Repository"
 aria-label={`View GitHub repository for ${project.title}`}
 >
 <Github className="w-4 h-4 stroke-[2]" />
 </a>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Project Detail Modal */}
 <ProjectModal
 project={selectedProject}
 isOpen={!!selectedProject}
 onClose={() => setSelectedProject(null)}
 />

 </section>
 );
}
