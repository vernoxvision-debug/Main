import React from 'react';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { SignalPath } from '@/components/sections/SignalPath';
import { TactileButton } from '@/components/ui/TactileButton';
import { SITE_CONFIG } from '@/data/site';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="border-b border-[var(--line)] pb-8 mb-12">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            DELIVERY PROTOCOL // STEP-BY-STEP
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            HOW IT WORKS.
          </h1>
          <p className="font-body text-base text-[var(--ink-muted)] mt-4 max-w-2xl leading-relaxed">
            Zero friction. No waiting for physical drives, no subscription logins, and no complex API tokens.
            Everything is delivered instantaneously through Google Drive.
          </p>

          <div className="mt-6">
            <TactileButton
              href={SITE_CONFIG.gumroadUrl}
              variant="orange"
              size="md"
              isExternal={true}
              isBuy={true}
            >
              ORDER THE VAULT ($9.99) ↗
            </TactileButton>
          </div>
        </div>

        {/* Signal Routing Hardware Diagram */}
        <div className="mb-16">
          <SignalPath />
        </div>

        {/* Deep Dive into Google Drive Delivery */}
        <div id="drive" className="border border-[var(--line)] bg-[var(--line)]/10 p-6 sm:p-10 rounded-[2px] mb-12">
          <span className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest">
            STORAGE & PIPELINE INFRASTRUCTURE
          </span>
          <h3 className="type-display text-2xl sm:text-3xl text-[var(--ink)] mt-2">
            THE PRIVATE GOOGLE DRIVE VAULT.
          </h3>
          <p className="font-body text-sm text-[var(--ink-muted)] mt-3 leading-relaxed max-w-3xl">
            Why Google Drive? Because every creator and video editor already knows how to use it.
            You don&apos;t have to download 100 gigabytes of footage to your local machine at once.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="border border-[var(--line)] bg-[var(--bg)] p-5 rounded-[2px]">
              <div className="font-mono text-xs font-bold text-[var(--ink)] mb-2">
                01 // STREAM OR DOWNLOAD
              </div>
              <p className="font-body text-xs text-[var(--ink-muted)] leading-relaxed">
                Stream full HD previews directly inside Drive before downloading only the clips you need for today&apos;s edit.
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--bg)] p-5 rounded-[2px]">
              <div className="font-mono text-xs font-bold text-[var(--ink)] mb-2">
                02 // GOOGLE DRIVE SHORTCUT
              </div>
              <p className="font-body text-xs text-[var(--ink-muted)] leading-relaxed">
                Add a shortcut directly to your own Google Drive with one click. Access files seamlessly across desktop and mobile.
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--bg)] p-5 rounded-[2px]">
              <div className="font-mono text-xs font-bold text-[var(--ink)] mb-2">
                03 // LIFETIME INVITATION
              </div>
              <p className="font-body text-xs text-[var(--ink-muted)] leading-relaxed">
                Your permission link remains valid forever. Even if you switch computers, your vault access remains permanently linked.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
