import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  FileArchive,
  FileText,
  Film,
  Folder,
  FolderCheck,
  FolderOpen,
  Layers,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
  X,
  Zap,
} from 'lucide-react';
import introVideo from '@assets/My_Friend_Arjun_is_going_to_do_1786815898204.mp4';
import mobileIntroVideo from '@assets/Mobile_Intro.mp4';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const PRODUCT_URL = import.meta.env.VITE_GUMROAD_PRODUCT_URL || 'https://vernoxvision.gumroad.com/l/vernoxvision';
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID ?? '';
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL ?? 'support@vernoxvision.com';

type PixelName = 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Purchase';
declare global { interface Window { fbq?: (...args: unknown[]) => void; _fbq?: unknown; } }

function pixel(event: PixelName, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq('track', event, params);
}

function usePixel(event: PixelName, params?: Record<string, unknown>) {
  const fired = useRef(false);
  useEffect(() => {
    if (!fired.current) { fired.current = true; pixel(event, params); }
  }, [event, params]);
}

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(232_31%_8%)] px-4 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <Link href="/" className="text-base sm:text-lg font-bold tracking-[-.05em]" data-testid="link-footer-home">
              VERNOX<span className="text-[hsl(var(--primary))]">/</span>VISION
            </Link>
            <p className="mt-3 max-w-xs text-xs sm:text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              15,000+ curated video assets, viral hooks, and creator frameworks for high-retention content.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-[hsl(var(--muted-foreground))]">
            <Link href="/refund-policy" className="transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-footer-refund">Refund policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-footer-terms">Terms</Link>
            <Link href="/privacy" className="transition-colors hover:text-[hsl(var(--foreground))]" data-testid="link-footer-privacy">Privacy</Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-[hsl(var(--border))] pt-5 text-[11px] text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vernox Vision. All rights reserved.</span>
          <a href="https://madhankumart.in" target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-madpixel">Website Made By MadPixel</a>
        </div>
      </div>
    </footer>
  );
}

function BuyButton({ compact = false }: { compact?: boolean }) {
  const [notice, setNotice] = useState(false);
  const handleBuy = (e?: React.MouseEvent) => {
    pixel('InitiateCheckout', { value: 9.99, currency: 'USD', content_name: 'Vernox Vision Video Archive' });
    if (!PRODUCT_URL) {
      if (e) e.preventDefault();
      setNotice(true);
    }
  };

  const btnClasses = `button-lift group inline-flex items-center justify-center gap-2.5 rounded-full bg-[hsl(var(--primary))] font-semibold text-[hsl(var(--primary-foreground))] shadow-[0_10px_30px_hsl(72_96%_65%/.15)] cursor-pointer text-center select-none ${
    compact ? 'px-4 py-2.5 text-xs sm:text-sm' : 'w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base'
  }`;

  return (
    <div className={`relative ${compact ? 'inline-block' : 'w-full sm:w-auto inline-block'}`}>
      {PRODUCT_URL ? (
        <a
          href={PRODUCT_URL}
          onClick={handleBuy}
          className={`gumroad-button ${btnClasses}`}
          data-testid="button-buy-now"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now for $9.99 <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      ) : (
        <button onClick={() => handleBuy()} className={btnClasses} data-testid="button-buy-now">
          Buy Now for $9.99 <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      )}
      {notice && (
        <div className="absolute left-0 sm:left-auto sm:right-0 top-[calc(100%+12px)] z-30 w-[min(300px,calc(100vw-32px))] rounded-2xl border border-[hsl(var(--accent)/.35)] bg-[hsl(232_28%_14%)] p-4 text-left shadow-2xl" data-testid="status-gumroad-placeholder">
          <div className="flex items-start gap-2">
            <CircleAlert size={16} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" />
            <p className="text-xs leading-5 text-[hsl(var(--foreground)/.82)]">
              Checkout is configured for <code>{PRODUCT_URL}</code>.
            </p>
            <button onClick={() => setNotice(false)} aria-label="Close checkout notice" className="ml-auto text-[hsl(var(--muted-foreground))] p-1" data-testid="button-close-checkout-notice">
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function IntroSequence({ onReveal }: { onReveal: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const completed = useRef(false);

  const handleFinish = () => {
    if (completed.current) return;
    completed.current = true;
    setFading(true);
    onReveal();
    setTimeout(() => {
      setVisible(false);
    }, 600);
  };

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && (
      window.innerWidth < 768 ||
      window.matchMedia('(max-width: 768px)').matches ||
      (window.matchMedia('(orientation: portrait)').matches && window.innerWidth <= 1024)
    );

    const activeVid = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    const inactiveVid = isMobile ? desktopVideoRef.current : mobileVideoRef.current;

    if (inactiveVid) {
      try {
        inactiveVid.pause();
      } catch {
        // ignore
      }
    }

    if (activeVid) {
      activeVid.defaultMuted = true;
      activeVid.muted = true;
      activeVid.setAttribute('muted', '');
      activeVid.setAttribute('playsinline', '');
      activeVid.setAttribute('webkit-playsinline', '');
      const playPromise = activeVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          handleFinish();
        });
      }
    }

    // Safety fallback timer in case of slow decoder or playback blocker
    const timer = setTimeout(() => {
      handleFinish();
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(232_31%_7%)] transition-opacity duration-600 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
      data-testid="intro-video"
    >
      {/* Mobile Vertical Intro Video (Visible exclusively on phones and mobile viewports) */}
      <video
        ref={mobileVideoRef}
        key="mobile-intro-video"
        src={mobileIntroVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={handleFinish}
        onError={handleFinish}
        className="h-full w-full object-cover block md:hidden"
        data-testid="video-intro-mobile"
      />

      {/* Desktop Widescreen Intro Video (Visible exclusively on laptops/desktops) */}
      <video
        ref={desktopVideoRef}
        key="desktop-intro-video"
        src={introVideo}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onEnded={handleFinish}
        onError={handleFinish}
        className="h-full w-full object-cover hidden md:block"
        data-testid="video-intro-desktop"
      />

      <button
        onClick={handleFinish}
        className="button-lift absolute right-4 top-4 sm:right-6 sm:top-6 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-mono tracking-wider text-white/90 shadow-lg backdrop-blur-md hover:bg-black/90 hover:text-white"
        data-testid="button-skip-intro"
        aria-label="Skip intro video"
      >
        Skip Intro <span>→</span>
      </button>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute left-0 right-0 top-0 z-30 px-4 py-4 sm:px-8 sm:py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-base sm:text-lg font-bold tracking-[-.04em]" data-testid="link-header-home">
          VERNOX<span className="text-[hsl(var(--primary))]">/</span>VISION
        </Link>
        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <a href="#included" className="eyebrow hover:text-[hsl(var(--foreground))] transition-colors" data-testid="link-header-included">Inside the archive</a>
          <a href="#faq" className="eyebrow hover:text-[hsl(var(--foreground))] transition-colors" data-testid="link-header-faq">FAQ</a>
          <BuyButton compact />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.85)] backdrop-blur text-[hsl(var(--foreground))] md:hidden"
          aria-label="Toggle menu"
          data-testid="button-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.98)] p-5 shadow-2xl backdrop-blur-xl md:hidden">
          <a onClick={() => setOpen(false)} href="#included" className="text-sm font-medium py-1 transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-mobile-included">Inside the archive</a>
          <a onClick={() => setOpen(false)} href="#faq" className="text-sm font-medium py-1 transition-colors hover:text-[hsl(var(--primary))]" data-testid="link-mobile-faq">FAQ</a>
          <div className="pt-2">
            <BuyButton compact />
          </div>
        </div>
      )}
    </header>
  );
}

function Home() {
  const [revealed, setRevealed] = useState(false);
  const reveal = () => setRevealed(true);

  useEffect(() => {
    if (!META_PIXEL_ID || typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!window.fbq) {
      const fbq = (...args: unknown[]) => {
        (window.fbq as unknown as { callMethod?: (...params: unknown[]) => void })?.callMethod
          ? (window.fbq as unknown as { callMethod: (...params: unknown[]) => void }).callMethod(...args)
          : ((window._fbq as unknown[] | undefined) ??= []).push(args);
      };
      window.fbq = fbq;
      window._fbq = [];
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    window.fbq('init', META_PIXEL_ID);
  }, []);

  usePixel('PageView');

  useEffect(() => {
    if (revealed) {
      pixel('ViewContent', { content_name: 'Vernox Vision Video Archive', value: 9.99, currency: 'USD' });
    }
  }, [revealed]);

  return (
    <div className="grain min-h-[100dvh] w-full overflow-x-hidden bg-[hsl(var(--background))]">
      <IntroSequence onReveal={reveal} />
      <main
        className={`w-full transition-opacity duration-700 ${revealed ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!revealed}
        style={{ willChange: 'opacity' }}
      >
        <Header />

        {/* HERO SECTION */}
        <section className="site-grid relative flex min-h-[100dvh] w-full items-center px-4 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-20">
          <div className="pointer-events-none absolute -right-20 top-28 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-[hsl(var(--primary)/.08)] blur-3xl" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 sm:gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div className="reveal max-w-2xl">
              <div className="eyebrow mb-4 sm:mb-6 flex items-center gap-2 text-[hsl(var(--primary))]">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
                The visual archive for creators
              </div>
              <h1 className="display text-[clamp(2.5rem,8.5vw,7.2rem)]">
                Stop hunting.<br />
                <span className="outline-text">Start making.</span>
              </h1>
              <p className="mt-5 sm:mt-7 max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
                15,000+ usable video assets, viral clip bundles, and growth cheat codes for the days your idea is ready but your camera roll is not.
              </p>
              <div className="mt-8 sm:mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <BuyButton />
                <span className="mono text-[11px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">
                  Instant Google Drive Access · Lifetime License
                </span>
              </div>
            </div>

            <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[340px] sm:max-w-md lg:ml-auto">
              <ArchiveVisual />
              <div className="absolute -bottom-4 left-0 sm:-bottom-5 sm:-left-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.95)] px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-xl backdrop-blur">
                <div className="mono text-[9px] sm:text-[10px] text-[hsl(var(--muted-foreground))]">GOOGLE DRIVE VAULT</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs sm:text-sm font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" /> 15,000+ Files Ready
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-8 hidden items-center gap-2 text-[hsl(var(--muted-foreground))] lg:flex">
            <span className="eyebrow">Scroll to explore</span>
            <ArrowDown size={14} />
          </div>
        </section>

        {/* SECTION 01: INSIDE THE ARCHIVE (REAL DRIVE CONTENTS) */}
        <section id="included" className="relative px-4 py-20 sm:px-8 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
              <div>
                <div className="eyebrow text-[hsl(var(--accent))]">01 / Inside the archive</div>
                <h2 className="display mt-4 max-w-sm text-4xl sm:text-6xl lg:text-7xl">
                  What's inside<br />
                  <span className="text-[hsl(var(--primary))]">the vault.</span>
                </h2>
                <p className="mt-4 max-w-xs text-xs sm:text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  Categorized Google Drive folders loaded with high-retention video assets and creator frameworks.
                </p>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                <ArchiveCard
                  icon={<Zap size={20} />}
                  tag="5,000+ Clips"
                  title="Viral TikTok & Social Clips"
                  text="High-energy hooks, viral cutaways, trending dynamic footage, and fast-paced edits built for TikTok, Reels, and Shorts."
                />
                <ArchiveCard
                  icon={<Film size={20} />}
                  tag="3,100+ Clips"
                  title="Speaker & Motivation Vault"
                  text="Curated podcasts, cinematic wisdom cuts, keynote speeches, and deep mindset soundbites for high-engagement pages."
                />
                <ArchiveCard
                  icon={<Layers size={20} />}
                  tag="3,000+ Clips"
                  title="Luxury Posts & Lifestyle"
                  text="Aesthetic hypercars, penthouses, luxury travel, private jets, and opulent b-roll footage tailored for finance & aesthetic creators."
                />
                <ArchiveCard
                  icon={<Video size={20} />}
                  tag="2,500+ Clips"
                  title="Rich Vlogs & Omegle Formats"
                  text="Real-world conversations, candid reaction assets, lifestyle vlogs, and street interactions ready to edit into viral stories."
                />
                <ArchiveCard
                  icon={<Calendar size={20} />}
                  tag="PDF Frameworks"
                  title="30-Day Content Calendar"
                  text="A proven daily posting roadmap with strategic themes, timing breakdowns, and content pillars to eliminate creator block."
                />
                <ArchiveCard
                  icon={<BookOpen size={20} />}
                  tag="PDF Cheat Codes"
                  title="Caption Vault & Growth Codes"
                  text="Plug-and-play high-converting captions, algorithm growth cheat codes, and the official START HERE onboarding guide."
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: THE PROBLEM */}
        <section className="border-y border-[hsl(var(--border))] bg-[hsl(231_18%_13%)] px-4 py-20 sm:px-8 sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-14">
            <div>
              <div className="eyebrow mb-4 text-[hsl(var(--secondary))]">02 / The problem with starting from zero</div>
              <h2 className="display max-w-lg text-4xl sm:text-6xl lg:text-7xl">
                Your best idea should not die in a search tab.
              </h2>
            </div>
            <div className="space-y-6 text-[hsl(var(--muted-foreground))]">
              <p className="text-lg sm:text-xl leading-relaxed text-[hsl(var(--foreground)/.9)]">
                The blank timeline is expensive. Not in money — in momentum.
              </p>
              <p className="max-w-lg text-sm sm:text-base leading-relaxed">
                Vernox Vision gives creators a private shelf of footage to pull from when the concept is clear, the deadline is close, and another hour of hunting is not the answer.
              </p>
              <div className="flex items-center gap-3 border-l-2 border-[hsl(var(--primary))] pl-4 sm:pl-5 text-sm text-[hsl(var(--foreground))]">
                <Sparkles size={17} className="shrink-0 text-[hsl(var(--primary))]" />
                Find the feeling first. Build the story around it.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: THE OFFER */}
        <section className="px-4 py-20 sm:px-8 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 border-b border-[hsl(var(--border))] pb-8 sm:flex-row sm:items-end">
              <div>
                <div className="eyebrow text-[hsl(var(--accent))]">03 / A clear offer</div>
                <h2 className="display mt-3 text-4xl sm:text-6xl lg:text-7xl">
                  The whole vault.<br />
                  <span className="text-[hsl(var(--primary))]">$9.99 once.</span>
                </h2>
              </div>
              <div className="max-w-xs text-xs sm:text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                No subscription. No complicated tiers. Lifetime access to 15,000+ files and future updates.
              </div>
            </div>
            <div className="grid gap-8 pt-8 sm:pt-10 md:grid-cols-[1fr_auto] md:items-end">
              <ul className="grid gap-3.5 sm:grid-cols-2">
                {[
                  '15,000+ categorized video assets & viral clips',
                  '6 Core Bundles: Lifestyle, Luxury, Motivation, Viral, Vlogs, Omegle',
                  'Bonus: VERNØX 30-Day Content Calendar & Posting Strategy',
                  'Bonus: VERNØX Caption Vault & Growth Cheat Codes',
                  'START HERE.pdf Onboarding & Quick-Start Guide',
                  'Instant Google Drive link & Gumroad email delivery',
                  'Commercial and personal license for your finished videos',
                  'One-time payment of $9.99 with lifetime access',
                ].map((item) => (
                  <li className="flex items-start gap-3 text-xs sm:text-sm text-[hsl(var(--foreground)/.85)]" key={item}>
                    <Check size={16} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />
                    {item}
                  </li>
                ))}
              </ul>
              <BuyButton />
            </div>
          </div>
        </section>

        {/* SECTION 04: FAQ */}
        <section id="faq" className="site-grid border-t border-[hsl(var(--border))] px-4 py-20 sm:px-8 sm:py-28 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-14">
            <div>
              <div className="eyebrow text-[hsl(var(--secondary))]">04 / Good questions</div>
              <h2 className="display mt-4 text-4xl sm:text-6xl lg:text-7xl">
                Before you<br />
                <span className="outline-text">open it.</span>
              </h2>
            </div>
            <div>
              <Faq
                q="How do I receive the files?"
                a="Checkout is securely processed through Gumroad. Immediately upon purchase, you receive instant access to the private Google Drive repository containing all 6 categorized bundle folders and PDF bonuses, plus an instant confirmation email."
              />
              <Faq
                q="What bundles and files are included?"
                a="You get full access to: Lifestyle Bundle, Luxury Posts Bundle (3,000+ Luxy posts), Omegle Video Bundle, Rich Vlogs Bundle, Speaker Motivational Clips Vault (3,100+ clips), Viral TikTok Clips Bundle, plus the START HERE.pdf, 30-Day Content Calendar, Caption Vault, and Social Media Growth Cheat Codes."
              />
              <Faq
                q="Can I use the footage commercially in client or monetized videos?"
                a="Yes! You have full rights to use any clips in your own finished social media videos, YouTube channels, monetized reels, TikToks, client edits, and paid advertisements. (Reselling or redistributing the raw unedited bundle itself is prohibited)."
              />
              <Faq
                q="Do I need a paid Google Drive account to download?"
                a="No. You can preview, stream, and download the folders directly from Google Drive on any device (phone, tablet, Mac, PC) using a standard free Google account or directly in your web browser."
              />
              <Faq
                q="What is the refund policy?"
                a="Because this is an instantly delivered digital asset vault with immediate Google Drive access, all sales are final once delivered. If you encounter any delivery questions, our support team at support@vernoxvision.com will assist you immediately."
              />
            </div>
          </div>
        </section>

        {/* SECTION 05: FINAL CTA */}
        <section className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32 lg:py-40">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 sm:h-96 sm:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary)/.07)] blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="eyebrow text-[hsl(var(--primary))]">Open when you are ready</div>
            <h2 className="display mt-5 text-4xl sm:text-7xl lg:text-8xl">
              Make the next<br />
              <span className="text-[hsl(var(--primary))]">frame count.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-xs sm:text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              15,000+ places to begin. One small decision to stop starting from zero.
            </p>
            <div className="mt-8 sm:mt-9 flex justify-center">
              <BuyButton />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

function ArchiveVisual() {
  const folders = [
    { name: '1. Viral TikTok Clips Bundle', count: '5,000+ clips', color: 'from-lime-500/20 to-lime-500/5' },
    { name: '2. Speaker Motivation Vault', count: '3,100+ clips', color: 'from-cyan-500/20 to-cyan-500/5' },
    { name: '3. Luxury Posts & Lifestyle', count: '3,000+ clips', color: 'from-amber-500/20 to-amber-500/5' },
    { name: '4. Rich Vlogs & Omegle Series', count: '2,500+ clips', color: 'from-purple-500/20 to-purple-500/5' },
    { name: 'VERNØX - 30-Day Content Calendar.pdf', count: 'Strategy Guide', isPdf: true, color: 'from-rose-500/20 to-rose-500/5' },
    { name: 'VERNØX - Caption Vault & Cheat Codes.pdf', count: 'Growth Framework', isPdf: true, color: 'from-emerald-500/20 to-emerald-500/5' },
  ];

  return (
    <div className="relative rotate-1 sm:rotate-2 rounded-[1.75rem] sm:rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(232_28%_12%/.96)] p-3.5 sm:p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--primary))]" />
          <span className="mono text-[10px] sm:text-[11px] font-semibold text-[hsl(var(--foreground))] tracking-wider">
            VERNØX DRIVE REPOSITORY
          </span>
        </div>
        <span className="mono text-[9px] text-[hsl(var(--muted-foreground))] uppercase">15,000+ Files</span>
      </div>

      <div className="flex flex-col gap-2">
        {folders.map((item, i) => (
          <div
            key={item.name}
            className={`flex items-center justify-between gap-3 rounded-xl border border-[hsl(var(--border)/.6)] bg-gradient-to-r ${item.color} px-3 py-2.5 transition-transform duration-200 hover:translate-x-1`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {item.isPdf ? (
                <FileText size={16} className="shrink-0 text-red-400" />
              ) : (
                <Folder size={16} className="shrink-0 text-[hsl(var(--primary))]" />
              )}
              <span className="truncate text-xs font-medium text-[hsl(var(--foreground))]">
                {item.name}
              </span>
            </div>
            <span className="shrink-0 mono text-[9px] sm:text-[10px] text-[hsl(var(--muted-foreground))]">
              {item.count}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg">
        <FolderCheck size={20} className="sm:w-[22px] sm:h-[22px]" />
      </div>
    </div>
  );
}

function ArchiveCard({
  icon,
  tag,
  title,
  text,
}: {
  icon: ReactNode;
  tag: string;
  title: string;
  text: string;
}) {
  return (
    <div className="archive-card rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.6)] p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))]">
            {icon}
          </div>
          <span className="mono text-[10px] rounded-full border border-[hsl(var(--primary)/.3)] bg-[hsl(var(--primary)/.08)] px-2.5 py-1 text-[hsl(var(--primary))]">
            {tag}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-[hsl(var(--foreground))]">{title}</h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{text}</p>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(var(--border))]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left text-sm sm:text-base font-medium cursor-pointer"
        data-testid={`button-faq-${q.slice(0, 12).replace(/\s/g, '-').toLowerCase()}`}
      >
        <span>{q}</span>
        <ChevronDown size={17} className={`shrink-0 text-[hsl(var(--primary))] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="max-w-2xl pb-4 sm:pb-5 pr-6 sm:pr-8 text-xs sm:text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{a}</p>}
    </div>
  );
}

const policyContent: Record<string, { label: string; title: string; sections: string[][] }> = {
  '/terms': {
    label: 'Terms of Service',
    title: 'A clear agreement for a digital archive.',
    sections: [
      ['Overview', 'Vernox Vision provides instant access to a private Google Drive digital product repository containing 15,000+ video files and creator guides. Purchase, payment, and digital delivery are processed securely through Gumroad at $9.99 USD. By purchasing, you agree to these terms.'],
      ['License and use', 'You are granted a lifetime commercial and personal license to use the supplied footage in your own finished social media posts, ads, client edits, YouTube videos, and productions. You may not resell, redistribute, repackage, sublicense, or share the raw bundle or its Google Drive access link.'],
      ['Payment and delivery', 'Gumroad processes payment securely at $9.99 USD. Delivery is digital and immediate: Gumroad provides your direct Google Drive download link and delivery email after successful purchase.'],
      ['Disclaimers', 'The asset repository is supplied as-is. We do not guarantee specific audience metric outcomes on social platforms. Vernox Vision is not liable for indirect or consequential loss arising from use of the product.'],
      ['Contact', 'Questions and support requests can be sent to ' + SUPPORT_EMAIL + '.'],
    ],
  },
  '/privacy': {
    label: 'Privacy Policy',
    title: 'Your data, handled plainly.',
    sections: [
      ['What we collect', 'We may receive information needed to support a purchase, such as your name and email address. Payment information is handled securely by Gumroad and is not stored directly on Vernox Vision servers. We may also use Meta Pixel to measure visit and conversion metrics.'],
      ['Why we use it', 'Information is used strictly to process and deliver purchases, send updates, respond to support requests, and measure advertising performance. We do not sell personal data to third parties.'],
      ['Third parties and tracking', 'Gumroad acts as the payment and digital-delivery provider. Google Drive hosts the asset repository. Meta may process event and cookie data through Meta Pixel for measurement and retargeting.'],
      ['Your choices', 'You may ask us to access, correct, or delete personal information we hold. Contact ' + SUPPORT_EMAIL + ' with any privacy request.'],
    ],
  },
  '/refund-policy': {
    label: 'Refund Policy',
    title: 'A straightforward policy for instant delivery.',
    sections: [
      ['Digital delivery', 'Vernox Vision is an instantly delivered digital product repository priced at $9.99 USD. Because access to the full Google Drive folders is provided immediately upon purchase, sales are final once delivered.'],
      ['If something goes wrong', 'If you are charged but cannot access your download, or experience any Google Drive access issues, contact ' + SUPPORT_EMAIL + ' with your Gumroad receipt. We will resolve any delivery issues promptly.'],
      ['Refund requests', 'Exceptions to the final-sale policy are considered case by case where required by applicable law or where a duplicate charge has occurred.'],
    ],
  },
};

function PolicyPage({ path }: { path: keyof typeof policyContent }) {
  const content = policyContent[path];
  return (
    <div className="grain min-h-[100dvh] w-full overflow-x-hidden bg-[hsl(var(--background))]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-8 sm:pt-40">
        <Link href="/" className="eyebrow text-[hsl(var(--primary))] hover:text-[hsl(var(--foreground))] transition-colors" data-testid="link-policy-back">
          ← Back to Vernox Vision
        </Link>
        <div className="mt-6 sm:mt-8 border-b border-[hsl(var(--border))] pb-8 sm:pb-12">
          <div className="eyebrow text-[hsl(var(--accent))]">{content.label}</div>
          <h1 className="display mt-4 max-w-3xl text-4xl sm:text-6xl">{content.title}</h1>
          <p className="mt-4 text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="mt-8 sm:mt-12 max-w-2xl space-y-8 text-sm sm:text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
          {content.sections.map(([heading, text]) => (
            <section key={heading} className="space-y-2">
              <h2 className="text-lg sm:text-xl font-semibold text-[hsl(var(--foreground))]">{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ThankYou() {
  usePixel('PageView');
  usePixel('Purchase', { value: 9.99, currency: 'USD', content_name: 'Vernox Vision Video Archive' });
  return (
    <div className="grain min-h-[100dvh] w-full overflow-x-hidden bg-[hsl(var(--background))]">
      <Header />
      <main className="site-grid flex min-h-[calc(100dvh-220px)] items-center px-4 pb-16 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto w-full max-w-3xl">
          <div className="eyebrow text-[hsl(var(--primary))]">Purchase confirmed / welcome in</div>
          <h1 className="display mt-5 max-w-2xl text-4xl sm:text-7xl lg:text-8xl">
            The archive<br />
            <span className="text-[hsl(var(--primary))]">is yours.</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
            Gumroad has sent your Google Drive download link to the email used at checkout. Check your inbox for “Vernox Vision”.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="button-lift flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))]" data-testid="link-thank-you-home">
              Back to the site <ArrowRight size={16} />
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="button-lift rounded-full border border-[hsl(var(--border))] px-6 py-3 text-sm font-semibold hover:bg-[hsl(var(--card))]" data-testid="link-thank-you-support">
              Need help?
            </a>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.5)] p-5">
              <span className="mono text-xs text-[hsl(var(--primary))] font-semibold">01</span>
              <p className="mt-6 text-xs sm:text-sm font-medium">Open your Gumroad confirmation email.</p>
            </div>
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.5)] p-5">
              <span className="mono text-xs text-[hsl(var(--primary))] font-semibold">02</span>
              <p className="mt-6 text-xs sm:text-sm font-medium">Access all 6 Google Drive bundle folders.</p>
            </div>
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.5)] p-5">
              <span className="mono text-xs text-[hsl(var(--primary))] font-semibold">03</span>
              <p className="mt-6 text-xs sm:text-sm font-medium">Deploy the 30-Day Content Calendar & Captions.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/terms"><PolicyPage path="/terms" /></Route>
        <Route path="/privacy"><PolicyPage path="/privacy" /></Route>
        <Route path="/refund-policy"><PolicyPage path="/refund-policy" /></Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
