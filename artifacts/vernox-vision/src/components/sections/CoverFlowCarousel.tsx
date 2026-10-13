import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UNITS, Unit } from '@/data/units';
import { SITE_CONFIG } from '@/data/site';

interface CoverFlowCarouselProps {
  className?: string;
}

export const CoverFlowCarousel: React.FC<CoverFlowCarouselProps> = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = UNITS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    setDragStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.clientX;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
    setDragStartX(null);
  };

  return (
    <section
      id="vault"
      className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070709] border-t border-b border-white/[0.06] ${className}`}
      data-testid="featured-carousel-section"
    >
      {/* Ambient background gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none rounded-full bg-[radial-gradient(ellipse_at_center,rgba(216,168,86,0.12)_0%,transparent_70%)] blur-3xl" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header (Image 2 style) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856] animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
              FEATURED COLLECTION · 01
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] tracking-tight leading-tight">
            The <span className="text-gold-gradient italic">Vernox Vault</span> System
          </h2>

          <p className="mt-3 font-body text-xs sm:text-sm text-[#9A9893] tracking-widest uppercase font-light">
            15,000+ ASSETS · 4 VIDEO BUNDLES · 3 STRATEGY GUIDES · ONE-TIME ACCESS
          </p>
        </div>

        {/* 3D Cover Flow Stage */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="relative h-[440px] sm:h-[480px] w-full flex items-center justify-center perspective-[1200px] select-none cursor-grab active:cursor-grabbing"
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            data-testid="btn-carousel-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 sm:left-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111115]/90 border border-[#D8A856]/40 text-[#FAF8F5] hover:text-[#D8A856] hover:border-[#D8A856] hover:bg-[#18181D] flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer group"
            aria-label="Previous card"
          >
            <span className="transform group-hover:-translate-x-0.5 transition-transform text-lg">❮</span>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            data-testid="btn-carousel-next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111115]/90 border border-[#D8A856]/40 text-[#FAF8F5] hover:text-[#D8A856] hover:border-[#D8A856] hover:bg-[#18181D] flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer group"
            aria-label="Next card"
          >
            <span className="transform group-hover:translate-x-0.5 transition-transform text-lg">❯</span>
          </button>

          {/* 3D Cards */}
          <div className="relative w-full max-w-sm sm:max-w-md h-[380px] sm:h-[420px] flex items-center justify-center">
            {UNITS.map((unit, index) => {
              // Calculate offset relative to activeIndex with wrap-around
              let offset = index - activeIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // 3D parameters
              const xPos = offset * (window.innerWidth < 640 ? 120 : 210);
              const zPos = isCenter ? 80 : -Math.abs(offset) * 120;
              const rotateY = offset * -26;
              const scale = isCenter ? 1.05 : Math.max(0.8, 1 - Math.abs(offset) * 0.15);
              const opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.35);
              const zIndex = 20 - Math.abs(offset);

              return (
                <motion.div
                  key={unit.id}
                  onClick={() => setActiveIndex(index)}
                  initial={false}
                  animate={{
                    x: xPos,
                    z: zPos,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                  }}
                  style={{
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  className={`absolute w-[270px] sm:w-[320px] h-[370px] sm:h-[410px] rounded-[18px] p-6 flex flex-col justify-between transition-shadow duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
                    isCenter
                      ? 'bg-gradient-to-b from-[#18181F] to-[#0E0E12] border-2 border-[#D8A856] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(216,168,86,0.35)]'
                      : 'bg-gradient-to-b from-[#141418] to-[#0A0A0D] border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
                  }`}
                  data-testid={`coverflow-card-${unit.slug}`}
                >
                  {/* Subtle card sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-white/[0.05] to-transparent pointer-events-none" />

                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#D8A856]">
                          {unit.code}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#9A9893]">
                          MODULE // 0{unit.order}
                        </span>
                      </div>

                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isCenter
                            ? 'bg-[#D8A856]/15 border-[#D8A856]/40 text-[#D8A856]'
                            : 'bg-white/[0.04] border-white/[0.1] text-[#9A9893]'
                        }`}
                      >
                        {unit.kind === 'video' ? '9:16 VIDEO' : 'PDF GUIDE'}
                      </span>
                    </div>

                    {/* Unit Name in Luxury Editorial Style */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF8F5] leading-tight">
                      {unit.name}
                    </h3>

                    <p className="mt-2 font-body text-xs text-[#9A9893] leading-relaxed line-clamp-3">
                      {unit.description}
                    </p>
                  </div>

                  {/* Card Footer / Stats */}
                  <div className="pt-4 border-t border-white/[0.08]">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-mono text-[10px] uppercase text-[#9A9893]">
                        ASSET COUNT
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#D8A856]">
                        {unit.count}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9893]">
                      <span>FORMAT: {unit.orientation}</span>
                      <span className="text-[#D8A856] group-hover:underline">INSPECT MODULE →</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots & Readout */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className="font-mono text-xs text-[#9A9893]">
            0{activeIndex + 1} / 0{total}
          </span>
          <div className="flex items-center gap-1.5">
            {UNITS.map((u, i) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-7 bg-[#D8A856]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to slide 0${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4 Feature Badges Row (from Image 2) */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.07] flex items-center gap-3">
            <span className="text-xl">📁</span>
            <div>
              <div className="font-serif text-base font-bold text-[#FAF8F5]">15,000+</div>
              <div className="font-body text-xs text-[#9A9893]">Premium Assets</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.07] flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <div className="font-serif text-base font-bold text-[#FAF8F5]">Viral Captions</div>
              <div className="font-body text-xs text-[#9A9893]">Tested Hooks & Scripts</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.07] flex items-center gap-3">
            <span className="text-xl">📅</span>
            <div>
              <div className="font-serif text-base font-bold text-[#FAF8F5]">30-Day Matrix</div>
              <div className="font-body text-xs text-[#9A9893]">Daily Content Calendar</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111115] border border-white/[0.07] flex items-center gap-3">
            <span className="text-xl">✨</span>
            <div>
              <div className="font-serif text-base font-bold text-[#FAF8F5]">Growth Codes</div>
              <div className="font-body text-xs text-[#9A9893]">Ideas, Hacks & More</div>
            </div>
          </div>
        </div>

        {/* Direct Purchase CTA (from Image 2) */}
        <div className="mt-10 text-center">
          <a
            href={SITE_CONFIG.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="btn-buy-cta"
            className="gold-pill-btn px-9 py-4 text-sm sm:text-base tracking-wider uppercase shadow-[0_8px_30px_rgba(216,168,86,0.35)]"
          >
            GET THE FULL VAULT — $9.99 ↗
          </a>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#9A9893]">
            <span>✓ LIFETIME ACCESS</span>
            <span>•</span>
            <span>✓ INSTANT GOOGLE DRIVE DOWNLOAD</span>
            <span>•</span>
            <span>✓ COMMERCIAL USAGE RIGHTS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
