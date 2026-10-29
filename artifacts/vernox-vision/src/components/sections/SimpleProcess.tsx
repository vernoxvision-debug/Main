import React from 'react';

export const SimpleProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Purchase',
      desc: 'Complete secure checkout through Gumroad with one-click payment. Zero recurring fees, zero subscription trap.',
    },
    {
      num: '02',
      title: 'Instant Access',
      desc: 'Gumroad emails your private Google Drive access link immediately. Add the shortcut directly to your cloud drive.',
    },
    {
      num: '03',
      title: 'Create & Grow',
      desc: 'Drag 1080p vertical footage directly into CapCut, Premiere, or DaVinci. Drop captions and follow the 30-day cadence.',
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-[1360px] mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-[#D8A856]/20 mb-4 backdrop-blur-sm">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#D8A856] font-semibold">
              A SIMPLE PROCESS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#FAF8F5] tracking-tight">
            Get started in <span className="text-gold-gradient italic">minutes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8 lg:gap-10 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 sm:p-10 rounded-[22px] bg-[#111115] border border-white/[0.08] flex flex-col justify-between hover:border-[#D8A856]/40 transition-colors group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-5xl sm:text-6xl font-light text-[#D8A856]/80 group-hover:text-[#D8A856] transition-colors">
                    {step.num}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8A856]/40 group-hover:bg-[#D8A856] transition-colors" />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mb-3.5">
                  {step.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-[#9A9893] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/[0.06] font-mono text-[10px] text-[#9A9893] uppercase tracking-wider">
                STEP {step.num} // VERNOX SYSTEM
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
