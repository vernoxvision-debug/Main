import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

const GOLD = '#D8A856';
const GOLD_LIGHT = '#F6D695';
const GOLD_WHITE = '#FFF0C2';
const HERO_LOGO_SRC = '/logo-dark.png';

const CURVES = [
  {
    d: 'M -100 900 C 150 790 390 690 680 650 C 900 620 1080 620 1280 565 C 1430 525 1540 520 1710 520',
    width: 1.05,
    opacity: 0.78,
    duration: 20,
    delay: 0.15,
  },
  {
    d: 'M 80 960 C 350 850 590 760 800 675 C 1000 600 1170 555 1330 535 C 1480 510 1590 450 1720 390',
    width: 0.9,
    opacity: 0.72,
    duration: 23,
    delay: 0.35,
  },
  {
    d: 'M 500 960 C 750 850 960 735 1120 650 C 1270 575 1390 540 1510 520 C 1600 505 1660 485 1730 455',
    width: 0.8,
    opacity: 0.62,
    duration: 19,
    delay: 0.55,
  },
  {
    d: 'M 680 900 C 900 790 1070 680 1220 625 C 1390 560 1540 570 1710 620',
    width: 0.65,
    opacity: 0.38,
    duration: 25,
    delay: 0.75,
  },
];

const ORBITS = [
  'M 990 -20 C 1160 65 1310 180 1380 315 C 1435 425 1455 520 1440 625',
  'M 1250 -60 C 1410 45 1490 180 1530 315 C 1560 415 1590 500 1660 590',
];

const PARTICLES = [
  [1080, 110, 1.8],
  [1310, 220, 1.5],
  [970, 350, 2.1],
  [1325, 550, 3.0],
  [880, 610, 3.2],
  [740, 710, 1.8],
  [1450, 710, 1.5],
  [1260, 790, 1.8],
  [1510, 120, 2.0],
  [1190, 470, 2.4],
] as const;

const Flare: React.FC<{
  x: number;
  y: number;
  radius: number;
  reduceMotion: boolean;
  delay: number;
}> = ({ x, y, radius, reduceMotion, delay }) => (
  <g>
    <circle cx={x} cy={y} r={radius} fill="url(#vvFlare)" opacity="0.42">
      {!reduceMotion && (
        <animate
          attributeName="opacity"
          values="0.28;0.48;0.28"
          dur="7s"
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      )}
    </circle>
    {/* A precise point of light; intentionally no horizontal flare/underline. */}
    <circle cx={x} cy={y} r="3" fill={GOLD_WHITE} />
    <circle cx={x} cy={y} r="1.15" fill="#FFFFFF" />
  </g>
);

const OrbitalArtwork: React.FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="absolute inset-0 h-full w-full pointer-events-none"
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="vvGoldLine" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9C671F" stopOpacity="0.35" />
