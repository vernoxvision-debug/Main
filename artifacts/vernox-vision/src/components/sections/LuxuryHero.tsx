
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

const HERO_LOGO_SRC = '/logo-dark.png';
const AMBER = '#D99A3F';
const GOLD = '#EBC17A';
const HOT = '#FFF4DC';

const ORBITAL_PATHS = [
  { d: 'M -90 925 C 150 835, 330 625, 590 650 C 825 674, 920 850, 1120 760 C 1300 680, 1370 545, 1540 505', opacity: 0.58, width: 1.05, delay: 0.1, duration: 3.1 },
  { d: 'M -80 1010 C 190 890, 395 755, 650 770 C 900 785, 1015 610, 1210 610 C 1360 610, 1440 690, 1540 735', opacity: 0.43, width: 0.85, delay: 0.35, duration: 3.5 },
  { d: 'M 110 960 C 315 975, 450 900, 635 805 C 825 708, 925 515, 1115 535 C 1300 555, 1370 750, 1550 820', opacity: 0.38, width: 0.75, delay: 0.55, duration: 3.8 },
  { d: 'M 320 1010 C 500 850, 650 635, 850 625 C 1050 615, 1110 790, 1280 735 C 1410 695, 1450 560, 1550 440', opacity: 0.52, width: 0.95, delay: 0.2, duration: 3.4 },
  { d: 'M 520 1000 C 665 865, 770 730, 930 720 C 1100 710, 1180 520, 1330 470 C 1420 440, 1480 470, 1550 525', opacity: 0.34, width: 0.7, delay: 0.7, duration: 4 },
  { d: 'M 650 900 C 800 765, 855 565, 1035 475 C 1195 395, 1300 470, 1375 365 C 1430 285, 1475 220, 1550 180', opacity: 0.25, width: 0.65, delay: 0.9, duration: 4.2 },
  { d: 'M 400 560 C 590 475, 770 425, 930 495 C 1080 560, 1125 690, 1290 650 C 1410 620, 1470 545, 1550 560', opacity: 0.22, width: 0.65, delay: 0.45, duration: 4.1 },
  { d: 'M -80 785 C 130 745, 300 790, 455 720 C 625 645, 720 490, 900 470 C 1075 450, 1170 585, 1320 560 C 1430 540, 1480 465, 1550 390', opacity: 0.3, width: 0.7, delay: 0.65, duration: 3.9 },
];

const SPARKLES: [number, number, number, number][] = [
  [1369, 285, 1.8, 7],
  [1250, 140, 1.2, 8],
  [960, 120, 1.1, 10],
  [1400, 420, 1.3, 9],
  [720, 560, 1.1, 8],
  [1010, 700, 1.1, 9],
  [1480, 760, 1.2, 11],
];

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 h-full w-full pointer-events-none opacity-75 sm:opacity-100"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMaxYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="vvOrbitalGold" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#8A5A1E" stopOpacity="0.12" />
        <stop offset="0.28" stopColor={AMBER} stopOpacity="0.58" />
        <stop offset="0.58" stopColor={GOLD} stopOpacity="0.9" />
        <stop offset="0.78" stopColor={HOT} stopOpacity="0.95" />
        <stop offset="1" stopColor={AMBER} stopOpacity="0.22" />
      </linearGradient>

      <radialGradient id="vvOrbitalHalo">
        <stop offset="0" stopColor={HOT} stopOpacity="0.8" />
        <stop offset="0.18" stopColor={GOLD} stopOpacity="0.38" />
        <stop offset="0.48" stopColor={AMBER} stopOpacity="0.12" />
        <stop offset="1" stopColor={AMBER} stopOpacity="0" />
      </radialGradient>

      <filter id="vvOrbitalGlow" x="-300%" y="-300%" width="700%" height="700%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>

    {ORBITAL_PATHS.map((path, index) => (
      <motion.path
        key={`orbital-${index}`}
        d={path.d}
        stroke="url(#vvOrbitalGold)"
        strokeWidth={path.width}
        strokeLinecap="round"
        opacity={path.opacity}
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: path.opacity }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                pathLength: { duration: path.duration, delay: path.delay, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 1.8, delay: path.delay },
              }
        }
      />
    ))}

    {/* First focal light */}
    <g>
      <circle cx="1294" cy="525" r="42" fill="url(#vvOrbitalHalo)" opacity="0.7" />
      <circle cx="1294" cy="525" r="5" fill={HOT} opacity="0.28" filter="url(#vvOrbitalGlow)" />
      <circle cx="1294" cy="525" r="2.2" fill={HOT} />
      {!reduceMotion && (
        <motion.circle
          cx="1294" cy="525" r="2.2" fill={HOT}
          animate={{ opacity: [0.65, 1, 0.65], r: [1.8, 2.5, 1.8] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </g>

    {/* Second focal light */}
    <g>
      <circle cx="808" cy="638" r="34" fill="url(#vvOrbitalHalo)" opacity="0.58" />
      <circle cx="808" cy="638" r="4.5" fill={HOT} opacity="0.25" filter="url(#vvOrbitalGlow)" />
      <circle cx="808" cy="638" r="1.9" fill={HOT} />
      {!reduceMotion && (
        <motion.circle
          cx="808" cy="638" r="1.9" fill={HOT}
          animate={{ opacity: [0.6, 1, 0.6], r: [1.6, 2.2, 1.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </g>

    {SPARKLES.map(([x, y, r, duration], index) => (
      <circle key={`sparkle-${index}`} cx={x} cy={y} r={r} fill={GOLD} opacity="0.65">
        {!reduceMotion && (
          <animate attributeName="opacity" values="0.2;0.75;0.2" dur={`${duration}s`} repeatCount="indefinite" />
        )}
      </circle>
    ))}

    {/* Eagle and thin ring */}
    <motion.g
      className="hidden md:block"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -5, 0] }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 1.4, delay: 0.6 },
              y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 },
            }
      }
    >
      <circle cx="1080" cy="390" r="64" stroke={AMBER} strokeOpacity="0.4" strokeWidth="0.8" />
      <image
        href={HERO_LOGO_SRC}
        x="1051"
        y="366"
        width="58"
        height="48"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.95"
      />
    </motion.g>
  </svg>
);

export const LuxuryHero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-[#070709]">
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(217,154,63,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-[35%] right-0 w-[640px] h-[640px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_center_right,rgba(217,154,63,0.05)_0%,transparent_70%)] blur-3xl" />

      <OrbitalLights reduceMotion={reduceMotion} />

      <div className="relative max-w-7xl mx-auto w-full my-auto z-10">
        <div className="flex flex-col items-start max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          <h1
            data-testid="hero-headline"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-[#FAF8F5] leading-[1.06] tracking-tight"
          >
            <span>Create Without</span> <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-xl font-body text-base sm:text-lg text-[#D6D3CC] leading-relaxed font-light">
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

          <div className="mt-10 sm:mt-12 flex items-center gap-3.5 pt-6 border-t border-white/[0.07] w-full max-w-xl">
            <span className="w-8 h-8 shrink-0 rounded-full border border-[#D8A856]/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-base font-bold text-[#FAF8F5] tracking-wide">15,000+</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#9A9893]">
                RESOURCES · LIFETIME ACCESS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full text-center mt-12 mb-2">
        <a
          href="#vault"
          className="inline-flex flex-col items-center gap-1.5 text-[#9A9893] hover:text-[#D8A856] transition-colors cursor-pointer no-underline"
        >
          <span className="w-5 h-5 rounded-full border border-white/[0.15] flex items-center justify-center text-[10px]">↓</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">SCROLL DOWN</span>
        </a>
      </div>
    </section>
  );
};
