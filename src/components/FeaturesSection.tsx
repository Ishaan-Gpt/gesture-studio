import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import { Hand, Layers, Gauge, Palette, Shield, Globe, Code2, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  { icon: Hand, title: 'Gesture Control', description: 'Rotate, zoom, swipe—via webcam.', size: 'large' },
  { icon: Layers, title: 'Custom 3D', description: 'Your products, stunning.', size: 'normal' },
  { icon: Gauge, title: '60fps', description: 'Butter-smooth.', size: 'normal' },
  { icon: Palette, title: 'Brand-Matched', description: 'Pixel-perfect to your style.', size: 'wide' },
  { icon: Shield, title: 'Privacy-First', description: 'Local processing.', size: 'normal' },
  { icon: Globe, title: 'Cross-Browser', description: 'Works everywhere.', size: 'normal' },
  { icon: Code2, title: 'Drop-In', description: 'React ready.', size: 'normal' },
  { icon: Sparkles, title: 'Physics', description: 'Natural motion.', size: 'normal' },
];

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleGetStarted = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large': return 'md:col-span-2 md:row-span-2';
      case 'wide': return 'md:col-span-2';
      default: return '';
    }
  };

  return (
    <section id="features" className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-foreground" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Deliverables</span>
            <div className="w-8 h-px bg-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            PRECISION <span className="text-muted-foreground">CRAFTED</span>
          </h2>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6 font-mono">
            Engineered for performance. Built for impact.
          </p>

          <Button variant="outline" size="default" onClick={handleGetStarted} className="group">
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.04, duration: 0.4 }}
              className={getGridClass(feature.size)}
            >
              <GlassCard className={`h-full p-5 rounded-lg hover:bg-foreground/[0.02] transition-colors ${feature.size === 'large' ? 'p-6' : ''}`}>
                <div className="inline-flex p-2 rounded-lg bg-foreground/5 mb-3">
                  <feature.icon className={`${feature.size === 'large' ? 'w-6 h-6' : 'w-4 h-4'}`} />
                </div>
                <h3 className={`font-display font-bold mb-1 ${feature.size === 'large' ? 'text-xl' : 'text-sm'}`}>
                  {feature.title}
                </h3>
                <p className={`text-muted-foreground font-mono ${feature.size === 'large' ? 'text-xs' : 'text-[10px]'}`}>
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
