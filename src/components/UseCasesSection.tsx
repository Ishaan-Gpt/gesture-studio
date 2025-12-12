import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  Presentation,
  Building2,
  Laptop,
  Car,
  Watch,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

const useCases = [
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    description: 'Let customers rotate, zoom, and explore products in 3D. Reduce returns, increase conversions.',
  },
  {
    icon: Car,
    title: 'Automotive',
    description: 'Configure vehicles with gesture controls. Interior views, color changes, feature exploration.',
  },
  {
    icon: Watch,
    title: 'Luxury Goods',
    description: 'Showcase watches, jewelry, and accessories with cinematic 3D presentations.',
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Virtual property tours with gesture-based navigation and room exploration.',
  },
  {
    icon: Laptop,
    title: 'Tech Products',
    description: 'Interactive product demos that let users experience features before buying.',
  },
  {
    icon: Presentation,
    title: 'Brand Experiences',
    description: 'Immersive storytelling for campaigns, events, and product launches.',
  },
];

const UseCasesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleExploreCase = (title: string) => {
    toast.info(`${title} case study`, { description: 'Detailed case study coming soon!' });
  };

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
            Industries We <span className="gradient-text">Transform</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From luxury retail to automotive, we've helped brands across industries 
            create memorable gesture-controlled experiences.
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
              <GlassCard className="h-full group cursor-pointer overflow-hidden hover:bg-foreground/[0.02] transition-colors p-6">
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex p-3 rounded-xl bg-foreground/5 mb-4"
                  >
                    <useCase.icon className="w-6 h-6 text-foreground" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {useCase.description}
                  </p>

                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleExploreCase(useCase.title)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-auto"
                  >
                    View Case Study
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-0.5 bg-foreground/20 mt-4"
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
