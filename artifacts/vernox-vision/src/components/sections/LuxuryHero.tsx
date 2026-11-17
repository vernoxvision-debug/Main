
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/** Eagle logo */
const HERO_LOGO_SRC = '/logo-dark.png';

/** Luxury gold palette */
const AMBER = '#D99A3F';
const GOLD = '#EBC17A';
const HOT = '#FFF4DC';
const DEEP = '#8A5A1E';

/**
 * Three minimal, organic golden curves.
 * They follow different paths and intersect naturally.
 */
const ORBITAL_PATHS = [
  {
    d: 'M -90 900 C 170 825, 390 690, 650 675 C 890 660, 1080 590, 1294 525 C 1390 496, 1470 480, 1540 470',
    opacity: 0.72,
    width: 0.95,
    delay: 0.15,
  },
  {
    d: 'M -90 980 C 190 900, 420 805, 650 770 C 865 738, 1040 760, 1210 655 C 1350 570, 1445 545, 1540 555',
    opacity: 0.42,
    width: 0.72,
    delay: 0.4,
  },
  {
    d: 'M 190 950 C 390 885, 585 780, 808 638 C 950 548, 1085 490, 1215 500 C 1350 510, 1430 610, 1540 680',
    opacity: 0.48,
    width: 0.78,
    delay: 0.65,
  },
];

const SPARKLES: [number, number, number, number][] = [
  [1369, 285, 1.8, 7],
  [1250, 140, 1.2, 8],
  [960, 120, 1.1, 10],
  [1400, 420, 1.3, 9],
  [720, 560, 1.1, 8],
];

/** Soft circular light point, without long streaks. */
const Flare: React.FC<{
  x: number;
  y: number;
  halo: number;
  reduceMotion: boolean;
  dur: number;
}> = ({ x, y, halo, reduceMotion, dur }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={halo}
      fill="url(#vvHalo)"
      style={{ mixBlendMode: 'screen' }}
    >
      {!reduceMotion && (
        <animate
          attributeName="opacity"
          values="0.65;1;0.65"
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>

    <circle
      cx={x}
      cy={y}
      r="5"
      fill={HOT}
      opacity="0.3"
      filter="url(#vvCoreGlow)"
    />

    <circle cx={x} cy={y} r="1.9" fill={HOT} />
  </g>
);

/** Fade the orbital artwork toward the bottom. */
const BOTTOM_FADE =
  'linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)';

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({
  reduceMotion,
}) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 w-full h-full pointer-events-none opacity-75 sm:opacity-100"
    style={{
      WebkitMaskImage: BOTTOM_FADE,
      maskImage: BOTTOM_FADE,
    }}
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMaxYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* Metallic gold gradient */}
      <linearGradient
        id="vvOrbitalGold"
        x1="0"
        y1="0"
        x2="1440"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor={DEEP} stopOpacity="0.12" />
        <stop offset="0.3" stopColor={AMBER} stopOpacity="0.5" />
        <stop offset="0.62" stopColor={GOLD} stopOpacity="0.85" />
        <stop offset="0.82" stopColor={HOT} stopOpacity="0.9" />
        <stop offset="1" stopColor={AMBER} stopOpacity="0.18" />
      </linearGradient>

      {/* Circular light halo */}
      <radialGradient id="vvHalo">
        <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.55" />
        <stop offset="0.2" stopColor={AMBER} stopOpacity="0.22" />
        <stop offset="0.55" stopColor={AMBER} stopOpacity="0.05" />
        <stop offset="1" stopColor={AMBER} stopOpacity="0" />
      </radialGradient>

      <filter
        id="vvCoreGlow"
        x="-400%"
        y="-400%"
        width="900%"
        height="900%"
      >
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    {/* Three thin, flowing curves */}
    {ORBITAL_PATHS.map((path, index) => (
      <motion.path
        key={`orbital-${index}`}
        d={path.d}
        stroke="url(#vvOrbitalGold)"
        strokeWidth={path.width}
        strokeLinecap="round"
        initial={
          reduceMotion
            ? false
            : { pathLength: 0, opacity: 0 }
        }
        animate={{
          pathLength: 1,
          opacity: path.opacity,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 3.2,
                delay: path.delay,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      />
    ))}

    {/* Two subtle focal lights */}
    <Flare
      x={1294}
      y={525}
      halo={48}
      reduceMotion={reduceMotion}
      dur={7}
    />

    <Flare
      x={808}
      y={638}
      halo={38}
      reduceMotion={reduceMotion}
      dur={9}
    />

    {/* Tiny gold particles */}
    {SPARKLES.map(([x, y, r, dur], index) => (
      <circle
        key={`sparkle-${index}`}
        cx={x}
        cy={y}
        r={r}
        fill={GOLD}
        opacity="0.65"
      >
        {!reduceMotion && (
          <animate
            attributeName="opacity"
            values="0.25;0.8;0.25"
            dur={`${dur}s`}
            repeatCount="indefinite"
          />
        )}
      </circle>
    ))}

    {/* Eagle logo inside a fine gold ring */}
    <motion.g
      className="hidden md:block"
      initial={
        reduceMotion
          ? false
          : { opacity: 0 }
      }
      animate={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: [0, -6, 0] }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              opacity: {
                duration: 1.4,
                delay: 0.6,
              },
              y: {
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              },
            }
      }
    >
      <circle
        cx="1080"
        cy="390"
        r="64"
        stroke={AMBER}
        strokeOpacity="0.4"
        strokeWidth="0.8"
      />

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

      {/* Restrained ambient gold lighting */}
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(217,154,63,0.06)_0%,transparent_70%)] blur-3xl" />

      <div className="absolute top-[35%] right-0 w-[640px] h-[640px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_center_right,rgba(217,154,63,0.05)_0%,transparent_70%)] blur-3xl" />

      {/* Golden orbital artwork */}
      <OrbitalLights reduceMotion={reduceMotion} />

      <div className="relative max-w-7xl mx-auto w-full my-auto z-10">
        <div className="flex flex-col items-start max-w-3xl">

          {/* Micro tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />

            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          {/* Main headline */}
          <h1
            data-testid="hero-headline"
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-[#FAF8F5] leading-[1.06] tracking-tight"
          >
            <span>Create Without</span>
            <br />
            <span className="text-gold-gradient italic">
              Limits.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 max-w-xl font-body text-base sm:text-lg text-[#D6D3CC] leading-relaxed font-light">
            15,000+ creator assets. Endless possibilities. Everything you need to make your next move.
          </p>

          {/* CTA buttons */}
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

          {/* Resources and lifetime access */}
          <div className="mt-10 sm:mt-12 flex items-center gap-3.5 pt-6 border-t border-white/[0.07] w-full max-w-xl">

            <span className="w-8 h-8 shrink-0 rounded-full border border-[#D8A856]/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            </span>

            <div className="flex flex-col">
              <span className="font-mono text-base font-bold text-[#FAF8F5] tracking-wide">
                15,000+
              </span>

              <span className="font-mono text-[9px] uppercase tracking-widest text-[#9A9893]">
                RESOURCES · LIFETIME ACCESS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 w-full text-center mt-12 mb-2">
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
