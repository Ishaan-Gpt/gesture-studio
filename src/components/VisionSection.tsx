import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import { Button } from '@/components/ui/button';
import { Clock, Target, Sparkles, ArrowRight } from 'lucide-react';

const processSteps = [
  {
    icon: Target,
    title: 'Brief',
    description: '30-min call. We get your vision.',
    number: '01',
  },
  {
    icon: Sparkles,
    title: 'Build',
    description: 'Custom 3D + gestures. Your brand.',
    number: '02',
  },
  {
    icon: Clock,
    title: 'Ship',
    description: 'Done in 30 hours. Integration-ready.',
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
    <section id="vision" className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-foreground" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">How It Works</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-[1.1]">
              CONCEPT TO
              <br />
              <span className="text-muted-foreground">COMPONENT</span>
            </h2>
            
            <p className="text-sm text-muted-foreground mb-6 font-mono leading-relaxed max-w-sm">
              Not a library. Your creative partner. Every build is custom.
            </p>

            <Button 
              variant="outline" 
              size="default" 
              onClick={handleLearnMore}
              className="group"
            >
              See Examples
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="space-y-3"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <GlassCard className="flex items-center gap-5 p-5 rounded-lg group hover:bg-foreground/[0.02] transition-colors">
                  <span className="text-2xl font-display font-bold text-foreground/20">{step.number}</span>
                  <div className="p-2 rounded-lg bg-foreground/5">
                    <step.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-base">{step.title}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{step.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex gap-6 pt-6"
            >
              {[
                { value: '30h', label: 'Delivery' },
                { value: '50+', label: 'Shipped' },
                { value: '100%', label: 'Happy' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold">{stat.value}</div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">{stat.label}</div>
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
