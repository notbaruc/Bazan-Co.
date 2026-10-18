import { useEffect, useRef, useState } from 'react';
import i18n, {
  resolveInitialLanguage,
  syncDocumentLanguageMeta,
  type SupportedLanguage,
} from './i18n/config';
import { initGoogleAnalytics } from './utils/analytics';
import { Navbar } from './components/Navbar';
import {
  FaqSection,
  FinalCtaSection,
  HeroSection,
  PortfolioSection,
  ProblemSolutionSection,
  ProcessSection,
  ServicesSection,
  TechMarqueeSection,
  TrustBarSection,
  WhyUsSection,
} from './components/Sections';
import {
  ContactSection,
  CookieBanner,
  FooterSection,
  PrivacyModal,
  WhatsAppFab,
} from './components/ConversionSection';

const COOKIE_STORAGE_KEY = 'bazan_cookie_consent';

function CustomDesktopCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let scale = 1;
    let visible = false;
    let rafId = 0;
    let lastTarget: EventTarget | null = null;

    const renderLoop = () => {
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.24;
      ringY += dy * 0.24;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) scale(${scale})`;

      if (Math.hypot(dx, dy) > 0.25) {
        rafId = window.requestAnimationFrame(renderLoop);
      } else {
        rafId = 0;
      }
    };

    const scheduleLoop = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(renderLoop);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const nextX = e.clientX - 16;
      const nextY = e.clientY - 16;
      if (nextX === mouseX && nextY === mouseY && visible) return;

      mouseX = nextX;
      mouseY = nextY;
      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        visible = true;
        ring.style.opacity = '1';
      }

      if (e.target !== lastTarget) {
        lastTarget = e.target;
        const target = e.target as HTMLElement | null;
        const isInteractive = Boolean(
          target?.closest('a, button, summary, input, select, textarea')
        );
        scale = isInteractive ? 1.45 : 1;
      }
      scheduleLoop();
    };

    const onPointerLeave = () => {
      visible = false;
      lastTarget = null;
      ring.style.opacity = '0';
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[80] hidden h-8 w-8 rounded-full opacity-0 transition-opacity duration-200 will-change-[transform,opacity] lg:block"
    />
  );
}

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const initialLang = resolveInitialLanguage();
    if (i18n.language !== initialLang) {
      void i18n.changeLanguage(initialLang);
    }
    syncDocumentLanguageMeta(initialLang);

    const onPopState = () => {
      const pathLang: SupportedLanguage =
        window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')
          ? 'en'
          : 'es';
      void i18n.changeLanguage(pathLang);
      syncDocumentLanguageMeta(pathLang);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (saved === 'accepted') {
        initGoogleAnalytics();
      } else if (!saved) {
        setCookieBannerVisible(true);
      }
    } catch {
      setCookieBannerVisible(true);
    }
  }, []);

  const handleCookieChoice = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, choice);
    } catch {
      // Ignorar si almacenamiento restringido
    }
    if (choice === 'accepted') {
      initGoogleAnalytics();
    }
    setCookieBannerVisible(false);
  };

  return (
    <div className="min-h-screen bg-bg text-ink-secondary">
      <CustomDesktopCursor />
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <TrustBarSection />
        <ProblemSolutionSection />
        <ServicesSection />
        <TechMarqueeSection />
        <ProcessSection />
        <PortfolioSection />
        <WhyUsSection />
        <FaqSection />
        <FinalCtaSection />
        <ContactSection onOpenPrivacy={() => setPrivacyOpen(true)} />
      </main>

      <FooterSection
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenCookies={() => setCookieBannerVisible(true)}
      />

      <WhatsAppFab />

      <CookieBanner
        visible={cookieBannerVisible}
        onAccept={() => handleCookieChoice('accepted')}
        onReject={() => handleCookieChoice('rejected')}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  );
}
