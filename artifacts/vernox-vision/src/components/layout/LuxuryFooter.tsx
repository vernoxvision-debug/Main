import React from 'react';
import { Link } from 'wouter';
import { SITE_CONFIG } from '@/data/site';

export const LuxuryFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] text-[#FAF8F5] pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo-dark.png"
            alt="Vernox Vision"
            className="h-14 sm:h-16 w-auto object-contain mb-4 opacity-90"
          />
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] uppercase text-[#FAF8F5]">
            VERNOX VISION
          </h2>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D8A856] mt-1">
            CREATE WITH INTENTION.
          </span>
        </div>

        <p className="max-w-md font-body text-xs text-[#9A9893] leading-relaxed mb-8">
          The precision creator vault. 15,000+ curated video assets, viral hooks, and content frameworks delivered instantly via private Google Drive.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-6 mb-10 text-sm text-[#9A9893]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D8A856] transition-colors"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D8A856] transition-colors"
            aria-label="YouTube"
          >
            YouTube
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D8A856] transition-colors"
            aria-label="TikTok"
          >
            TikTok
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D8A856] transition-colors"
            aria-label="X (Twitter)"
          >
            Twitter / X
          </a>
          <a
            href="mailto:support@vernoxvision.com"
            className="hover:text-[#D8A856] transition-colors"
            aria-label="Email Support"
          >
            Email
          </a>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-[#9A9893] mb-12">
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

        {/* Bottom Line & Attribution */}
        <div className="w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#9A9893]">
          <div>
            © 2026 Vernox Vision. All rights reserved. One-time payment ($9.99).
          </div>

          <div>
            <a
              href="https://madhankumart.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8A856] hover:underline font-medium transition-colors"
            >
              For More Websites Like This?
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
