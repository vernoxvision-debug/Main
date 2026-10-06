import React from 'react';

export const SignalPath: React.FC = () => {
  const nodes = [
    {
      code: 'PORT 01',
      title: 'CHECKOUT',
      sub: 'GUMROAD PORT',
      detail: '$9.99 one-time payment. No subscription lock. Instant order generation.',
    },
    {
      code: 'PORT 02',
      title: 'RECEIPT',
      sub: 'EMAIL RELAY',
      detail: 'Automated receipt dispatched to your email within seconds with vault link.',
    },
    {
      code: 'PORT 03',
      title: 'DRIVE VAULT',
      sub: 'PRIVATE REPOSITORY',
      detail: 'Access 15,000+ files organized cleanly in Google Drive. Stream or download.',
    },
    {
      code: 'PORT 04',
      title: 'TIMELINE',
      sub: 'NLE IMPORT',
      detail: 'Drop vertical clips into CapCut, Premiere, or DaVinci. Instant b-roll pacing.',
    },
    {
      code: 'PORT 05',
      title: 'DEPLOY',
      sub: 'COMMERCIAL PUBLISH',
      detail: 'Publish to TikTok, Reels, Shorts, or client ads. Full monetization rights.',
    },
  ];

  return (
    <div className="w-full border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-8 rounded-[2px]" data-testid="signal-path-diagram">
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">
            SIGNAL FLOW ARCHITECTURE
          </span>
          <h3 className="type-display text-lg sm:text-2xl mt-1 text-[var(--ink)]">
            HOW IT WORKS // ROUTING DIAGRAM
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-[var(--ink-muted)]">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span>DIRECT PIPELINE</span>
        </div>
      </div>

      {/* Hardware Nodes Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {nodes.map((node, index) => (
          <div
            key={node.code}
            className="relative flex flex-col justify-between border border-[var(--line)] bg-[var(--line)]/10 p-4 rounded-[2px] hover:border-[var(--accent)] transition-colors group"
          >
            {/* Jack port graphic on top */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-muted)]">
                {node.code}
              </span>
              <div className="w-4 h-4 rounded-full border border-[var(--ink-muted)] flex items-center justify-center bg-[var(--bg)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              </div>
            </div>

            <div>
              <div className="font-mono font-bold text-sm tracking-tight text-[var(--ink)]">
                {node.title}
              </div>
              <div className="font-mono text-[10px] uppercase text-[var(--accent)] tracking-wider mt-0.5">
                {node.sub}
              </div>
              <p className="font-body text-xs text-[var(--ink-muted)] mt-2 leading-relaxed">
                {node.detail}
              </p>
            </div>

            {/* Connecting signal indicator on desktop */}
            {index < nodes.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 font-mono text-xs text-[var(--accent)] font-bold">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer bar */}
      <div className="mt-8 pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-[var(--ink-muted)]">
        <span>DELIVERY GUARANTEE: AUTOMATIC DISPATCH UPON CHECKOUT</span>
        <span className="text-[var(--ink)] font-bold">ZERO WAIT TIME</span>
      </div>
    </div>
  );
};
