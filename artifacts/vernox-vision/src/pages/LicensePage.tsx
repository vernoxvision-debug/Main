import React from 'react';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { TactileButton } from '@/components/ui/TactileButton';
import { SITE_CONFIG } from '@/data/site';

export const LicensePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            LEGAL ARCHITECTURE // COMMERCIAL USAGE RIGHTS
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            COMMERCIAL LICENSE.
          </h1>
          <p className="font-body text-base text-[var(--ink-muted)] mt-4 max-w-2xl leading-relaxed">
            Written in blunt, plain language. We want you to create high-retention videos, monetize your accounts, and run client ads without legal fear.
          </p>

          <div className="mt-6">
            <TactileButton
              href={SITE_CONFIG.gumroadUrl}
              variant="orange"
              size="md"
              isExternal={true}
              isBuy={true}
            >
              GET COMMERCIAL ACCESS ($9.99) ↗
            </TactileButton>
          </div>
        </div>

        {/* 2 Columns: CAN DO / CANNOT DO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 sm:p-8 rounded-[2px]">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[var(--line)]">
              <span className="w-3 h-3 rounded-full bg-[#34D399]" />
              <h3 className="font-mono text-base font-bold text-[var(--ink)] uppercase">
                YOU ARE PERMITTED TO [COMMERCIAL USE]
              </h3>
            </div>
            <ul className="space-y-4 font-body text-sm text-[var(--ink)]">
              <li className="flex items-start gap-3">
                <span className="font-mono text-[var(--accent)] font-bold">01</span>
                <div>
                  <strong>Monetize Finished Videos:</strong> You may monetize edited videos on YouTube (AdSense, Sponsorships), TikTok Creator Rewards, and Instagram Reels bonuses.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-[var(--accent)] font-bold">02</span>
                <div>
                  <strong>Commercial Client Work:</strong> Freelancers and agencies may use the clips as b-roll in paid client videos and commercials on Upwork, Fiverr, or retainers.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-[var(--accent)] font-bold">03</span>
                <div>
                  <strong>Paid Advertising Campaigns:</strong> You may use clips in video ad creatives running on Meta Ads (Facebook/Instagram), TikTok Ads, and YouTube Ads.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-[var(--accent)] font-bold">04</span>
                <div>
                  <strong>Full Creative Modification:</strong> Cut, trim, color-grade, speed-ramp, crop to any aspect ratio, and combine with your own footage and audio. No attribution required.
                </div>
              </li>
            </ul>
          </div>

          <div className="border border-[var(--line)] bg-[var(--line)]/10 p-6 sm:p-8 rounded-[2px]">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[var(--line)]">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <h3 className="font-mono text-base font-bold text-[var(--ink)] uppercase">
                YOU ARE STRICTLY PROHIBITED FROM [FORBIDDEN]
              </h3>
            </div>
            <ul className="space-y-4 font-body text-sm text-[var(--ink)]">
              <li className="flex items-start gap-3">
                <span className="font-mono text-[#EF4444] font-bold">01</span>
                <div>
                  <strong>Reselling Raw Files:</strong> You may NOT resell, sublicense, rent, or redistribute the raw, unedited footage or any bundle files to third parties.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-[#EF4444] font-bold">02</span>
                <div>
                  <strong>Public Link Sharing:</strong> You may NOT share the private Google Drive links, folder shortcuts, or download zips on public forums, Discord servers, or Telegram groups.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-[#EF4444] font-bold">03</span>
                <div>
                  <strong>Competing Asset Libraries:</strong> You may NOT repackage the clips into another digital asset bundle, stock website, or template marketplace.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-[#EF4444] font-bold">04</span>
                <div>
                  <strong>Raw Copyright Claims:</strong> You may NOT file Content ID or copyright infringement claims against raw unedited clips.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Factual Summary */}
        <div className="border border-[var(--line)] p-6 font-mono text-xs text-[var(--ink-muted)] leading-relaxed">
          <div className="font-bold text-[var(--ink)] uppercase mb-1">
            SUMMARY OF RIGHTS:
          </div>
          Purchasing Vernox Vision grants you a non-exclusive, non-transferable, worldwide commercial license to incorporate the video assets and growth frameworks into your own original edited productions.
          The single rule is simple: edit the clips into your content. Do not resell our raw files.
        </div>
      </main>

      <Footer />
    </div>
  );
};
