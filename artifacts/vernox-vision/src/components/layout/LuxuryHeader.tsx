import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { SITE_CONFIG } from '@/data/site';

export const LuxuryHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'The Vault', href: '/#vault' },
    { label: 'Toolbox', href: '/#toolbox' },
    { label: '30-Day Calendar', href: '/#calendar' },
    { label: 'How It Works', href: '/#process' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070709]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link
          href="/"
          data-testid="brand-wordmark"
          className="flex items-center gap-2 sm:gap-3 text-inherit no-underline group cursor-pointer shrink-0"
        >
          <img
            src="/logo-dark.png"
            alt="Vernox Vision Eagle Monogram"
            className="h-7 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.16em] sm:tracking-[0.2em] text-sm sm:text-xl font-medium text-[#FAF8F5] leading-tight">
              VERNOX
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-[#D8A856] leading-tight">
              VISION
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-xs uppercase tracking-widest text-[#9A9893] hover:text-[#D8A856] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          <a
            href={SITE_CONFIG.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-buy-cta"
            className="gold-pill-btn px-2.5 sm:px-6 py-1.5 sm:py-2.5 text-[9px] min-[390px]:text-[10px] sm:text-xs tracking-wider uppercase font-semibold whitespace-nowrap shrink-0 flex items-center gap-1 shadow-md"
          >
            <span>GET LIFETIME ACCESS</span>
            <span className="text-[#09090C] font-mono font-bold">$9.99</span>
            <span className="text-[9px] sm:text-xs">↗</span>
          </a>

          {/* Mobile Drawer Button */}
          <button
            type="button"
            data-testid="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#FAF8F5] flex items-center justify-center cursor-pointer hover:border-[#D8A856] transition-colors text-xs sm:text-base shrink-0"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          data-testid="mobile-menu-modal"
          className="md:hidden fixed inset-0 top-[60px] bg-[#070709]/98 backdrop-blur-xl z-40 p-6 flex flex-col justify-between border-t border-white/[0.08] animate-fadeIn"
        >
          <div className="flex flex-col gap-5 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
                NAVIGATION MENU
              </span>
              <button
                type="button"
                data-testid="btn-mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.05] text-[#9A9893] hover:text-[#FAF8F5] flex items-center justify-center text-sm"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-[#FAF8F5] hover:text-[#D8A856] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08]">
            <a
              href={SITE_CONFIG.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-pill-btn w-full py-3.5 text-sm uppercase tracking-wider text-center"
            >
              GET THE FULL VAULT — $9.99 ↗
            </a>
            <div className="mt-4 text-center font-mono text-[9px] text-[#9A9893] uppercase tracking-widest">
              INSTANT GOOGLE DRIVE ACCESS · LIFETIME RIGHTS
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
