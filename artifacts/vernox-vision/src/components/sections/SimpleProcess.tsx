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
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070709] border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#D8A856]">
              A SIMPLE PROCESS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] tracking-tight">
            Get started in <span className="text-gold-gradient italic">minutes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-8 rounded-2xl bg-[#111115] border border-white/[0.07] flex flex-col justify-between hover:border-[#D8A856]/40 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-[#D8A856]/80 group-hover:text-[#D8A856] transition-colors">
                    {step.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#D8A856]/40 group-hover:bg-[#D8A856] transition-colors" />
                </div>

                <h3 className="font-serif text-2xl text-[#FAF8F5] mb-3">
                  {step.title}
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#9A9893] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-[9px] text-[#9A9893] uppercase tracking-wider">
                STEP {step.num} // VERNOX SYSTEM
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
