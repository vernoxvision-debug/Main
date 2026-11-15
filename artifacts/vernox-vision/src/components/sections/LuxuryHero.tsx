import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/site';

/**
 * Eagle shown inside the thin ring on the right.
 * Same file the header already uses. Change this one line to use another image.
 */
const HERO_LOGO_SRC = '/logo-dark.png';

/** Gold palette for the orbital light effect only. */
const GOLD = '#FFC83D';
const GOLD_DEEP = '#A66A00';
const GOLD_HIGHLIGHT = '#FFF2B0';

/** Three restrained metallic strokes inspired by the supplied reference. */
const CURVES: { d: string; width: number; opacity: number; delay: number }[] = [
  {
    // Long lower sweep, rising gently toward the right edge.
    d: 'M -90 930 C 180 830 455 700 735 704 C 965 708 1130 650 1290 610 C 1370 590 1450 565 1535 535',
    width: 0.95,
    opacity: 0.78,
    delay: 0.15,
  },
  {
    // Fine secondary curve crosses the lower sweep close to the right.
    d: 'M 180 960 C 420 875 640 790 835 724 C 1000 670 1135 630 1290 610 C 1380 595 1460 505 1535 455',
    width: 0.78,
    opacity: 0.62,
    delay: 0.35,
  },
  {
    // Quiet third stroke enters from the lower-right, creating a delicate crossing.
    d: 'M 790 960 C 930 835 1085 720 1210 660 C 1250 640 1275 620 1290 610 C 1370 575 1450 545 1535 520',
    width: 0.68,
    opacity: 0.48,
    delay: 0.55,
  },
];

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
        {/* A quiet metallic gradient: no broad glow or neon bloom. */}
        <linearGradient id="vvMetalLine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0" stopColor={GOLD_DEEP} stopOpacity="0.08" />
          <stop offset="0.18" stopColor={GOLD} stopOpacity="0.48" />
          <stop offset="0.52" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.82" />
          <stop offset="0.82" stopColor={GOLD} stopOpacity="0.55" />
          <stop offset="1" stopColor={GOLD_DEEP} stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="vvIntersection" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform="translate(1290 610) scale(13)">
          <stop offset="0" stopColor={GOLD_HIGHLIGHT} stopOpacity="0.45" />
          <stop offset="0.35" stopColor={GOLD} stopOpacity="0.14" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Three fine, asymmetrical metallic curves. */}
      {CURVES.map((curve, i) => (
        <motion.path
          key={`metal-curve-${i}`}
          d={curve.d}
          stroke="url(#vvMetalLine)"
          strokeWidth={curve.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: curve.opacity }}
          transition={reduceMotion ? { duration: 0 } : { duration: 2.4, delay: curve.delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Only two tiny, restrained glints at the principal crossing. */}
      <circle cx="1290" cy="610" r="13" fill="url(#vvIntersection)" />
      <circle cx="1290" cy="610" r="1.8" fill={GOLD_HIGHLIGHT} opacity="0.78" />
      <circle cx="855" cy="724" r="1.35" fill={GOLD} opacity="0.52" />

      {/* Eagle emblem remains in its original position and retains its thin ring. */}
      <motion.g
        className="hidden md:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -8, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
