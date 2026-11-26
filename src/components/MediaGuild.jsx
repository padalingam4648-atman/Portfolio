import React, { useState, useEffect, useRef } from 'react';
import {
  PenTool,
  Camera,
  Video,
  Radio,
  Presentation,
  FileText,
  Calendar,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  mediaGuildHeader,
  mediaGuildRoles,
  mediaGuildEvents,
  mediaGuildContributionsHeader,
  mediaGuildContributions,
} from '../data/mediaGuild';
import CertificationsCarousel from './CertificationsCarousel';

const ICON_MAP = {
  pen: PenTool,
  camera: Camera,
  video: Video,
  radio: Radio,
  presentation: Presentation,
  file: FileText,
};

function isValidExternalUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim());
}

// ============================================================================
// GALLERY LIGHTBOX MODAL
// ============================================================================
function GalleryLightbox({ items, activeIndex, onClose, onSelectIndex }) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const item = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && items.length > 1) {
        onSelectIndex((activeIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight' && items.length > 1) {
        onSelectIndex((activeIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-lightbox-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#081A12]/80 backdrop-blur-md cursor-pointer"
        aria-hidden="true"
      />

      {/* Dialog Content */}
      <div className="relative w-full max-w-5xl my-auto rounded-[2rem] bg-white border border-[#E2E8DC] shadow-2xl p-5 sm:p-7 z-10 text-[#0D2B1D]">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F1F4ED]">
          <div>
            <h3 id="media-lightbox-title" className="font-extrabold text-lg sm:text-xl text-[#0D2B1D]">
              {item.title}
            </h3>
            {item.caption && (
              <p className="text-xs sm:text-sm text-[#5B6D60] mt-0.5">
                {item.caption}
              </p>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#F1F4ED] text-[#5B6D60] hover:text-[#0D2B1D] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] cursor-pointer"
            aria-label="Close photo lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Photo Display */}
        <div className="my-4 rounded-2xl overflow-hidden bg-[#F8FAF6] border border-[#E2E8DC] flex items-center justify-center p-2 sm:p-3">
          <img
            src={item.image}
            alt={item.alt || item.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Bottom Navigation */}
        <div className="pt-3 border-t border-[#F1F4ED] flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-[#6A7B6E]">
            {activeIndex + 1} / {items.length}
          </span>

          {items.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex - 1 + items.length) % items.length)}
                className="w-9 h-9 rounded-full border border-[#CBD5C5] hover:border-[#133E29] text-[#133E29] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
                className="w-9 h-9 rounded-full border border-[#CBD5C5] hover:border-[#133E29] text-[#133E29] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN MEDIA GUILD SECTION
// ============================================================================
export default function MediaGuild() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const contributions = Array.isArray(mediaGuildContributions)
    ? mediaGuildContributions.filter((item) => Boolean(item.image))
    : [];

  return (
    <section
      id="media-guild"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-x-clip"
    >
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#133E29] uppercase">
            {mediaGuildHeader.eyebrow}
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D2B1D] tracking-tight leading-[1.12]">
          {mediaGuildHeader.heading}{' '}
          <span className="font-serif-italic font-normal text-[#133E29] text-[1.15em]">
            {mediaGuildHeader.headingItalic}
          </span>
        </h2>

        {mediaGuildHeader.subtitle && (
          <p className="mt-3 text-xs sm:text-sm text-[#5B6D60] max-w-2xl font-normal leading-relaxed">
            {mediaGuildHeader.subtitle}
          </p>
        )}

        {/* Role Chips (Matching Skills Chips) */}
        <div className="flex flex-wrap gap-2 mt-6">
          {mediaGuildRoles.map((role) => {
            const RoleIcon = ICON_MAP[role.iconKey] || PenTool;
            return (
              <div
                key={role.name}
                tabIndex={0}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-[#F1F4ED] text-[#133E29] hover:bg-[#E2E8DC] hover:-translate-y-0.5 transition-all select-none cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-1 shadow-2xs motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <RoleIcon className="w-3.5 h-3.5 shrink-0 text-[#133E29]" />
                <span className="tracking-tight">{role.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal Event Cards Carousel (stacks vertically on mobile) */}
      <CertificationsCarousel
        subheading="MEDIA GUILD EVENTS"
        countLabel={`${mediaGuildEvents.length} events`}
        prevLabel="Previous events"
        nextLabel="Next events"
        regionLabel="Media Guild events"
        items={mediaGuildEvents}
        stackOnMobile
        renderCard={(event) => {
          const EventIcon = ICON_MAP[event.iconKey] || PenTool;
          const hasLink = isValidExternalUrl(event.link);

          return (
            <article className="w-full rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#CBD5C5] transition-all duration-300 group hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <div>
                {/* Top Row: Icon Tile + Optional Date Slot */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] group-hover:text-[#0D2B1D] transition-colors motion-reduce:transition-none">
                    <EventIcon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {event.date && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6A7B6E] text-right">
                      <Calendar className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                      <span>{event.date}</span>
                    </div>
                  )}
                </div>

                {/* Event Number (mono) & Title */}
                <span className="font-mono text-[11px] font-bold text-[#10B981] block mb-1 uppercase tracking-wider">
                  {event.number}
                </span>
                <h3 className="font-extrabold text-base text-[#0D2B1D] mb-1.5 leading-snug group-hover:text-[#10B981] transition-colors motion-reduce:transition-none">
                  {event.title}
                </h3>

                {/* Role Line */}
                <p className="text-xs font-bold text-[#133E29] mb-3">
                  {event.role}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5B6D60] leading-relaxed font-normal mb-5">
                  {event.description}
                </p>
              </div>

              {/* Bottom: Contribution Chips & Optional External Link */}
              <div>
                {event.chips && event.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {event.chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F1F4ED] text-[#133E29]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {hasLink && (
                  <div className="mt-4 pt-4 border-t border-[#F1F4ED]">
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8FAF6] hover:bg-[#133E29] hover:text-[#A3E635] text-[#133E29] border border-[#E2E8DC] text-xs font-bold transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-2 motion-reduce:transition-none"
                    >
                      <span>{event.linkLabel || 'View Event Link'}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          );
        }}
      />

      {/* Media Guild Contributions Photography Showcase */}
      {contributions.length > 0 && (
        <div className="mt-16 sm:mt-20 pt-12 border-t border-[#E2E8DC]">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D2B1D] tracking-tight">
              {mediaGuildContributionsHeader.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm italic text-[#5B6D60] font-normal">
              {mediaGuildContributionsHeader.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {contributions.map((item, idx) => (
              <figure
                key={item.id}
                className="m-0 rounded-[2.5rem] bg-white border border-[#E2E8DC] p-4 sm:p-5 shadow-lg hover:shadow-xl hover:border-[#CBD5C5] transition-all duration-300 group motion-reduce:transition-none"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open ${item.title} in full view`}
                  className="relative w-full rounded-[2rem] overflow-hidden bg-[#F1F4ED] aspect-[3/2] block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-2"
                >
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </button>

                <figcaption className="pt-4 px-1.5 pb-1">
                  <span className="block text-sm font-bold text-[#0D2B1D]">
                    {item.title}
                  </span>
                  {item.caption && (
                    <span className="block text-xs text-[#5B6D60] mt-0.5">
                      {item.caption}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Photo Lightbox */}
      <GalleryLightbox
        items={contributions}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </section>
  );
}
