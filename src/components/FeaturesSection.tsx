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
    description: 'Drop-in components that work with any React, Vue, or vanilla JS project in minutes.',
    size: 'large',
    color: 'cyan',
  },
  {
    icon: Puzzle,
    title: 'Framework Agnostic',
    description: 'Works seamlessly with React, Vue, Svelte, or plain HTML.',
    size: 'normal',
    color: 'purple',
  },
  {
    icon: Gauge,
    title: 'Performance Optimized',
    description: '60fps gesture recognition with minimal CPU overhead.',
    size: 'normal',
    color: 'accent',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'Complete control over styling, gestures, and behavior through an intuitive API.',
    size: 'wide',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'All processing happens locally in the browser. No data ever leaves the device.',
    size: 'normal',
    color: 'purple',
  },
  {
    icon: Globe,
    title: 'Cross-Browser Support',
    description: 'Works on Chrome, Firefox, Safari, and Edge on desktop and mobile.',
    size: 'normal',
    color: 'accent',
  },
  {
    icon: Code2,
    title: 'TypeScript Native',
    description: 'Full type definitions for excellent developer experience and code completion.',
    size: 'normal',
    color: 'cyan',
  },
  {
    icon: Sparkles,
    title: 'Built-in Animations',
    description: 'Smooth, physics-based animations that respond naturally to gestures.',
    size: 'normal',
    color: 'purple',
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
      case 'tall':
        return 'md:row-span-2';
      default:
        return '';
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'cyan':
        return 'bg-primary/20 text-primary';
      case 'purple':
        return 'bg-secondary/20 text-secondary';
      case 'accent':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Built for <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create immersive gesture-controlled experiences,
            with the developer experience you expect.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              className={getGridClass(feature.size)}
            >
              <GlassCard
                className={`h-full p-6 ${feature.size === 'large' ? 'p-8' : ''}`}
                glowColor={feature.color as 'cyan' | 'purple' | 'accent'}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${getColorClass(feature.color)}`}>
                  <feature.icon className={`${feature.size === 'large' ? 'w-8 h-8' : 'w-6 h-6'}`} />
                </div>
                <h3 className={`font-display font-bold mb-2 ${
                  feature.size === 'large' ? 'text-2xl' : 'text-lg'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-muted-foreground ${
                  feature.size === 'large' ? 'text-base' : 'text-sm'
                }`}>
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
