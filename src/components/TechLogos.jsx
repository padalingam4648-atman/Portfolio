import React from 'react';
import { Bot, Workflow, Layers, Cpu, Terminal, Code2 } from 'lucide-react';

const TECH_DOMAINS = [
 { 
 id: 1,
 title: 'Agent Workflows', 
 desc: 'Autonomous Routing', 
 icon: Bot 
 },
 { 
 id: 2,
 title: 'Workflow Automation', 
 desc: 'n8n & Event Pipelines', 
 icon: Workflow 
 },
 { 
 id: 3,
 title: 'LLM Framework', 
 desc: 'LangChain & LangGraph', 
 icon: Layers 
 },
 { 
 id: 4,
 title: 'Local LLMs & APIs', 
 desc: 'Ollama, Groq & Gemini', 
 icon: Cpu 
 },
 { 
 id: 5,
 title: 'Backend APIs', 
 desc: 'FastAPI & Microservices', 
 icon: Terminal 
 },
 { 
 id: 6,
 title: 'Core Language : Python', 
 desc: 'Primary Tech Stack', 
 icon: Code2 
 }
];

export default function TechLogos() {
 return (
 <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E2E8DC]/80">
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 items-center justify-between">
 {TECH_DOMAINS.map((item) => {
 const Icon = item.icon;
 return (
 <div 
 key={item.id} 
 className="flex items-center gap-2.5 group cursor-default"
 >
 <div className="w-8 h-8 rounded-xl bg-[#EAEFE6] text-[#133E29] flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] group-hover:text-[#0D2B1D] transition-colors shadow-2xs">
 <Icon className="w-4 h-4" />
 </div>
 <div className="flex flex-col min-w-0">
 <span className="font-extrabold text-xs tracking-tight text-[#133E29] truncate group-hover:text-[#0D2B1D] transition-colors">
 {item.title}
 </span>
 <span className="text-[10px] font-semibold text-[#6A7B6E] truncate">
 {item.desc}
 </span>
 </div>
 </div>
 );
 })}
 </div>
 </section>
 );
}
