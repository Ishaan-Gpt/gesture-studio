import GridBackground from '@/components/GridBackground';
import GlowCursor from '@/components/GlowCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VisionSection from '@/components/VisionSection';
import DemoShowcase from '@/components/DemoShowcase';
import FeaturesSection from '@/components/FeaturesSection';
import UseCasesSection from '@/components/UseCasesSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden noise cursor-none">
      {/* Custom Glow Cursor */}
      <GlowCursor />
      
      {/* Grid Background */}
      <GridBackground />
      
      {/* Navbar */}
      <Navbar />
      
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
