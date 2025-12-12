import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import GlassCard from './GlassCard';
import {
  ShoppingBag,
  Presentation,
  GraduationCap,
  Gamepad2,
  PieChart,
  Image,
} from 'lucide-react';

const useCases = [
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    description: 'Let customers rotate, zoom, and explore products in 3D before buying. Increase engagement and reduce returns.',
    image: '/placeholder.svg',
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    icon: Image,
    title: 'Portfolios',
    description: 'Create immersive portfolio experiences that showcase your work in interactive 3D galleries.',
    image: '/placeholder.svg',
    gradient: 'from-secondary/20 to-accent/20',
  },
  {
    icon: Presentation,
    title: 'Presentations',
    description: 'Deliver engaging presentations with gesture-controlled slides and 3D data visualizations.',
    image: '/placeholder.svg',
    gradient: 'from-accent/20 to-primary/20',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Transform learning with interactive 3D models students can manipulate with natural gestures.',
    image: '/placeholder.svg',
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    icon: Gamepad2,
    title: 'Gaming',
    description: 'Build casual web games with gesture controls that feel natural and engaging.',
    image: '/placeholder.svg',
    gradient: 'from-secondary/20 to-primary/20',
  },
  {
    icon: PieChart,
    title: 'Data Analytics',
    description: 'Explore complex datasets in 3D space with intuitive gesture-based navigation.',
    image: '/placeholder.svg',
    gradient: 'from-accent/20 to-secondary/20',
  },
];

const UseCasesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Endless <span className="gradient-text">Possibilities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From e-commerce to education, gesture controls unlock new ways to engage users.
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <GlassCard className="h-full group cursor-pointer overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 5 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4"
                  >
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:gradient-text transition-all">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-4"
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
