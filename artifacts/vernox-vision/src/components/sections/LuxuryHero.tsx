import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/** Eagle shown inside the thin ring. Same file the header uses. */
const HERO_LOGO_SRC = '/logo-dark.png';

/** Warm amber-gold palette. Change these four values to retune the whole effect. */
const AMBER = '#D99A3F';
const GOLD = '#EBC17A';
const HOT = '#FFF4DC';
const DEEP = '#8A5A1E';

/**
 * Three restrained, hand-shaped orbital curves.
 * They cross naturally without filling the hero with excessive lines.
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

/**
 * Soft point of light: warm bloom (screen-blended so it adds light), a short
 * tapered glint and a tiny white-hot core.
 */
const Flare: React.FC<{
  x: number;
  y: number;
  halo: number;
  reduceMotion: boolean;
  dur: number;
}> = ({ x, y, halo, reduceMotion, dur }) => (
  <g>
    <circle cx={x} cy={y} r={halo} fill="url(#vvHalo)" style={{ mixBlendMode: 'screen' }}>
      {!reduceMotion && (
        <animate attributeName="opacity" values="0.65;1;0.65" dur={`${dur}s`} repeatCount="indefinite" />
      )}
    </circle>
    <circle cx={x} cy={y} r="5" fill={HOT} opacity="0.3" filter="url(#vvCoreGlow)" />
    <circle cx={x} cy={y} r="1.9" fill={HOT} />
  </g>
);

/** Fades the whole drawing out toward the bottom so nothing ends in a hard cut. */
const BOTTOM_FADE = 'linear-gradient(to bottom, #000 0%, #000 68%, transparent 100%)';

const OrbitalLights: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => (
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
      <linearGradient id="vvOrbitalGold" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={DEEP} stopOpacity="0.12" />
        <stop offset="0.3" stopColor={AMBER} stopOpacity="0.5" />
        <stop offset="0.62" stopColor={GOLD} stopOpacity="0.85" />
        <stop offset="0.82" stopColor={HOT} stopOpacity="0.9" />
        <stop offset="1" stopColor={AMBER} stopOpacity="0.18" />
      </linearGradient>
      <radialGradient id="vvHalo">
        <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.55" />
        <stop offset="0.2" stopColor={AMBER} stopOpacity="0.22" />
        <stop offset="0.55" stopColor={AMBER} stopOpacity="0.05" />
        <stop offset="1" stopColor={AMBER} stopOpacity="0" />
      </radialGradient>
