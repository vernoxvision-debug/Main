import React from 'react';
import { motion } from 'framer-motion';

export interface InkCreatorProps {
  className?: string;
}

export const InkCreator: React.FC<InkCreatorProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      data-testid="ink-creator-illustration"
    >
      <svg
        viewBox="0 0 460 280"
        className="w-full h-auto max-w-[460px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Creator desk baseline */}
        <line
          x1="20"
          y1="250"
          x2="440"
          y2="250"
          stroke="var(--ink)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Stack of hard drives & film reels on left */}
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Hard drive 1 */}
          <rect x="50" y="215" width="90" height="35" rx="2" fill="var(--bg)" />
          <line x1="60" y1="225" x2="110" y2="225" strokeWidth="1.5" />
          <circle cx="125" cy="225" r="3" fill="#FF5A1F" stroke="none" />
          <line x1="60" y1="235" x2="80" y2="235" strokeWidth="1.5" />

          {/* Hard drive 2 tilted */}
          <rect
            x="48"
            y="178"
            width="88"
            height="34"
            rx="2"
            fill="var(--bg)"
            transform="rotate(-4 48 178)"
          />
          <circle cx="122" cy="190" r="3" fill="var(--ink)" />

          {/* Film reel stack on top */}
          <circle cx="92" cy="142" r="28" fill="var(--bg)" />
          <circle cx="92" cy="142" r="8" fill="var(--bg)" />
          <line x1="92" y1="114" x2="92" y2="134" />
          <line x1="92" y1="150" x2="92" y2="170" />
          <line x1="64" y1="142" x2="84" y2="142" />
          <line x1="100" y1="142" x2="120" y2="142" />
        </g>

        {/* Creator buried in center */}
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Creator hunch/body */}
          <path
            d="M 180 250 C 180 200, 200 170, 240 170 C 275 170, 290 200, 290 250"
            fill="var(--bg)"
          />

          {/* Creator tired head resting on desk */}
          <ellipse cx="235" cy="180" rx="22" ry="18" fill="var(--bg)" />
          {/* Disheveled hair hatching */}
          <path d="M 220 166 L 225 152 M 230 164 L 238 148 M 242 165 L 250 150 M 248 168 L 258 158" />
          {/* Tired closed eye squiggles */}
          <path d="M 224 182 Q 228 178 232 182" strokeWidth="2" />
          <path d="M 238 182 Q 242 178 246 182" strokeWidth="2" />

          {/* Arm holding stylus / keyboard clicker */}
          <path d="M 255 195 Q 280 210 300 240" />

          {/* Monitor glowing / blank screen */}
          <rect x="295" y="150" width="85" height="75" rx="3" fill="var(--bg)" />
          <line x1="337" y1="225" x2="337" y2="250" strokeWidth="3" />
          <line x1="315" y1="250" x2="360" y2="250" strokeWidth="3" />
          {/* Blank timeline cursor on screen */}
          <line x1="305" y1="200" x2="370" y2="200" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="335" y1="165" x2="335" y2="215" stroke="#FF5A1F" strokeWidth="2" />
        </g>

        {/* Big Hand-drawn Wooden Sign: "BLANK TIMELINE. DO NOT DISTURB." */}
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Sign post */}
          <line x1="210" y1="120" x2="210" y2="230" strokeWidth="3" />
          {/* Sign board */}
          <rect
            x="110"
            y="48"
            width="200"
            height="62"
            rx="2"
            fill="var(--bg)"
            transform="rotate(-2 110 48)"
          />
          {/* Wood grain hatching */}
          <line x1="118" y1="65" x2="300" y2="60" strokeWidth="1" opacity="0.4" />
          <line x1="118" y1="88" x2="295" y2="83" strokeWidth="1" opacity="0.4" />
          {/* Sign text */}
          <text
            x="208"
            y="72"
            textAnchor="middle"
            fill="var(--ink)"
            fontFamily="'Archivo', sans-serif"
            fontWeight="900"
            fontSize="12"
            letterSpacing="0.5"
            transform="rotate(-2 208 72)"
          >
            BLANK TIMELINE.
          </text>
          <text
            x="208"
            y="94"
            textAnchor="middle"
            fill="#FF5A1F"
            fontFamily="monospace"
            fontWeight="bold"
            fontSize="11"
            letterSpacing="1"
            transform="rotate(-2 208 94)"
          >
            DO NOT DISTURB.
          </text>
        </g>

        {/* Looping animated orange scribble steam rising from tired head */}
        <motion.path
          d="M 235 145 C 230 130, 245 120, 238 105 C 232 90, 248 80, 240 65"
          stroke="#FF5A1F"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              'M 235 145 C 230 130, 245 120, 238 105 C 232 90, 248 80, 240 65',
              'M 235 145 C 242 130, 230 120, 245 105 C 235 90, 242 80, 235 65',
              'M 235 145 C 230 130, 245 120, 238 105 C 232 90, 248 80, 240 65',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 248 140 C 255 128, 245 115, 256 102 C 248 88, 260 76, 252 60"
          stroke="#FF5A1F"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              'M 248 140 C 255 128, 245 115, 256 102 C 248 88, 260 76, 252 60',
              'M 248 140 C 240 128, 258 115, 246 102 C 256 88, 246 76, 256 60',
              'M 248 140 C 255 128, 245 115, 256 102 C 248 88, 260 76, 252 60',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Scattered sticky notes & coffee mug */}
        <g stroke="var(--ink)" strokeWidth="2">
          {/* Coffee mug */}
          <rect x="390" y="222" width="20" height="28" rx="2" fill="var(--bg)" />
          <path d="M 410 228 Q 418 236 410 244" fill="none" />
          {/* Sticky note */}
          <rect
            x="378"
            y="200"
            width="22"
            height="22"
            fill="var(--bg)"
            strokeWidth="1.5"
            transform="rotate(12 378 200)"
          />
          <line
            x1="382"
            y1="206"
            x2="394"
            y2="208"
            stroke="#FF5A1F"
            strokeWidth="1.5"
            transform="rotate(12 378 200)"
          />
        </g>
      </svg>
    </div>
  );
};
