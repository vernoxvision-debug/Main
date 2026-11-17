
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/** Eagle shown inside the thin ring. Same file the header uses. */
const HERO_LOGO_SRC = '/logo-dark.png';

/** Warm amber-gold palette. */
const AMBER = '#D99A3F';
const GOLD = '#EBC17A';
const HOT = '#FFF4DC';
const DEEP = '#8A5A1E';

type Pt = [number, number];

type Strand = {
  s: Pt;
  e: Pt;
  a: number;
  k1: number;
  k2: number;
  w: number;
  o: number;
  soft?: boolean;
  delay: number;
  float: { y: number; x: number; dur: number };
};

/** Two small bundles of fine lines. */
const BUNDLES: { id: 'A' | 'B'; F: Pt; grad: string; strands: Strand[] }[] = [
  {
    id: 'A',
    F: [1294, 525],
    grad: 'url(#vvBundleA)',
    strands: [
      { s: [-80, 760], e: [1520, 470], a: 12, k1: 260, k2: 200, w: 1, o: 0.95, delay: 0.1, float: { y: 3, x: 2, dur: 13 } },
      { s: [-80, 700], e: [1520, 560], a: 7, k1: 240, k2: 220, w: 0.8, o: 0.65, delay: 0.25, float: { y: 3, x: -2, dur: 15 } },
      { s: [-80, 740], e: [1520, 500], a: 10, k1: 250, k2: 200, w: 2.4, o: 0.18, soft: true, delay: 0.3, float: { y: 3, x: 2, dur: 17 } },
    ],
  },
  {
    id: 'B',
    F: [808, 638],
    grad: 'url(#vvBundleB)',
    strands: [
      { s: [-80, 820], e: [1520, 540], a: 8, k1: 240, k2: 220, w: 0.9, o: 0.8, delay: 0.2, float: { y: 3, x: 2, dur: 14 } },
      { s: [-80, 790], e: [1520, 580], a: 3, k1: 240, k2: 230, w: 2.2, o: 0.16, soft: true, delay: 0.5, float: { y: 3, x: -2, dur: 18 } },
    ],
  },
];

/** Geometry helpers. */
const strandGeom = (F: Pt, st: Strand) => {
  const rad = (st.a * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = -Math.sin(rad);
  const [sx, sy] = st.s;
  const [ex, ey] = st.e;
  const [fx, fy] = F;

  const c1: Pt = [sx + (fx - sx) * 0.4, sy + (fy - sy) * 0.05];
  const c2: Pt = [fx - dx * st.k1, fy - dy * st.k1];
  const c3: Pt = [fx + dx * st.k2, fy + dy * st.k2];
  const c4: Pt = [ex - (ex - fx) * 0.4, ey + (fy - ey) * 0.1];

  return { s: st.s, c1, c2, f: F, c3, c4, e: st.e };
};

const strandPath = (F: Pt, st: Strand): string => {
  const g = strandGeom(F, st);
  return (
    `M ${g.s[0]} ${g.s[1]} C ${g.c1[0]} ${g.c1[1]} ${g.c2[0]} ${g.c2[1]} ${g.f[0]} ${g.f[1]} ` +
    `C ${g.c3[0]} ${g.c3[1]} ${g.c4[0]} ${g.c4[1]} ${g.e[0]} ${g.e[1]}`
  );
};

/** Point on the second curve after the bright point. */
const pointAfterFocus = (F: Pt, st: Strand, t: number): Pt => {
  const g = strandGeom(F, st);
  const u = 1 - t;

  return [
    u * u * u * g.f[0] + 3 * u * u * t * g.c3[0] + 3 * u * t * t * g.c4[0] + t * t * t * g.e[0],
    u * u * u * g.f[1] + 3 * u * u * t * g.c3[1] + 3 * u * t * t * g.c4[1] + t * t * t * g.e[1],
  ];
};

const NODE_REFS: [number, number, number][] = [
  [0, 0, 0.55],
  [0, 1, 0.8],
  [1, 0, 0.4],
];

/** REMOVED: large orbital arcs on the right. */
const ARCS: { d: string; width: number; opacity: number; delay: number; sway: number; dur: number }[] = [];

/** REMOVED: blurry brown background orbs. */
const ORBS: [number, number, number, number][] = [];

const SPARKLES: [number, number, number, number][] = [
  [1369, 285, 2.2, 7],
  [1250, 140, 1.3, 8],
  [960, 120, 1.2, 10],
  [1400, 420, 1.4, 9],
  [720, 560, 1.2, 8],
];

const peakStops = (p: number): number[] => [
  0,
  p * 0.55,
  p - 0.07,
  p,
  Math.min(p + 0.06, 0.99),
  1,
];

/** Soft point of light. */
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
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>

    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse cx={x} cy={y} rx={streak} ry="0.9" fill="url(#vvStreak)" />
      <ellipse
        cx={x}
        cy={y}
        rx="0.9"
        ry={streak * 0.3}
        fill="url(#vvStreakV)"
        opacity="0.4"
      />
    </g>

    <circle cx={x} cy={y} r="6" fill={HOT} opacity="0.3" filter="url(#vvCoreGlow)" />
    <circle cx={x} cy={y} r="2" fill={HOT} />
  </g>
);

const BOTTOM_FADE =
  'linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)';

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-75 sm:opacity-100"
      style={{ WebkitMaskImage: BOTTOM_FADE, maskImage: BOTTOM_FADE }}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {(
          [
            { id: 'vvBundleA', p: 1294 / 1440 },
            { id: 'vvBundleB', p: 808 / 1440 },
          ] as const
        ).map(({ id, p }) => {
          const o = peakStops(p);

          return (
            <linearGradient
              key={id}
              id={id}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
            >
              <stop offset={o[0]} stopColor={DEEP} stopOpacity="0.12" />
              <stop offset={o[1]} stopColor={AMBER} stopOpacity="0.5" />
              <stop offset={o[2]} stopColor={GOLD} stopOpacity="0.75" />
              <stop offset={o[3]} stopColor={HOT} stopOpacity="1">
                {!reduceMotion && (
                  <animate
                    attributeName="stop-opacity"
                    values="1;0.72;1"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                )}
              </stop>
              <stop offset={o[4]} stopColor={GOLD} stopOpacity="0.6" />
              <stop offset={o[5]} stopColor={AMBER} stopOpacity="0.18" />
            </linearGradient>
          );
        })}

        <linearGradient
          id="vvArc"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
        >
          <stop offset="0" stopColor={AMBER} stopOpacity="0.5" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.9" />
        </linearGradient>

        <radialGradient id="vvHalo">
          <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.55" />
          <stop offset="0.2" stopColor={AMBER} stopOpacity="0.22" />
          <stop offset="0.55" stopColor={AMBER} stopOpacity="0.05" />
          <stop offset="1" stopColor={AMBER} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="vvStreak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={HOT} stopOpacity="0" />
          <stop offset="0.5" stopColor={HOT} stopOpacity="0.9" />
          <stop offset="1" stopColor={HOT} stopOpacity="0" />
        </linearGradient>

        <linearGradient id="vvStreakV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HOT} stopOpacity="0" />
          <stop offset="0.5" stopColor={HOT} stopOpacity="0.9" />
          <stop offset="1" stopColor={HOT} stopOpacity="0" />
        </linearGradient>

        <filter id="vvSoftLine" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>

        <filter id="vvOrb" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>

        <filter id="vvCoreGlow" x="-400%" y="-400%" width="900%" height="900%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        <filter id="vvNodeGlow" x="-500%" y="-500%" width="1100%" height="1100%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Soft light behind the eagle */}
      <circle
        cx="1080"
        cy="390"
        r="120"
        fill="url(#vvHalo)"
        opacity="0.3"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Out-of-focus orbs: array is empty, so nothing is drawn. */}
      {ORBS.map(([x, y, r, b], i) => (
        <circle
          key={`orb-${i}`}
          cx={x}
          cy={y}
          r={r}
          fill={AMBER}
          opacity={b}
          filter="url(#vvOrb)"
        />
      ))}

      {/* Large orbital arcs: array is empty, so nothing is drawn. */}
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
            stroke="url(#vvArc)"
            strokeWidth={a.width}
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: a.opacity }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 3.2, delay: a.delay, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </g>
      ))}

      {/* The two small bundles of fine lines */}
      {BUNDLES.map((b) =>
        b.strands.map((st, i) => (
          <motion.g
            key={`${b.id}-${i}`}
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -st.float.y, 0], x: [0, st.float.x, 0] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: st.float.dur,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }
            }
          >
            <motion.path
              d={strandPath(b.F, st)}
              stroke={b.grad}
              strokeWidth={st.w}
              strokeLinecap="round"
              filter={st.soft ? 'url(#vvSoftLine)' : undefined}
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: st.o }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 3,
                      delay: st.delay,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            />
          </motion.g>
        ))
      )}

      {/* Light at the two convergence points */}
      <Flare
        x={1294}
        y={525}
        halo={70}
        streak={80}
        angle={-6}
        reduceMotion={reduceMotion}
        dur={7}
      />
      <Flare
        x={808}
        y={638}
        halo={55}
        streak={95}
        angle={-10}
        reduceMotion={reduceMotion}
        dur={9}
      />

      {/* Sharp little nodes that sit exactly on lines */}
      {NODE_REFS.map(([bi, si, t], i) => {
        const b = BUNDLES[bi];
        const [x, y] = pointAfterFocus(b.F, b.strands[si], t);

        return (
          <g key={`node-${i}`}>
            <circle
              cx={x}
              cy={y}
              r="8"
              fill={AMBER}
              opacity="0.4"
              filter="url(#vvNodeGlow)"
            >
              {!reduceMotion && (
                <animate
                  attributeName="opacity"
                  values="0.2;0.5;0.2"
                  dur={`${6 + i * 1.3}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <circle cx={x} cy={y} r="1.8" fill={HOT} />
          </g>
        );
      })}

      {/* Tiny sharp sparkles */}
      {SPARKLES.map(([x, y, r, dur], i) => (
        <circle
          key={`sp-${i}`}
          cx={x}
          cy={y}
          r={r}
          fill={GOLD}
          opacity="0.7"
        >
          {!reduceMotion && (
            <animate
              attributeName="opacity"
              values="0.25;0.85;0.25"
              dur={`${dur}s`}
              repeatCount="indefinite"
            />
          )}
        </circle>
      ))}

      {/* Eagle inside a thin ring */}
      <motion.g
        className="hidden md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: [0, -6, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 1.4, delay: 0.6 },
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
};

export const LuxuryHero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-[#070709]">
      {/* Open cinematic backdrop */}
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(217,154,63,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-[35%] right-0 w-[640px] h-[640px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_center_right,rgba(217,154,63,0.05)_0%,transparent_70%)] blur-3xl" />

      {/* Orbital golden light */}
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

          {/* Resources line */}
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
