import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './CertificationsCarousel.css';

/**
 * Horizontal scroll-snap carousel for Research Publications and Course Certifications.
 * Displays 3 cards on desktop (>=1024px), 2 on tablet (>=640px), and 1 on mobile.
 */
export default function CertificationsCarousel({
  subheading,
  description,
  countLabel,
  prevLabel,
  nextLabel,
  regionLabel,
  items,
  renderCard,
  stackOnMobile = false,
}) {
  const trackRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => updateScrollState();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollState);
      resizeObserver?.disconnect();
    };
  }, [items.length, updateScrollState]);

  const scrollByCard = useCallback(
    (direction) => {
      const el = trackRef.current;
      if (!el) return;
      const firstCard = el.firstElementChild;
      if (!firstCard) return;

      const styles = window.getComputedStyle(el);
      const gap = parseFloat(styles.columnGap || styles.gap || '24') || 24;
      const step = firstCard.getBoundingClientRect().width + gap;
      if (step <= 0) return;

      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      const currentIndex = Math.round(el.scrollLeft / step);
      const maxIndex = Math.max(0, Math.round(maxScroll / step));
      const nextIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction));
      const targetLeft = nextIndex === maxIndex ? maxScroll : nextIndex * step;

      el.scrollTo({
        left: targetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (canScrollLeft) scrollByCard(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (canScrollRight) scrollByCard(1);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
      onKeyDown={handleKeyDown}
      className="min-w-0"
    >
      {/* Subsection Header with Navigation Arrows (Matches Projects Carousel Header) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E2E8DC]">
        <div>
          {subheading && (
            <span className="text-xs font-bold text-[#10B981] block mb-1 tracking-wider uppercase">
              {subheading}
            </span>
          )}
          {description && (
            <p className="text-xs sm:text-sm text-[#5B6D60] font-normal">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          {countLabel && (
            <span className="text-[11px] font-semibold text-[#6A7B6E]">
              {countLabel}
            </span>
          )}

          <div className={`${stackOnMobile ? 'hidden sm:flex' : 'flex'} items-center gap-2`}>
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label={prevLabel}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-2 ${
                canScrollLeft
                  ? 'border-[#CBD5C5] hover:border-[#133E29] hover:bg-white text-[#133E29] shadow-xs active:scale-95 cursor-pointer'
                  : 'border-[#E2E8DC] text-[#9EB0A3] opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label={nextLabel}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-2 ${
                canScrollRight
                  ? 'border-[#CBD5C5] hover:border-[#133E29] hover:bg-white text-[#133E29] shadow-xs active:scale-95 cursor-pointer'
                  : 'border-[#E2E8DC] text-[#9EB0A3] opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Viewport Clip Wrapper + Horizontal Scroll-Snap Track */}
      <div className="relative w-full min-w-0 overflow-hidden">
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label={`${regionLabel} track`}
          className={`credentials-carousel-track flex items-stretch gap-6 pt-2 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-inset rounded-[2rem] ${
            stackOnMobile
              ? 'flex-col sm:flex-row overflow-visible sm:overflow-x-auto sm:snap-x sm:snap-mandatory sm:touch-pan-x'
              : 'overflow-x-auto snap-x snap-mandatory touch-pan-x'
          } ${prefersReducedMotion ? 'scroll-auto' : 'scroll-smooth'}`}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`min-w-0 flex ${
                stackOnMobile
                  ? 'w-full sm:w-auto sm:shrink-0 sm:grow-0 sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)] sm:snap-start'
                  : 'shrink-0 grow-0 basis-full sm:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)] snap-start'
              }`}
            >
              {renderCard(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
