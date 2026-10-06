import React, { useState } from 'react';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { CalendarPreview } from '@/components/sections/CalendarPreview';
import { TactileButton } from '@/components/ui/TactileButton';
import { SITE_CONFIG } from '@/data/site';
import { GUIDE_UNITS } from '@/data/units';

export const Guides: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hookTemplates = [
    {
      id: 1,
      title: 'FORMULA 01 // CURIOSITY DISRUPTION',
      template: 'Nobody tells you [TRUTH/SECRET] until you [PAINFUL MILESTONE]...',
      breakdown: 'Breaks the default expectation immediately. Forces viewer to stay to see the exception.',
    },
    {
      id: 2,
      title: 'FORMULA 02 // TIMELINE ARBITRAGE',
      template: 'If you are still spending 4 hours on [TASK], you are doing it completely wrong.',
      breakdown: 'Highlights operational inefficiency and promises an instant speed shortcut.',
    },
    {
      id: 3,
      title: 'FORMULA 03 // 2-PART RETENTION LOOP',
      template: 'Watch this twice, because the third step will save your entire account from shadowbanning.',
      breakdown: 'Direct incentive for replay and save metrics, doubling algorithmic distribution.',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Header */}
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            GROWTH BLUEPRINTS // 03 PDF MANUALS
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            SYSTEM GUIDES & FRAMEWORKS.
          </h1>
          <p className="font-body text-base text-[var(--ink-muted)] mt-4 max-w-2xl leading-relaxed">
            Assets supply the visual momentum. These three companion guides supply the publishing cadence, caption templates, and algorithm retention protocols.
          </p>

          <div className="mt-6">
            <TactileButton
              href={SITE_CONFIG.gumroadUrl}
              variant="orange"
              size="md"
              isExternal={true}
              isBuy={true}
            >
              GET ALL GUIDES + 15,000+ CLIPS FOR $9.99 ↗
            </TactileButton>
          </div>
        </div>

        {/* 3 Guide Manuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {GUIDE_UNITS.map((guide) => (
            <div
              key={guide.id}
              className="border border-[var(--line)] bg-[var(--line)]/10 p-6 rounded-[2px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--line)] font-mono text-xs">
                  <span className="text-[var(--accent)] font-bold">{guide.code}</span>
                  <span className="text-[var(--ink-muted)]">{guide.format}</span>
                </div>
                <h3 className="type-display text-2xl text-[var(--ink)]">{guide.name}</h3>
                <p className="font-body text-xs text-[var(--ink-muted)] mt-3 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--line)] font-mono text-[10px] text-[var(--ink-muted)] flex items-center justify-between">
                <span>FORMAT: PDF</span>
                <span className="text-[var(--accent)] font-bold">INCLUDED IN VAULT</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive 30-Day Calendar Matrix */}
        <div className="mb-16">
          <CalendarPreview />
        </div>

        {/* Caption Vault Hook Formulas Interactive Teaser */}
        <div className="border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-8 rounded-[2px] mb-12">
          <div className="border-b border-[var(--line)] pb-4 mb-6">
            <span className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest">
              SAMPLE RETENTION HOOK TEMPLATES // VV—06
            </span>
            <h3 className="type-display text-2xl sm:text-3xl text-[var(--ink)] mt-1">
              THE HOOK VAULT SCRIPTS.
            </h3>
            <p className="font-body text-xs sm:text-sm text-[var(--ink-muted)] mt-1">
              Three example formula templates from the 50+ included in the VV—06 growth cheat codes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hookTemplates.map((hook, idx) => (
              <div
                key={hook.id}
                className="border border-[var(--line)] bg-[var(--line)]/10 p-5 rounded-[2px] flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-[10px] text-[var(--accent)] font-bold mb-2">
                    {hook.title}
                  </div>
                  <div className="font-mono text-xs font-semibold text-[var(--ink)] bg-[var(--bg)] p-3 border border-[var(--line)] rounded-[2px] leading-relaxed mb-3">
                    &quot;{hook.template}&quot;
                  </div>
                  <p className="font-body text-xs text-[var(--ink-muted)] leading-relaxed">
                    {hook.breakdown}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => handleCopy(hook.template, idx)}
                    className="w-full font-mono text-[10px] uppercase py-1.5 border border-[var(--line-strong)] hover:bg-[var(--line)] transition-colors cursor-pointer rounded-[1px]"
                  >
                    {copiedIndex === idx ? 'COPIED TO CLIPBOARD ✓' : 'COPY TEMPLATE [TXT]'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
