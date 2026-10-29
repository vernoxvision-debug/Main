import React, { useState } from 'react';
import { SITE_CONFIG } from '@/data/site';

export const CreatorToolbox: React.FC = () => {
  const [activeItem, setActiveItem] = useState(0);

  const tools = [
    {
      code: 'VV—01 to 04',
      name: 'Visual Assets',
      tag: '15,000+ CLIPS',
      description: 'High-energy hooks, podcast soundbites, luxury travel, candid street vlogs, and cinematic cutaways delivered in high bitrate 9:16 vertical format.',
      items: [
        '5,000+ Viral TikTok & Social Clips',
        '3,100+ Keynote & Speaker Clips',
        '3,000+ Luxury & Wealth Atmosphere',
        '2,500+ Rich Vlogs & Candid Reactions',
      ],
    },
    {
      code: 'VV—06',
      name: 'Caption Vault',
      tag: 'RETENTION FORMULAS',
      description: 'Pre-written viral hook templates, caption scripts, call-to-actions, and algorithmic cheat codes tuned for watch-time retention.',
      items: [
        '3-Second Opening Hook Formulas',
        'High-Retention Comment Drivers',
        'Story Arc Progression Templates',
        'Multi-Niche Caption Blueprints',
      ],
    },
    {
      code: 'VV—05',
      name: '30-Day Content Calendar',
      tag: 'DAILY TIMETABLE',
      description: 'Step-by-step 30-day publishing roadmap balancing curiosity hooks, authority quotes, lifestyle b-roll, and interactive challenges.',
      items: [
        'Day-by-Day Strategic Cadence',
        'Content Pillar Balance System',
        'Optimal Posting Timing Guidance',
        'Printable PDF + Digital Notion Matrix',
      ],
    },
    {
      code: 'VV—00',
      name: 'Creator Onboarding',
      tag: 'START HERE MANUAL',
      description: 'The mandatory START HERE manual. Explains folder organization, recommended editing workflows, Google Drive shortcuts, and rapid timeline assembly.',
      items: [
        'Google Drive Cloud Shortcut Setup',
        'Premiere, CapCut & DaVinci Workflows',
        'Commercial Usage Rights Certificate',
        'Zero-Lag Local Timeline Assembly',
      ],
    },
  ];

  return (
    <section id="toolbox" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#D8A856]/20 mb-4 backdrop-blur-sm">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#D8A856] font-semibold">
                WHAT&apos;S INSIDE
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF8F5] tracking-tight leading-tight">
              A complete <span className="text-gold-gradient italic">creator toolbox.</span>
            </h2>
          </div>

          <a
            href={SITE_CONFIG.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs sm:text-sm text-[#D8A856] hover:underline uppercase tracking-wider flex items-center gap-2 font-medium"
          >
            <span>VIEW FULL VAULT SPEC</span>
            <span>→</span>
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              onClick={() => setActiveItem(index)}
              className={`p-7 sm:p-8 rounded-[20px] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                activeItem === index
                  ? 'bg-gradient-to-b from-[#1A1A22] to-[#0E0E14] border-[#D8A856] shadow-[0_16px_36px_rgba(216,168,86,0.22)]'
                  : 'bg-[#111115] border-white/[0.08] hover:border-white/[0.22]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs text-[#D8A856] font-bold">
                    {tool.code}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-white/[0.05] text-[#9A9893]">
                    {tool.tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mb-2.5">
                  {tool.name}
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#9A9893] leading-relaxed mb-5 font-light">
                  {tool.description}
                </p>

                <ul className="space-y-2 pt-4 border-t border-white/[0.06]">
                  {tool.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-body text-[#FAF8F5]/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D8A856] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#9A9893]">
                <span>STATUS: READY</span>
                <span className="text-[#D8A856] font-medium">INCLUDED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
