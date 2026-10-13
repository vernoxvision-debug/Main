import React from 'react';

export const WhyVernox: React.FC = () => {
  const pillars = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#D8A856]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Creator Assets',
      description: '15,000+ curated video assets, viral clips and cinematic cutaways to help you eliminate the blank timeline and build your unique visual identity.',
      metric: '15,000+ CLIPS',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#D8A856]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Content Systems',
      description: '30-day content calendar, posting timetables, and content pillars for a systematic, bulletproof publishing workflow.',
      metric: '30-DAY CALENDAR',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#D8A856]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'AI & Growth Tools',
      description: 'Battle-tested hook formulas, retention caption scripts, and algorithmic cheat codes designed to maximize average watch time.',
      metric: 'CAPTION VAULT',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#D8A856]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Commercial Rights',
      description: 'Full commercial rights to monetize videos across YouTube, TikTok, client commercial projects, and paid advertising campaigns.',
      metric: 'COMMERCIAL USE',
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090C] border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Header from Image 1 */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
              WHY VERNOX VISION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] tracking-tight leading-tight max-w-2xl">
            Tools that support your <span className="text-gold-gradient italic">creative journey.</span>
          </h2>
        </div>

        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="card-luxury p-7 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#17171C] border border-[#D8A856]/20 flex items-center justify-center group-hover:border-[#D8A856]/50 transition-colors shadow-inner">
                    {p.icon}
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#D8A856] uppercase px-2.5 py-1 rounded-full bg-[#D8A856]/10 border border-[#D8A856]/20">
                    {p.metric}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#FAF8F5] mb-2.5 group-hover:text-[#D8A856] transition-colors">
                  {p.title}
                </h3>

                <p className="font-body text-sm text-[#9A9893] leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-[#9A9893]">
                <span>SYSTEM CORE COMPONENT</span>
                <span className="text-[#D8A856]">INCLUDED IN $9.99 VAULT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
