import React from 'react';
import { SITE_CONFIG } from '@/data/site';

export const CommunityCard: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        <div className="card-luxury p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-[#141418] via-[#16161D] to-[#0F0F14] border border-[#D8A856]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-md">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#D8A856] font-bold block mb-2">
              ECOSYSTEM ACCESS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mb-2 leading-tight">
              More than assets. <br />
              A community of creators.
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#9A9893] leading-relaxed">
              Gain instant access to our private Google Drive vault and stay ahead with curated drops, growth frameworks, and direct support.
            </p>
          </div>

          <a
            href={SITE_CONFIG.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-pill-btn px-7 py-3.5 text-xs uppercase tracking-wider font-semibold whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            JOIN NOW — $9.99 ↗
          </a>
        </div>
      </div>
    </section>
  );
};
