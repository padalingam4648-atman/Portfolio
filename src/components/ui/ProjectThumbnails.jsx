import React from 'react';

export default function ProjectThumbnail({ visualType, title }) {
  switch (visualType) {
    case 'neural-network':
      return (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-500/15 flex items-center justify-center p-4 border border-white/60">
          <svg className="w-full h-full max-h-40" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Synaptic Paths */}
            <path d="M40 90 C 90 40, 110 50, 170 50" stroke="url(#g-line)" strokeWidth="2" strokeDasharray="4 2" />
            <path d="M40 90 C 90 90, 110 90, 170 90" stroke="url(#g-line)" strokeWidth="2.5" />
            <path d="M40 90 C 90 140, 110 130, 170 130" stroke="url(#g-line)" strokeWidth="2" strokeDasharray="4 2" />

            <path d="M170 50 C 220 50, 240 70, 290 80" stroke="url(#g-line)" strokeWidth="2" />
            <path d="M170 90 C 220 90, 240 85, 290 90" stroke="url(#g-line)" strokeWidth="2.5" />
            <path d="M170 130 C 220 130, 240 100, 290 100" stroke="url(#g-line)" strokeWidth="2" />

            <path d="M290 90 L 330 90" stroke="#7C3AED" strokeWidth="3" />

            {/* Node 1: Incoming Action Proposal */}
            <circle cx="40" cy="90" r="16" fill="white" stroke="#2563EB" strokeWidth="3" filter="url(#glow-filter)" />
            <text x="40" y="94" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563EB">REQ</text>

            {/* Middle Evaluator Gate Nodes */}
            <g transform="translate(170, 50)">
              <rect x="-18" y="-14" width="36" height="28" rx="6" fill="white" stroke="#4F46E5" strokeWidth="2" />
              <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="600" fill="#4F46E5">SCOPE</text>
            </g>
            <g transform="translate(170, 90)">
              <rect x="-24" y="-14" width="48" height="28" rx="6" fill="#4F46E5" stroke="white" strokeWidth="1.5" filter="url(#glow-filter)" />
              <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">REVERSE</text>
            </g>
            <g transform="translate(170, 130)">
              <rect x="-18" y="-14" width="36" height="28" rx="6" fill="white" stroke="#4F46E5" strokeWidth="2" />
              <text x="0" y="3" textAnchor="middle" fontSize="9" fontWeight="600" fill="#4F46E5">REGUL</text>
            </g>

            {/* Risk Arbiter Node */}
            <circle cx="290" cy="90" r="20" fill="white" stroke="#7C3AED" strokeWidth="3" filter="url(#glow-filter)" />
            <polygon points="284,83 298,90 284,97" fill="#7C3AED" />

            {/* Final Autonomy State Indicator */}
            <rect x="325" y="76" width="28" height="28" rx="7" fill="#10B981" />
            <path d="M333 90 L 337 94 L 345 85" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );

    case 'document-rag':
      return (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/15 flex items-center justify-center p-4 border border-white/60">
          <svg className="w-full h-full max-h-40" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Document icon */}
            <rect x="35" y="45" width="60" height="90" rx="8" fill="white" stroke="#6366F1" strokeWidth="2.5" />
            <line x1="48" y1="65" x2="82" y2="65" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="80" x2="76" y2="80" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="95" x2="80" y2="95" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="110" x2="68" y2="110" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />

            {/* Arrow to Chunks */}
            <path d="M102 90 L 132 90" stroke="#818CF8" strokeWidth="2.5" strokeDasharray="3 3" />

            {/* Vector DB Stack / Matrix */}
            <g transform="translate(155, 50)">
              <rect x="0" y="0" width="70" height="24" rx="5" fill="white" stroke="#8B5CF6" strokeWidth="1.8" />
              <text x="35" y="15" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6D28D9">Chunk_01 [0.89]</text>

              <rect x="0" y="30" width="70" height="24" rx="5" fill="#8B5CF6" stroke="white" strokeWidth="1.5" />
              <text x="35" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">FAISS INDEX</text>

              <rect x="0" y="60" width="70" height="24" rx="5" fill="white" stroke="#8B5CF6" strokeWidth="1.8" />
              <text x="35" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6D28D9">Chunk_03 [0.74]</text>
            </g>

            {/* Arrow to Local LLM */}
            <path d="M232 90 L 260 90" stroke="#A855F7" strokeWidth="2.5" />
            <polygon points="260,86 268,90 260,94" fill="#A855F7" />

            {/* LLM Engine Node (Llama 3.2 local) */}
            <circle cx="300" cy="90" r="26" fill="white" stroke="#EC4899" strokeWidth="2.5" />
            <circle cx="300" cy="90" r="18" fill="#FDF2F8" />
            <text x="300" y="87" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#DB2777">LLAMA</text>
            <text x="300" y="98" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#9D174D">3.2 LOCAL</text>
          </svg>
        </div>
      );

    case 'encryption-shield':
      return (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-cyan-500/15 flex items-center justify-center p-4 border border-white/60">
          <svg className="w-full h-full max-h-40" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric Cryptographic Polynomial Rings */}
            <circle cx="180" cy="90" r="68" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="180" cy="90" r="50" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="180" cy="90" r="34" stroke="#4F46E5" strokeWidth="2" />

            {/* Central Shield with Lock */}
            <path d="M180 58 C 200 58, 208 64, 208 78 C 208 100, 180 114, 180 118 C 180 114, 152 100, 152 78 C 152 64, 160 58, 180 58 Z" fill="white" stroke="#4F46E5" strokeWidth="2.5" />
            <rect x="173" y="83" width="14" height="11" rx="2" fill="#4F46E5" />
            <path d="M176 83 V 78 A 4 4 0 0 1 184 78 V 83" stroke="#4F46E5" strokeWidth="2" fill="none" />

            {/* Homomorphic Math Annotations */}
            <g transform="translate(60, 80)">
              <rect x="0" y="0" width="60" height="24" rx="6" fill="white" stroke="#06B6D4" strokeWidth="1.5" />
              <text x="30" y="16" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#0891B2">Enc(m₁)</text>
            </g>

            <g transform="translate(240, 80)">
              <rect x="0" y="0" width="68" height="24" rx="6" fill="white" stroke="#7C3AED" strokeWidth="1.5" />
              <text x="34" y="16" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#7C3AED">Enc(m₁ ⊕ m₂)</text>
            </g>
          </svg>
        </div>
      );

    case 'dealership-dash':
      return (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-emerald-500/15 flex items-center justify-center p-4 border border-white/60">
          <svg className="w-full h-full max-h-40" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dashboard Window Frame */}
            <rect x="50" y="35" width="260" height="115" rx="10" fill="white" stroke="#0EA5E9" strokeWidth="2" />
            
            {/* Window header */}
            <rect x="50" y="35" width="260" height="24" rx="10" fill="#F0F9FF" />
            <circle cx="65" cy="47" r="4" fill="#EF4444" />
            <circle cx="77" cy="47" r="4" fill="#F59E0B" />
            <circle cx="89" cy="47" r="4" fill="#10B981" />
            <text x="180" y="51" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369A1">DEALERDESK CONSOLE</text>

            {/* Metric cards inside window */}
            <rect x="65" y="70" width="65" height="32" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
            <text x="72" y="83" fontSize="7" fill="#64748B">INVENTORY</text>
            <text x="72" y="96" fontSize="11" fontWeight="bold" fill="#0284C7">148 Units</text>

            <rect x="140" y="70" width="75" height="32" rx="5" fill="#F8FAFC" stroke="#E2E8F0" />
            <text x="147" y="83" fontSize="7" fill="#64748B">ACTIVE LEADS</text>
            <text x="147" y="96" fontSize="11" fontWeight="bold" fill="#0D9488">34 Prospects</text>

            <rect x="225" y="70" width="70" height="32" rx="5" fill="#F0FDF4" stroke="#86EFAC" />
            <text x="232" y="83" fontSize="7" fill="#166534">TEST DRIVES</text>
            <text x="232" y="96" fontSize="11" fontWeight="bold" fill="#15803D">Scheduled</text>

            {/* Bottom mini bar chart */}
            <rect x="65" y="115" width="40" height="20" rx="3" fill="#E0F2FE" />
            <rect x="115" y="122" width="40" height="13" rx="3" fill="#CCFBF1" />
            <rect x="165" y="110" width="40" height="25" rx="3" fill="#E0E7FF" />
            <rect x="215" y="118" width="80" height="17" rx="3" fill="#F1F5F9" />
          </svg>
        </div>
      );

    case 'email-agent':
    default:
      return (
        <div className="relative w-full h-48 sm:h-52 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/15 flex items-center justify-center p-4 border border-white/60">
          <svg className="w-full h-full max-h-40" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Inbound Mail */}
            <g transform="translate(60, 65)">
              <rect x="0" y="0" width="55" height="40" rx="6" fill="white" stroke="#7C3AED" strokeWidth="2" />
              <path d="M0 0 L 27.5 22 L 55 0" stroke="#7C3AED" strokeWidth="2" fill="none" />
              <text x="27.5" y="32" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#6D28D9">EMAIL</text>
            </g>

            {/* Radar / n8n workflow pipeline */}
            <path d="M120 85 L 160 85" stroke="#818CF8" strokeWidth="2" strokeDasharray="3 3" />

            {/* n8n Decision Node */}
            <g transform="translate(170, 60)">
              <polygon points="25,0 50,25 25,50 0,25" fill="#6366F1" stroke="white" strokeWidth="1.5" />
              <text x="25" y="27" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">n8n</text>
            </g>

            <path d="M225 85 L 260 85" stroke="#818CF8" strokeWidth="2" />

            {/* Output Alert Card */}
            <g transform="translate(270, 65)">
              <rect x="0" y="0" width="60" height="40" rx="6" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1.8" />
              <circle cx="15" cy="15" r="5" fill="#10B981" />
              <rect x="25" y="12" width="28" height="6" rx="2" fill="#C4B5FD" />
              <text x="30" y="32" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#7C3AED">ALERT SENT</text>
            </g>
          </svg>
        </div>
      );
  }
}

