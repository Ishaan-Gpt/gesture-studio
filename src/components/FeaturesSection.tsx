import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import {
  Hand,
  Layers,
  Gauge,
  Palette,
  Shield,
  Globe,
  Code2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

const features = [
  {
    icon: Hand,
    title: 'Gesture Recognition',
    description: 'Rotate, zoom, swipe, pinch—all via webcam with no hardware.',
    size: 'large',
  },
  {
    icon: Layers,
    title: 'Custom 3D Models',
    description: 'Your products in stunning 3D.',
    size: 'normal',
  },
  {
    icon: Gauge,
    title: '60fps Performance',
    description: 'Butter-smooth interactions.',
    size: 'normal',
  },
  {
    icon: Palette,
    title: 'Brand-Matched',
    description: 'Designed to match your visual identity perfectly.',
    size: 'wide',
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'All processing is local.',
    size: 'normal',
  },
  {
    icon: Globe,
    title: 'Cross-Browser',
    description: 'Works everywhere.',
    size: 'normal',
  },
  {
    icon: Code2,
    title: 'Easy Integration',
    description: 'Drop-in React component.',
    size: 'normal',
  },
  {
    icon: Sparkles,
    title: 'Physics Animations',
    description: 'Natural, fluid motion.',
    size: 'normal',
  },
];

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleGetStarted = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    toast.success('Ready to start your project!');
  };

  const getGridClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      default:
        return '';
    }
  };

  return (
    <section id="features" className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">What We Deliver</span>
            <div className="w-12 h-px bg-foreground" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            CRAFTED
            <br />
            <span className="text-muted-foreground">WITH PRECISION</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every component we build is engineered for performance, 
            accessibility, and seamless integration.
          </p>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleGetStarted}
            className="group"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
              className={getGridClass(feature.size)}
            >
              <GlassCard className={`h-full p-6 rounded-lg hover:bg-foreground/[0.02] transition-colors ${feature.size === 'large' ? 'p-8' : ''}`}>
                <div className="inline-flex p-3 rounded-lg bg-foreground/5 mb-4">
                  <feature.icon className={`${feature.size === 'large' ? 'w-7 h-7' : 'w-5 h-5'} text-foreground`} />
                </div>
                <h3 className={`font-display font-bold mb-2 ${feature.size === 'large' ? 'text-2xl' : 'text-base'}`}>
                  {feature.title}
                </h3>
                <p className={`text-muted-foreground font-mono ${feature.size === 'large' ? 'text-sm' : 'text-xs'}`}>
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