import React from 'react';

export default function SectionHeading({
  badge,
  badgeIcon: BadgeIcon,
  titlePrefix = '',
  titleGradient = '',
  titleSuffix = '',
  description = '',
  align = 'center',
  className = ''
}) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 max-w-3xl ${alignmentClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/70 backdrop-blur-md border border-indigo-100 shadow-sm text-indigo-700 mb-4">
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-indigo-600" />}
          <span>{badge}</span>
        </div>
      )}

      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
        {titlePrefix}{' '}
        {titleGradient && (
          <span className="gradient-text">
            {titleGradient}
          </span>
        )}{' '}
        {titleSuffix}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

