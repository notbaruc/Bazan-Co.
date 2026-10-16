import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import {
  FaqSection,
  FinalCtaSection,
  HeroSection,
  PortfolioSection,
  ProblemSolutionSection,
  ProcessSection,
  ServicesSection,
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

export default function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!saved) {
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
    setCookieBannerVisible(false);
  };

  return (
    <div className="min-h-screen bg-obsidian-base text-content-secondary">
      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <TrustBarSection />
        <ProblemSolutionSection />
        <ServicesSection />
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
