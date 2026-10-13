import React from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

export const LuxuryHero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Ambient background gold lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(216,168,86,0.15)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(216,168,86,0.08)_0%,transparent_70%)] blur-3xl" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Editorial Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Micro Tag (Image 1 style) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          {/* Main Headline (Image 1 style) */}
          <h1
            data-testid="hero-headline"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#FAF8F5] leading-[1.04] tracking-tight"
          >
            <span>Create</span> <br />
            <span>without limits.</span> <br />
            <span>Build your</span> <br />
            <span className="text-gold-gradient italic">vision.</span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="mt-6 sm:mt-8 max-w-xl font-body text-sm sm:text-base text-[#9A9893] leading-relaxed font-light">
            Premium digital resources for creators who want to create better content, build their identity and turn ideas into something more.
          </p>

          {/* CTA Row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#vault"
              data-testid="btn-explore-collection"
              className="gold-pill-btn px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase font-semibold"
            >
              EXPLORE THE COLLECTION →
            </a>

            <a
              href={SITE_CONFIG.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-buy-cta"
              className="luxury-ghost-btn px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase font-medium"
            >
              BUY VAULT — $9.99 ↗
            </a>
          </div>

          {/* Social Proof (Image 1 style: 3 avatars + 10K+ Creators Trust Vernox) */}
          <div className="mt-10 sm:mt-12 flex items-center gap-3.5 pt-6 border-t border-white/[0.07] w-full max-w-md">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#070709] bg-gradient-to-br from-[#E2B770] to-[#8C6228] flex items-center justify-center text-[10px] font-bold text-black shadow-md">
                JD
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-[#070709] bg-gradient-to-br from-[#9E9E9E] to-[#424242] flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                MK
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-[#070709] bg-gradient-to-br from-[#D8A856] to-[#1E1E24] flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                AL
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold text-[#FAF8F5] tracking-wide">
                10,000+
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#9A9893]">
                CREATORS TRUST VERNOX
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Ambient Visual (from Image 1) */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md h-[460px] sm:h-[540px] rounded-[24px] overflow-hidden border border-[#D8A856]/20 bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#08080A] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(216,168,86,0.15)] flex flex-col justify-end p-6">
            {/* Cinematic Archway Illustration */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-85"
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="archGlow" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#D8A856" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#141418" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#070709" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F6D695" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#B67F2D" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Background gradient */}
              <rect width="400" height="500" fill="url(#archGlow)" />

              {/* Architectural Concentric Arches */}
              <path
                d="M 60 500 V 220 A 140 140 0 0 1 340 220 V 500"
                stroke="#D8A856"
                strokeWidth="1.5"
                strokeOpacity="0.35"
              />
              <path
                d="M 90 500 V 240 A 110 110 0 0 1 310 240 V 500"
                stroke="#D8A856"
                strokeWidth="1.5"
                strokeOpacity="0.25"
              />
              <path
                d="M 120 500 V 260 A 80 80 0 0 1 280 260 V 500"
                stroke="#FAF8F5"
                strokeWidth="1"
                strokeOpacity="0.2"
              />

              {/* Inner Portal Light */}
              <ellipse cx="200" cy="300" rx="45" ry="120" fill="url(#beamGrad)" />

              {/* Silhouette of lone creator in corridor */}
              <circle cx="200" cy="335" r="5" fill="#FAF8F5" />
              <path d="M 197 342 L 203 342 L 204 380 L 196 380 Z" fill="#FAF8F5" />
            </svg>

            {/* Bottom Card Glass Overlay */}
            <div className="relative z-10 p-4 rounded-xl bg-[#0B0B0E]/85 backdrop-blur-md border border-white/[0.08]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#D8A856]">
                  THE PRIVATE DRIVE VAULT
                </span>
                <span className="font-mono text-[9px] text-[#9A9893]">
                  15,000+ ASSETS
                </span>
              </div>
              <div className="font-serif text-lg text-[#FAF8F5]">
                Curated High-Retention Visuals
              </div>
              <p className="font-body text-xs text-[#9A9893] mt-1 line-clamp-2">
                Pre-indexed, organized into 4 video bundles + 3 strategy guides. Drop straight into your timeline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator (Image 1 style) */}
      <div className="w-full text-center mt-12 mb-2">
        <a
          href="#vault"
          className="inline-flex flex-col items-center gap-1.5 text-[#9A9893] hover:text-[#D8A856] transition-colors cursor-pointer no-underline"
        >
          <span className="w-5 h-5 rounded-full border border-white/[0.15] flex items-center justify-center text-[10px]">
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
