import React from 'react';

export default function AuroraBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" 
      aria-hidden="true"
    >
      {/* Off-white Pearl Canvas Base */}
      <div className="absolute inset-0 bg-[#F8F9FC]" />

      {/* Very faint geometric dot grid overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      {/* Floating Aurora Blobs - Soft, gentle, atmospheric */}
      {/* Blob 1: Soft Indigo/Blue top-left */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full mix-blend-multiply filter blur-[90px] opacity-45 bg-gradient-to-tr from-blue-300 via-indigo-200 to-indigo-100 animate-blob" 
      />

      {/* Blob 2: Warm Violet/Purple top-right */}
      <div 
        className="absolute top-[5%] -right-[15%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full mix-blend-multiply filter blur-[95px] opacity-40 bg-gradient-to-br from-violet-300 via-purple-200 to-indigo-200 animate-blob [animation-delay:4s]" 
      />

      {/* Blob 3: Hint of soft Cyan/Teal mid-left */}
      <div 
        className="absolute top-[40%] -left-[15%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 bg-gradient-to-r from-cyan-200 via-sky-200 to-blue-200 animate-blob [animation-delay:8s]" 
      />

      {/* Blob 4: Hint of soft Peach/Rose center-right */}
      <div 
        className="absolute top-[65%] -right-[10%] w-[550px] h-[550px] sm:w-[700px] sm:h-[700px] rounded-full mix-blend-multiply filter blur-[95px] opacity-25 bg-gradient-to-tl from-rose-200 via-pink-100 to-purple-200 animate-blob [animation-delay:12s]" 
      />

      {/* Blob 5: Violet/Blue bottom-center */}
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full mix-blend-multiply filter blur-[110px] opacity-35 bg-gradient-to-t from-indigo-200 via-blue-200 to-transparent animate-blob [animation-delay:6s]" 
      />

      {/* Subtle Noise / vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/40 pointer-events-none" />
    </div>
  );
}

