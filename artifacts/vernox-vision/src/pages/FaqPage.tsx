import React from 'react';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { Accordion } from '@/components/ui/accordion';
import { TactileButton } from '@/components/ui/TactileButton';
import { FAQ_ITEMS } from '@/data/faq';
import { SITE_CONFIG } from '@/data/site';

export const FaqPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            DOCUMENTATION // FREQUENTLY ASKED QUESTIONS
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            SYSTEM FAQ.
          </h1>
          <p className="font-body text-base text-[var(--ink-muted)] mt-4 leading-relaxed">
            Every question answered with complete technical honesty. If you have an inquiry not covered here, reach out to our team directly.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <TactileButton
              href={SITE_CONFIG.gumroadUrl}
              variant="orange"
              size="md"
              isExternal={true}
              isBuy={true}
            >
              UNLOCK VAULT ($9.99) ↗
            </TactileButton>
          </div>
        </div>

        <Accordion
          items={FAQ_ITEMS.map((item, idx) => ({
            id: `faq-${idx + 1}`,
            index: (idx + 1).toString().padStart(2, '0'),
            question: item.question,
            answer: item.answer,
          }))}
          defaultOpenId="faq-1"
        />
      </main>

      <Footer />
    </div>
  );
};
