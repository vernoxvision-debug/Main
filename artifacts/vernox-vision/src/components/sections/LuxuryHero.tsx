import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/** Eagle shown inside the thin ring. Same file the header uses. */
const HERO_LOGO_SRC = '/logo-dark.png';

/**
 * Champagne gold palette. To go back to a more saturated gold, change these
 * three values (for example GOLD = '#FFC83D').
 */
const GOLD = '#E2BC72';
const GOLD_DEEP = '#9A6F25';
const GOLD_HIGHLIGHT = '#FFF4D6';

/**
 * Everything on the right is drawn in one 1440 x 900 space anchored to the
 * right edge, so circles stay circles. Four long, smooth S-curves cross each
 * other. Real crossings used for the light flares:
 *   F1 (1241, 510)  curves 1 and 3  (bright)
 *   F2 (1019, 581)  curves 1 and 2  (soft)
 */
const CURVES: {
  d: string;
  width: number;
  opacity: number;
  delay: number;
  float: { y: number; x: number; dur: number };
}[] = [
  {
    d: 'M -80 850 C 220 690 520 860 800 700 S 1200 470 1520 520',
    width: 1.2,
    opacity: 1,
    delay: 0.1,
    float: { y: 4, x: 3, dur: 13 },
  },
  {
    d: 'M -80 600 C 260 760 560 560 860 560 S 1220 760 1520 640',
    width: 1,
    opacity: 0.9,
    delay: 0.3,
    float: { y: 5, x: -3, dur: 15 },
  },
  {
    d: 'M 360 930 C 640 840 900 760 1100 620 S 1380 360 1520 300',
    width: 1,
    opacity: 0.85,
    delay: 0.5,
    float: { y: 4, x: 3, dur: 14 },
  },
  {
    d: 'M 900 940 C 1060 820 1160 700 1300 640 S 1440 600 1520 580',
    width: 0.8,
    opacity: 0.7,
    delay: 0.7,
    float: { y: 3, x: 3, dur: 16 },
  },
];

/** Large thin orbital arcs. Both share the same centre (760, 470). */
const ARCS: { d: string; width: number; opacity: number; delay: number; sway: number; dur: number }[] = [
  { d: 'M 1289 26 A 690 690 0 0 1 1440 590', width: 0.8, opacity: 0.6, delay: 0.4, sway: 0.8, dur: 38 },
  { d: 'M 1058 44 A 520 520 0 0 1 1231 689', width: 0.7, opacity: 0.35, delay: 0.6, sway: -0.7, dur: 44 },
];

/** Tiny bright points that sit on the lines: [x, y] */
const NODES: [number, number][] = [
  [1294, 464],
  [1302, 676],
  [1415, 599],
  [800, 700],
];

/** Scattered gold dust: [x, y, radius, drift duration in seconds] */
const DOTS: [number, number, number, number][] = [
  [920, 330, 1.8, 9],
  [1190, 250, 1.4, 10],
  [1370, 180, 1.6, 11],
  [1400, 420, 1.5, 9],
  [1150, 740, 1.4, 12],
  [1330, 780, 1.5, 10],
  [700, 620, 1.4, 11],
  [960, 120, 1.4, 8],
];

/**
 * A soft point of light: gentle bloom, a short tapered glint and a small
 * white core. The bloom uses screen blending so it adds light instead of
 * leaving a muddy disc.
 */
const Flare: React.FC<{
  x: number;
  y: number;
  halo: number;
  streak: number;
  angle: number;
  reduceMotion: boolean;
  dur: number;
}> = ({ x, y, halo, streak, angle, reduceMotion, dur }) => (
  <g>
    <circle cx={x} cy={y} r={halo} fill="url(#vvHalo)" style={{ mixBlendMode: 'screen' }}>
      {!reduceMotion && (
        <animate attributeName="opacity" values="0.65;1;0.65" dur={`${dur}s`} repeatCount="indefinite" />
      )}
    </circle>
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx={streak} ry="1" fill="url(#vvStreak)" />
      <ellipse cx={x} cy={y} rx="1" ry={streak * 0.35} fill="url(#vvStreakV)" opacity="0.5" />
    </g>
    <circle cx={x} cy={y} r="7" fill={GOLD_HIGHLIGHT} opacity="0.35" filter="url(#vvCoreGlow)" />
    <circle cx={x} cy={y} r="2.4" fill={GOLD_HIGHLIGHT} />
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
        {/* Lines stay softly visible everywhere, and a bright band of light slowly sweeps along them */}
        <linearGradient id="vvLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0" stopColor={GOLD} stopOpacity="0.55" />
          <stop offset="0.3" stopColor={GOLD} stopOpacity="0.6" />
          <stop offset="0.5" stopColor={GOLD_HIGHLIGHT} stopOpacity="1" />
          <stop offset="0.7" stopColor={GOLD} stopOpacity="0.6" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.55" />
          {!reduceMotion && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-900 0"
              to="900 0"
              dur="11s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>

        {/* Bloom around the bright points */}
        <radialGradient id="vvHalo">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.6" />
          <stop offset="0.18" stopColor={GOLD} stopOpacity="0.25" />
          <stop offset="0.5" stopColor={GOLD} stopOpacity="0.06" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>

        {/* Glints that fade out at both ends */}
        <linearGradient id="vvStreak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0" />
          <stop offset="0.5" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.95" />
          <stop offset="1" stopColor={GOLD_HIGHLIGHT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vvStreakV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0" />
          <stop offset="0.5" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.9" />
          <stop offset="1" stopColor={GOLD_HIGHLIGHT} stopOpacity="0" />
        </linearGradient>

        <filter id="vvLineGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="vvCoreGlow" x="-400%" y="-400%" width="900%" height="900%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="vvNodeGlow" x="-500%" y="-500%" width="1100%" height="1100%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Soft light behind the eagle */}
      <circle cx="1080" cy="390" r="120" fill="url(#vvHalo)" opacity="0.35" style={{ mixBlendMode: 'screen' }} />

      {/* Large thin orbital arcs */}
      {ARCS.map((a, i) => (
        <g key={`arc-${i}`}>
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 760 470; ${a.sway} 760 470; 0 760 470`}
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

      {/* Long smooth curves */}
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
            strokeWidth={c.width * 3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#vvLineGlow)"
            opacity="0.18"
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
        </motion.g>
      ))}

      {/* Light flares at two real crossings */}
      <Flare x={1241} y={510} halo={78} streak={78} angle={-6} reduceMotion={reduceMotion} dur={7} />
      <Flare x={1019} y={581} halo={58} streak={60} angle={-14} reduceMotion={reduceMotion} dur={9} />

      {/* Tiny bright points on the lines */}
      {NODES.map(([x, y], i) => (
        <g key={`node-${i}`}>
          <circle cx={x} cy={y} r="9" fill={GOLD} opacity="0.4" filter="url(#vvNodeGlow)">
            {!reduceMotion && (
              <animate attributeName="opacity" values="0.2;0.5;0.2" dur={`${6 + i * 1.3}s`} repeatCount="indefinite" />
            )}
          </circle>
          <circle cx={x} cy={y} r="1.8" fill={GOLD_HIGHLIGHT} />
        </g>
      ))}

      {/* Gold dust */}
      {DOTS.map(([x, y, r, dur], i) => (
        <circle key={`dot-${i}`} cx={x} cy={y} r={r} fill={GOLD} opacity="0.5">
          {!reduceMotion && (
            <>
              <animate attributeName="cy" values={`${y};${y - 6};${y}`} dur={`${dur}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0.6;0.25" dur={`${dur}s`} repeatCount="indefinite" />
            </>
          )}
        </circle>
      ))}

      {/* Eagle inside a thin ring. The dark fill keeps lines from crossing it. */}
      <motion.g
        className="hidden md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 1.4, delay: 0.6 },
                y: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }
        }
      >
        <circle cx="1080" cy="390" r="64" fill="#070709" />
        <circle cx="1080" cy="390" r="64" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
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
};

export const LuxuryHero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Open cinematic backdrop: restrained golden ambient lighting */}
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(226,188,114,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(226,188,114,0.03)_0%,transparent_70%)] blur-3xl" />

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
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-[#FAF8F5] leading-[1.06] tracking-tight"
          >
            <span>Create Without</span> <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 sm:mt-8 max-w-xl font-body text-base sm:text-lg text-[#D6D3CC] leading-relaxed font-light">
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

          {/* True facts line */}
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
