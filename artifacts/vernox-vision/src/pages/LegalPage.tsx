import React from 'react';
import { useLocation } from 'wouter';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';

export const LegalPage: React.FC = () => {
  const [location] = useLocation();

  const getPageData = () => {
    if (location === '/privacy') {
      return {
        title: 'PRIVACY POLICY',
        ident: 'LEGAL PROTOCOL // PRIVACY',
        content: (
          <div className="space-y-6 font-body text-sm text-[var(--ink-muted)] leading-relaxed">
            <div className="bg-[#FF5A1F]/10 border border-[#FF5A1F] p-4 text-xs font-mono text-[var(--ink)]">
              <strong>[CLIENT TODO]:</strong> Replace entity details and jurisdictional notes below prior to scaling cold Meta Ads.
            </div>

            <section>
              <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
                1. INFORMATION WE COLLECT
              </h3>
              <p>
                Vernox Vision operates as a digital asset provider. When you purchase through our site, payment processing is handled exclusively by Gumroad (Gumroad, Inc.). We do not collect, process, or store your credit card or billing details directly.
              </p>
              <p className="mt-2">
                We receive your basic customer order record (email address and transaction identifier) solely to verify your Google Drive vault access permissions and send product update notices.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
                2. LOCAL STORAGE & TRACKING
              </h3>
              <p>
                This website uses browser localStorage solely to store harmless interface preferences (such as your Stage Mode dark/light theme setting and reduced motion preference). We do not run third-party advertising cookies other than the standard Meta Pixel event tracker for paid ad attribution.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
                3. DATA RETENTION & SECURITY
              </h3>
              <p>
                Your private Google Drive vault invitation is associated with the email address provided during Gumroad checkout. You may contact support@vernoxvision.com at any time to request updates to your linked delivery email.
              </p>
            </section>
          </div>
        ),
      };
    }

    if (location === '/refund-policy') {
      return {
        title: 'REFUND POLICY',
        ident: 'LEGAL PROTOCOL // REFUNDS',
        content: (
          <div className="space-y-6 font-body text-sm text-[var(--ink-muted)] leading-relaxed">
            <div className="bg-[#FF5A1F]/10 border border-[#FF5A1F] p-4 text-xs font-mono text-[var(--ink)]">
              <strong>[CLIENT TODO]:</strong> Specify your exact refund guarantee window (e.g., 14-day or all-sales-final policy).
            </div>

            <section>
              <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
                1. DIGITAL ASSET DELIVERY & ACCESS
              </h3>
              <p>
                Due to the immediate, irrevocable nature of digital file access via private Google Drive (granting instant download capability to 15,000+ un-watermarked high-bitrate video clips and PDF guides), access is considered fully consumed upon dispatch of the vault link.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
                2. DEFECTIVE OR ACCIDENTAL CHARGES
              </h3>
              <p>
                If you encounter broken file links, corrupted archive downloads, or duplicate billing errors from Gumroad, please email support@vernoxvision.com with your order number. Our support team will resolve access or issue an immediate refund through Gumroad.
              </p>
            </section>
          </div>
        ),
      };
    }

    // Default to Terms of Service
    return {
      title: 'TERMS OF SERVICE',
      ident: 'LEGAL PROTOCOL // TERMS',
      content: (
        <div className="space-y-6 font-body text-sm text-[var(--ink-muted)] leading-relaxed">
          <div className="bg-[#FF5A1F]/10 border border-[#FF5A1F] p-4 text-xs font-mono text-[var(--ink)]">
            <strong>[CLIENT TODO]:</strong> Customize company registered name, governing law, and arbitration details.
          </div>

          <section>
            <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
              1. ACCEPTANCE OF TERMS
            </h3>
            <p>
              By accessing Vernox Vision (vernoxvision.com) or purchasing the Vernox Vision vault, you agree to be bound by these Terms of Service and all applicable commercial licensing guidelines.
            </p>
          </section>

          <section>
            <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
              2. PRODUCT DELIVERY
            </h3>
            <p>
              The product is delivered exclusively as a digital repository via Google Drive immediately upon completed checkout through Gumroad. No physical discs or hardware shipments are provided.
            </p>
          </section>

          <section>
            <h3 className="font-mono text-base font-bold text-[var(--ink)] mb-2 uppercase">
              3. NO RESELLING POLICY
            </h3>
            <p>
              The customer receives commercial usage rights to incorporate the video assets into monetized original content. Reselling, sublicensing, torrenting, or redistributing the raw unedited files or Google Drive links is strictly prohibited and constitutes copyright infringement.
            </p>
          </section>
        </div>
      ),
    };
  };

  const { title, ident, content } = getPageData();

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="border-b border-[var(--line)] pb-8 mb-8">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            {ident}
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            {title}.
          </h1>
          <div className="font-mono text-xs text-[var(--ink-muted)] mt-2">
            EFFECTIVE DATE: {new Date().getFullYear()} // VERSION 2.0
          </div>
        </div>

        <div className="border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-10 rounded-[2px] shadow-sm">
          {content}
        </div>
      </main>

      <Footer />
    </div>
  );
};
