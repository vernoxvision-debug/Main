import React from 'react';
import { Link, useRoute } from 'wouter';
import { ColumnHeader } from '@/components/layout/ColumnHeader';
import { Footer } from '@/components/layout/Footer';
import { UnitFaceplate } from '@/components/system/UnitFaceplate';
import { SpecTable } from '@/components/ui/SpecTable';
import { TactileButton } from '@/components/ui/TactileButton';
import { UNITS, getUnitBySlug } from '@/data/units';
import { PREVIEWS } from '@/data/previews';
import { SITE_CONFIG } from '@/data/site';
import { NotFound } from './NotFound';

export const UnitDetail: React.FC = () => {
  const [, params] = useRoute('/vault/:slug');
  const slug = params?.slug || '';
  const unit = getUnitBySlug(slug);

  if (!unit) {
    return <NotFound />;
  }

  // Find previous and next units
  const currentIndex = UNITS.findIndex((u) => u.id === unit.id);
  const prevUnit = UNITS[(currentIndex - 1 + UNITS.length) % UNITS.length];
  const nextUnit = UNITS[(currentIndex + 1) % UNITS.length];

  const preview = PREVIEWS[unit.previewKey] || PREVIEWS.viral;

  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors overflow-x-hidden">
      <ColumnHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-8 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--ink-muted)]">
            <Link href="/" className="hover:text-[var(--ink)]">
              SYSTEM
            </Link>
            <span>/</span>
            <Link href="/vault" className="hover:text-[var(--ink)]">
              VAULT
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-bold">{unit.code}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={`/vault/${prevUnit.slug}`}
              className="hover:text-[var(--accent)] transition-colors"
              data-testid="link-prev-unit"
            >
              ← PREV [{prevUnit.code}]
            </Link>
            <span className="text-[var(--line)]">|</span>
            <Link
              href={`/vault/${nextUnit.slug}`}
              className="hover:text-[var(--accent)] transition-colors"
              data-testid="link-next-unit"
            >
              NEXT [{nextUnit.code}] →
            </Link>
          </div>
        </div>

        {/* Hero Product Stage: Giant Typography + Unit Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Spec Sheet Info & Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs px-2.5 py-0.5 bg-[var(--ink)] text-[var(--bg)] font-bold rounded-[1px]">
                  {unit.code}
                </span>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase tracking-wider">
                  {unit.count}
                </span>
              </div>

              <h1 className="type-display text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)]" data-testid="unit-detail-title">
                {unit.name}
              </h1>

              <p className="font-body text-base sm:text-lg text-[var(--ink-muted)] mt-4 leading-relaxed">
                {unit.description}
              </p>
            </div>

            {/* Practical Use Cases (Editor written) */}
            <div className="border-t border-b border-[var(--line)] py-5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-bold mb-3">
                OPTIMAL EDITING USE CASES:
              </h4>
              <ul className="space-y-2 font-body text-xs sm:text-sm text-[var(--ink-muted)]">
                {unit.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="font-mono text-[var(--accent)] font-bold">●</span>
                    <span className="text-[var(--ink)]">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Audience Tags */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-bold mb-2">
                DESIGNED FOR:
              </h4>
              <div className="flex flex-wrap gap-2">
                {unit.bestFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs bg-[var(--line)]/30 border border-[var(--line)] px-2.5 py-1 rounded-[1px] text-[var(--ink)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Buy CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <TactileButton
                href={SITE_CONFIG.gumroadUrl}
                variant="orange"
                size="lg"
                isExternal={true}
                isBuy={true}
              >
                GET FULL VAULT FOR $9.99 ↗
              </TactileButton>

              <span className="font-mono text-[10px] text-[var(--ink-muted)] uppercase">
                INCLUDES ALL 7 HARDWARE MODULES
              </span>
            </div>
          </div>

          {/* Right Column: Physical Faceplate + Vector Poster Preview */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8">
            <UnitFaceplate unit={unit} interactive={false} showReflection={true} />

            {/* Mini Vector Poster Preview Plate */}
            <div className="w-full max-w-[280px] border border-[var(--line)] p-2 bg-[var(--bg)] shadow-sm text-center">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)] mb-1">
                ASSET PREVIEW POSTER // 9:16 SPEC
              </div>
              <img
                src={preview.poster}
                alt={`${unit.name} visual preview poster`}
                className="w-full h-auto rounded-[1px] border border-[var(--line)]"
              />
            </div>
          </div>
        </div>

        {/* Detailed Hardware Spec Table */}
        <div className="mt-12">
          <SpecTable unit={unit} />
        </div>
      </main>

      <Footer />
    </div>
  );
};
