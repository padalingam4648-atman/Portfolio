import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
 ArrowDown,
 CheckCircle2,
 Layout,
 Server,
 Cpu,
 Database,
 Terminal as TerminalIcon,
} from 'lucide-react';
import { processData } from '../data/process';

// ============================================================================
// ANIMATED DEVELOPER TERMINAL (Card 03)
// Types generic developer commands and shows run output with zero invented numbers
// ============================================================================
function AnimatedTerminal({ commands, prefersReduced }) {
 const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
 const [displayedText, setDisplayedText] = useState('');
 const [isTyping, setIsTyping] = useState(true);
 const [showOutput, setShowOutput] = useState(false);

 useEffect(() => {
 if (prefersReduced) return;

 const currentCommand = commands[currentCmdIndex];
 let charIndex = 0;
 setDisplayedText('');
 setIsTyping(true);
 setShowOutput(false);

 const typeInterval = setInterval(() => {
 if (charIndex <= currentCommand.cmd.length) {
 setDisplayedText(currentCommand.cmd.slice(0, charIndex));
 charIndex++;
 } else {
 clearInterval(typeInterval);
 setIsTyping(false);
 const outputTimer = setTimeout(() => {
 setShowOutput(true);
 const nextTimer = setTimeout(() => {
 setCurrentCmdIndex((prev) => (prev + 1) % commands.length);
 }, 2400);
 return () => clearTimeout(nextTimer);
 }, 350);
 return () => clearTimeout(outputTimer);
 }
 }, 45);

 return () => clearInterval(typeInterval);
 }, [currentCmdIndex, prefersReduced, commands]);

 if (prefersReduced) {
 return (
 <div className="rounded-xl bg-[#08170F] border border-[#173827] p-3.5 text-stone-200 font-semibold text-[11px] space-y-2 mt-6">
 <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/10 text-[10px] text-stone-400">
 <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
 <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="ml-2">bash - dev@local: ~/app</span>
 </div>
 {commands.map((item, idx) => (
 <div key={idx} className="space-y-0.5">
 <div className="flex items-center gap-1.5 text-white">
 <span className="text-[#A3E635]">$</span>
 <span>{item.cmd}</span>
 </div>
 <div className="text-stone-400 text-[10px] pl-3.5">{item.output}</div>
 </div>
 ))}
 </div>
 );
 }

 const currentCommand = commands[currentCmdIndex];

 return (
 <div className="rounded-xl bg-[#08170F] border border-[#173827] p-3.5 text-stone-200 font-semibold text-[11px] shadow-inner mt-6 min-h-[148px] flex flex-col justify-between">
 <div>
 {/* Terminal Title Bar */}
 <div className="flex items-center gap-1.5 pb-2 mb-2.5 border-b border-white/10 text-[10px] text-stone-400">
 <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
 <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 <span className="ml-2 font-semibold text-stone-400">bash - dev@local: ~/app</span>
 </div>

 {/* Current typing line */}
 <div className="flex items-center gap-1.5 text-white font-semibold min-h-[20px]">
 <span className="text-[#A3E635]">$</span>
 <span>{displayedText}</span>
 {isTyping && <span className="w-1.5 h-3.5 bg-[#A3E635] animate-pulse inline-block" />}
 </div>

 {/* Command Output */}
 {showOutput && (
 <div className="text-[#10B981] text-[10px] pl-3.5 mt-2 animate-fadeIn font-semibold">
 {currentCommand.output}
 </div>
 )}
 </div>

 {/* Terminal Footer */}
 <div className="pt-2 text-[9px] text-stone-500 font-semibold flex items-center justify-between border-t border-white/5 mt-3">
 <span className="flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
 <span>runtime active</span>
 </span>
 <span className="text-stone-400">node / python</span>
 </div>
 </div>
 );
}

// ============================================================================
// MAIN PROCESS BENTO COMPONENT
// ============================================================================
export default function ProcessBento() {
 const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

 useEffect(() => {
 if (typeof window === 'undefined') return;
 const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
 setPrefersReducedMotion(mediaQuery.matches);

 const handler = (e) => setPrefersReducedMotion(e.matches);
 mediaQuery.addEventListener?.('change', handler);
 return () => mediaQuery.removeEventListener?.('change', handler);
 }, []);

 const { eyebrow, heading, headingItalic, subtitle, stages, planningBoard, terminalCommands, deployment } = processData;

 return (
 <section id="process" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
 
 {/* Top Header Row */}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
 <div>
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
 </div>

 {/* Right Subtext + Downward Circle Arrow Button */}
 <div className="flex items-center gap-4">
 <p className="text-xs sm:text-sm text-[#5B6D60] max-w-xs font-normal">
 {subtitle}
 </p>

 <a
 href="#skills"
 className="w-10 h-10 rounded-full bg-[#133E29] text-white hover:bg-[#0D2B1D] flex items-center justify-center transition-colors shrink-0"
 aria-label="Scroll to skills"
 >
 <ArrowDown className="w-4 h-4" />
 </a>
 </div>
 </div>

 {/* Bento Grid Layout (Four Stages: 01 Tall Left, 02 & 03 Top Right, 04 Wide Bottom) */}
 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 
 {/* ================================================================= */}
 {/* Step 01: Tall Left Card (md:col-span-4) - Planning Board */}
 {/* ================================================================= */}
 <div className="md:col-span-4 rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
 <div>
 <span className="text-xs font-bold text-[#10B981] block mb-2 tracking-wider">
 {stages.discover.step} {stages.discover.name}
 </span>
 <h3 className="font-extrabold text-xl text-[#0D2B1D] mb-2 leading-snug">
 {stages.discover.title}
 </h3>
 <p className="text-xs sm:text-sm text-[#5B6D60] leading-relaxed font-normal">
 {stages.discover.description}
 </p>
 </div>

 {/* Planning Board Visual with Sticky Notes at Bottom */}
 <div className="mt-8 rounded-2xl bg-[#F6F8F4] border border-[#E2E8DC] p-4 flex flex-col gap-3">
 <div className="flex items-center justify-between text-[11px] font-semibold text-[#133E29]">
 <span className="font-bold flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-[#10B981]" />
 PLANNING BOARD
 </span>
 <span className="text-[#5B6D60] text-[10px]">4 / 4 SCOPED</span>
 </div>

 {/* 2x2 Sticky Notes that lightly lift on hover */}
 <div className="grid grid-cols-2 gap-2.5">
 {planningBoard.map((note) => (
 <div
 key={note.title}
 style={{ transform: `rotate(${note.rotate})` }}
 className={`${note.bgClass} ${note.borderClass} ${note.textClass} border rounded-xl p-3 shadow-xs hover:-translate-y-1.5 hover:rotate-0 hover:shadow-md transition-all duration-200 cursor-default flex flex-col justify-between min-h-[96px]`}
 >
 <div className="flex items-center justify-between mb-1.5">
 <span className="font-extrabold text-xs tracking-tight">
 {note.title}
 </span>
 <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${note.tagClass}`}>
 {note.tag}
 </span>
 </div>
 <p className="text-[10px] leading-snug opacity-90 font-normal">
 {note.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* ================================================================= */}
 {/* Right Side Cards (md:col-span-8) */}
 {/* ================================================================= */}
 <div className="md:col-span-8 flex flex-col gap-6">
 
 {/* Top Row: Step 02 & Step 03 */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 
 {/* Step 02: Software Architecture Diagram (Client -> API -> Model -> Database) */}
 <div className="rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
 <div>
 <span className="text-xs font-bold text-[#10B981] block mb-2 tracking-wider">
 {stages.architect.step} {stages.architect.name}
 </span>
 <h3 className="font-extrabold text-xl text-[#0D2B1D] mb-2 leading-snug">
 {stages.architect.title}
 </h3>
 <p className="text-xs sm:text-sm text-[#5B6D60] leading-relaxed font-normal">
 {stages.architect.description}
 </p>
 </div>

 {/* Clean Architecture Diagram with Animated Sequential Connectors */}
 <div className="mt-6 rounded-2xl bg-[#F6F8F4] border border-[#E2E8DC] p-4 flex flex-col gap-3">
 {/* Step 1 to 2: Client -> API */}
 <div className="flex items-center justify-between gap-2">
 <div className="flex-1 p-2.5 rounded-xl bg-white border border-[#E2E8DC] shadow-xs flex items-center gap-2">
 <Layout className="w-4 h-4 text-[#10B981] shrink-0" />
 <div>
 <div className="font-bold text-xs text-[#0D2B1D]">Client</div>
 <div className="text-[10px] font-semibold text-[#5B6D60]">React / UI</div>
 </div>
 </div>

 {/* Connector: Client -> API */}
 <div className="flex items-center justify-center shrink-0 w-8">
 <motion.div
 initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="h-0.5 w-6 bg-[#10B981] relative origin-left"
 >
 <span className="absolute -right-1 -top-1 border-t-3 border-b-3 border-l-4 border-transparent border-l-[#10B981]" />
 </motion.div>
 </div>

 <div className="flex-1 p-2.5 rounded-xl bg-white border border-[#E2E8DC] shadow-xs flex items-center gap-2">
 <Server className="w-4 h-4 text-[#10B981] shrink-0" />
 <div>
 <div className="font-bold text-xs text-[#0D2B1D]">API</div>
 <div className="text-[10px] font-semibold text-[#5B6D60]">FastAPI</div>
 </div>
 </div>
 </div>

 {/* Vertical Connector: API -> Model */}
 <div className="flex justify-end pr-10 sm:pr-12">
 <motion.div
 initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
 whileInView={{ scaleY: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.4, delay: 0.3 }}
 className="w-0.5 h-4 bg-[#10B981] relative origin-top"
 >
 <span className="absolute -left-1 -bottom-1 border-l-3 border-r-3 border-t-4 border-transparent border-t-[#10B981]" />
 </motion.div>
 </div>

 {/* Step 3 to 4: Model -> Database */}
 <div className="flex items-center justify-between gap-2">
 <div className="flex-1 p-2.5 rounded-xl bg-white border border-[#E2E8DC] shadow-xs flex items-center gap-2">
 <Database className="w-4 h-4 text-[#10B981] shrink-0" />
 <div>
 <div className="font-bold text-xs text-[#0D2B1D]">Database</div>
 <div className="text-[10px] font-semibold text-[#5B6D60]">Vector / DB</div>
 </div>
 </div>

 {/* Connector: Model -> Database (Pointing Left) */}
 <div className="flex items-center justify-center shrink-0 w-8">
 <motion.div
 initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
 whileInView={{ scaleX: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.6 }}
 className="h-0.5 w-6 bg-[#10B981] relative origin-right"
 >
 <span className="absolute -left-1 -top-1 border-t-3 border-b-3 border-r-4 border-transparent border-r-[#10B981]" />
 </motion.div>
 </div>

 <div className="flex-1 p-2.5 rounded-xl bg-white border border-[#E2E8DC] shadow-xs flex items-center gap-2">
 <Cpu className="w-4 h-4 text-[#10B981] shrink-0" />
 <div>
 <div className="font-bold text-xs text-[#0D2B1D]">Model</div>
 <div className="text-[10px] font-semibold text-[#5B6D60]">LLMs &amp; RAG</div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Step 03: Animated Developer Terminal */}
 <div className="rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
 <div>
 <span className="text-xs font-bold text-[#10B981] block mb-2 tracking-wider">
 {stages.develop.step} {stages.develop.name}
 </span>
 <h3 className="font-extrabold text-xl text-[#0D2B1D] mb-2 leading-snug">
 {stages.develop.title}
 </h3>
 <p className="text-xs sm:text-sm text-[#5B6D60] leading-relaxed font-normal">
 {stages.develop.description}
 </p>
 </div>

 {/* Animated Developer Terminal Window */}
 <AnimatedTerminal
 commands={terminalCommands}
 prefersReduced={prefersReducedMotion}
 />
 </div>

 </div>

 {/* =============================================================== */}
 {/* Step 04: Wide Dark Emerald Card with Deployment Progress Bar */}
 {/* =============================================================== */}
 <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#103623] via-[#133E29] to-[#0A1C12] text-white p-7 sm:p-9 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[#1E4D34]">
 
 {/* Left Content */}
 <div className="max-w-md">
 <span className="text-xs font-bold text-[#A3E635] block mb-2 tracking-wider">
 {stages.deliver.step} {stages.deliver.name}
 </span>

 <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
 {stages.deliver.bannerHeading}
 </h3>

 <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal mb-3">
 {stages.deliver.bannerDescription}
 </p>

 <p className="text-xs font-semibold text-[#A3E635]/90">
 {stages.deliver.description}
 </p>
 </div>

 {/* Right Side: Deployment Progress Card */}
 <div className="w-full sm:w-auto shrink-0 bg-white text-[#0D2B1D] p-5 rounded-2xl shadow-xl border border-white/90 min-w-[260px]">
 <div className="flex items-center justify-between pb-2.5 border-b border-stone-200 mb-3">
 <span className="text-xs font-bold uppercase tracking-wider text-[#0D2B1D]">
 {deployment.title}
 </span>
 <span className="text-[10px] font-bold text-[#10B981] bg-[#EBF7EE] px-2 py-0.5 rounded-full">
 RELEASE
 </span>
 </div>

 {/* Deployment Progress Bar */}
 <div className="mb-3">
 <div className="w-full h-2 rounded-full bg-[#E2E8DC] overflow-hidden">
 <motion.div
 initial={{ width: prefersReducedMotion ? '100%' : '0%' }}
 whileInView={{ width: '100%' }}
 viewport={{ once: true }}
 transition={{ duration: 1.2, ease: 'easeOut' }}
 className="h-full bg-gradient-to-r from-[#10B981] to-[#A3E635] rounded-full"
 />
 </div>
 </div>

 {/* Real Pipeline Milestone Items */}
 <div className="space-y-1.5 text-xs text-[#5B6D60] font-normal mb-3">
 {deployment.steps.map((step, idx) => (
 <div key={idx} className="flex items-center gap-2">
 <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
 <span className="text-[11px]">{step}</span>
 </div>
 ))}
 </div>

 {/* Build Successful Check Indicator */}
 <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
 <div className="flex items-center gap-1.5 font-bold text-xs text-[#0D2B1D]">
 <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
 <span>{deployment.status}</span>
 </div>
 <span className="text-[10px] font-semibold text-[#10B981] font-semibold">
 {deployment.detail}
 </span>
 </div>
 </div>

 </div>

 </div>

 </div>

 </section>
 );
}
