
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

const HERO_LOGO_SRC = '/logo-dark.png';

const GOLD = '#FFC83D';
const GOLD_DEEP = '#A66A00';
const GOLD_HIGHLIGHT = '#FFF2B0';

const CURVES: {
  d: string;
  width: number;
  opacity: number;
  delay: number;
  float: { y: number; x: number; dur: number };
  shimmer?: { dur: number; delay: number; pause: number };
}[] = [
  {
    d: 'M -90 835 C 160 755 420 655 690 650 C 900 647 1050 605 1190 565 C 1230 550 1265 540 1294 541 C 1370 550 1450 535 1535 510',
    width: 1.05,
    opacity: 0.78,
    delay: 0.15,
    float: { y: 2.2, x: 1.2, dur: 21 },
    shimmer: { dur: 15, delay: 3, pause: 5 },
  },
  {
    d: 'M 260 900 C 470 820 640 745 790 675 C 820 663 840 657 855 657 C 940 640 1000 585 1080 535 C 1170 480 1260 450 1360 420 C 1430 398 1490 390 1535 388',
    width: 0.88,
    opacity: 0.62,
    delay: 0.35,
    float: { y: 1.8, x: -1.2, dur: 23 },
    shimmer: { dur: 17, delay: 7, pause: 5 },
  },
  {
    d: 'M 850 900 C 970 790 1090 650 1210 585 C 1250 560 1275 545 1294 541 C 1370 525 1450 490 1535 465',
    width: 0.72,
    opacity: 0.5,
    delay: 0.55,
    float: { y: 1.8, x: 1.2, dur: 22 },
  },
];

const ARCS = [
  {
    d: 'M 900 105 C 1050 135 1190 220 1280 340 C 1340 420 1370 510 1370 620',
    width: 0.7,
    opacity: 0.34,
    delay: 0.4,
    sway: 0.8,
    dur: 42,
  },
  {
    d: 'M 1160 -20 C 1300 75 1380 190 1420 320 C 1450 420 1480 510 1540 590',
    width: 0.55,
    opacity: 0.24,
    delay: 0.6,
    sway: -0.7,
    dur: 48,
  },
];

const DOTS: [number, number, number, number][] = [
  [917, 347, 2.2, 9],
  [798, 542, 3, 11],
  [1193, 498, 2.4, 8],
  [1030, 165, 1.6, 10],
  [1210, 715, 1.6, 12],
  [640, 575, 1.6, 9],
  [1400, 135, 2, 10],
  [950, 755, 1.8, 11],
  [1250, 65, 1.5, 8],
];

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
    <circle cx={x} cy={y} r={halo} fill="url(#vvHalo)" opacity="0.68">
      {!reduceMotion && (
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur={`${dur}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>

    <g transform={`rotate(${angle} ${x} ${y})`}>
      <ellipse
        cx={x}
        cy={y}
        rx={streak}
        ry="3.5"
        fill={color}
        opacity="0.11"
        filter="url(#vvStreakSoft)"
      />
      <ellipse
        cx={x}
        cy={y}
        rx={streak * 0.62}
        ry="0.9"
        fill={GOLD_HIGHLIGHT}
        opacity="0.62"
        filter="url(#vvStreak)"
      />
    </g>

    <circle cx={x} cy={y} r="2.8" fill={GOLD_HIGHLIGHT} />
  </g>
);

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({
  reduceMotion,
}) => {
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
        <linearGradient
          id="vvLine"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
        >
          <stop offset="0" stopColor={GOLD_DEEP} stopOpacity="0.34" />
          <stop offset="0.32" stopColor={GOLD} stopOpacity="0.68" />
          <stop offset="0.66" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.82" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.48" />
        </linearGradient>

        <radialGradient id="vvHalo">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.55" />
          <stop offset="0.3" stopColor={GOLD} stopOpacity="0.22" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>

        <filter id="vvLineGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2.1" />
        </filter>

        <filter id="vvStreak" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="0.85" />
        </filter>

        <filter
          id="vvStreakSoft"
          x="-20%"
          y="-300%"
          width="140%"
          height="700%"
        >
          <feGaussianBlur stdDeviation="3.5" />
        </filter>

        <filter id="vvDotGlow" x="-400%" y="-400%" width="900%" height="900%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Large subtle orbital arcs */}
      {ARCS.map((arc, i) => (
        <g key={`arc-${i}`}>
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={`0 1000 500; ${arc.sway} 1000 500; 0 1000 500`}
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              dur={`${arc.dur}s`}
              repeatCount="indefinite"
            />
          )}

          <motion.path
            d={arc.d}
            stroke="url(#vvLine)"
            strokeWidth={arc.width}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: arc.opacity }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 3.2,
                    delay: arc.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          />
        </g>
      ))}

      {/* Three flowing gold curves */}
      {CURVES.map((curve, i) => (
        <motion.g
          key={`curve-${i}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -curve.float.y, 0],
                  x: [0, curve.float.x, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: curve.float.dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.6,
                }
          }
        >
          <path
            d={curve.d}
            stroke="url(#vvLine)"
            strokeWidth={curve.width * 2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#vvLineGlow)"
            opacity="0.16"
          />

          <motion.path
            d={curve.d}
            stroke="url(#vvLine)"
            strokeWidth={curve.width}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: curve.opacity }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 2.8,
                    delay: curve.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          />

          {/* Moving highlight along the curves */}
          {!reduceMotion && curve.shimmer && (
            <motion.path
              d={curve.d}
              stroke={GOLD_HIGHLIGHT}
              strokeWidth={curve.width * 1.15}
              strokeLinecap="round"
              strokeDasharray="110 4200"
              opacity="0.62"
              initial={{ strokeDashoffset: 110 }}
              animate={{ strokeDashoffset: -3000 }}
              transition={{
                duration: curve.shimmer.dur,
                delay: curve.shimmer.delay,
                repeat: Infinity,
                repeatDelay: curve.shimmer.pause,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.g>
      ))}

      {/* Bright crossing light points */}
      <Flare
        x={1294}
        y={541}
        halo={68}
        streak={92}
        angle={-4}
        color={GOLD_HIGHLIGHT}
        reduceMotion={reduceMotion}
        dur={8}
      />

      <Flare
        x={808}
        y={657}
        halo={76}
        streak={118}
        angle={-12}
        color={GOLD}
        reduceMotion={reduceMotion}
        dur={10}
      />

      {/* Gold nodes on the orbital arcs */}
      {[
        [1369, 300, 3.6],
        [1376, 500, 3.2],
      ].map(([x, y, r], i) => (
        <g key={`node-${i}`}>
          <circle
            cx={x}
            cy={y}
            r={r * 3}
            fill={GOLD}
            opacity="0.5"
            filter="url(#vvDotGlow)"
          >
            {!reduceMotion && (
              <animate
                attributeName="opacity"
                values="0.3;0.65;0.3"
                dur={`${6 + i * 1.5}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>

          <circle cx={x} cy={y} r={r} fill={GOLD} />
        </g>
      ))}

      {/* Floating gold particles */}
      {DOTS.map(([x, y, r, dur], i) => (
        <circle
          key={`dot-${i}`}
          cx={x}
          cy={y}
          r={r}
          fill={GOLD}
          opacity="0.55"
        >
          {!reduceMotion && (
            <>
              <animate
                attributeName="cy"
                values={`${y};${y - 7};${y}`}
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur={`${dur}s`}
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      ))}

      {/* Eagle logo and thin gold ring */}
      <motion.g
        className="hidden md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: [0, -8, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                opacity: { duration: 1.4, delay: 0.6 },
                y: {
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                },
              }
        }
      >
        <circle
          cx="1081"
          cy="432"
          r="92"
          fill="url(#vvHalo)"
          opacity="0.3"
        />

        <circle
          cx="1081"
          cy="432"
          r="64"
          stroke={GOLD}
          strokeOpacity="0.4"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        <image
          href={HERO_LOGO_SRC}
          x="1048"
          y="404"
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
      {/* Subtle ambient golden lighting */}
      <div className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(255,200,61,0.07)_0%,transparent_70%)] blur-3xl" />

      <div className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,200,61,0.035)_0%,transparent_70%)] blur-3xl" />

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
            <span>Create Without</span>
            <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-xl font-body text-sm sm:text-base text-[#9A9893] leading-relaxed font-light">
            15,000+ creator assets. Endless possibilities. Everything you need
            to make your next move.
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
              <span className="w-9 h-9 rounded-full border border-[#17130B] bg-[#D8A856] text-[#17110A] flex items-center justify-center text-[10px] font-semibold">
                JD
              </span>

              <span className="w-9 h-9 rounded-full border border-[#17130B] bg-[#B9B9B9] text-[#171717] flex items-center justify-center text-[10px] font-semibold">
                MK
              </span>

              <span className="w-9 h-9 rounded-full border border-[#17130B] bg-[#8C7658] text-white flex items-center justify-center text-[10px] font-semibold">
                AL
              </span>
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
