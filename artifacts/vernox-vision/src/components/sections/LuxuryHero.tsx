
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

const HERO_LOGO_SRC = '/logo-dark.png';

const GOLD = '#FFC83D';
const GOLD_DEEP = '#A66A00';
const GOLD_HIGHLIGHT = '#FFF2B0';

const CURVES: { d: string; width: number; opacity: number; delay: number }[] = [
  {
    d: 'M -90 930 C 180 830 455 700 735 704 C 965 708 1130 650 1290 610 C 1370 590 1450 565 1535 535',
    width: 0.95,
    opacity: 0.78,
    delay: 0.15,
  },
  {
    d: 'M 180 960 C 420 875 640 790 835 724 C 1000 670 1135 630 1290 610 C 1380 595 1460 505 1535 455',
    width: 0.78,
    opacity: 0.62,
    delay: 0.35,
  },
  {
    d: 'M 790 960 C 930 835 1085 720 1210 660 C 1250 640 1275 620 1290 610 C 1370 575 1450 545 1535 520',
    width: 0.68,
    opacity: 0.48,
    delay: 0.55,
  },
];

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-75 sm:opacity-100"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vvMetalLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0" stopColor={GOLD_DEEP} stopOpacity="0.08" />
          <stop offset="0.18" stopColor={GOLD} stopOpacity="0.48" />
          <stop offset="0.52" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.82" />
          <stop offset="0.82" stopColor={GOLD} stopOpacity="0.55" />
          <stop offset="1" stopColor={GOLD_DEEP} stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="vvIntersection" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="translate(1290 610) scale(13)">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.45" />
          <stop offset="0.35" stopColor={GOLD} stopOpacity="0.14" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      {CURVES.map((curve, i) => (
        <motion.path
          key={`metal-curve-${i}`}
          d={curve.d}
          stroke="url(#vvMetalLine)"
          strokeWidth={curve.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: curve.opacity }}
          transition={reduceMotion ? { duration: 0 } : { duration: 2.4, delay: curve.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      <circle cx="1290" cy="610" r="13" fill="url(#vvIntersection)" />
      <circle cx="1290" cy="610" r="1.8" fill={GOLD_HIGHLIGHT} opacity="0.78" />
      <circle cx="855" cy="724" r="1.35" fill={GOLD} opacity="0.52" />

      <motion.g
        className="hidden md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -8, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 1.4, delay: 0.6 },
                y: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }
        }
      >
        <circle cx="1081" cy="478" r="64" stroke={GOLD} strokeOpacity="0.38" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <image
          href={HERO_LOGO_SRC}
          x="1048"
          y="450"
          width="66"
          height="56"
          preserveAspectRatio="xMidYMid meet"
          opacity="0.95"
        />
      </motion.g>
    </svg>
  );
};

export const LuxuryHero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[calc(100svh-135px)] lg:min-h-[calc(100svh-135px)] pt-20 sm:pt-24 pb-16 px-5 sm:px-8 lg:px-10 flex flex-col justify-center overflow-hidden bg-[#070709]">
      <OrbitalLights reduceMotion={reduceMotion} />

      <div className="relative max-w-[1410px] mx-auto w-full z-10">
        <div className="flex flex-col items-start max-w-[700px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-serif text-5xl sm:text-6xl lg:text-[5.6rem] xl:text-[6rem] text-[#FAF8F5] leading-[1.08] tracking-tight"
          >
            <span>Create Without</span> <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-xl font-body text-sm sm:text-base text-[#9A9893] leading-relaxed font-light">
            15,000+ creator assets. Endless possibilities. Everything you need to make your next move.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <a
              href="#vault"
              data-testid="btn-explore-collection"
              className="gold-pill-btn w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase font-semibold text-center"
            >
              EXPLORE THE COLLECTION →
            </a>

            <a
              href={SITE_CONFIG.gumroadUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-buy-cta"
              className="luxury-ghost-btn w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase font-medium text-center"
            >
              BUY VAULT — $9.99 ↗
            </a>
          </div>

          <div className="mt-10 sm:mt-12 flex items-center gap-5 pt-6 border-t border-white/[0.08] w-full max-w-xl">
            <div className="flex items-center -space-x-2.5 shrink-0">
              <span className="w-9 h-9 rounded-full border border-[#17130B] bg-[#D8A856] text-[#17110A] flex items-center justify-center text-[10px] font-semibold">JD</span>
              <span className="w-9 h-9 rounded-full border border-[#17130B] bg-[#B9B9B9] text-[#171717] flex items-center justify-center text-[10px] font-semibold">MK</span>
              <span className="w-9 h-9 rounded-full border border-[#17130B] bg-[#8C7658] text-white flex items-center justify-center text-[10px] font-semibold">AL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-lg sm:text-xl font-bold text-[#FAF8F5] tracking-wide leading-none">
                10,000+
              </span>
              <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#B8B4AC]">
                CREATORS TRUST VERNOX
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
