import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Presentation, Building2, Laptop, Car, Watch, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const useCases = [
  { icon: ShoppingBag, title: 'E-Commerce', description: '3D products. Fewer returns.' },
  { icon: Car, title: 'Automotive', description: 'Configure cars with gestures.' },
  { icon: Watch, title: 'Luxury', description: 'Showcase premium goods.' },
  { icon: Building2, title: 'Real Estate', description: 'Virtual property tours.' },
  { icon: Laptop, title: 'Tech', description: 'Interactive product demos.' },
  { icon: Presentation, title: 'Brands', description: 'Immersive campaigns.' },
];

const UseCasesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleExploreCase = (title: string) => {
    toast.info(`${title} case study coming soon!`);
  };

  return (
    <section className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Industries We <span className="gradient-text">Transform</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto font-mono">
            From luxury to automotive. Memorable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <GlassCard className="h-full group cursor-pointer hover:bg-foreground/[0.02] transition-colors p-5">
                <motion.div
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  className="inline-flex p-2 rounded-lg bg-foreground/5 mb-3"
                >
                  <useCase.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="text-base font-display font-bold mb-1">{useCase.title}</h3>
                <p className="text-xs text-muted-foreground font-mono mb-3">{useCase.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleExploreCase(useCase.title)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0 h-auto text-xs"
                >
                  Case Study <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
