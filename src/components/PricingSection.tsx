import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from './GlassCard';
import {
  Check,
  Sparkles,
  Clock,
  Shield,
  Zap,
} from 'lucide-react';

const features = [
  'All 3 gesture-controlled components',
  'Full TypeScript support',
  'Unlimited projects',
  'Priority support',
  'Source code access',
  'Lifetime updates',
  'Commercial license',
];

const PricingSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [spotsLeft, setSpotsLeft] = useState(3);

  // Simulated countdown (just for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => Math.max(1, prev - (Math.random() > 0.95 ? 1 : 0)));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Early Access <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be among the first to revolutionize your web experiences with gesture control.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <GlassCard className="p-8 border-primary/30">
            {/* Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Limited Offer
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1 text-accent text-sm font-medium"
              >
                <Clock className="w-4 h-4" />
                Only {spotsLeft} spots left
              </motion.div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl text-muted-foreground line-through">$200</span>
                <span className="text-6xl font-display font-bold gradient-text">$20</span>
              </div>
              <p className="text-muted-foreground">One-time payment • Lifetime access</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button variant="magnetic" size="xl" className="w-full text-lg">
                <Zap className="w-5 h-5 mr-2" />
                Reserve Your Spot
              </Button>
              <Button variant="glass" size="lg" className="w-full">
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                30-day money-back guarantee
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-w-2xl mx-auto mt-12 text-center"
        >
          <blockquote className="text-lg italic text-muted-foreground">
            "This completely changed how users interact with our product pages. 
            Engagement went up 300% after implementing gesture controls."
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <div className="text-left">
              <div className="font-medium">Sarah Chen</div>
              <div className="text-sm text-muted-foreground">Head of Product, TechStartup</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
