import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import { Clock, Target, Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const processSteps = [
  {
    icon: Target,
    title: 'Discovery Call',
    description: 'We understand your brand, goals, and user journey.',
    number: '01',
  },
  {
    icon: Sparkles,
    title: 'Design & Build',
    description: 'Custom 3D component with gesture recognition tailored to you.',
    number: '02',
  },
  {
    icon: Clock,
    title: 'Deliver in 30hrs',
    description: 'Integration-ready component shipped to your team.',
    number: '03',
  },
];

const VisionSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleLearnMore = () => {
    document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="vision" className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Our Process</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[1.1]">
              FROM CONCEPT
              <br />
              <span className="text-muted-foreground">TO COMPONENT</span>
            </h2>
            
            <p className="text-base text-muted-foreground mb-8 font-mono leading-relaxed max-w-md">
              We're not a library. We're your creative partner. 
              Every component is custom-built for your specific needs.
            </p>

            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLearnMore}
              className="group"
            >
              See Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right: Process Steps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-4"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              >
                <GlassCard className="flex items-center gap-6 p-6 rounded-lg group cursor-default hover:bg-foreground/[0.02] transition-colors">
                  <span className="text-3xl font-display font-bold text-foreground/20">{step.number}</span>
                  <div className="p-3 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                    <step.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{step.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-8 pt-8"
            >
              {[
                { value: '30', label: 'Hour Delivery' },
                { value: '50+', label: 'Projects Shipped' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;