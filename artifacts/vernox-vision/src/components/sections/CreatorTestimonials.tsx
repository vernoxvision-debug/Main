import React, { useState } from 'react';

export const CreatorTestimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        'This bundle saved me so much time. The assets, captions and calendar are all I needed to stay consistent. I went from spending 4 hours per video to cutting high-retention reels in 20 minutes.',
      author: 'Creator from the US',
      channel: 'Faceless Luxury Page (240K Followers)',
    },
    {
      quote:
        'The quality of the 9:16 vertical footage is unmatched. No watermarks, zero pixelation on TikTok/Reels, and the B-roll library is actually curated by editors who understand hook pacing.',
      author: 'Freelance Short-Form Video Editor',
      channel: 'Upwork Top Rated Plus',
    },
    {
      quote:
        'For $9.99 one-time with commercial rights, this is an absolute no-brainer investment. The Google Drive access is instant and organized into pre-indexed folders ready to drop into timeline.',
      author: 'Performance Marketer & UGC Agency',
      channel: 'Direct-Response Media Buyer',
    },
  ];

  const total = testimonials.length;
  const current = testimonials[activeTestimonial];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
              AUTHENTIC FEEDBACK
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] tracking-tight">
            Real creators. <span className="text-gold-gradient italic">Real results.</span>
          </h2>
        </div>

        {/* Testimonial Card (Image 1 style) */}
        <div className="card-luxury p-8 sm:p-12 relative overflow-hidden bg-gradient-to-b from-[#141418] to-[#0A0A0D]">
          <div className="text-4xl text-[#D8A856]/40 font-serif mb-4 leading-none select-none">
            &ldquo;
          </div>

          <p className="font-serif text-lg sm:text-2xl text-[#FAF8F5] leading-relaxed italic mb-8">
            {current.quote}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.07]">
            <div>
              <div className="font-serif text-base text-[#FAF8F5] font-semibold">
                — {current.author}
              </div>
              <div className="font-mono text-[10px] text-[#D8A856] uppercase tracking-wider">
                {current.channel}
              </div>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#9A9893]">
                0{activeTestimonial + 1} / 0{total}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + total) % total)}
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#FAF8F5] hover:border-[#D8A856] hover:text-[#D8A856] flex items-center justify-center transition-colors cursor-pointer text-xs"
                  aria-label="Previous review"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % total)}
                  className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#FAF8F5] hover:border-[#D8A856] hover:text-[#D8A856] flex items-center justify-center transition-colors cursor-pointer text-xs"
                  aria-label="Next review"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
