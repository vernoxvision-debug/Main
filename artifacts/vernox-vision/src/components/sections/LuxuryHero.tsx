
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

const GOLD = '#D8A856';
const GOLD_BRIGHT = '#F6D695';
const GOLD_WHITE = '#FFF0C2';
const HERO_LOGO_SRC = '/logo-dark.png';

const CURVES = [
  {
    d: 'M -100 900 C 140 790 400 680 680 650 C 900 625 1080 620 1280 565 C 1410 530 1510 520 1700 520',
    width: 1.05,
    opacity: 0.76,
    delay: 0.2,
    duration: 18,
  },
  {
    d: 'M 100 960 C 360 850 590 760 800 675 C 1000 600 1170 555 1330 535 C 1470 510 1580 450 1720 390',
    width: 0.9,
    opacity: 0.68,
    delay: 0.4,
    duration: 21,
  },
  {
    d: 'M 520 960 C 760 850 970 730 1120 650 C 1250 580 1380 540 1510 520 C 1590 505 1650 485 1720 455',
    width: 0.8,
    opacity: 0.56,
    delay: 0.6,
    duration: 19,
  },
  {
    d: 'M 690 900 C 900 790 1070 680 1220 625 C 1390 560 1540 570 1710 620',
    width: 0.65,
    opacity: 0.34,
    delay: 0.8,
    duration: 24,
  },
];

const ORBIT_ARCS = [
  {
    d: 'M 990 0 C 1160 65 1310 180 1380 315 C 1435 425 1455 520 1440 625',
    opacity: 0.34,
  },
  {
    d: 'M 1250 -50 C 1410 45 1490 180 1530 315 C 1560 415 1590 500 1660 590',
    opacity: 0.23,
  },
];

const PARTICLES = [
  [1080, 110, 1.8, 8],
  [1310, 220, 1.5, 11],
  [970, 350, 2.1, 9],
  [1325, 550, 3.2, 10],
  [880, 610, 3.6, 12],
  [740, 710, 1.8, 9],
  [1450, 710, 1.5, 11],
  [1260, 790, 1.8, 10],
  [1510, 120, 2, 8],
  [1190, 470, 2.6, 12],
] as const;

const Flare: React.FC<{
  x: number;
  y: number;
  radius: number;
  reduceMotion: boolean;
  delay: number;
}> = ({ x, y, radius, reduceMotion, delay }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={radius}
      fill="url(#vvFlare)"
      opacity="0.42"
    >
      {!reduceMotion && (
        <animate
          attributeName="opacity"
          values="0.32;0.55;0.32"
          dur="7s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>

    {/* Crisp light point — no horizontal underline */}
    <circle cx={x} cy={y} r="3" fill={GOLD_WHITE} />
    <circle cx={x} cy={y} r="1.2" fill="#FFFFFF" />
  </g>
);

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({
  reduceMotion,
}) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="vvGoldLine"
        x1="0"
        y1="0"
        x2="1600"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#A66A20" stopOpacity="0.28" />
        <stop offset="0.3" stopColor={GOLD} stopOpacity="0.76" />
        <stop offset="0.62" stopColor={GOLD_BRIGHT} stopOpacity="0.94" />
        <stop offset="0.84" stopColor={GOLD} stopOpacity="0.76" />
        <stop offset="1" stopColor="#A66A20" stopOpacity="0.4" />
      </linearGradient>

      <radialGradient id="vvFlare">
        <stop offset="0" stopColor={GOLD_WHITE} stopOpacity="0.5" />
        <stop offset="0.18" stopColor={GOLD_BRIGHT} stopOpacity="0.24" />
        <stop offset="0.48" stopColor={GOLD} stopOpacity="0.08" />
        <stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>

      <radialGradient id="vvEagleHalo">
        <stop offset="0" stopColor={GOLD} stopOpacity="0.09" />
        <stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Large orbital arcs behind the eagle */}
    {ORBIT_ARCS.map((arc, index) => (
      <motion.path
        key={`orbit-${index}`}
        d={arc.d}
        stroke={GOLD}
        strokeWidth="0.65"
        strokeOpacity={arc.opacity}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: arc.opacity,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                pathLength: {
                  duration: 3.5,
                  delay: index * 0.35,
                  ease: 'easeOut',
                },
                opacity: { duration: 2 },
              }
        }
      />
    ))}

    {/* Main metallic-gold curves */}
    {CURVES.map((curve, index) => (
      <motion.g
        key={`curve-${index}`}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 2, 0],
                y: [0, -1.5, 0],
              }
        }
        transition={{
          duration: curve.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.7,
        }}
      >
        <motion.path
          d={curve.d}
          stroke="url(#vvGoldLine)"
          strokeWidth={curve.width * 1.15}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: curve.opacity,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  pathLength: {
                    duration: 3.2,
                    delay: curve.delay,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: { duration: 2 },
                }
          }
        />
      </motion.g>
    ))}

    {/* Bright intersections without horizontal flare strokes */}
    <Flare
      x={1438}
      y={545}
      radius={66}
      reduceMotion={reduceMotion}
      delay={0}
    />

    <Flare
      x={890}
      y={650}
      radius={74}
      reduceMotion={reduceMotion}
      delay={2}
    />

    {/* Small golden nodes */}
    <circle cx="1438" cy="270" r="4.1" fill={GOLD_BRIGHT} />
    <circle cx="1450" cy="490" r="3.4" fill={GOLD} />
    <circle cx="1380" cy="545" r="2.4" fill={GOLD_BRIGHT} />

    {/* Floating particles */}
    {PARTICLES.map(([x, y, radius, duration], index) => (
      <circle
        key={`particle-${index}`}
        cx={x}
        cy={y}
        r={radius}
        fill={GOLD}
        opacity="0.62"
      >
        {!reduceMotion && (
          <>
            <animate
              attributeName="cy"
              values={`${y};${y - 6};${y}`}
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.35;0.75;0.35"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </>
        )}
      </circle>
    ))}

    {/* Eagle logo and circular frame */}
    <motion.g
      className="hidden md:block"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -5, 0],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              opacity: { duration: 1.5, delay: 0.5 },
              y: {
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
      }
    >
      <circle
        cx="1195"
        cy="435"
        r="105"
        fill="url(#vvEagleHalo)"
      />

      <circle
        cx="1195"
        cy="435"
        r="68"
        stroke={GOLD}
        strokeOpacity="0.58"
        strokeWidth="0.9"
        vectorEffect="non-scaling-stroke"
      />

      <image
        href={HERO_LOGO_SRC}
        x="1158"
        y="403"
        width="74"
        height="64"
        preserveAspectRatio="xMidYMid meet"
        opacity="0.98"
      />
    </motion.g>
  </svg>
};

export const LuxuryHero: React.FC = () => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative min-h-[calc(100svh-135px)] pt-20 sm:pt-24 pb-12 px-5 sm:px-8 lg:px-10 flex flex-col justify-center overflow-hidden bg-[#070709]">
      {/* Ambient lighting */}
      <div className="absolute top-0 right-0 w-[680px] h-[680px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(216,168,86,0.055)_0%,transparent_70%)]" />

      <div className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(216,168,86,0.035)_0%,transparent_70%)]" />

      <OrbitalLights reduceMotion={reduceMotion} />

      <div className="relative max-w-[1410px] mx-auto w-full z-10">
        <div className="flex flex-col items-start max-w-[720px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856]" />

            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#D8A856] font-medium">
              DIGITAL PRODUCTS FOR CREATORS
            </span>
          </div>

          {/* Heading */}
          <h1
            data-testid="hero-headline"
            className="font-serif text-5xl sm:text-6xl lg:text-[5.6rem] xl:text-[6rem] text-[#FAF8F5] leading-[1.08] tracking-tight"
          >
            <span>Create Without</span>
            <br />
            <span className="text-gold-gradient italic">Limits.</span>
          </h1>

          {/* Description */}
          <p className="mt-6 sm:mt-8 max-w-xl font-body text-sm sm:text-base text-[#C0BDB7] leading-relaxed font-light">
            15,000+ creator assets. Endless possibilities. Everything you need
            to make your next move.
          </p>

          {/* Buttons */}
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

          {/* Creator trust row */}
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

export default LuxuryHero;
