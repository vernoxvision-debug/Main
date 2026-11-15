import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/**
 * Eagle shown inside the thin ring on the right.
 */
const HERO_LOGO_SRC = '/logo-dark.png';

/** Gold palette for the orbital light effect only. */
const GOLD = '#FFC83D';
const GOLD_DEEP = '#A66A00';
const GOLD_HIGHLIGHT = '#FFF2B0';

/**
 * Fluid S-curves anchored across the 1440x900 canvas,
 * intersecting cleanly at the two primary flare coordinates:
 *   N1 (1294, 607) - white-hot right flare
 *   N2 ( 808, 720) - warm gold lower-middle flare
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
    d: 'M -40 850 C 240 760 520 680 808 720 C 1020 750 1150 640 1294 607 C 1370 590 1450 580 1520 570',
    width: 1.25,
    opacity: 0.95,
    delay: 0.1,
    float: { y: 4, x: 3, dur: 14 },
    shimmer: { dur: 12, delay: 2.5, pause: 4 },
  },
  {
    d: 'M 200 920 C 450 830 650 770 808 720 C 950 670 1120 560 1294 607 C 1360 620 1440 510 1520 460',
    width: 1.05,
    opacity: 0.85,
    delay: 0.3,
    float: { y: 5, x: -3, dur: 16 },
    shimmer: { dur: 14, delay: 5, pause: 4 },
  },
  {
    d: 'M 850 940 C 1000 800 1150 670 1294 607 C 1370 575 1450 540 1520 520',
    width: 0.9,
    opacity: 0.75,
    delay: 0.5,
    float: { y: 4, x: 3, dur: 15 },
  },
  {
    d: 'M -40 930 C 180 870 400 860 650 915',
    width: 0.75,
    opacity: 0.45,
    delay: 0.7,
    float: { y: 3, x: 4, dur: 18 },
  },
];

/** Large thin orbital arcs framing the right side */
const ARCS: { d: string; width: number; opacity: number; delay: number; sway: number; dur: number }[] = [
  { d: 'M 1101 121 A 392 392 0 0 1 1321 725', width: 0.85, opacity: 0.7, delay: 0.4, sway: 1.8, dur: 38 },
  { d: 'M 1321 41 A 560 560 0 0 1 1541 645', width: 0.65, opacity: 0.4, delay: 0.6, sway: -1.5, dur: 44 },
];

/** Tiny floating gold dust dots: [x, y, radius, drift duration in seconds] */
const DOTS: [number, number, number, number][] = [
  [917, 412, 2.0, 9],
  [798, 608, 2.8, 11],
  [1193, 563, 2.2, 8],
  [1030, 230, 1.5, 10],
  [1210, 780, 1.5, 12],
  [640, 640, 1.5, 9],
  [1400, 200, 1.8, 10],
  [950, 820, 1.6, 11],
  [1250, 130, 1.4, 8],
];

/** Glowing light flare component */
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
    <circle cx={x} cy={y} r={halo} fill="url(#vvHalo)" opacity="0.85">
      {!reduceMotion && (
        <animate attributeName="opacity" values="0.6;1;0.6" dur={`${dur}s`} repeatCount="indefinite" />
      )}
    </circle>
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx={streak} ry="5.5" fill={color} opacity="0.2" filter="url(#vvStreakSoft)" />
      <ellipse cx={x} cy={y} rx={streak * 0.7} ry="1.2" fill={GOLD_HIGHLIGHT} opacity="0.85" filter="url(#vvStreak)" />
    </g>
    <circle cx={x} cy={y} r="3.2" fill={GOLD_HIGHLIGHT} />
  </g>
);

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
        <linearGradient id="vvLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0" stopColor={GOLD_DEEP} stopOpacity="0.5" />
          <stop offset="0.35" stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="0.7" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.98" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.75" />
        </linearGradient>

        <radialGradient id="vvHalo">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.6" />
          <stop offset="0.3" stopColor={GOLD} stopOpacity="0.25" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>

        <filter id="vvLineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="vvStreak" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="1.0" />
        </filter>
        <filter id="vvStreakSoft" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <filter id="vvDotGlow" x="-400%" y="-400%" width="900%" height="900%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Orbital Arcs */}
      {ARCS.map((a, i) => (
        <g key={`arc-${i}`}>
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 1000 500; ${a.sway} 1000 500; 0 1000 500`}
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

      {/* Flowing Silk Curves */}
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
            strokeWidth={c.width * 2.8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#vvLineGlow)"
            opacity="0.25"
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

          {!reduceMotion && c.shimmer && (
            <motion.path
              d={c.d}
              stroke={GOLD_HIGHLIGHT}
              strokeWidth={c.width * 1.4}
              strokeLinecap="round"
              strokeDasharray="160 4000"
              opacity="0.8"
              initial={{ strokeDashoffset: 160 }}
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

      {/* Exact Flare Points */}
      <Flare x={1294} y={607} halo={85} streak={130} angle={-4} color={GOLD_HIGHLIGHT} reduceMotion={reduceMotion} dur={7} />
      <Flare x={808} y={720} halo={95} streak={160} angle={-12} color={GOLD} reduceMotion={reduceMotion} dur={9} />

      {/* Small Glowing Nodes */}
      {[
        [1369, 367, 3.5],
        [1391, 572, 3.0],
      ].map(([x, y, r], i) => (
        <g key={`node-${i}`}>
          <circle cx={x} cy={y} r={r * 3} fill={GOLD} opacity="0.5" filter="url(#vvDotGlow)">
            {!reduceMotion && (
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${6 + i * 1.5}s`} repeatCount="indefinite" />
            )}
          </circle>
          <circle cx={x} cy={y} r={r} fill={GOLD} />
        </g>
      ))}

      {/* Scattered Gold Dust Dots */}
      {DOTS.map(([x, y, r, dur], i) => (
        <circle key={`dot-${i}`} cx={x} cy={y} r={r} fill={GOLD} opacity="0.55">
          {!reduceMotion && (
            <>
              <animate attributeName="cy" values={`${y};${y - 6};${y}`} dur={`${dur}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${dur}s`} repeatCount="indefinite" />
            </>
          )}
        </circle>
      ))}

      {/* Eagle inside Thin Gold Ring */}
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
        <circle cx="1081" cy="478" r="92" fill="url(#vvHalo)" opacity="0.3" />
        <circle cx="1081" cy="478" r="64" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
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
    <section className="relative min-h-[90vh] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Background Cinematic Lighting */}
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,200,61,0.07)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,200,61,0.035)_0%,transparent_70%)] blur-3xl" />

      {/* Orbital Golden Lights Background Overlay */}
      <OrbitalLights reduceMotion={reduceMotion} />

      <div className="relative max-w-7xl mx-auto w-full my-auto z-10">
        <div className="flex flex-col items-start max-w-3xl">
          {/* Micro Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          {/* Main Headline */}
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

          {/* Resource Stat Footer */}
          <div className="mt-10 sm:mt-12 flex items-center gap-3.5 pt-6 border-t border-white/[0.07] w-full max-w-md">
            <span className="w-8 h-8 shrink-0 rounded-full border border-[#D8A856]/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-[#FAF8F5] tracking-wide">
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
