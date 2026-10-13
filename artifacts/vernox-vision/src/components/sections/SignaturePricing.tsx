import React from 'react';
import { SITE_CONFIG } from '@/data/site';

export const SignaturePricing: React.FC = () => {
  const features = [
    '15,000+ curated video assets across 4 specialized libraries',
    'VV—01 Viral TikTok & Social Clips (5,000+ clips)',
    'VV—02 Speaker & Motivation Vault (3,100+ clips)',
    'VV—03 Luxury Posts & Lifestyle (3,000+ clips)',
    'VV—04 Rich Vlogs & Omegle Series (2,500+ clips)',
    'VV—05 30-Day Content Calendar & Posting Matrix',
    'VV—06 Caption Vault & Algorithmic Growth Cheat Codes',
    'VV—00 Onboarding & Zero-Lag Quick-Start Manual',
    'Commercial usage rights for YouTube, TikTok & client work',
    'Instant private Google Drive vault access delivered via email',
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090C] border-b border-white/[0.06] relative">
      <div className="max-w-4xl mx-auto">
        {/* The Cream Signature Card (Image 1 style) */}
        <div data-testid="pricing-card" className="card-cream p-8 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Subtle watermark badge */}
          <div className="absolute top-6 right-6 font-mono text-[9px] uppercase tracking-widest text-[#121214]/40 border border-[#121214]/15 px-3 py-1 rounded-full">
            OFFICIAL RELEASE · V2.0
          </div>

          <div className="max-w-2xl">
            {/* Tag */}
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#A07020] font-bold block mb-3">
              THE SIGNATURE COLLECTION
            </span>

            {/* Headline in Editorial Serif */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#121214] tracking-tight leading-[1.08] mb-4">
              Your next idea <br className="hidden sm:inline" />
              starts here.
            </h2>

            {/* Subtitle */}
            <p className="font-body text-sm sm:text-base text-[#121214]/75 leading-relaxed mb-8">
              Explore the Vernox Vault and discover an all-in-one digital library of 15,000+ resources engineered for instant high-retention video creation.
            </p>

            {/* Price Readout */}
            <div className="flex items-baseline gap-3 pb-8 mb-8 border-b border-[#121214]/15">
              <span className="font-serif text-5xl sm:text-7xl font-bold text-[#121214] tracking-tight">
                $9.99
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#121214]">
                  USD · ONE-TIME PAYMENT
                </span>
                <span className="font-body text-xs text-[#121214]/60">
                  No subscriptions. Lifetime vault access.
                </span>
              </div>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-[#121214] text-[#F4EFEB] flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="font-body text-xs sm:text-sm text-[#121214]/85 leading-snug">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary Action Button (Solid Dark Button from Image 1) */}
            <div>
              <a
                href={SITE_CONFIG.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-buy-cta"
                className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-full bg-[#121214] text-[#FAF8F5] hover:bg-[#222226] font-body text-sm font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <span>GET LIFETIME ACCESS — $9.99</span>
                <span>→</span>
              </a>

              <p className="mt-3 font-mono text-[10px] text-[#121214]/60 tracking-wider">
                Delivered automatically: Gumroad emails private Google Drive link immediately after payment.
              </p>
            </div>

            {/* Trust Badges Row (Image 1 style) */}
            <div className="mt-10 pt-8 border-t border-[#121214]/15 grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <span className="text-xl mb-1 text-[#121214]">♾</span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#121214]">
                  LIFETIME ACCESS
                </span>
                <span className="font-body text-[10px] text-[#121214]/60 hidden sm:inline">
                  One purchase, forever ours
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xl mb-1 text-[#121214]">🛡</span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#121214]">
                  SECURE PAYMENT
                </span>
                <span className="font-body text-[10px] text-[#121214]/60 hidden sm:inline">
                  Encrypted checkout via Gumroad
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xl mb-1 text-[#121214]">⬇</span>
                <span className="font-mono text-[10px] uppercase font-bold text-[#121214]">
                  INSTANT DOWNLOAD
                </span>
                <span className="font-body text-[10px] text-[#121214]/60 hidden sm:inline">
                  Google Drive private vault
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
