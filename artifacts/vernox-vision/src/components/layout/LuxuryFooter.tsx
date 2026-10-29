import React from 'react';
import { Link } from 'wouter';
import { SITE_CONFIG } from '@/data/site';

export const LuxuryFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] text-[#FAF8F5] pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(216,168,86,0.08)_0%,transparent_70%)] blur-3xl" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Brand Crest, Name & Purposeful Transition Strip */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo-dark.png"
            alt="Vernox Vision"
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain mb-4 opacity-90 drop-shadow-[0_4px_24px_rgba(216,168,86,0.18)]"
          />
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] uppercase text-[#FAF8F5]">
            VERNOX VISION
          </h2>

          {/* Section Transition: YOUR NEXT ERA STARTS HERE. */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mt-4 mb-1 w-full max-w-lg">
            <span className="h-[1px] flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent to-[#D8A856]/50" />
            <span className="font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.32em] uppercase text-[#D8A856] font-semibold select-none">
              YOUR NEXT ERA STARTS HERE.
            </span>
            <span className="h-[1px] flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent to-[#D8A856]/50" />
          </div>
        </div>

        <p className="max-w-xl font-body text-xs sm:text-sm text-[#9A9893] leading-relaxed mb-8 font-light">
          The precision creator vault. 15,000+ curated video assets, viral hooks, and content frameworks delivered instantly via private Google Drive.
        </p>

        {/* Navigation & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-wider text-[#9A9893] mb-10">
          <Link href="/vault" className="hover:text-[#FAF8F5] transition-colors">
            All Units
          </Link>
          <Link href="/guides" className="hover:text-[#FAF8F5] transition-colors">
            Guides
          </Link>
          <Link href="/how-it-works" className="hover:text-[#FAF8F5] transition-colors">
            How It Works
          </Link>
          <Link href="/license" className="hover:text-[#FAF8F5] transition-colors">
            License Rights
          </Link>
          <Link href="/faq" className="hover:text-[#FAF8F5] transition-colors">
            FAQ
          </Link>
          <Link href="/support" className="hover:text-[#FAF8F5] transition-colors">
            Support
          </Link>
          <Link href="/terms" className="hover:text-[#FAF8F5] transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-[#FAF8F5] transition-colors">
            Privacy
          </Link>
          <Link href="/refund-policy" className="hover:text-[#FAF8F5] transition-colors">
            Refund Policy
          </Link>
        </div>

        {/* Scroll To Top Button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-white/[0.12] text-[#9A9893] hover:text-[#D8A856] hover:border-[#D8A856] flex items-center justify-center transition-colors mb-10 cursor-pointer text-sm"
          aria-label="Scroll to top"
        >
          ↑
        </button>

        {/* Bottom Line */}
        <div className="w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9A9893]">
          <div>
            © {new Date().getFullYear()} Vernox Vision. All rights reserved. One-time payment ($9.99).
          </div>
          <div className="flex items-center gap-4 text-[#9A9893]">
            <span>15,000+ CREATOR ASSETS</span>
            <span>·</span>
            <span>NO SUBSCRIPTIONS</span>
            <span>·</span>
            <span className="text-[#D8A856]">LIFETIME ACCESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
