import React, { useEffect, useRef } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Lenis from 'lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { trackPixel } from '@/lib/pixel';

// Pages
import { Home } from '@/pages/Home';
import { Vault } from '@/pages/Vault';
import { UnitDetail } from '@/pages/UnitDetail';
import { Guides } from '@/pages/Guides';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { LicensePage } from '@/pages/LicensePage';
import { AccessPage } from '@/pages/AccessPage';
import { FaqPage } from '@/pages/FaqPage';
import { SupportPage } from '@/pages/SupportPage';
import { LegalPage } from '@/pages/LegalPage';
import { ThankYouPage } from '@/pages/ThankYouPage';
import { NotFound } from '@/pages/NotFound';

export const App: React.FC = () => {
  const [location] = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let reqId: number;
    function raf(time: number) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Handle route change: scroll to top and fire Meta Pixel PageView
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPixel('PageView', { path: location });
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/vault" component={Vault} />
      <Route path="/vault/:slug" component={UnitDetail} />
      <Route path="/unit/:slug" component={UnitDetail} />
      <Route path="/guides" component={Guides} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/license" component={LicensePage} />
      <Route path="/access" component={AccessPage} />
      <Route path="/buy" component={AccessPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/terms" component={LegalPage} />
      <Route path="/privacy" component={LegalPage} />
      <Route path="/refund-policy" component={LegalPage} />
      <Route path="/thank-you" component={ThankYouPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
