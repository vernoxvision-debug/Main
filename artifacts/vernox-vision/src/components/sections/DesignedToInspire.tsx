import React, { useState } from 'react';

export const DesignedToInspire: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Aesthetic Atmosphere & Architecture',
      bundle: 'VV—03 LUXURY POSTS',
      category: 'Minimalist Architecture & Nature',
      desc: 'Cinematic archways, ambient zen courtyards, luxury interiors and travel b-roll that capture instant viewer fascination.',
      stats: '3,000+ Assets · 1080p 9:16',
    },
    {
      title: 'High-Velocity Viral Cutaways',
      bundle: 'VV—01 VIRAL HOOKS',
      category: 'Motion Dynamics & Transitions',
      desc: 'Rapid 1-second cuts, kinetic overlays, and adrenaline-fueled visuals designed to break the scroll in the first 3 seconds.',
      stats: '5,000+ Assets · High Bitrate',
    },
    {
      title: 'Keynote & Mindset Soundbites',
      bundle: 'VV—02 SPEAKER VAULT',
      category: 'Wisdom & Podcast Vox',
      desc: 'High-conviction authority clips, raw podcast conversations, and masterclass quotes tailored for thought leadership.',
      stats: '3,100+ Assets · Clean Audio Stems',
    },
    {
      title: 'Candid Street & Real-World Commentary',
      bundle: 'VV—04 RICH VLOGS',
      category: 'Vlog B-Roll & Reaction Frames',
      desc: 'Unfiltered human reactions, street interviews, and candid b-roll for authentic storytelling and documentary-style formats.',
      stats: '2,500+ Assets · Natural Motion',
    },
  ];

  const total = slides.length;
  const current = slides[activeSlide];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090C] border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header from Image 1 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
                PREMIUM VISUALS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] tracking-tight">
              Designed to <span className="text-gold-gradient italic">inspire.</span>
            </h2>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#9A9893]">
              0{activeSlide + 1} / 0{total}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev - 1 + total) % total)}
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#FAF8F5] hover:border-[#D8A856] hover:text-[#D8A856] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % total)}
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#FAF8F5] hover:border-[#D8A856] hover:text-[#D8A856] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Featured Visual Slide Card */}
        <div className="card-luxury p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#141419] to-[#0A0A0D]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Frame */}
            <div className="md:col-span-5 h-[320px] rounded-xl overflow-hidden bg-[#181820] border border-[#D8A856]/20 relative flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,168,86,0.18)_0%,transparent_75%)]" />
              <div className="text-center z-10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#D8A856] block mb-2">
                  {current.bundle}
                </span>
                <h4 className="font-serif text-2xl text-[#FAF8F5]">
                  {current.category}
                </h4>
                <div className="mt-4 inline-block font-mono text-[10px] text-[#FAF8F5]/70 px-3 py-1 rounded-full bg-black/40 border border-white/10">
                  {current.stats}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D8A856] font-bold block mb-2">
                  CURATED VISUAL SPECIFICATION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mb-4">
                  {current.title}
                </h3>
                <p className="font-body text-sm text-[#9A9893] leading-relaxed mb-6">
                  {current.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center gap-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSlide(i)}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === i ? 'w-12 bg-[#D8A856]' : 'w-4 bg-white/20'
                    }`}
                    aria-label={`Jump to visual 0${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
