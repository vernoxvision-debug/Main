import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowRight, Check, ChevronDown, CircleAlert, FileArchive, Film, FolderOpen, LockKeyhole, Menu, Sparkles, X, Zap } from 'lucide-react';
import introVideo from '@assets/My_Friend_Arjun_is_going_to_do_1786815898204.mp4';
import {
  Link,
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const PRODUCT_URL = ''; // LAUNCH: set to the live Gumroad product URL.
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID ?? ''; // LAUNCH: set the Meta Pixel ID.
const SUPPORT_EMAIL = 'support@vernoxvision.com'; // LAUNCH: confirm this inbox.

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
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(232_31%_8%)] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <Link href="/" className="text-lg font-bold tracking-[-.05em]" data-testid="link-footer-home">VERNOX<span className="text-[hsl(var(--primary))]">/</span>VISION</Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">A private archive of visual momentum for people who make things move.</p>
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
  const handleBuy = () => {
    pixel('InitiateCheckout', { value: 9, currency: 'USD', content_name: 'Vernox Vision Video Archive' });
    if (PRODUCT_URL) {
      window.open(PRODUCT_URL, '_blank', 'noopener,noreferrer');
    } else setNotice(true);
  };
  return (
    <div className="relative">
      <button onClick={handleBuy} className={`button-lift group flex items-center justify-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 font-semibold text-[hsl(var(--primary-foreground))] shadow-[0_10px_30px_hsl(72_96%_65%/.13)] ${compact ? 'text-sm' : 'text-base'}`} data-testid="button-buy-now">
        Buy Now for $9 <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
      </button>
      {notice && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-20 w-[min(290px,calc(100vw-40px))] rounded-2xl border border-[hsl(var(--accent)/.35)] bg-[hsl(232_28%_14%)] p-4 text-left shadow-2xl" data-testid="status-gumroad-placeholder">
          <div className="flex items-start gap-2"><CircleAlert size={16} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" /><p className="text-xs leading-5 text-[hsl(var(--foreground)/.82)]">Checkout is being connected. The live Gumroad URL will appear here before launch.</p><button onClick={() => setNotice(false)} aria-label="Close checkout notice" className="ml-auto text-[hsl(var(--muted-foreground))]" data-testid="button-close-checkout-notice"><X size={14} /></button></div>
        </div>
      )}
    </div>
  );
}

function IntroSequence({ onReveal }: { onReveal: () => void }) {
  const [stage, setStage] = useState<'video' | 'done'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const reveal = () => { setStage('done'); onReveal(); };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(reveal);
  }, []);
  if (stage === 'done') return null;
  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-[hsl(232_31%_7%)]" data-testid="intro-video">
      <video
        ref={videoRef}
        src={introVideo}
        autoPlay
        muted
        playsInline
        controls={false}
        onEnded={reveal}
        onError={reveal}
        className="h-full w-full object-cover"
        data-testid="video-intro"
      />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="absolute left-0 right-0 top-0 z-20 px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/" className="text-sm font-bold tracking-[-.04em]" data-testid="link-header-home">VERNOX<span className="text-[hsl(var(--primary))]">/</span>VISION</Link><div className="hidden items-center gap-7 md:flex"><a href="#included" className="eyebrow hover:text-[hsl(var(--foreground))]" data-testid="link-header-included">Inside the archive</a><a href="#faq" className="eyebrow hover:text-[hsl(var(--foreground))]" data-testid="link-header-faq">FAQ</a><BuyButton compact /></div><button onClick={() => setOpen(!open)} className="rounded-full border border-[hsl(var(--border))] p-2.5 md:hidden" aria-label="Toggle menu" data-testid="button-menu">{open ? <X size={16} /> : <Menu size={16} />}</button></div>{open && <div className="mx-auto mt-4 flex max-w-6xl flex-col gap-4 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.96)] p-5 backdrop-blur md:hidden"><a onClick={() => setOpen(false)} href="#included" className="text-sm" data-testid="link-mobile-included">Inside the archive</a><a onClick={() => setOpen(false)} href="#faq" className="text-sm" data-testid="link-mobile-faq">FAQ</a><BuyButton compact /></div>}</header>;
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
  useEffect(() => { if (revealed) pixel('ViewContent', { content_name: 'Vernox Vision Video Archive', value: 9, currency: 'USD' }); }, [revealed]);
  return <div className="grain min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]"><IntroSequence onReveal={reveal} /><main className={`transition-opacity duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`} aria-hidden={!revealed}><Header />
    <section className="site-grid relative flex min-h-[100dvh] items-end px-5 pb-16 pt-32 sm:items-center sm:px-8 sm:pb-20"><div className="pointer-events-none absolute -right-20 top-28 h-80 w-80 rounded-full bg-[hsl(var(--primary)/.07)] blur-3xl" /><div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_.85fr] lg:gap-20"><div className="reveal max-w-2xl"><div className="eyebrow mb-6 flex items-center gap-2 text-[hsl(var(--primary))]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" /> The visual archive for creators</div><h1 className="display text-[clamp(3.6rem,14vw,8.8rem)]">Stop hunting.<br /><span className="outline-text">Start making.</span></h1><p className="mt-7 max-w-md text-base leading-7 text-[hsl(var(--muted-foreground))] sm:text-lg">15,000+ usable video assets for the days your idea is ready but your camera roll is not.</p><div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"><BuyButton /><span className="mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">One-time access · instant delivery</span></div></div><div className="reveal reveal-delay-2 relative mx-auto w-full max-w-md lg:ml-auto"><ArchiveVisual /><div className="absolute -bottom-5 -left-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.92)] px-4 py-3 backdrop-blur"><div className="mono text-[10px] text-[hsl(var(--muted-foreground))]">ARCHIVE STATUS</div><div className="mt-1 flex items-center gap-2 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" /> Ready to use</div></div></div></div><div className="absolute bottom-7 right-8 hidden items-center gap-2 text-[hsl(var(--muted-foreground))] sm:flex"><span className="eyebrow">Scroll to explore</span><ArrowDown size={14} /></div></section>
    <section id="included" className="relative px-5 py-24 sm:px-8 sm:py-36"><div className="mx-auto max-w-6xl"><div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><div className="eyebrow text-[hsl(var(--accent))]">01 / Inside the archive</div><h2 className="display mt-5 max-w-sm text-5xl sm:text-7xl">A better<br /><span className="text-[hsl(var(--primary))]">starting point.</span></h2></div><div className="grid gap-3 sm:grid-cols-2"><ArchiveCard icon={<Film />} title="15,000+ clips" text="A deep reservoir of motion, texture, atmosphere, and visual punctuation." /><ArchiveCard icon={<FolderOpen />} title="Made to browse" text="An organized collection built for the moment an idea needs a visual." /><ArchiveCard icon={<Zap />} title="Scroll-stopping energy" text="Footage that gives a short, reel, ad, or edit an immediate pulse." /><ArchiveCard icon={<LockKeyhole />} title="One clean purchase" text="Pay once through Gumroad. Get your download link instantly." /></div></div></div></section>
    <section className="border-y border-[hsl(var(--border))] bg-[hsl(231_18%_13%)] px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center"><div><div className="eyebrow mb-5 text-[hsl(var(--secondary))]">02 / The problem with starting from zero</div><h2 className="display max-w-lg text-5xl sm:text-7xl">Your best idea should not die in a search tab.</h2></div><div className="space-y-7 text-[hsl(var(--muted-foreground))]"><p className="text-xl leading-8 text-[hsl(var(--foreground)/.9)]">The blank timeline is expensive. Not in money — in momentum.</p><p className="max-w-lg leading-7">Vernox Vision gives creators a private shelf of footage to pull from when the concept is clear, the deadline is close, and another hour of hunting is not the answer.</p><div className="flex items-center gap-3 border-l-2 border-[hsl(var(--primary))] pl-5 text-sm text-[hsl(var(--foreground))]"><Sparkles size={17} className="shrink-0 text-[hsl(var(--primary))]" /> Find the feeling first. Build the story around it.</div></div></div></section>
    <section className="px-5 py-24 sm:px-8 sm:py-36"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-7 border-b border-[hsl(var(--border))] pb-8 sm:flex-row sm:items-end"><div><div className="eyebrow text-[hsl(var(--accent))]">03 / A clear offer</div><h2 className="display mt-4 text-5xl sm:text-7xl">The whole vault.<br /><span className="text-[hsl(var(--primary))]">$9 once.</span></h2></div><div className="max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">No subscription. No complicated tiers. Just an archive you can reach for whenever the next idea arrives.</div></div><div className="grid gap-12 pt-10 md:grid-cols-[1fr_auto] md:items-end"><ul className="grid gap-4 sm:grid-cols-2">{['15,000+ video assets', 'Instant Gumroad delivery', 'Built for short-form and social edits', 'Personal and commercial use — verify final license before launch'].map((item) => <li className="flex items-start gap-3 text-sm text-[hsl(var(--foreground)/.85)]" key={item}><Check size={17} className="mt-0.5 shrink-0 text-[hsl(var(--primary))]" />{item}</li>)}</ul><BuyButton /></div></div></section>
    <section id="faq" className="site-grid border-t border-[hsl(var(--border))] px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.65fr_1.35fr]"><div><div className="eyebrow text-[hsl(var(--secondary))]">04 / Good questions</div><h2 className="display mt-5 text-5xl sm:text-7xl">Before you<br /><span className="outline-text">open it.</span></h2></div><div><Faq q="How do I receive the files?" a="Checkout is handled through Gumroad. Once the purchase is complete, Gumroad provides the download link and delivery email instantly." /><Faq q="Can I use the footage commercially?" a="The archive is intended for creator and commercial projects. Please review and confirm the final license terms for the supplied assets before launch; licensing language is a launch-time placeholder." /><Faq q="Can I resell or share the bundle?" a="No. You may use the footage in your own finished work, but you may not redistribute, resell, repackage, or share the raw bundle." /><Faq q="What is the refund policy?" a="Because this is an instantly delivered digital product, sales are currently planned as final. Review the full refund policy and make sure it matches Gumroad settings before launch." /></div></div></section>
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40"><div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary)/.06)] blur-3xl" /><div className="relative mx-auto max-w-3xl text-center"><div className="eyebrow text-[hsl(var(--primary))]">Open when you are ready</div><h2 className="display mt-6 text-6xl sm:text-8xl">Make the next<br /><span className="text-[hsl(var(--primary))]">frame count.</span></h2><p className="mx-auto mt-7 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">15,000+ places to begin. One small decision to stop starting from zero.</p><div className="mt-9 flex justify-center"><BuyButton /></div></div></section>
    <Footer />
  </main></div>;
}

function ArchiveVisual() {
  const cells = ['#b8ed55', '#f28b79', '#8bd1df', '#d4c9a2', '#7282a9', '#d26d63'];
  return <div className="relative aspect-[.9] rotate-2 rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(231_18%_14%)] p-3 shadow-2xl"><div className="grid h-full grid-cols-2 gap-2 overflow-hidden rounded-[1.4rem] opacity-90">{cells.map((color, i) => <div key={color} className="relative overflow-hidden" style={{ backgroundColor: color, transform: `rotate(${i % 2 ? -2 : 1}deg) scale(1.04)` }}><div className="absolute inset-0 opacity-35" style={{ background: `radial-gradient(circle at ${25 + i * 9}% ${30 + i * 7}%, #f4eedb 0 3%, transparent 4%), linear-gradient(${120 + i * 18}deg, transparent 40%, rgba(25,30,48,.7) 41% 59%, transparent 60%)` }} /><span className="absolute bottom-3 left-3 mono text-[9px] text-[hsl(232_31%_10%/.7)]">0{i + 1} / MOV</span></div>)}</div><div className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"><FileArchive size={22} /></div></div>;
}

function ArchiveCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="archive-card rounded-2xl border border-[hsl(var(--border))] bg-[hsl(232_28%_14%/.6)] p-6"><div className="mb-12 flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))]">{icon}</div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p></div>;
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return <div className="border-b border-[hsl(var(--border))]"><button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium" data-testid={`button-faq-${q.slice(0, 12).replace(/\s/g, '-').toLowerCase()}`}>{q}<ChevronDown size={17} className={`shrink-0 text-[hsl(var(--primary))] transition-transform ${open ? 'rotate-180' : ''}`} /></button>{open && <p className="max-w-2xl pb-5 pr-8 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{a}</p>}</div>;
}

const policyContent: Record<string, { label: string; title: string; sections: string[][] }> = {
  '/terms': {
    label: 'Terms of Service',
    title: 'A clear agreement for a digital archive.',
    sections: [
      ['Overview', 'Vernox Vision provides access to a digital product containing 15,000+ video files. Purchase, payment, and instant digital delivery are processed through Gumroad. By purchasing, you agree to these terms.'],
      ['License and use', 'You may use the supplied footage in your own personal, editorial, social, and commercial finished projects, subject to the final license terms that apply to the source assets. You may not claim ownership of the raw files, redistribute, resell, repackage, sublicense, or share the raw bundle or its download link. The licensing language on this page is a launch-time placeholder and must be reviewed and updated before launch.'],
      ['Payment and delivery', 'Gumroad processes payment securely at the price and currency shown at checkout. Delivery is digital and intended to be immediate: Gumroad provides a download link and delivery email after successful purchase.'],
      ['Disclaimers', 'The product is supplied as-is. We do not guarantee that every asset will suit every project or platform. To the fullest extent permitted by applicable law, Vernox Vision is not liable for indirect or consequential loss arising from use of the product.'],
      ['Governing law and contact', 'Governing law and jurisdiction: [LAUNCH PLACEHOLDER — insert your country/state]. Questions can be sent to ' + SUPPORT_EMAIL + '.'],
    ],
  },
  '/privacy': {
    label: 'Privacy Policy',
    title: 'Your data, handled plainly.',
    sections: [
      ['What we collect', 'We may receive information needed to support a purchase, such as your name and email. Payment information is handled by Gumroad and is not stored directly by Vernox Vision. We may also use Meta Pixel to receive page visit, button click, and ad conversion signals.'],
      ['Why we use it', 'Information is used to process and deliver purchases, respond to support requests, improve the site, and measure advertising performance. We do not sell personal data to third parties.'],
      ['Third parties and tracking', 'Gumroad acts as the payment and digital-delivery provider. Meta may process event and cookie data through Meta Pixel for measurement and retargeting. Your browser may offer controls for cookies and similar technologies.'],
      ['Your choices', 'You may ask us to access, correct, or delete personal information we hold, subject to legal and operational requirements. Contact ' + SUPPORT_EMAIL + ' with a privacy request.'],
      ['Launch note', 'This policy is clear placeholder-safe business language, not legal advice. Confirm your data practices, retention, cookie consent requirements, and business details with a qualified adviser before launch.'],
    ],
  },
  '/refund-policy': {
    label: 'Refund Policy',
    title: 'A straightforward policy for instant delivery.',
    sections: [
      ['Digital delivery', 'Vernox Vision is an instantly delivered digital product. Because access to the files is provided after purchase, all sales are currently planned as final. This policy must match the refund settings configured inside Gumroad before launch.'],
      ['If something goes wrong', 'If you are charged but cannot access your download, or receive a corrupted or incomplete delivery, contact ' + SUPPORT_EMAIL + ' with your Gumroad receipt. We will review delivery issues and help resolve them.'],
      ['Refund requests', 'Any exception to the final-sale policy is considered case by case where required by applicable law or where a duplicate charge or failed delivery has occurred. Do not rely on this page until the final refund terms are confirmed in Gumroad.'],
      ['Launch note', 'This is a launch-time policy placeholder and should be reviewed for your jurisdiction, product license, and Gumroad configuration before accepting payments.'],
    ],
  },
};

function PolicyPage({ path }: { path: keyof typeof policyContent }) {
  const content = policyContent[path];
  return <div className="grain min-h-[100dvh] bg-[hsl(var(--background))]"><Header /><main className="mx-auto max-w-4xl px-5 pb-20 pt-36 sm:px-8 sm:pt-44"><Link href="/" className="eyebrow text-[hsl(var(--primary))] hover:text-[hsl(var(--foreground))]" data-testid="link-policy-back">← Back to Vernox Vision</Link><div className="mt-8 border-b border-[hsl(var(--border))] pb-12"><div className="eyebrow text-[hsl(var(--accent))]">{content.label}</div><h1 className="display mt-5 max-w-3xl text-5xl sm:text-7xl">{content.title}</h1><p className="mt-6 text-sm text-[hsl(var(--muted-foreground))]">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p></div><div className="prose prose-invert mt-12 max-w-2xl prose-headings:font-sans prose-headings:tracking-[-.03em] prose-p:text-[hsl(var(--muted-foreground))] prose-p:leading-7">{content.sections.map(([heading, text]) => <section key={heading} className="mb-10"><h2 className="text-xl text-[hsl(var(--foreground))]">{heading}</h2><p>{text}</p></section>)}</div></main><Footer /></div>;
}

function ThankYou() {
  usePixel('PageView');
  usePixel('Purchase', { value: 9, currency: 'USD', content_name: 'Vernox Vision Video Archive' });
  return <div className="grain min-h-[100dvh] bg-[hsl(var(--background))]"><Header /><main className="site-grid flex min-h-[calc(100dvh-260px)] items-center px-5 pb-20 pt-36 sm:px-8"><div className="mx-auto w-full max-w-3xl"><div className="eyebrow text-[hsl(var(--primary))]">Purchase confirmed / welcome in</div><h1 className="display mt-6 max-w-2xl text-6xl sm:text-8xl">The archive<br /><span className="text-[hsl(var(--primary))]">is yours.</span></h1><p className="mt-8 max-w-lg text-base leading-7 text-[hsl(var(--muted-foreground))]">Gumroad should have sent your download link to the email used at checkout. Search for “Vernox Vision” if it is not in your inbox yet.</p><div className="mt-10 flex flex-wrap gap-3"><Link href="/" className="button-lift flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-semibold text-[hsl(var(--primary-foreground))]" data-testid="link-thank-you-home">Back to the site <ArrowRight size={16} /></Link><a href={`mailto:${SUPPORT_EMAIL}`} className="button-lift rounded-full border border-[hsl(var(--border))] px-6 py-3.5 text-sm font-semibold" data-testid="link-thank-you-support">Need help?</a></div><div className="mt-16 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-[hsl(var(--border))] p-5"><span className="mono text-xs text-[hsl(var(--primary))]">01</span><p className="mt-8 text-sm">Check your Gumroad email.</p></div><div className="rounded-2xl border border-[hsl(var(--border))] p-5"><span className="mono text-xs text-[hsl(var(--primary))]">02</span><p className="mt-8 text-sm">Download the archive.</p></div><div className="rounded-2xl border border-[hsl(var(--border))] p-5"><span className="mono text-xs text-[hsl(var(--primary))]">03</span><p className="mt-8 text-sm">Make something move.</p></div></div></div></main><Footer /></div>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
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
