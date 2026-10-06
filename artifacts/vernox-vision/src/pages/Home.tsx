import React from 'react';
import { Link } from 'wouter';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { VaultBadge } from '@/components/system/VaultBadge';
import { LineupRow } from '@/components/system/LineupRow';
import { UnitFaceplate } from '@/components/system/UnitFaceplate';
import { InkCreator } from '@/components/illustration/InkCreator';
import { HookTimer } from '@/components/sections/HookTimer';
import { CalendarPreview } from '@/components/sections/CalendarPreview';
import { SignalPath } from '@/components/sections/SignalPath';
import { TactileButton } from '@/components/ui/TactileButton';
import { Accordion } from '@/components/ui/accordion';
import { LcdNumeral } from '@/components/system/LcdNumeral';
import { UNITS, VIDEO_UNITS } from '@/data/units';
import { AUDIENCES } from '@/data/audiences';
import { FAQ_ITEMS } from '@/data/faq';
import { SITE_CONFIG } from '@/data/site';
import { Display, Body, Label, Code, Lcd, MaskLine } from '@/components/ui/typography';

export const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF5A1F] focus:text-black font-mono text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Teenage Engineering style Column Header */}
      <ColumnHeader />

      <main id="main-content">
        {/* ========================================================
            ROOM 1 — HEADER + HERO (LIGHT ROOM)
            ======================================================== */}
        <section
          className="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-16 sm:pb-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-hero"
        >
          <div className="max-w-7xl mx-auto">
            {/* Top Micro-label */}
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] mb-6 pb-2 border-b border-[var(--line)]">
              <span>SYSTEM SPEC: 15,000+ ASSETS // 4 BUNDLES + 3 GUIDES</span>
              <span className="hidden sm:inline">VAULT STATUS: ONLINE</span>
            </div>

            {/* Hero Main Grid: Giant Typography + Vault Badge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                {/* Enormous, Ultra-Heavy Extended Grotesk Headline */}
                <Display
                  as="h1"
                  size="xl"
                  className="tracking-[-0.055em] leading-[0.82] text-[var(--ink)]"
                  id="hero-headline"
                  data-testid="hero-headline"
                >
                  <span className="sr-only">15,000+ CLIPS. ZERO BLANK TIMELINES.</span>
                  <div aria-hidden="true">
                    <MaskLine delay={0.05}>
                      <span className="line block">
                        <span className="inline-block tracking-[-0.07em]">15,000</span>
                        <span className="inline-block tracking-[-0.04em]">+</span>{' '}
                        <span className="inline-block ml-1 sm:ml-2">CLIPS</span>
                        <span className="inline-block -ml-[0.08em]">.</span>
                      </span>
                    </MaskLine>
                    <MaskLine delay={0.15}>
                      <span className="line flex items-baseline flex-wrap gap-x-2 sm:gap-x-4 mt-1 sm:mt-2">
                        <span>ZERO</span>
                        <span>TIMELINES</span>
                        <span className="inline-block -ml-[0.08em]">.</span>
                      </span>
                    </MaskLine>
                  </div>
                </Display>

                {/* Plain-Language Blunt Editorial Subheadline */}
                <Body size="large" className="mt-6 sm:mt-8 max-w-2xl leading-snug">
                  You have the script. You don&apos;t have the footage.
                  <br />
                  A private Google Drive vault of 15,000+ curated video assets, viral hooks, and creator frameworks.
                  One payment. Instant lifetime access.
                </Body>

                {/* CTAs: Primary Buy Button + Secondary "See what's inside" */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <TactileButton
                    href={SITE_CONFIG.gumroadUrl}
                    variant="orange"
                    size="lg"
                    isExternal={true}
                    isBuy={true}
                  >
                    GET THE VAULT — $9.99 ↗
                  </TactileButton>

                  <a
                    href="#vault"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-5 py-3 border border-[var(--line-strong)] hover:bg-[var(--line)] transition-colors rounded-[2px]"
                    data-testid="btn-see-inside"
                  >
                    SEE WHAT&apos;S INSIDE ↓
                  </a>
                </div>

                {/* Micro Guarantee Note */}
                <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  <span>CHECKOUT BY GUMROAD · DELIVERED VIA GOOGLE DRIVE · COMMERCIAL RIGHTS</span>
                </div>
              </div>

              {/* The Signature VAULT UPDATE Badge */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <VaultBadge />
              </div>
            </div>

            {/* Hand-drawn ink illustration of creator buried in footage */}
            <div className="mt-12 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-8">
              <InkCreator />
              <div className="max-w-md font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
                <div className="text-[var(--accent)] font-bold uppercase tracking-wider mb-1">
                  THE REAL PROBLEM:
                </div>
                Creators waste 3 to 4 hours every single shoot digging through dry stock libraries.
                Vernox Vision replaces the blank timeline with a pre-indexed hardware library ready to drop into your timeline.
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            ROOM 2 — THE PROBLEM (LIGHT EDITORIAL)
            ======================================================== */}
        <section
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-problem"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] mb-8 pb-2 border-b border-[var(--line)]">
              <span>PROBLEM STATEMENT // 03 FRICTION POINTS</span>
              <span>RETENTION BOTTLENECK</span>
            </div>

            {/* Three Typographic Statements with Mono Labels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="border-t-2 border-[var(--ink)] pt-4">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">
                  [FRICTION 01]
                </span>
                <h3 className="type-display text-xl sm:text-2xl mt-2 text-[var(--ink)]">
                  THE BLANK TIMELINE.
                </h3>
                <p className="font-body text-sm text-[var(--ink-muted)] mt-3 leading-relaxed">
                  You sit down to edit. The timeline is an empty gray void. You spend 45 minutes searching for one car clip or one street cutaway. Friction wins, momentum dies.
                </p>
              </div>

              <div className="border-t-2 border-[var(--ink)] pt-4">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">
                  [FRICTION 02]
                </span>
                <h3 className="type-display text-xl sm:text-2xl mt-2 text-[var(--ink)]">
                  ALGORITHM DROP-OFF.
                </h3>
                <p className="font-body text-sm text-[var(--ink-muted)] mt-3 leading-relaxed">
                  TikTok, Reels, and Shorts algorithms penalize visual stagnation. If your video doesn&apos;t cut every 2 to 3 seconds, retention plummets below 40%.
                </p>
              </div>

              <div className="border-t-2 border-[var(--ink)] pt-4">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">
                  [FRICTION 03]
                </span>
                <h3 className="type-display text-xl sm:text-2xl mt-2 text-[var(--ink)]">
                  INCONSISTENCY SPIRAL.
                </h3>
                <p className="font-body text-sm text-[var(--ink-muted)] mt-3 leading-relaxed">
                  Running out of captions, daily pillar structures, and hook angles stops creators cold. Without a roadmap, posting frequency collapses.
                </p>
              </div>
            </div>

            {/* Interactive 3-Second Hook Retention Simulator */}
            <HookTimer />
          </div>
        </section>

        {/* ========================================================
            ROOM 3 — THE SYSTEM LINEUP (SIGNATURE COLLECTION VISUAL)
            ======================================================== */}
        <section
          id="vault"
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-lineup"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">
                  THE COMPLETE ARSENAL // 07 HARDWARE MODULES
                </span>
                <h2 className="type-display text-2xl sm:text-4xl text-[var(--ink)] mt-1">
                  THE VV VAULT SYSTEM.
                </h2>
              </div>
              <p className="font-mono text-xs text-[var(--ink-muted)] max-w-sm">
                Each bundle is treated as an engineered unit with model code, dedicated colorway, and pre-indexed folders.
              </p>
            </div>

            {/* Lineup row with floor reflections */}
            <LineupRow />
          </div>
        </section>

        {/* ========================================================
            ROOM 4 — UNIT STAGES (CINEMATIC TONAL STAGES)
            ======================================================== */}
        <section className="border-b border-[var(--line)]" data-testid="room-stages">
          {/* Stage 1: VV—01 VIRAL (Pure Black Void) */}
          <div className="bg-[#0A0A0A] text-[#F4F4F2] px-4 sm:px-8 py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[#FF5A1F] text-black font-bold rounded-[1px]">
                    STAGE 01
                  </span>
                  <span className="font-mono text-xs uppercase text-[#888]">
                    VV—01 // VIRAL SOCIAL CLIPS
                  </span>
                </div>

                <h3 className="type-display text-3xl sm:text-5xl lg:text-6xl text-white">
                  5,000+ HIGH-ENERGY CLIPS.
                </h3>

                <p className="font-body text-sm sm:text-base text-[#9E9E9B] leading-relaxed max-w-lg">
                  Rapid cutaways, motion hooks, dynamic trending visuals engineered specifically for 9:16 vertical pacing on TikTok, Instagram Reels, and YouTube Shorts.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <LcdNumeral value="5,000+" label="VIDEO ASSETS" variant="amber" size="lg" />
                  <LcdNumeral value="9:16" label="ORIENTATION" variant="mono" size="lg" />
                </div>

                <div className="pt-4">
                  <Link
                    href="/vault/viral"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#FF5A1F] hover:underline"
                  >
                    INSPECT UNIT SPECIFICATION [VV—01] →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <UnitFaceplate unit={VIDEO_UNITS[0]} showReflection={true} />
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 font-mono text-[9px] uppercase tracking-widest text-[#555]">
              STAGE ROOM: PURE BLACK VOID // CHASSIS: GRAPHITE
            </div>
          </div>

          {/* Stage 2: VV—02 SPEAKER (Studio Grey Plate) */}
          <div className="bg-[#D9D9D6] text-[#0B0B0B] px-4 sm:px-8 py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
                <UnitFaceplate unit={VIDEO_UNITS[1]} showReflection={true} />
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[#0B0B0B] text-white font-bold rounded-[1px]">
                    STAGE 02
                  </span>
                  <span className="font-mono text-xs uppercase text-[#555]">
                    VV—02 // SPEAKER & MOTIVATION
                  </span>
                </div>

                <h3 className="type-display text-3xl sm:text-5xl lg:text-6xl text-[#0B0B0B]">
                  3,100+ KEYNOTE & PODCAST FRAMES.
                </h3>

                <p className="font-body text-sm sm:text-base text-[#444] leading-relaxed max-w-lg">
                  Podcast snippets, keynote moments, cinematic wisdom, and mindset soundbites for quote channels and authority building.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <LcdNumeral value="3,100+" label="AUDIO-VISUAL CLIPS" variant="amber" size="lg" />
                  <LcdNumeral value="1080P" label="RESOLUTION" variant="mono" size="lg" />
                </div>

                <div className="pt-4">
                  <Link
                    href="/vault/speaker"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#0B0B0B] font-bold hover:underline"
                  >
                    INSPECT UNIT SPECIFICATION [VV—02] →
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 font-mono text-[9px] uppercase tracking-widest text-[#777]">
              STAGE ROOM: STUDIO GREY // CHASSIS: MATTE CREAM
            </div>
          </div>

          {/* Stage 3: VV—03 LUXURY (Warm Dark Graphite) */}
          <div className="bg-[#1C1D1F] text-[#F4F4F2] px-4 sm:px-8 py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[#FF5A1F] text-black font-bold rounded-[1px]">
                    STAGE 03
                  </span>
                  <span className="font-mono text-xs uppercase text-[#888]">
                    VV—03 // LUXURY & LIFESTYLE
                  </span>
                </div>

                <h3 className="type-display text-3xl sm:text-5xl lg:text-6xl text-white">
                  3,000+ HIGH-NET-WORTH VISUALS.
                </h3>

                <p className="font-body text-sm sm:text-base text-[#A8A8A4] leading-relaxed max-w-lg">
                  Hypercars, penthouses, private jets, luxury horology, and high-end travel aesthetics tailored for wealth, finance, and status theme pages.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <LcdNumeral value="3,000+" label="LIFESTYLE CLIPS" variant="amber" size="lg" />
                  <LcdNumeral value="9:16" label="VERTICAL SPEC" variant="mono" size="lg" />
                </div>

                <div className="pt-4">
                  <Link
                    href="/vault/luxury"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#FF5A1F] hover:underline"
                  >
                    INSPECT UNIT SPECIFICATION [VV—03] →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <UnitFaceplate unit={VIDEO_UNITS[2]} showReflection={true} />
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 font-mono text-[9px] uppercase tracking-widest text-[#666]">
              STAGE ROOM: WARM GRAPHITE // CHASSIS: DEEP OLIVE
            </div>
          </div>

          {/* Stage 4: VV—04 VLOG (Deep Slate Plate) */}
          <div className="bg-[#14181E] text-[#F4F4F2] px-4 sm:px-8 py-20 sm:py-28 relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
                <UnitFaceplate unit={VIDEO_UNITS[3]} showReflection={true} />
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[#FF5A1F] text-black font-bold rounded-[1px]">
                    STAGE 04
                  </span>
                  <span className="font-mono text-xs uppercase text-[#888]">
                    VV—04 // RICH VLOGS & OMEGLE
                  </span>
                </div>

                <h3 className="type-display text-3xl sm:text-5xl lg:text-6xl text-white">
                  2,500+ CANDID HUMAN B-ROLL.
                </h3>

                <p className="font-body text-sm sm:text-base text-[#9AA0A6] leading-relaxed max-w-lg">
                  Candid street reactions, genuine conversational footage, and real-world interactions for commentary, reaction, and narrative video formats.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <LcdNumeral value="2,500+" label="HUMAN B-ROLL" variant="amber" size="lg" />
                  <LcdNumeral value="RAW" label="CAPTURE FEEL" variant="mono" size="lg" />
                </div>

                <div className="pt-4">
                  <Link
                    href="/vault/vlog"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#FF5A1F] hover:underline"
                  >
                    INSPECT UNIT SPECIFICATION [VV—04] →
                  </Link>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 font-mono text-[9px] uppercase tracking-widest text-[#555]">
              STAGE ROOM: DEEP SLATE // CHASSIS: INDUSTRIAL BLUE
            </div>
          </div>
        </section>

        {/* ========================================================
            ROOM 5 — GUIDES (LIGHT SPEC SHEETS & CALENDAR)
            ======================================================== */}
        <section
          id="guides"
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-guides"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] mb-8 pb-2 border-b border-[var(--line)]">
              <span>STRATEGIC SYSTEM GUIDES // 03 MANUALS</span>
              <span>INCLUDED AT ZERO EXTRA COST</span>
            </div>

            <div className="mb-12">
              <h2 className="type-display text-3xl sm:text-5xl text-[var(--ink)]">
                BLUEPRINTS & PROTOCOLS.
              </h2>
              <p className="font-body text-sm sm:text-base text-[var(--ink-muted)] mt-2 max-w-2xl">
                Having footage is 50% of the battle. The other 50% is daily publishing discipline and retention copy scaffolds.
              </p>
            </div>

            {/* 3 Guide Manuals as Printed Spec Sheets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 rounded-[2px] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF5A1F]">VV—05</span>
                  <h3 className="type-display text-xl text-[var(--ink)] mt-1">
                    30-DAY CONTENT CALENDAR
                  </h3>
                  <p className="font-body text-xs text-[var(--ink-muted)] mt-3 leading-relaxed">
                    A concrete day-by-day posting plan. Balances curiosity hooks, authority quotes, lifestyle b-roll, and challenge formats.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">
                  FORMAT: PRINTABLE PDF · 30 DAYS
                </div>
              </div>

              <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 rounded-[2px] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF5A1F]">VV—06</span>
                  <h3 className="type-display text-xl text-[var(--ink)] mt-1">
                    CAPTION VAULT & GROWTH CODES
                  </h3>
                  <p className="font-body text-xs text-[var(--ink-muted)] mt-3 leading-relaxed">
                    Battle-tested hook formulas, retention caption scripts, and algorithmic cheat codes designed to maximize average watch time.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">
                  FORMAT: DIGITAL PDF · READY-TO-USE SCRIPTS
                </div>
              </div>

              <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 rounded-[2px] flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[#FF5A1F]">VV—00</span>
                  <h3 className="type-display text-xl text-[var(--ink)] mt-1">
                    ONBOARDING & QUICK-START GUIDE
                  </h3>
                  <p className="font-body text-xs text-[var(--ink-muted)] mt-3 leading-relaxed">
                    The mandatory START HERE manual. Explains folder organization, recommended editing workflows, Google Drive shortcuts, and rapid timeline assembly.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--line)] font-mono text-[10px] text-[var(--ink)]">
                  FORMAT: SETUP MANUAL · INSTANT SYNC
                </div>
              </div>
            </div>

            {/* Interactive Calendar Component */}
            <CalendarPreview />
          </div>
        </section>

        {/* ========================================================
            ROOM 6 — WHO IT'S FOR (DARK ROOM)
            ======================================================== */}
        <section
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[#0A0A0A] text-[#F4F4F2]"
          data-testid="room-audiences"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#777] mb-8 pb-2 border-b border-[#222]">
              <span>TARGET OPERATOR PROFILES // 04 SEGMENTS</span>
              <span>FIELD-TESTED COMPATIBILITY</span>
            </div>

            <div className="mb-12">
              <h2 className="type-display text-3xl sm:text-5xl text-white">
                DESIGNED FOR EDITORS WHO SHIP.
              </h2>
              <p className="font-body text-sm sm:text-base text-[#999] mt-2 max-w-xl">
                Not for hobbyists collecting hard drives. For creators and editors measured by retention, output, and speed.
              </p>
            </div>

            {/* Four Audiences as Large Typographic Rows */}
            <div className="divide-y divide-[#222]">
              {AUDIENCES.map((aud) => (
                <div
                  key={aud.index}
                  className="py-6 sm:py-8 group hover:bg-[#141414] transition-colors px-2 sm:px-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
                    <div className="lg:col-span-1 font-mono text-sm sm:text-base text-[#FF5A1F] font-bold">
                      [{aud.index}]
                    </div>

                    <div className="lg:col-span-5">
                      <h3 className="type-display text-xl sm:text-2xl text-white group-hover:text-[#FF5A1F] transition-colors">
                        {aud.title}
                      </h3>
                      <div className="font-mono text-xs uppercase text-[#777] mt-1">
                        {aud.subtitle}
                      </div>
                    </div>

                    <div className="lg:col-span-4 font-body text-xs sm:text-sm text-[#999] leading-relaxed">
                      {aud.description}
                    </div>

                    <div className="lg:col-span-2 flex flex-wrap gap-1 font-mono text-[10px] text-[#FF5A1F]">
                      {aud.bundleCodes.map((code) => (
                        <span key={code} className="border border-[#333] px-1.5 py-0.5 rounded-[1px]">
                          {code}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            ROOM 7 — HOW IT WORKS (SIGNAL PATH)
            ======================================================== */}
        <section
          id="how-it-works"
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-how-it-works"
        >
          <div className="max-w-7xl mx-auto">
            <SignalPath />
          </div>
        </section>

        {/* ========================================================
            ROOM 8 — LICENSE (LIGHT TWO COLUMNS)
            ======================================================== */}
        <section
          id="license"
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-license"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] mb-8 pb-2 border-b border-[var(--line)]">
              <span>COMMERCIAL LICENSE TERMS // PLAIN ENGLISH</span>
              <span>NO HIDDEN LEGAL CAVEATS</span>
            </div>

            <div className="mb-10">
              <h2 className="type-display text-3xl sm:text-5xl text-[var(--ink)]">
                WHAT YOU CAN & CAN&apos;T DO.
              </h2>
              <p className="font-body text-sm sm:text-base text-[var(--ink-muted)] mt-2">
                Clear rules. Use the footage freely in your monetized content. Just don&apos;t resell the raw files.
              </p>
            </div>

            {/* 2-Column Split: YOU CAN / YOU CAN'T */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* YOU CAN Column */}
              <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 sm:p-8 rounded-[2px]">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--line)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                  <h3 className="font-mono text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
                    YOU CAN [COMMERCIAL PERMITTED]
                  </h3>
                </div>
                <ul className="space-y-3 font-body text-xs sm:text-sm text-[var(--ink)]">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[var(--accent)] font-bold">✓</span>
                    <span>Monetize finished videos on YouTube (AdSense, Sponsorships).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[var(--accent)] font-bold">✓</span>
                    <span>Publish monetized Reels, TikToks, and YouTube Shorts for client pages.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[var(--accent)] font-bold">✓</span>
                    <span>Use clips as visual b-roll in commercial paid ads (Meta, TikTok, Google).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[var(--accent)] font-bold">✓</span>
                    <span>Edit, color grade, crop, speed ramp, and remix clips with no attribution required.</span>
                  </li>
                </ul>
              </div>

              {/* YOU CAN'T Column */}
              <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 sm:p-8 rounded-[2px]">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--line)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <h3 className="font-mono text-sm sm:text-base font-bold text-[var(--ink)] uppercase">
                    YOU CAN&apos;T [STRICTLY FORBIDDEN]
                  </h3>
                </div>
                <ul className="space-y-3 font-body text-xs sm:text-sm text-[var(--ink)]">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#EF4444] font-bold">✕</span>
                    <span>Resell the raw, unedited footage or bundle files to third parties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#EF4444] font-bold">✕</span>
                    <span>Upload the raw Google Drive vault link to public file-sharing forums or torrents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#EF4444] font-bold">✕</span>
                    <span>Re-package the raw clips into a competing stock footage library or course.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-[#EF4444] font-bold">✕</span>
                    <span>Claim individual copyright ownership over raw unedited source files.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Link href="/license" className="font-mono text-xs uppercase text-[var(--accent)] hover:underline">
                READ COMPLETE COMMERCIAL LICENSE DOCUMENTATION →
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            ROOM 9 — ACCESS / PRICING (DARK STAGE CLIMAX)
            ======================================================== */}
        <section
          id="access"
          className="px-4 sm:px-8 py-20 sm:py-32 border-b border-[var(--line)] bg-[#0A0A0A] text-[#F4F4F2]"
          data-testid="room-pricing"
        >
          <div className="max-w-5xl mx-auto border border-[#2A2A2A] bg-[#121214] p-6 sm:p-12 rounded-[2px] shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4 mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF5A1F] font-bold">
                  CHECKOUT TERMINAL // GUMROAD OVERLAY
                </span>
                <h2 className="type-display text-2xl sm:text-4xl text-white mt-1">
                  GET THE COMPLETE VV VAULT.
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F]" />
                <span className="font-mono text-xs text-[#FF5A1F] font-bold">INSTANT SYNC</span>
              </div>
            </div>

            {/* Giant LCD Price Readout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[#888]">
                  ONE-TIME TRANSACTION · LIFETIME ACCESS · NO RECURRING FEES
                </div>

                <div className="inline-block bg-[#0B0C0E] border border-[#222] p-4 rounded-[2px] shadow-inner">
                  <div className="font-mono text-[10px] uppercase text-[#666] tracking-widest mb-2">
                    SYSTEM PRICE [USD]
                  </div>
                  <div className="flex items-center">
                    <Lcd
                      value="$9.99"
                      ghost="$8.88"
                      size="xl"
                      variant="amber"
                      ariaLabel="$9.99 one-time payment"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <TactileButton
                    href={SITE_CONFIG.gumroadUrl}
                    variant="orange"
                    size="lg"
                    isExternal={true}
                    isBuy={true}
                    className="w-full sm:w-auto text-sm py-4 px-8"
                  >
                    BUY NOW FOR $9.99 ↗
                  </TactileButton>
                </div>

                <div className="font-mono text-[10px] text-[#777] uppercase pt-2">
                  CHECKOUT VIA GUMROAD · INSTANT GOOGLE DRIVE REPOSITORY LINK
                </div>
              </div>

              {/* What You Get Spec Checklist */}
              <div className="lg:col-span-6 bg-[#0E0F12] border border-[#222] p-5 rounded-[2px] divide-y divide-[#1F2126] font-mono text-xs">
                <div className="pb-3 text-[#FF5A1F] font-bold uppercase tracking-wider">
                  ALL 7 HARDWARE MODULES INCLUDED:
                </div>
                {UNITS.map((u) => (
                  <div key={u.id} className="py-2 flex items-center justify-between text-[#DDD]">
                    <span className="font-bold">{u.code} · {u.name}</span>
                    <span className="text-[#FF5A1F]">{u.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] font-mono text-[9px] uppercase tracking-wider text-[#666] flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>ZERO FAKE COUNTDOWNS · ZERO FAKE SCARCITY · HONEST $9.99 VALUE</span>
              <span>15,000+ FILES ACCESSIBLE IMMEDIATELY</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            ROOM 10 — FAQ (LIGHT ACCORDION)
            ======================================================== */}
        <section
          id="faq"
          className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[var(--line)] bg-[var(--bg)] transition-colors"
          data-testid="room-faq"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] mb-8 pb-2 border-b border-[var(--line)]">
              <span>SYSTEM FAQ // FREQUENTLY ASKED QUESTIONS</span>
              <span>FACTUAL DOCUMENTATION</span>
            </div>

            <div className="mb-10">
              <h2 className="type-display text-3xl sm:text-5xl text-[var(--ink)]">
                SPECIFICATION FAQ.
              </h2>
              <p className="font-body text-sm text-[var(--ink-muted)] mt-2">
                Everything you need to know about formats, delivery, licensing, and workflow.
              </p>
            </div>

            <Accordion
              items={FAQ_ITEMS.map((item, idx) => ({
                id: `faq-${idx + 1}`,
                index: (idx + 1).toString().padStart(2, '0'),
                question: item.question,
                answer: item.answer,
              }))}
              defaultOpenId="faq-1"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
