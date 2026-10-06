import React from 'react';
import { Link } from 'wouter';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-2xl mx-auto px-4 sm:px-8 py-20 text-center">
        <div className="border border-[var(--line)] bg-[var(--bg)] p-8 sm:p-12 rounded-[2px] shadow-sm">
          <div className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-bold mb-2">
            HARDWARE ERROR // DIAGNOSTIC CODE 404
          </div>

          <div className="type-display text-6xl sm:text-8xl text-[var(--ink)] my-4">
            404
          </div>

          <h1 className="type-display text-xl sm:text-2xl text-[var(--ink)] mb-4">
            UNIT NOT FOUND ON BUS.
          </h1>

          <p className="font-body text-sm text-[var(--ink-muted)] leading-relaxed mb-8">
            The requested module address does not exist in the Vernox Vision hardware system registry. Check the URL routing or return to the main vault overview.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase px-5 py-2.5 bg-[var(--ink)] text-[var(--bg)] rounded-[2px] hover:bg-[#FF5A1F] hover:text-black transition-colors"
            >
              RETURN TO HOME →
            </Link>

            <Link
              href="/vault"
              className="font-mono text-xs uppercase px-5 py-2.5 border border-[var(--line-strong)] text-[var(--ink)] rounded-[2px] hover:bg-[var(--line)] transition-colors"
            >
              INSPECT VAULT UNITS
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
