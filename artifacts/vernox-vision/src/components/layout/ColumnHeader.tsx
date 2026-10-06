import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  PictogramVault,
  PictogramGuides,
  PictogramHowItWorks,
  PictogramAccess,
  PictogramSupport,
  BrandMonogram,
  BrandLogo,
} from '@/components/illustration/Pictograms';
import { LedToggle } from '@/components/ui/LedToggle';
import { useStageMode } from '@/hooks/useStageMode';

export const ColumnHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleStageMode } = useStageMode();
  const [, setLocation] = useLocation();

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navColumns = [
    {
      id: 'vault',
      title: 'vault',
      href: '/vault',
      pictogram: <PictogramVault />,
      sublinks: [
        { label: 'all units', href: '/vault' },
        { label: 'viral (vv-01)', href: '/vault/viral' },
        { label: 'speaker (vv-02)', href: '/vault/speaker' },
      ],
    },
    {
      id: 'guides',
      title: 'guides',
      href: '/guides',
      pictogram: <PictogramGuides />,
      sublinks: [
        { label: '30-day calendar', href: '/vault/calendar' },
        { label: 'caption vault', href: '/vault/caption' },
        { label: 'quick-start', href: '/vault/onboarding' },
      ],
    },
    {
      id: 'how-it-works',
      title: 'how it works',
      href: '/how-it-works',
      pictogram: <PictogramHowItWorks />,
      sublinks: [
        { label: 'signal path', href: '/how-it-works' },
        { label: 'drive delivery', href: '/how-it-works#drive' },
        { label: 'commercial license', href: '/license' },
      ],
    },
    {
      id: 'access',
      title: 'access',
      href: '/access',
      pictogram: <PictogramAccess />,
      sublinks: [
        { label: 'pricing ($9.99)', href: '/access' },
        { label: 'commercial license', href: '/license' },
        { label: 'faq', href: '/faq' },
      ],
    },
    {
      id: 'support',
      title: 'support',
      href: '/support',
      pictogram: <PictogramSupport />,
      sublinks: [
        { label: 'contact', href: '/support' },
        { label: 'system faq', href: '/faq' },
        { label: 'gumroad portal', href: 'https://vernoxvision.gumroad.com/l/vernoxvision', external: true },
      ],
    },
  ];

  return (
    <header className="relative w-full border-b border-[var(--line)] bg-[var(--bg)] transition-colors select-none">
      {/* Desktop Column Header */}
      <div className="hidden lg:grid grid-cols-12 min-h-[140px] divide-x divide-[var(--line)]">
        {/* Brand Wordmark at far left */}
        <div className="col-span-2 p-5 flex flex-col justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3.5 leading-none"
            aria-label="Vernox Vision Home"
            data-testid="brand-wordmark"
          >
            <BrandLogo className="h-12 w-auto shrink-0 hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-body font-light text-2xl tracking-tighter lowercase text-[var(--ink)]">
                vernox
              </span>
              <span className="font-body font-light text-2xl tracking-tighter lowercase text-[var(--ink)]">
                vision
              </span>
            </div>
          </Link>

          <div className="pt-4 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)]">
              EST. 2026 // US
            </span>
            <LedToggle isDark={isDark} onToggle={toggleStageMode} />
          </div>
        </div>

        {/* 5 Navigation Columns */}
        <div className="col-span-8 grid grid-cols-5 divide-x divide-[var(--line)]">
          {navColumns.map((col) => (
            <div key={col.id} className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[var(--ink)]">
                  {col.pictogram}
                  <Link
                    href={col.href}
                    className="font-body font-light text-lg lowercase tracking-tight hover:text-[#FF5A1F] transition-colors"
                  >
                    {col.title}
                  </Link>
                </div>

                <ul className="flex flex-col gap-1 mt-3">
                  {col.sublinks.map((sub) => (
                    <li key={sub.label}>
                      {sub.external ? (
                        <a
                          href={sub.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-xs lowercase text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                        >
                          {sub.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={sub.href}
                          className="font-body text-xs lowercase text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="font-mono text-[8px] uppercase tracking-widest text-[var(--ink-muted)] pt-3 border-t border-[var(--line)]/50 mt-4">
                SEC—{col.id.slice(0, 3)}
              </div>
            </div>
          ))}
        </div>

        {/* Far Right: Microcopy + Big Monogram */}
        <div className="col-span-2 p-5 flex flex-col justify-between items-end">
          <Link href="/" aria-label="Vernox Vision Monogram" className="hover:opacity-85 transition-opacity">
            <BrandMonogram className="w-16 h-16 sm:w-20 sm:h-20" />
          </Link>

          <div className="text-right">
            <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)] leading-tight max-w-[140px]">
              15,000+ CLIPS.
              <br />
              ZERO BLANK TIMELINES.
              <br />
              DRIVE DELIVERY.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Compact Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[var(--line)]">
        <Link href="/" className="flex items-center gap-3">
          <BrandMonogram className="w-11 h-11" />
          <span className="font-body font-light text-2xl tracking-tight lowercase">
            vernox vision
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <LedToggle isDark={isDark} onToggle={toggleStageMode} />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Index Menu'}
            aria-expanded={mobileMenuOpen}
            className="w-9 h-9 border border-[var(--line-strong)] rounded-[2px] flex flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? (
              <span className="font-mono text-xs font-bold">✕</span>
            ) : (
              <>
                <span className="w-4 h-[1.5px] bg-[var(--ink)] block" />
                <span className="w-4 h-[1.5px] bg-[var(--ink)] block" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Index Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[var(--bg)] p-6 overflow-y-auto flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Index"
          data-testid="mobile-menu-modal"
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[var(--line)]">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
                SYSTEM INDEX // FULL SPEC
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="font-mono text-xs uppercase border border-[var(--line-strong)] px-3 py-1 rounded-[2px]"
                data-testid="btn-mobile-menu-close"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {navColumns.map((col) => (
                <div key={col.id} className="border-b border-[var(--line)] pb-4">
                  <div className="flex items-center gap-2 mb-2 text-[var(--ink)]">
                    {col.pictogram}
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setLocation(col.href);
                      }}
                      className="font-body text-xl font-light lowercase text-left"
                    >
                      {col.title}
                    </button>
                  </div>
                  <ul className="flex flex-col gap-2 pl-9">
                    {col.sublinks.map((sub) => (
                      <li key={sub.label}>
                        {sub.external ? (
                          <a
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-sm lowercase text-[var(--ink-muted)]"
                          >
                            {sub.label} ↗
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setLocation(sub.href);
                            }}
                            className="font-body text-sm lowercase text-[var(--ink-muted)] text-left hover:text-[var(--ink)]"
                          >
                            {sub.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--ink-muted)]">
            <span>VERNOX VISION // ONE-TIME $9.99</span>
            <a
              href="https://vernoxvision.gumroad.com/l/vernoxvision"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF5A1F] text-black font-bold px-4 py-2 rounded-[2px] uppercase tracking-wider"
            >
              BUY VAULT NOW ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
