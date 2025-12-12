import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import VisionSection from '@/components/VisionSection';
import DemoShowcase from '@/components/DemoShowcase';
import FeaturesSection from '@/components/FeaturesSection';
import UseCasesSection from '@/components/UseCasesSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <VisionSection />
        <DemoShowcase />
        <FeaturesSection />
        <UseCasesSection />
        <PricingSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
