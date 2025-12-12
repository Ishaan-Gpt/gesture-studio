import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import {
  Zap,
  Puzzle,
  Gauge,
  Palette,
  Shield,
  Globe,
  Code2,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Easy Integration',
    description: 'Drop-in components for React, Vue, or vanilla JS.',
    size: 'large',
  },
  {
    icon: Puzzle,
    title: 'Framework Agnostic',
    description: 'Works with any modern stack.',
    size: 'normal',
  },
  {
    icon: Gauge,
    title: '60fps Performance',
    description: 'Optimized gesture recognition.',
    size: 'normal',
  },
  {
    icon: Palette,
    title: 'Customizable',
    description: 'Full control over styling and behavior.',
    size: 'wide',
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'All processing happens locally.',
    size: 'normal',
  },
  {
    icon: Globe,
    title: 'Cross-Browser',
    description: 'Chrome, Firefox, Safari, Edge.',
    size: 'normal',
  },
  {
    icon: Code2,
    title: 'TypeScript Native',
    description: 'Full type definitions included.',
    size: 'normal',
  },
  {
    icon: Sparkles,
    title: 'Built-in Animations',
    description: 'Physics-based motion.',
    size: 'normal',
  },
];

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

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
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
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
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Features</span>
            <div className="w-12 h-px bg-foreground" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            BUILT FOR
            <br />
            <span className="text-muted-foreground">DEVELOPERS</span>
          </h2>
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
              <GlassCard className={`h-full p-6 rounded-lg ${feature.size === 'large' ? 'p-8' : ''}`}>
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