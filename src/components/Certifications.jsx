import React, { useState, useEffect } from 'react';
import {
  FileText,
  Award,
  Calendar,
  ExternalLink,
  Eye,
  X,
} from 'lucide-react';
import {
  certificationsHeader,
  researchPublicationsData,
  courseCertificationsData,
} from '../data/certifications';
import CertificationsCarousel from './CertificationsCarousel';

// ============================================================================
// CERTIFICATE LIGHTBOX MODAL
// Displays the actual uploaded certificate image with responsive preview
// ============================================================================
function CertificateModal({ item, isOpen, onClose }) {
 useEffect(() => {
 const handleKeyDown = (e) => {
 if (e.key === 'Escape') onClose();
 };

 if (isOpen) {
 document.body.style.overflow = 'hidden';
 window.addEventListener('keydown', handleKeyDown);
 }

 return () => {
 document.body.style.overflow = 'unset';
 window.removeEventListener('keydown', handleKeyDown);
 };
 }, [isOpen, onClose]);

 if (!isOpen || !item) return null;

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto animate-fadeIn"
 role="dialog"
 aria-modal="true"
 aria-labelledby="cert-modal-title"
 >
 {/* Backdrop */}
 <div
 onClick={onClose}
 className="fixed inset-0 bg-[#081A12]/80 backdrop-blur-md transition-opacity cursor-pointer"
 aria-hidden="true"
 />

 {/* Modal Card */}
 <div className="relative w-full max-w-4xl my-auto rounded-[2rem] bg-white border border-[#E2E8DC] shadow-2xl p-5 sm:p-7 z-10 max-h-[92vh] flex flex-col justify-between text-[#0D2B1D]">
 
 {/* Top Bar */}
 <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F1F4ED]">
 <div className="pr-4">
 <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] block mb-1">
 {item.journal ? 'Research Publication Certificate' : 'Course Completion Certificate'}
 </span>
 <h3 id="cert-modal-title" className="font-extrabold text-lg sm:text-xl text-[#0D2B1D] leading-snug">
 {item.title}
 </h3>
 <p className="text-xs font-bold text-[#133E29] mt-0.5">
 {item.journal || (item.platform ? `${item.provider} · ${item.platform}` : item.provider)}
 </p>
 </div>

 <div className="flex items-center gap-2 shrink-0">
 {/* View Full Size Original Image */}
 <a
 href={item.certificateImage}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1F4ED] hover:bg-[#E2E8DC] text-[#133E29] text-xs font-bold transition-colors"
 title="Open full-resolution image in new tab"
 >
 <ExternalLink className="w-3.5 h-3.5" />
 <span className="hidden sm:inline">Full Size</span>
 </a>

 {/* Close Button */}
 <button
 type="button"
 onClick={onClose}
 className="p-2 rounded-xl hover:bg-[#F1F4ED] text-[#5B6D60] hover:text-[#0D2B1D] transition-colors"
 aria-label="Close certificate preview"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 </div>

 {/* Certificate Image View (Original Aspect Ratio Preserved) */}
 <div className="my-4 rounded-xl overflow-hidden bg-[#F8FAF6] border border-[#E2E8DC] p-2 sm:p-3 flex items-center justify-center">
 <img
 src={item.certificateImage}
 alt={`Certificate for ${item.title}`}
 className="max-h-[64vh] w-auto max-w-full object-contain rounded-lg shadow-xs"
 />
 </div>

 {/* Bottom Details Row */}
 <div className="pt-3 border-t border-[#F1F4ED] flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#6A7B6E]">
 <div className="flex flex-wrap items-center gap-3">
 <span>Date: {item.date}</span>
 {item.volume && <span>· {item.volume}</span>}
 {item.doi && <span>· DOI: {item.doi}</span>}
 {item.paperId && <span>· Paper ID: {item.paperId}</span>}
 {item.certificateSerial && <span>· Serial: {item.certificateSerial}</span>}
 {item.code && <span>· Certificate Code: {item.code}</span>}
 {item.blockchainId && <span>· Blockchain ID: {item.blockchainId}</span>}
 </div>

 {item.doiUrl && (
 <a
 href={item.doiUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-1 text-xs font-bold text-[#10B981] hover:underline"
 >
 <span>View Official DOI</span>
 <ExternalLink className="w-3.5 h-3.5" />
 </a>
 )}
 </div>

 </div>
 </div>
 );
}

// ============================================================================
// SHARED CREDENTIAL CARD SHELL
// Renders consistent rounded card styling for both Publications and Courses
// ============================================================================
function CredentialCard({
  icon: Icon,
  date,
  eyebrow,
  title,
  subtitle,
  children,
  tags,
  certificateImage,
  certificateUrl,
  onViewCertificate,
}) {
  const hasImage = Boolean(certificateImage);
  const hasUrl = Boolean(certificateUrl);

  return (
    <article className="w-full rounded-[2rem] bg-white border border-[#E2E8DC] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#CBD5C5] transition-all duration-300 group hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div>
        {/* Card Top Row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[#EBF7EE] text-[#133E29] flex items-center justify-center shrink-0 group-hover:bg-[#A3E635] group-hover:text-[#0D2B1D] transition-colors motion-reduce:transition-none">
            <Icon className="w-5 h-5 stroke-[2]" />
          </div>
          {date && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6A7B6E] text-right">
              <Calendar className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>{date}</span>
            </div>
          )}
        </div>

        {/* Number & Title */}
        {eyebrow && (
          <span className="text-[10px] font-bold text-[#10B981] block mb-1 tracking-wider uppercase">
            {eyebrow}
          </span>
        )}
        <h3 className="font-extrabold text-base text-[#0D2B1D] mb-2 leading-snug group-hover:text-[#10B981] transition-colors motion-reduce:transition-none">
          {title}
        </h3>

        {/* Journal or Issuing Organization */}
        {subtitle && (
          <p className="text-xs font-bold text-[#133E29] mb-1">
            {subtitle}
          </p>
        )}

        {/* Item-specific metadata */}
        {children}

        {/* Topic / Skill Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F1F4ED] text-[#133E29]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Button: View Certificate (hidden gracefully if no file/link) */}
      {(hasImage || hasUrl) && (
        <div className="pt-4 border-t border-[#F1F4ED]">
          {hasImage ? (
            <button
              type="button"
              onClick={onViewCertificate}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAF6] hover:bg-[#133E29] hover:text-[#A3E635] text-[#133E29] border border-[#E2E8DC] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Certificate</span>
            </button>
          ) : (
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAF6] hover:bg-[#133E29] hover:text-[#A3E635] text-[#133E29] border border-[#E2E8DC] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Certificate</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

// ============================================================================
// MAIN CERTIFICATIONS SECTION
// Subsection A: Research Publications Carousel
// Subsection B: Courses & Certifications Carousel
// ============================================================================
export default function Certifications() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { eyebrow, heading, headingItalic, subtitle } = certificationsHeader;
  const publications = researchPublicationsData.publications || [];
  const courses = courseCertificationsData.courses || [];

  return (
    <section
      id="certifications"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-x-clip"
    >
      {/* Main Section Header */}
      <div className="mb-14 sm:mb-16">
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
          <p className="mt-3 text-xs sm:text-sm text-[#5B6D60] max-w-2xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* =====================================================================
          SUBSECTION A — RESEARCH PUBLICATIONS CAROUSEL
      ===================================================================== */}
      <div className="mb-16 sm:mb-20">
        <CertificationsCarousel
          subheading={researchPublicationsData.subheading}
          description={researchPublicationsData.description}
          countLabel={`${publications.length} peer-reviewed publications`}
          prevLabel="Previous publications"
          nextLabel="Next publications"
          regionLabel="Research publications"
          items={publications}
          renderCard={(pub) => (
            <CredentialCard
              icon={FileText}
              date={pub.date}
              eyebrow={pub.num ? `PUBLICATION ${pub.num}` : undefined}
              title={pub.title}
              subtitle={pub.journal}
              tags={pub.tags}
              certificateImage={pub.certificateImage}
              certificateUrl={pub.certificateUrl}
              onViewCertificate={() => setSelectedItem(pub)}
            >
              {pub.volume && (
                <p className="text-[11px] font-semibold text-[#6A7B6E] mb-3">
                  {pub.volume}
                </p>
              )}

              {pub.doi && (
                <div className="mb-4">
                  {pub.doiUrl ? (
                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] rounded-sm"
                      title="Open DOI external record"
                    >
                      <span className="truncate max-w-[220px]">DOI: {pub.doi}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#6A7B6E]">
                      DOI: {pub.doi}
                    </span>
                  )}
                </div>
              )}

              {pub.paperId && (
                <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
                  Paper ID: {pub.paperId}
                </p>
              )}

              {pub.certificateSerial && (
                <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
                  Serial: {pub.certificateSerial}
                </p>
              )}
            </CredentialCard>
          )}
        />
      </div>

      {/* =====================================================================
          SUBSECTION B — COURSES & CERTIFICATIONS CAROUSEL
      ===================================================================== */}
      <div>
        <CertificationsCarousel
          subheading={courseCertificationsData.subheading}
          description={courseCertificationsData.description}
          countLabel={`${courses.length} verified programs`}
          prevLabel="Previous certifications"
          nextLabel="Next certifications"
          regionLabel="Certifications and courses"
          items={courses}
          renderCard={(course) => {
            const verificationUrl = course.verificationUrl || course.credentialUrl;

            return (
              <CredentialCard
                icon={Award}
                date={course.date}
                eyebrow={course.num ? `CERTIFICATION ${course.num}` : undefined}
                title={course.title}
                subtitle={course.provider}
                tags={course.skills}
                certificateImage={course.certificateImage}
                certificateUrl={course.certificateUrl}
                onViewCertificate={() => setSelectedItem(course)}
              >
                {course.platform && (
                  <p className="text-[11px] font-semibold text-[#6A7B6E] mb-2">
                    Platform: {course.platform}
                  </p>
                )}

                {course.code && (
                  <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
                    Code: {course.code}
                  </p>
                )}

                {course.blockchainId && (
                  <p className="text-[11px] font-semibold text-[#6A7B6E] mb-4">
                    Blockchain ID: {course.blockchainId}
                  </p>
                )}

                {verificationUrl && (
                  <div className="mb-4">
                    <a
                      href={verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#133E29] rounded-sm"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </CredentialCard>
            );
          }}
        />
      </div>

      {/* Certificate Image Lightbox Modal */}
      <CertificateModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
