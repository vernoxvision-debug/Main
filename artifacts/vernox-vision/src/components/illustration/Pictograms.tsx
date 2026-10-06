import React from 'react';

export interface PictogramProps {
  className?: string;
}

export const PictogramVault: React.FC<PictogramProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={`${className} text-current`} fill="none">
    <rect x="4" y="4" width="10" height="10" fill="currentColor" />
    <rect x="18" y="4" width="10" height="10" fill="currentColor" />
    <rect x="4" y="18" width="10" height="10" fill="currentColor" />
    <rect x="18" y="18" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="23" cy="23" r="2.5" fill="#FF5A1F" />
  </svg>
);

export const PictogramGuides: React.FC<PictogramProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={`${className} text-current`} fill="none">
    <path
      d="M 6 4 L 20 4 L 26 10 L 26 28 L 6 28 Z"
      fill="currentColor"
    />
    <path d="M 20 4 L 20 10 L 26 10 Z" fill="#FF5A1F" />
    <line x1="10" y1="16" x2="22" y2="16" stroke="var(--bg)" strokeWidth="2" />
    <line x1="10" y1="21" x2="18" y2="21" stroke="var(--bg)" strokeWidth="2" />
  </svg>
);

export const PictogramHowItWorks: React.FC<PictogramProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={`${className} text-current`} fill="none">
    <circle cx="9" cy="16" r="5" fill="currentColor" />
    <line x1="14" y1="16" x2="23" y2="16" stroke="currentColor" strokeWidth="3" />
    <polygon points="23,11 29,16 23,21" fill="#FF5A1F" />
  </svg>
);

export const PictogramAccess: React.FC<PictogramProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={`${className} text-current`} fill="none">
    <rect x="4" y="6" width="24" height="20" rx="2" fill="currentColor" />
    <circle cx="16" cy="16" r="4" fill="var(--bg)" />
    <rect x="15" y="16" width="2" height="6" fill="#FF5A1F" />
  </svg>
);

export const PictogramSupport: React.FC<PictogramProps> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" className={`${className} text-current`} fill="none">
    <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
    <line x1="16" y1="8" x2="16" y2="17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="22" r="1.5" fill="#FF5A1F" />
  </svg>
);

export interface BrandLogoProps {
  className?: string;
  alt?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-12 w-auto',
  alt = 'Vernox Vision Official Emblem',
}) => (
  <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}>
    {/* White Theme Logo — White Theme Logo VV.png */}
    <img
      src="/logo-light.png"
      alt={alt}
      className="brand-logo-light h-full w-auto object-contain"
      loading="eager"
      width={1402}
      height={1122}
    />
    {/* Dark Theme Logo — Dark THeme Logo Appearence.png */}
    <img
      src="/logo-dark.png"
      alt={alt}
      className="brand-logo-dark h-full w-auto object-contain"
      loading="eager"
      width={1402}
      height={1122}
    />
  </div>
);

export const BrandMonogram: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <div
    className={`relative overflow-hidden rounded-[3px] flex items-center justify-center select-none shrink-0 ${className}`}
  >
    <BrandLogo className="w-full h-full" />
  </div>
);

