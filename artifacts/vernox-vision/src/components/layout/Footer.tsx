import React from 'react';
import { Link } from 'wouter';
import { SITE_CONFIG } from '@/data/site';
import { BrandLogo } from '@/components/illustration/Pictograms';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--line)] bg-[var(--bg)] transition-colors select-none">
      {/* Upper Footer: Grid of Spec & Legal Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: System Ident */}
        <div>
          <BrandLogo className="h-10 w-auto mb-3" />
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold mb-2">
            SYSTEM IDENT
          </div>
          <div className="font-body text-sm text-[var(--ink-muted)] leading-relaxed">
            Vernox Vision is a digital creator asset vault and content acceleration library.
            15,000+ curated video assets across four video bundles plus three growth guides.
          </div>
          <div className="mt-4 font-mono text-xs text-[var(--ink)]">
            PRICE: <span className="text-[var(--accent)] font-bold">$9.99</span> ONE-TIME
          </div>
        </div>

        {/* Col 2: Architecture & Units */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] font-semibold mb-2">
            VAULT HARDWARE
          </div>
          <ul className="flex flex-col gap-1.5 font-mono text-xs">
            <li>
              <Link href="/vault/viral" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                VV—01 VIRAL CLIPS (5,000+)
              </Link>
            </li>
            <li>
              <Link href="/vault/speaker" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                VV—02 SPEAKER VAULT (3,100+)
              </Link>
            </li>
            <li>
              <Link href="/vault/luxury" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                VV—03 LUXURY LIFESTYLE (3,000+)
              </Link>
            </li>
            <li>
              <Link href="/vault/vlog" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                VV—04 RICH VLOGS (2,500+)
              </Link>
            </li>
            <li>
              <Link href="/guides" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                VV—05 / 06 / 00 GUIDES
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal & Protocol */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] font-semibold mb-2">
            POLICY & PROTOCOL
          </div>
          <ul className="flex flex-col gap-1.5 font-mono text-xs">
            <li>
              <Link href="/license" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                COMMERCIAL LICENSE
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                TERMS OF SERVICE
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                PRIVACY POLICY
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                REFUND POLICY
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                SYSTEM FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Delivery Pipeline */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] font-semibold mb-2">
            DELIVERY PIPELINE
          </div>
          <p className="font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
            Checkout processed by Gumroad. Instant delivery via private Google Drive invitation link.
          </p>
          <div className="mt-4">
            <a
              href={SITE_CONFIG.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs uppercase bg-[var(--ink)] text-[var(--bg)] px-3 py-1.5 rounded-[2px] hover:bg-[#FF5A1F] hover:text-black transition-colors"
            >
              ORDER VAULT ACCESS ↗
            </a>
          </div>
        </div>
      </div>

      {/* Massive Typographic Vernox Vision Banner with Centered Falcon Logo */}
      <div className="border-t border-[var(--line)] py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-6">
          <BrandLogo className="h-20 sm:h-28 w-auto hover:scale-105 transition-transform" />
          <div
            className="type-display text-4xl sm:text-7xl md:text-9xl text-center tracking-tighter text-[var(--ink)] opacity-90 select-none"
            aria-hidden="true"
          >
            VERNOX VISION
          </div>
        </div>
      </div>

      {/* Sub-footer Micro Bar */}
      <div className="border-t border-[var(--line)] px-4 py-4 text-center font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <span>© {new Date().getFullYear()} VERNOX VISION. ALL RIGHTS RESERVED.</span>
        <span>NO SUBSCRIPTION · ONE PAYMENT $9.99 · LIFETIME ACCESS</span>
      </div>

      {/* Credit Line: Websites by Madhan Kumar T */}
      <div className="border-t border-[var(--line)]/50 py-3.5 px-4 text-center font-mono text-[11px] tracking-widest uppercase bg-[var(--bg)] text-[var(--ink-muted)]">
        <span>
          Websites by{' '}
          <a
            href="https://www.madhankumart.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--ink)] hover:text-[#FF5A1F] underline underline-offset-4 font-bold transition-colors"
            data-testid="link-developer-credit"
          >
            Madhan Kumar T
          </a>
        </span>
      </div>
    </footer>
  );
};
