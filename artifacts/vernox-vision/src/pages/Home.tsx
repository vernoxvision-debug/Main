import React from 'react';
import { LuxuryHeader } from '@/components/layout/LuxuryHeader';
import { LuxuryFooter } from '@/components/layout/LuxuryFooter';
import { LuxuryHero } from '@/components/sections/LuxuryHero';
import { CoverFlowCarousel } from '@/components/sections/CoverFlowCarousel';
import { WhyVernox } from '@/components/sections/WhyVernox';
import { CreatorToolbox } from '@/components/sections/CreatorToolbox';
import { SignaturePricing } from '@/components/sections/SignaturePricing';
import { CalendarPreview } from '@/components/sections/CalendarPreview';
import { DesignedToInspire } from '@/components/sections/DesignedToInspire';
import { SimpleProcess } from '@/components/sections/SimpleProcess';
import { CommunityCard } from '@/components/sections/CommunityCard';
import { CreatorTestimonials } from '@/components/sections/CreatorTestimonials';
import { LuxuryFaq } from '@/components/sections/LuxuryFaq';

export const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#070709] text-[#FAF8F5] selection:bg-[#D8A856] selection:text-black overflow-x-hidden">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D8A856] focus:text-black font-mono text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Luxury Editorial Header */}
      <LuxuryHeader />

      <main id="main-content">
        {/* SECTION 1: LUXURY EDITORIAL HERO */}
        <LuxuryHero />

        {/* SECTION 2: 3D SLIDING PRODUCTS CAROUSEL / COVERFLOW */}
        <CoverFlowCarousel />

        {/* SECTION 3: WHY VERNOX VISION */}
        <WhyVernox />

        {/* SECTION 4: A COMPLETE CREATOR TOOLBOX */}
        <CreatorToolbox />

        {/* SECTION 5: THE SIGNATURE COLLECTION PRICING */}
        <SignaturePricing />

        {/* SECTION 6: INTERACTIVE 30-DAY CONTENT CALENDAR */}
        <section id="calendar" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#070709] border-b border-white/[0.06]">
          <div className="max-w-[1360px] mx-auto">
            <div className="text-center mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#D8A856]/20 mb-4 backdrop-blur-sm">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#D8A856] font-semibold">
                  VV—05 FRAMEWORK
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF8F5] tracking-tight">
                30-Day Content <span className="text-gold-gradient italic">Cadence Matrix.</span>
              </h2>
              <p className="mt-3 font-body text-sm sm:text-base text-[#9A9893] max-w-2xl mx-auto font-light">
                Tap any day to preview the exact content pillar, format specification, and opening hook strategy included in your vault.
              </p>
            </div>

            <CalendarPreview />
          </div>
        </section>

        {/* SECTION 7: PREMIUM VISUALS / DESIGNED TO INSPIRE */}
        <DesignedToInspire />

        {/* SECTION 8: A SIMPLE PROCESS */}
        <SimpleProcess />

        {/* SECTION 9: ECOSYSTEM / COMMUNITY CARD */}
        <CommunityCard />

        {/* SECTION 10: REAL CREATORS / TESTIMONIALS */}
        <CreatorTestimonials />

        {/* SECTION 11: COMMON QUESTIONS / FAQ */}
        <LuxuryFaq />
      </main>

      {/* Luxury Editorial Footer */}
      <LuxuryFooter />
    </div>
  );
};
