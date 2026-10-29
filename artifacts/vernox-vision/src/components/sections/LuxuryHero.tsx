import React from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

export const LuxuryHero: React.FC = () => {
  return (
    <section className="relative min-h-[94vh] pt-32 sm:pt-40 lg:pt-44 pb-20 lg:pb-28 px-4 sm:px-8 lg:px-12 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Subtle background atmospheric layer using Golden Sci-Fi Network Arcs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/golden-arcs.png"
          alt=""
          className="w-full h-full object-cover object-right-top opacity-[0.14] filter contrast-125 brightness-95 mix-blend-screen"
        />
        {/* Soft radial and linear dark overlays for pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-transparent to-[#070709]" />
      </div>

      {/* Ambient background gold lighting glows */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(216,168,86,0.18)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(216,168,86,0.1)_0%,transparent_70%)] blur-3xl" />

      {/* Main Content Grid: Balanced wider container for 13-16" laptops & desktops */}
      <div className="max-w-[1380px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center my-auto relative z-10">
        {/* Left Column: Editorial Typography, Copy & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Micro Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#D8A856]/20 mb-6 sm:mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#D8A856] font-semibold">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          {/* Main Headline: Dominant & Elegant on Laptop Displays */}
          <h1
            data-testid="hero-headline"
            className="font-serif text-5xl sm:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem] text-[#FAF8F5] leading-[1.02] tracking-tight"
          >
            <span>Create Without</span> <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 sm:mt-8 max-w-2xl font-body text-base sm:text-lg lg:text-xl text-[#B5B2A8] leading-relaxed font-light">
            15,000+ creator assets. Endless possibilities. Everything you need to make your next move.
          </p>

          {/* CTA Row */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <a
              href="#vault"
              data-testid="btn-explore-collection"
              className="gold-pill-btn w-full sm:w-auto px-8 sm:px-9 py-4 sm:py-4.5 text-xs sm:text-sm tracking-wider uppercase font-semibold text-center shadow-lg"
            >
              EXPLORE THE COLLECTION →
            </a>

            <a
              href={SITE_CONFIG.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-buy-cta"
              className="luxury-ghost-btn w-full sm:w-auto px-7 sm:px-8 py-4 sm:py-4.5 text-xs sm:text-sm tracking-wider uppercase font-medium text-center"
            >
              BUY VAULT — $9.99 ↗
            </a>
          </div>

          {/* Social Proof Row */}
          <div className="mt-10 sm:mt-12 flex items-center gap-4 pt-6 border-t border-white/[0.08] w-full max-w-lg">
            <div className="flex -space-x-2.5 shrink-0">
              <div className="w-9 h-9 rounded-full border-2 border-[#070709] bg-gradient-to-br from-[#E2B770] to-[#8C6228] flex items-center justify-center text-[11px] font-bold text-black shadow-md">
                JD
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#070709] bg-gradient-to-br from-[#9E9E9E] to-[#424242] flex items-center justify-center text-[11px] font-bold text-white shadow-md">
                MK
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#070709] bg-gradient-to-br from-[#D8A856] to-[#1E1E24] flex items-center justify-center text-[11px] font-bold text-white shadow-md">
                AL
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-mono text-sm sm:text-base font-bold text-[#FAF8F5] tracking-wide">
                10,000+
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#9A9893]">
                CREATORS TRUST VERNOX
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Vault Visual Showcase */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg lg:max-w-none h-[520px] sm:h-[600px] lg:h-[630px] xl:h-[660px] rounded-[28px] overflow-hidden border border-[#D8A856]/30 bg-[#07070A] shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(216,168,86,0.16)] flex flex-col justify-between p-6 sm:p-8 group">
            {/* Golden Sci-Fi Network Arcs Visual Centerpiece */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <img
                src="/golden-arcs.png"
                alt="Vernox Vision Golden Arcs"
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 opacity-90"
              />
              {/* Dark overlay & radial vignette to ensure high-contrast readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/35 to-[#07070A]/60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,7,10,0.85)_100%)]" />
            </div>

            {/* Top Floating Badge Row */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07070A]/85 backdrop-blur-md border border-[#D8A856]/35">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856] animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#D8A856] font-semibold">
                  MASTER DRIVE // 01
                </span>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-xs text-[#FAF8F5]/85">
                15,000+ ASSETS
              </div>
            </div>

            {/* Subtle Brand Crest Watermark in Core */}
            <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[#D8A856]/20 bg-[#D8A856]/5 backdrop-blur-[2px] flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                <img
                  src="/logo-dark.png"
                  alt="Vernox Crest"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain opacity-85"
                />
              </div>
            </div>

            {/* Bottom Console / Glass Faceplate */}
            <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#09090D]/90 backdrop-blur-xl border border-white/[0.12] shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#D8A856] font-semibold">
                  THE PRIVATE DRIVE VAULT
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#9A9893]">
                  LIFETIME ACCESS
                </span>
              </div>

              <div className="font-serif text-xl sm:text-2xl text-[#FAF8F5] tracking-tight">
                Curated High-Retention Visuals
              </div>

              <p className="font-body text-xs sm:text-sm text-[#9A9893] mt-2 line-clamp-2 leading-relaxed font-light">
                Pre-indexed, organized into 4 video bundles + 3 strategy guides. Drop straight into your timeline.
              </p>

              <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#9A9893]">
                <span className="text-[#D8A856] flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
                  READY FOR IMPORT
                </span>
                <span className="text-[#FAF8F5]/70">1080P & 4K VERTICAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="w-full text-center mt-12 mb-2 relative z-10">
        <a
          href="#vault"
          className="inline-flex flex-col items-center gap-1.5 text-[#9A9893] hover:text-[#D8A856] transition-colors cursor-pointer no-underline group"
        >
          <span className="w-6 h-6 rounded-full border border-white/[0.15] group-hover:border-[#D8A856] flex items-center justify-center text-[10px] transition-colors">
            ↓
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">
            SCROLL DOWN
          </span>
        </a>
      </div>
    </section>
  );
};
