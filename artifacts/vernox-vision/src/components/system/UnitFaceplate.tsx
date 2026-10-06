import React from 'react';
import { Unit } from '@/data/units';
import { Code, Display, Lcd } from '@/components/ui/typography';

export interface UnitFaceplateProps {
  unit: Unit;
  isCompact?: boolean;
  interactive?: boolean;
  showReflection?: boolean;
  className?: string;
  onClick?: () => void;
}

export const UnitFaceplate: React.FC<UnitFaceplateProps> = ({
  unit,
  isCompact = false,
  interactive = true,
  showReflection = false,
  className = '',
  onClick,
}) => {
  const isVideo = unit.kind === 'video';

  return (
    <div className={`relative inline-block select-none ${className}`} data-testid={`unit-faceplate-${unit.slug}`}>
      {/* Physical Hardware Chassis */}
      <div
        onClick={interactive ? onClick : undefined}
        className={`relative rounded-[3px] border border-black/40 overflow-hidden transition-all duration-300 ${
          isCompact
            ? 'w-[200px] h-[310px] p-2.5 text-[10px]'
            : 'w-[260px] sm:w-[280px] h-[390px] sm:h-[420px] p-4 text-xs'
        } ${
          interactive
            ? 'cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)]'
            : ''
        }`}
        style={{
          backgroundColor: unit.chassisHex,
          color: unit.colorway === 'cream' ? '#151515' : '#F2F2F0',
          boxShadow: '0 12px 28px -6px rgba(0,0,0,0.22), 0 2px 5px rgba(0,0,0,0.12)',
        }}
      >
        {/* Subtle chassis surface texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '4px 4px',
          }}
        />

        {/* 4 Corner Screws */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full border border-black/50 flex items-center justify-center opacity-60">
          <div className="w-1 h-[0.5px] bg-black/80" />
        </div>
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full border border-black/50 flex items-center justify-center opacity-60">
          <div className="w-1 h-[0.5px] bg-black/80" />
        </div>
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full border border-black/50 flex items-center justify-center opacity-60">
          <div className="w-1 h-[0.5px] bg-black/80" />
        </div>
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full border border-black/50 flex items-center justify-center opacity-60">
          <div className="w-1 h-[0.5px] bg-black/80" />
        </div>

        {/* Top Header Row: Model Code + LED */}
        <div className="flex items-center justify-between border-b border-black/20 pb-1.5 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Code number={unit.code.replace('VV—', '')} className="text-[11px] sm:text-xs" />
            <span className="font-mono text-[8px] uppercase tracking-wider opacity-60">
              SYS—{unit.order.toString().padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                unit.ledState === 'active'
                  ? 'bg-[#FF5A1F] shadow-[0_0_6px_#FF5A1F]'
                  : 'bg-[#555] opacity-60'
              }`}
            />
            <span className="font-mono text-[8px] tracking-wider text-[#FF5A1F] font-semibold">
              {unit.ledState === 'active' ? 'RDY' : 'STB'}
            </span>
          </div>
        </div>

        {/* Unit Name */}
        <div className="mb-2 min-h-[46px] sm:min-h-[50px] flex flex-col justify-center">
          <h3
            className="uppercase tracking-[-0.035em] text-[13px] sm:text-[14px] leading-[1.08] text-inherit"
            style={{
              fontFamily: 'var(--font-display)',
              fontStretch: '115%',
              fontVariationSettings: '"wdth" 115, "wght" 850',
            }}
          >
            {unit.name}
          </h3>
          <div className="font-mono text-[8px] uppercase tracking-wider opacity-70 mt-1">
            {isVideo ? 'FORMAT 9:16 VERTICAL' : 'STRATEGIC GUIDE MANUAL'}
          </div>
        </div>

        {/* Digital LCD Clip Count Screen */}
        <div className="bg-[#0C0D0F] border border-black/40 rounded-[2px] p-2 mb-3 shadow-inner flex items-center justify-between">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-[#777] mb-0.5">
              {isVideo ? 'ASSET COUNT' : 'DOC FORMAT'}
            </div>
            {isVideo ? (
              <Lcd
                value={unit.count}
                size="sm"
                variant="amber"
                ariaLabel={`${unit.count} assets`}
              />
            ) : (
              <div className="font-mono font-bold text-xs tracking-wider text-[#FF5A1F]">
                {unit.count}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="font-mono text-[7px] uppercase tracking-widest text-[#555]">
              CHANNEL
            </div>
            <div className="font-mono text-[10px] text-[#A0A0A0] font-bold">
              CH—{unit.slug.toUpperCase().slice(0, 3)}
            </div>
          </div>
        </div>

        {/* Key Matrix: 12 Chiclet Hardware Buttons representing clips */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[7px] font-mono uppercase tracking-widest opacity-60 mb-1">
            <span>CLIP ARRAY</span>
            <span>BANK A—D</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-5 sm:h-6 rounded-[2px] bg-black/25 border border-white/10 flex items-center justify-center font-mono text-[8px] opacity-75 shadow-[0_1px_2px_rgba(0,0,0,0.3)] hover:bg-[#FF5A1F]/30 transition-colors"
              >
                {i === 2 || i === 5 ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                ) : (
                  <span className="text-[7px]">{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Micro-Speaker Grille pattern & Barcode */}
        <div className="pt-2 border-t border-black/20 flex items-center justify-between">
          {/* Speaker acoustic perforations */}
          <div className="grid grid-cols-6 gap-1 opacity-50">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-black/70" />
            ))}
          </div>

          {/* Barcode strip */}
          <div className="flex items-center gap-[1.5px] opacity-70">
            <span className="w-[1.5px] h-4 bg-current" />
            <span className="w-[0.5px] h-4 bg-current" />
            <span className="w-[2px] h-4 bg-current" />
            <span className="w-[1px] h-4 bg-current" />
            <span className="w-[3px] h-4 bg-current" />
            <span className="w-[1px] h-4 bg-current" />
            <span className="w-[2px] h-4 bg-current" />
            <span className="w-[0.5px] h-4 bg-current" />
            <span className="w-[2px] h-4 bg-current" />
          </div>
        </div>

        {/* Micro Specification Footer */}
        <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between font-mono text-[7px] uppercase tracking-widest opacity-70 border-t border-black/20 pt-1">
          <span>PORT: DRIVE</span>
          <span>LIC: COMM</span>
        </div>
      </div>

      {/* Mirrored floor reflection for TE-style showcase */}
      {showReflection && (
        <div
          className="relative w-full h-[60px] sm:h-[80px] overflow-hidden pointer-events-none transform scale-y-[-1] opacity-25"
          style={{
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          }}
          aria-hidden="true"
        >
          <div
            className={`w-full h-full rounded-[3px]`}
            style={{ backgroundColor: unit.chassisHex }}
          />
        </div>
      )}
    </div>
  );
};
