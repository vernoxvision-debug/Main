import { ArrowLeft, ArrowRight, FileQuestion, HelpCircle, Home, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="grain min-h-[100dvh] w-full overflow-x-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Top Navigation */}
      <header className="absolute left-0 right-0 top-0 z-30 px-4 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-base sm:text-lg font-bold tracking-[-.04em] transition-opacity hover:opacity-80">
            VERNOX<span className="text-[hsl(var(--primary))]">/</span>VISION
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
          >
            <ArrowLeft size={14} /> Back to Site
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Section */}
      <main className="relative flex min-h-[100dvh] items-center justify-center px-4 pt-24 pb-16 sm:px-8">
        {/* Glow ambient background effects */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 sm:h-96 sm:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary)/.08)] blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-rose-500/5 blur-3xl" />

        <div className="relative mx-auto w-full max-w-2xl text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-mono tracking-widest text-red-400 uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            Sector 404 // Coordinate Not Found
          </div>

          {/* Glitch / Vault Big Number */}
          <div className="relative my-4 select-none">
            <h1 className="display text-[clamp(4.5rem,18vw,10rem)] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/50 to-white/10">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[clamp(4.5rem,18vw,10rem)] leading-none font-black text-[hsl(var(--primary)/.15)] blur-md">
                404
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
            Lost inside the vault.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
            The page, file, or sector coordinate you are trying to access does not exist in the Vernox Vision archive or has been moved.
          </p>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="button-lift inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(72_96%_65%/.2)] cursor-pointer"
            >
              <Home size={16} /> Return to Homepage
            </Link>
            <a
              href="mailto:support@vernoxvision.com"
              className="button-lift inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.7)] px-6 py-3 text-sm font-medium text-[hsl(var(--foreground))] backdrop-blur hover:bg-[hsl(232_28%_18%)]"
            >
              <HelpCircle size={16} /> Contact Support
            </a>
          </div>

          {/* System Security & Integrity Panel */}
          <div className="mt-12 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_12%/.8)] p-4 sm:p-5 text-left shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[hsl(var(--border)/.6)] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[hsl(var(--primary))]" />
                <span className="mono text-[11px] font-semibold text-[hsl(var(--foreground))] tracking-wider">
                  ARCHIVE SECURITY STATUS
                </span>
              </div>
              <span className="mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SYSTEMS OPERATIONAL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl border border-[hsl(var(--border)/.4)] bg-[hsl(232_28%_14%/.5)] p-3">
                <div className="mono text-[9px] uppercase text-[hsl(var(--muted-foreground))]">Archive Asset Count</div>
                <div className="mt-1 font-semibold text-[hsl(var(--foreground))]">15,000+ Files Active</div>
              </div>
              <div className="rounded-xl border border-[hsl(var(--border)/.4)] bg-[hsl(232_28%_14%/.5)] p-3">
                <div className="mono text-[9px] uppercase text-[hsl(var(--muted-foreground))]">Checkout Gateway</div>
                <div className="mt-1 font-semibold text-[hsl(var(--foreground))]">Gumroad 256-Bit SSL</div>
              </div>
              <div className="rounded-xl border border-[hsl(var(--border)/.4)] bg-[hsl(232_28%_14%/.5)] p-3">
                <div className="mono text-[9px] uppercase text-[hsl(var(--muted-foreground))]">Storage Host</div>
                <div className="mt-1 font-semibold text-[hsl(var(--foreground))]">Google Cloud Drive</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(232_31%_8%)] px-4 py-8 text-center text-xs text-[hsl(var(--muted-foreground))]">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Vernox Vision. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-[hsl(var(--foreground))] transition-colors">Home</Link>
            <Link href="/terms" className="hover:text-[hsl(var(--foreground))] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[hsl(var(--foreground))] transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-[hsl(var(--foreground))] transition-colors">Refunds</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
