import React from 'react';
import {
 Brain,
 Cpu,
 Sparkles,
 Database,
 Code2,
 Wrench,
 CheckCircle2,
 Bot,
 Layers,
 Workflow,
 Zap,
 Network,
 Share2,
 Terminal,
 Activity,
 Boxes,
 Binary,
 Compass,
 GitBranch,
 Github,
 Globe,
} from 'lucide-react';
import { skillsHeader, skillCategories } from '../data/skills';

// Category icon map for category headers
const CATEGORY_ICONS = {
 'ai-genai': Brain,
 frameworks: Cpu,
 'llm-platforms': Sparkles,
 'vector-stores': Database,
 programming: Code2,
 'developer-tools': Wrench,
};

// Recognizable technology vector logos for individual skill chips
function SkillLogo({ iconKey, className = 'w-3.5 h-3.5 shrink-0' }) {
 switch (iconKey) {
 // ------------------------------------------------------------------------
 // AI & GenAI
 // ------------------------------------------------------------------------
 case 'genai':
 return <Sparkles className={className} />;
 case 'llms':
 return <Brain className={className} />;
 case 'rag':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
 <polyline points="14 2 14 8 20 8" />
 <line x1="16" y1="13" x2="8" y2="13" />
 <line x1="16" y1="17" x2="8" y2="17" />
 <line x1="10" y1="9" x2="8" y2="9" />
 </svg>
 );
 case 'agents':
 return <Bot className={className} />;
 case 'prompt':
 return <Terminal className={className} />;
 case 'ml':
 return <Activity className={className} />;
 case 'embeddings':
 return <Binary className={className} />;
 case 'toolcalling':
 return <Zap className={className} />;

 // ------------------------------------------------------------------------
 // Frameworks & Libraries
 // ------------------------------------------------------------------------
 case 'langchain':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
 <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 );
 case 'langgraph':
 return <Network className={className} />;
 case 'fastapi':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2L3 14h7v8l9-12h-7z" />
 </svg>
 );
 case 'flask':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <path d="M9 3h6v3H9zM10 6v5.5L4.5 20a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L14 11.5V6" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 );
 case 'django':
 return (
 <span className="font-bold text-[10px] leading-none shrink-0 tracking-tighter">
 [dj]
 </span>
 );
 case 'react':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
 <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
 <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
 <circle cx="12" cy="12" r="1.5" />
 </svg>
 );
 case 'streamlit':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <polygon points="12,3 2,19 7,19 12,10 17,19 22,19" />
 </svg>
 );
 case 'restapi':
 return <Share2 className={className} />;

 // ------------------------------------------------------------------------
 // LLM Platforms & Models
 // ------------------------------------------------------------------------
 case 'openai':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <path d="M22.28 9.37a5.55 5.55 0 0 0-.47-4.47 5.7 5.7 0 0 0-3.85-2.8 5.64 5.64 0 0 0-4.66.72A5.6 5.6 0 0 0 9.17 2a5.7 5.7 0 0 0-4.7 3.32 5.57 5.57 0 0 0-2.8 3.86 5.67 5.67 0 0 0 .7 4.67 5.59 5.59 0 0 0-.46 4.47 5.7 5.7 0 0 0 3.85 2.8 5.64 5.64 0 0 0 4.66-.72 5.6 5.6 0 0 0 4.13.8 5.7 5.7 0 0 0 4.7-3.32 5.57 5.57 0 0 0 2.8-3.86 5.67 5.67 0 0 0-.7-4.66zM12 13.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z" />
 </svg>
 );
 case 'gemini':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" />
 </svg>
 );
 case 'groq':
 return (
 <span className="font-black text-[10px] leading-none shrink-0 tracking-tight">
 G&gt;
 </span>
 );
 case 'ollama':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <circle cx="8" cy="8" r="1.5" />
 <circle cx="16" cy="8" r="1.5" />
 <path d="M6 13c0 3.3 2.7 6 6 6s6-2.7 6-6H6z" />
 <path d="M9 4L8 6m7-2l1 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
 </svg>
 );
 case 'llama':
 return <Bot className={className} />;
 case 'qwen':
 return <Globe className={className} />;

 // ------------------------------------------------------------------------
 // Vector Stores & Retrieval
 // ------------------------------------------------------------------------
 case 'faiss':
 return <Boxes className={className} />;
 case 'chromadb':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <circle cx="6" cy="12" r="3" />
 <circle cx="12" cy="6" r="3" />
 <circle cx="18" cy="12" r="3" />
 <circle cx="12" cy="18" r="3" />
 </svg>
 );
 case 'pinecone':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <polygon points="12,2 4,9 12,16 20,9" />
 <polygon points="12,12 5,17 12,22 19,17" opacity="0.8" />
 </svg>
 );
 case 'weaviate':
 return <Layers className={className} />;
 case 'pgvector':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 <ellipse cx="12" cy="6" rx="8" ry="3" />
 <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
 <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
 </svg>
 );

 // ------------------------------------------------------------------------
 // Programming Languages
 // ------------------------------------------------------------------------
 case 'python':
 return (
 <svg className={className} viewBox="0 0 24 24" fill="currentColor">
 <path d="M11.9 2c-3.1 0-5 1.3-5 3.5v2.5h5v1H4.4C2.2 9 1 10.9 1 14s1.2 5 3.4 5H6v-2.5c0-2.2 1.9-3.5 5-3.5h5v-1h-5V9h7.5c2.2 0 3.5-1.9 3.5-5s-1.3-5-3.5-5h-1.6zm-1.4 1.8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 16.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
 </svg>
 );
 case 'javascript':
 return (
 <span className="font-black text-[10px] leading-none shrink-0 tracking-tight">
 JS
 </span>
 );

 // ------------------------------------------------------------------------
 // Developer Tools & Automation
 // ------------------------------------------------------------------------
 case 'git':
 return <GitBranch className={className} />;
 case 'github':
 return <Github className={className} />;
 case 'n8n':
 return <Workflow className={className} />;

 default:
 return <Compass className={className} />;
 }
}

// Single uniform skill chip component for every skill across all six cards
function SkillChip({ skill }) {
 return (
 <div
 tabIndex={0}
 className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-[#F1F4ED] text-[#133E29] hover:bg-[#E2E8DC] hover:-translate-y-0.5 transition-all select-none cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-1 shadow-2xs"
 >
 <SkillLogo iconKey={skill.iconKey} className="w-3.5 h-3.5 shrink-0 text-[#133E29]" />
 <span className="tracking-tight">{skill.name}</span>
 </div>
 );
}

export default function Skills() {
 const { eyebrow, heading, headingItalic, subtitle } = skillsHeader;

 return (
 <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Header */}
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
 <p className="mt-3 text-xs sm:text-sm text-[#5B6D60] max-w-xl font-normal leading-relaxed">
 {subtitle}
 </p>
 )}
 </div>

 {/* Grid of 6 Bento Skill Cards (All cards share the same clean styling) */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {skillCategories.map((category) => {
 const Icon = CATEGORY_ICONS[category.id] || Sparkles;

 return (
 <div
 key={category.id}
 className="rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group"
 >
 <div>
 {/* Header Row */}
 <div className="flex items-center gap-3.5 mb-4">
 {/* Uniform light icon tile across all cards */}
 <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0">
 <Icon className="w-5 h-5 stroke-[2]" />
 </div>
 <div>
 <span className="text-[10px] font-bold text-[#10B981] block leading-none mb-1">
 {category.step}
 </span>
 <h3 className="font-extrabold text-lg text-[#0D2B1D] leading-snug">
 {category.title}
 </h3>
 </div>
 </div>

 {/* Description */}
 <p className="text-xs text-[#5B6D60] mb-5 leading-relaxed font-normal min-h-[36px]">
 {category.description}
 </p>

 {/* Skill Chips with single uniform light style */}
 <div className="flex flex-wrap gap-2">
 {category.skills.map((skill) => (
 <SkillChip key={skill.name} skill={skill} />
 ))}
 </div>
 </div>

 {/* Card Footer */}
 <div className="mt-6 pt-4 border-t border-[#F1F4ED] flex items-center justify-between text-[11px] font-semibold text-[#6A7B6E]">
 <span className="font-medium">{category.skills.length} competencies</span>
 <div className="flex items-center gap-1.5 text-[#10B981]">
 <span className="text-[10px] font-bold">Active Stack</span>
 <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
 </div>
 </div>

 </div>
 );
 })}
 </div>

 </section>
 );
}
