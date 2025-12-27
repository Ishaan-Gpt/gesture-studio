import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import GridBackground from '@/components/GridBackground';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { DynamicThemeProvider } from '@/components/DynamicThemeProvider';
import { Spotlight } from '@/components/ui/spotlight';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import VisionSection from '@/components/VisionSection';
import ServicesSection from '@/components/ServicesSection';
import UseCasesSection from '@/components/UseCasesSection';
import DraggableShowcase from '@/components/DraggableShowcase';
import TestimonialsSection from '@/components/TestimonialsSection';
import CaseStudySection from '@/components/CaseStudySection';
import PricingSection from '@/components/PricingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FooterBrand from '@/components/FooterBrand';
import OfferPopup from '@/components/OfferPopup';

const Index = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for butter smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <DynamicThemeProvider>
      <div className="relative min-h-screen overflow-hidden bg-black">
        {/* Premium Effects */}
        <SmoothCursor />
        <Spotlight />

        {/* Grid overlay */}
        <GridBackground />

        <Navbar />
        <OfferPopup />

        <main className="relative z-10">
          <HeroSection />
          <TrustBar />
          <ServicesSection />
          <VisionSection />
          <DraggableShowcase />
          <UseCasesSection />
          <TestimonialsSection />
          <CaseStudySection />
          <PricingSection />
          <ContactSection />
          <Footer />
          <FooterBrand />
        </main>
      </div>
    </DynamicThemeProvider>
  );
};

export default Index;
