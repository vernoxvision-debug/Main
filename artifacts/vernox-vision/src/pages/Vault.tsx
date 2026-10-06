import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { LineupRow } from '@/components/system/LineupRow';
import { UnitFaceplate } from '@/components/system/UnitFaceplate';
import { TactileButton } from '@/components/ui/TactileButton';
import { UNITS, Unit } from '@/data/units';
import { SITE_CONFIG } from '@/data/site';

export const Vault: React.FC = () => {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState<'all' | 'video' | 'guide'>('all');

  const filteredUnits = UNITS.filter((u) => {
    if (filter === 'all') return true;
    return u.kind === filter;
  });

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Header Section */}
        <div className="border-b border-[var(--line)] pb-8 mb-8">
          <div className="font-mono text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-2">
            HARDWARE DIRECTORY // ALL 07 UNITS
          </div>
          <h1 className="type-display text-4xl sm:text-6xl text-[var(--ink)]">
            THE VV SYSTEM VAULT.
          </h1>
          <p className="font-body text-base text-[var(--ink-muted)] mt-4 max-w-2xl leading-relaxed">
            15,000+ curated video assets and growth frameworks, organized into precision units.
            Select any unit below to inspect full technical specifications, aspect ratios, and NLE workflows.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-[2px] uppercase tracking-wider transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[var(--ink)] text-[var(--bg)] font-bold'
                    : 'border border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
                data-testid="filter-all"
              >
                ALL UNITS (7)
              </button>
              <button
                type="button"
                onClick={() => setFilter('video')}
                className={`px-3 py-1.5 rounded-[2px] uppercase tracking-wider transition-colors cursor-pointer ${
                  filter === 'video'
                    ? 'bg-[var(--ink)] text-[var(--bg)] font-bold'
                    : 'border border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
                data-testid="filter-video"
              >
                VIDEO BUNDLES (4)
              </button>
              <button
                type="button"
                onClick={() => setFilter('guide')}
                className={`px-3 py-1.5 rounded-[2px] uppercase tracking-wider transition-colors cursor-pointer ${
                  filter === 'guide'
                    ? 'bg-[var(--ink)] text-[var(--bg)] font-bold'
                    : 'border border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
                data-testid="filter-guide"
              >
                GUIDE MANUALS (3)
              </button>
            </div>

            <TactileButton
              href={SITE_CONFIG.gumroadUrl}
              variant="orange"
              size="md"
              isExternal={true}
              isBuy={true}
            >
              UNLOCK VAULT — $9.99 ↗
            </TactileButton>
          </div>
        </div>

        {/* Signature Lineup Component */}
        <div className="mb-16">
          <LineupRow />
        </div>

        {/* Detailed Grid of All Units */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="border border-[var(--line)] bg-[var(--line)]/10 p-6 rounded-[2px] flex flex-col justify-between hover:border-[var(--accent)] transition-colors group cursor-pointer"
              onClick={() => setLocation(`/vault/${unit.slug}`)}
              data-testid={`vault-card-${unit.slug}`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--line)]">
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">
                    {unit.code}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                    {unit.kind === 'video' ? '9:16 VIDEO' : 'PDF GUIDE'}
                  </span>
                </div>

                <div className="flex justify-center py-4">
                  <UnitFaceplate unit={unit} isCompact={true} interactive={false} />
                </div>

                <h3 className="type-display text-xl text-[var(--ink)] mt-4 group-hover:text-[var(--accent)] transition-colors">
                  {unit.name}
                </h3>

                <p className="font-body text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                  {unit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--ink)] font-bold">{unit.count}</span>
                <span className="text-[var(--accent)] group-hover:underline">INSPECT UNIT →</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
