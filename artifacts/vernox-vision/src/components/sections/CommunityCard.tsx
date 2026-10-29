import React from 'react';
import { SITE_CONFIG } from '@/data/site';

export const CommunityCard: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-5xl lg:max-w-6xl mx-auto">
        <div className="card-luxury p-8 sm:p-12 lg:p-14 relative overflow-hidden bg-gradient-to-r from-[#141418] via-[#16161D] to-[#0F0F14] border border-[#D8A856]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-8 shadow-2xl group">
          <div className="max-w-xl">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#D8A856] font-bold block mb-2.5">
              ECOSYSTEM ACCESS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] mb-3 leading-tight">
              More than assets. <br />
              <span className="text-gold-gradient italic">A community of creators.</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-[#9A9893] leading-relaxed font-light">
              Gain instant access to our private Google Drive vault and stay ahead with curated drops, growth frameworks, and direct support.
            </p>
          </div>

          <a
            href={SITE_CONFIG.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-pill-btn w-full sm:w-auto px-8 sm:px-9 py-4 sm:py-4.5 text-xs sm:text-sm uppercase tracking-wider font-semibold whitespace-nowrap text-center cursor-pointer shadow-lg shrink-0"
          >
            JOIN NOW — $9.99 ↗
          </a>
        </div>
      </div>
    </section>
  );
};
