import React from 'react';

export default function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  gradientBorder = false,
  role,
  tabIndex,
  onKeyDown
}) {
  return (
    <div
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={`
        relative rounded-2xl
        bg-white/55 backdrop-blur-xl
        border border-white/80
        shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]
        shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.9)]
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:bg-white/80 hover:border-indigo-200/80 hover:shadow-[0_16px_36px_rgba(79,70,229,0.1)] hover:-translate-y-1' : ''}
        ${gradientBorder ? 'before:absolute before:-inset-[1px] before:rounded-[17px] before:bg-gradient-to-r before:from-blue-500/20 before:via-indigo-500/20 before:to-violet-500/20 before:-z-10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

