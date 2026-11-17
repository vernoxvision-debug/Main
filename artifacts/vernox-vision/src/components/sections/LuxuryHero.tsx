import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/** Eagle shown inside the thin ring. Same file the header uses. */
const HERO_LOGO_SRC = '/logo-dark.png';

/** Gold palette for the orbital light effect only. */
const GOLD = '#FFC83D';
const GOLD_DEEP = '#A66A00';
const GOLD_HIGHLIGHT = '#FFF2B0';

/**
 * Everything on the right is drawn in one 1440 x 900 space anchored to the
 * right edge, so circles stay circles.
 *
 * Flare points sit exactly where two lines cross:
 *   N1 (1294, 525)  white-hot, lower right   (curves A and C)
 *   N2 ( 808, 638)  warm gold, lower middle  (curves A and B)
 * Eagle ring centre: (1080, 416)
 */
const CURVES: {
  d: string;
  width: number;
  opacity: number;
  delay: number;
  float: { y: number; x: number; dur: number };
  shimmer?: { dur: number; delay: number; pause: number };
}[] = [
  {
    // A: runs through both flare points to the right edge
    d: 'M -40 800 C 200 740 520 650 808 638 C 1000 630 1160 560 1294 525 S 1440 510 1500 508',
    width: 1.3,
    opacity: 1,
    delay: 0.1,
    float: { y: 5, x: 4, dur: 12 },
    shimmer: { dur: 10, delay: 2.5, pause: 3 },
  },
  {
    // B: crosses A at the lower-middle flare and rises to the upper right
    d: 'M 380 900 C 560 800 700 700 808 638 C 900 585 1040 480 1200 400 S 1400 330 1500 300',
    width: 1.1,
    opacity: 0.9,
    delay: 0.3,
    float: { y: 6, x: -4, dur: 14 },
    shimmer: { dur: 11, delay: 6, pause: 3.5 },
  },
  {
    // C: crosses A at the lower-right flare and fans to the right edge
    d: 'M 1100 900 C 1180 760 1230 600 1294 525 S 1420 440 1500 400',
    width: 1,
    opacity: 0.8,
    delay: 0.5,
    float: { y: 5, x: 4, dur: 13 },
  },
  {
    // D: upper-right wave that meets the large arc
    d: 'M 1100 385 C 1220 330 1300 300 1369 285 S 1440 275 1500 268',
    width: 0.9,
    opacity: 0.75,
    delay: 0.7,
    float: { y: 4, x: 4, dur: 15 },
  },
  {
    // E: low arc at the bottom left
    d: 'M 40 870 C 140 800 240 772 330 770 S 480 772 560 785',
    width: 0.8,
    opacity: 0.55,
    delay: 0.9,
    float: { y: 4, x: 5, dur: 16 },
  },
];

/** Large thin orbital arcs, both on the same circle centre (563, 447). */
const ARCS: { d: string; width: number; opacity: number; delay: number; sway: number; dur: number }[] = [
  { d: 'M 1282 48 A 822 822 0 0 1 1377 560', width: 0.9, opacity: 0.8, delay: 0.4, sway: 0.8, dur: 36 },
  { d: 'M 1375 60 A 900 900 0 0 1 1440 649', width: 0.7, opacity: 0.4, delay: 0.6, sway: -0.6, dur: 42 },
];

/** Two small gold nodes: [x, y, radius] */
const NODES: [number, number, number][] = [
  [1369, 285, 3.8],
  [1352, 472, 3.2],
];

/** Scattered gold dots: [x, y, radius, drift duration in seconds] */
const DOTS: [number, number, number, number][] = [
  [917, 330, 2.2, 9],
  [798, 527, 3, 11],
  [1193, 481, 2.4, 8],
  [664, 607, 1.8, 10],
  [1241, 716, 1.6, 12],
  [1164, 746, 1.5, 9],
  [1255, 224, 1.6, 10],
  [1185, 143, 1.5, 11],
  [954, 94, 1.6, 8],
  [1384, 666, 2, 10],
  [748, 744, 1.6, 12],
  [1324, 344, 1.5, 9],
];

/** A glowing point of light with a soft halo and a light streak. */
const Flare: React.FC<{
  x: number;
  y: number;
  halo: number;
  streak: number;
  angle: number;
  color: string;
  reduceMotion: boolean;
  dur: number;
}> = ({ x, y, halo, streak, angle, color, reduceMotion, dur }) => (
  <g>
    <circle cx={x} cy={y} r={halo} fill="url(#vvHalo)" opacity="0.9">
      {!reduceMotion && (
        <animate attributeName="opacity" values="0.6;1;0.6" dur={`${dur}s`} repeatCount="indefinite" />
      )}
    </circle>
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx={streak} ry="6" fill={color} opacity="0.18" filter="url(#vvStreakSoft)" />
      <ellipse cx={x} cy={y} rx={streak * 0.75} ry="1.3" fill={GOLD_HIGHLIGHT} opacity="0.85" filter="url(#vvStreak)" />
    </g>
    <circle cx={x} cy={y} r="3.6" fill={GOLD_HIGHLIGHT} />
  </g>
);

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70 sm:opacity-100"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Horizontal gradient: lines stay visible all the way to the screen edges */}
        <linearGradient id="vvLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0" stopColor={GOLD_DEEP} stopOpacity="0.6" />
          <stop offset="0.35" stopColor={GOLD} stopOpacity="0.95" />
          <stop offset="0.7" stopColor={GOLD_HIGHLIGHT} stopOpacity="1" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.8" />
        </linearGradient>

        <radialGradient id="vvHalo">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.55" />
          <stop offset="0.3" stopColor={GOLD} stopOpacity="0.22" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>

        <filter id="vvLineGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="vvStreak" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <filter id="vvStreakSoft" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="vvDotGlow" x="-400%" y="-400%" width="900%" height="900%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Large thin orbital arcs */}
      {ARCS.map((a, i) => (
        <g key={`arc-${i}`}>
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 563 447; ${a.sway} 563 447; 0 563 447`}
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              dur={`${a.dur}s`}
              repeatCount="indefinite"
            />
          )}
          <motion.path
            d={a.d}
            stroke="url(#vvLine)"
            strokeWidth={a.width}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: a.opacity }}
            transition={reduceMotion ? { duration: 0 } : { duration: 3.2, delay: a.delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </g>
      ))}

      {/* Flowing curves that cross at the two flare points */}
      {CURVES.map((c, i) => (
        <motion.g
          key={`curve-${i}`}
          animate={reduceMotion ? undefined : { y: [0, -c.float.y, 0], x: [0, c.float.x, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: c.float.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }
          }
        >
          <path
            d={c.d}
            stroke="url(#vvLine)"
            strokeWidth={c.width * 2.6}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#vvLineGlow)"
            opacity="0.28"
          />
          <motion.path
            d={c.d}
            stroke="url(#vvLine)"
            strokeWidth={c.width}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: c.opacity }}
            transition={reduceMotion ? { duration: 0 } : { duration: 2.8, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* A bright pulse of light that travels along the curve */}
          {!reduceMotion && c.shimmer && (
            <motion.path
              d={c.d}
              stroke={GOLD_HIGHLIGHT}
              strokeWidth={c.width * 1.5}
              strokeLinecap="round"
              strokeDasharray="170 4000"
              opacity="0.85"
              initial={{ strokeDashoffset: 170 }}
              animate={{ strokeDashoffset: -2800 }}
              transition={{
                duration: c.shimmer.dur,
                delay: c.shimmer.delay,
                repeat: Infinity,
                repeatDelay: c.shimmer.pause,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.g>
      ))}

      {/* Flare points where the lines cross */}
      <Flare x={1294} y={525} halo={85} streak={130} angle={-6} color={GOLD_HIGHLIGHT} reduceMotion={reduceMotion} dur={7} />
      <Flare x={808} y={638} halo={100} streak={170} angle={-14} color={GOLD} reduceMotion={reduceMotion} dur={9} />

      {/* Small gold nodes on the arc and curves */}
      {NODES.map(([x, y, r], i) => (
        <g key={`node-${i}`}>
          <circle cx={x} cy={y} r={r * 3} fill={GOLD} opacity="0.5" filter="url(#vvDotGlow)">
            {!reduceMotion && (
              <animate attributeName="opacity" values="0.3;0.65;0.3" dur={`${6 + i * 1.5}s`} repeatCount="indefinite" />
            )}
          </circle>
          <circle cx={x} cy={y} r={r} fill={GOLD} />
        </g>
      ))}

      {/* Scattered gold dots */}
      {DOTS.map(([x, y, r, dur], i) => (
        <circle key={`dot-${i}`} cx={x} cy={y} r={r} fill={GOLD} opacity="0.55">
          {!reduceMotion && (
            <>
              <animate attributeName="cy" values={`${y};${y - 7};${y}`} dur={`${dur}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${dur}s`} repeatCount="indefinite" />
            </>
          )}
        </circle>
      ))}

      {/* Eagle inside a thin gold ring (tablet and up) */}
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
        <circle cx="1080" cy="416" r="92" fill="url(#vvHalo)" opacity="0.3" />
        <circle cx="1080" cy="416" r="64" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <image
          href={HERO_LOGO_SRC}
          x="1051"
          y="392"
          width="58"
          height="48"
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
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Open cinematic backdrop: restrained golden ambient lighting */}
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,200,61,0.07)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,200,61,0.035)_0%,transparent_70%)] blur-3xl" />

      {/* Orbital golden light */}
      <OrbitalLights reduceMotion={reduceMotion} />

      <div className="relative max-w-7xl mx-auto w-full my-auto z-10">
        {/* Editorial Typography & CTAs */}
        <div className="flex flex-col items-start max-w-3xl">
          {/* Micro Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          {/* Main Headline (two lines, as in the reference) */}
          <h1
            data-testid="hero-headline"
            className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#FAF8F5] leading-[1.04] tracking-tight"
          >
            <span>Create Without</span> <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 max-w-2xl font-body text-base sm:text-lg lg:text-xl text-[#DCD9D2] leading-relaxed font-light">
            15,000+ creator assets. Endless possibilities. Everything you need to make your next move.
          </p>

          {/* CTA Row */}
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

          {/* True facts line (replaces the unverified creator count) */}
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

      {/* Scroll Down Indicator */}
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
