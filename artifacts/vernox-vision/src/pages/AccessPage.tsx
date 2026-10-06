import React from 'react';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { TactileButton } from '@/components/ui/TactileButton';
import { Lcd } from '@/components/ui/typography';
import { UNITS } from '@/data/units';
import { SITE_CONFIG } from '@/data/site';

export const AccessPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-16">
        <div className="border border-[var(--line-strong)] bg-[#121214] text-[#F4F4F2] p-6 sm:p-12 rounded-[2px] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-bold">
                ACCESS CHECKOUT // GUMROAD OVERLAY
              </span>
              <h1 className="type-display text-3xl sm:text-5xl text-white mt-1">
                ONE PAYMENT. NINE NINETY-NINE.
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F]" />
              <span className="font-mono text-xs text-[#FF5A1F] font-bold">LIVE STAGE</span>
            </div>
          </div>

          <p className="font-body text-base text-[#9E9E9B] leading-relaxed max-w-2xl mb-8">
            That is the whole pricing page. No tiers, no upsells, no annual renewals, and no recurring monthly subscriptions.
            Pay $9.99 once and receive lifetime access to the entire 15,000+ asset repository.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            {/* Price Box */}
            <div className="lg:col-span-5 bg-[#0B0C0E] border border-[#252528] p-6 rounded-[2px] text-center shadow-inner">
              <div className="font-mono text-[10px] uppercase text-[#666] tracking-widest mb-2">
                LIFETIME LICENSE COST
              </div>
              <div className="flex items-center justify-center my-2">
                <Lcd
                  value="$9.99"
                  ghost="$8.88"
                  size="xl"
                  variant="amber"
                  ariaLabel="$9.99 one-time payment"
                />
              </div>
              <div className="font-mono text-[10px] text-[#888] uppercase mt-2">
                USD · ONE-TIME PAYMENT
              </div>

              <div className="mt-6">
                <TactileButton
                  href={SITE_CONFIG.gumroadUrl}
                  variant="orange"
                  size="lg"
                  isExternal={true}
                  isBuy={true}
                  className="w-full text-sm py-4"
                >
                  BUY NOW FOR $9.99 ↗
                </TactileButton>
              </div>

              <div className="mt-3 font-mono text-[9px] uppercase tracking-wider text-[#666]">
                CHECKOUT BY GUMROAD · INSTANT DRIVE ACCESS
              </div>
            </div>

            {/* Checklist of all units included */}
            <div className="lg:col-span-7 bg-[#0E0F12] border border-[#222] p-6 rounded-[2px] divide-y divide-[#1F2126] font-mono text-xs">
              <div className="pb-3 text-[#FF5A1F] font-bold uppercase tracking-wider">
                INCLUDED WITH THIS SINGLE PURCHASE:
              </div>
              {UNITS.map((unit) => (
                <div key={unit.id} className="py-2.5 flex items-center justify-between text-[#DDD]">
                  <div>
                    <span className="font-bold text-[#FF5A1F] mr-2">{unit.code}</span>
                    <span>{unit.name}</span>
                  </div>
                  <span className="text-[#888] text-[11px]">{unit.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2A2A] font-mono text-[10px] text-[#777] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>AUTOMATED EMAIL CONFIRMATION DISPATCHED INSTANTLY</span>
            <span>COMMERCIAL USAGE RIGHTS INCLUDED</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
