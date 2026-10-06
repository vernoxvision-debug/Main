import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { trackPixel } from '@/lib/pixel';
import { SITE_CONFIG } from '@/data/site';

export const ThankYouPage: React.FC = () => {
  useEffect(() => {
    trackPixel('Purchase', {
      value: SITE_CONFIG.price,
      currency: SITE_CONFIG.currency,
      content_name: 'Vernox Vision Creator Asset Vault',
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <div className="border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-12 rounded-[2px] shadow-sm text-center">
          <div className="w-12 h-12 rounded-full bg-[#FF5A1F] text-black font-mono font-bold text-xl flex items-center justify-center mx-auto mb-6">
            ✓
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
            TRANSACTION COMPLETE // SYSTEM DISPATCHED
          </span>

          <h1 className="type-display text-3xl sm:text-5xl text-[var(--ink)] mt-2">
            ACCESS GRANTED.
          </h1>

          <p className="font-body text-base text-[var(--ink-muted)] mt-4 leading-relaxed max-w-xl mx-auto">
            Thank you for purchasing the Vernox Vision vault. Your receipt and direct private Google Drive invitation have been dispatched to your email address by Gumroad.
          </p>

          <div className="mt-8 p-6 bg-[var(--line)]/10 border border-[var(--line)] text-left rounded-[2px] font-mono text-xs space-y-3">
            <div className="text-[var(--ink)] font-bold uppercase">NEXT STEPS PROTOCOL:</div>
            <div>1. Check your inbox for the confirmation email from Gumroad.</div>
            <div>2. Click the &quot;Access Google Drive Vault&quot; button inside your receipt.</div>
            <div>3. Start with <strong className="text-[var(--accent)]">VV—00 Onboarding &amp; Quick-Start Guide</strong>.</div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase px-6 py-3 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] hover:bg-[#FF5A1F] hover:text-black transition-colors"
            >
              RETURN TO SYSTEM HOME →
            </Link>

            <Link
              href="/support"
              className="font-mono text-xs uppercase px-6 py-3 border border-[var(--line-strong)] text-[var(--ink)] rounded-[2px] hover:bg-[var(--line)] transition-colors"
            >
              NEED HELP? CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
