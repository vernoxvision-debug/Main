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
        {/* SECTION 1: LUXURY EDITORIAL HERO (Image 1) */}
        <LuxuryHero />

        {/* SECTION 2: 3D SLIDING PRODUCTS CAROUSEL / COVERFLOW (Image 2 in Image 1 Theme) */}
        <CoverFlowCarousel />

        {/* SECTION 3: WHY VERNOX VISION (Image 1) */}
        <WhyVernox />

        {/* SECTION 4: A COMPLETE CREATOR TOOLBOX (Image 1) */}
        <CreatorToolbox />

        {/* SECTION 5: THE SIGNATURE COLLECTION PRICING (Image 1 Cream Card) */}
        <SignaturePricing />

        {/* SECTION 6: INTERACTIVE 30-DAY CONTENT CALENDAR */}
        <section id="calendar" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070709] border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
                  VV—05 FRAMEWORK
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] tracking-tight">
                30-Day Content <span className="text-gold-gradient italic">Cadence Matrix.</span>
              </h2>
              <p className="mt-2 font-body text-xs sm:text-sm text-[#9A9893] max-w-xl mx-auto">
                Tap any day to preview the exact content pillar, format specification, and opening hook strategy included in your vault.
              </p>
            </div>

            <CalendarPreview />
          </div>
        </section>

        {/* SECTION 7: PREMIUM VISUALS / DESIGNED TO INSPIRE (Image 1) */}
        <DesignedToInspire />

        {/* SECTION 8: A SIMPLE PROCESS (Image 1) */}
        <SimpleProcess />

        {/* SECTION 9: ECOSYSTEM / COMMUNITY CARD (Image 1) */}
        <CommunityCard />

        {/* SECTION 10: REAL CREATORS / TESTIMONIALS (Image 1) */}
        <CreatorTestimonials />

        {/* SECTION 11: COMMON QUESTIONS / FAQ (Image 1) */}
        <LuxuryFaq />
      </main>

      {/* Luxury Editorial Footer (with Madhan Kumar T attribution) */}
      <LuxuryFooter />
    </div>
  );
};
