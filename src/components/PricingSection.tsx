import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from './GlassCard';
import { Check, Clock, Zap, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const packages = [
  {
    name: 'Starter',
    description: 'Landing pages & simple interactions',
    hours: '30',
    price: '89',
    features: ['1 gesture component', 'Rotate & zoom', '2 revisions', 'Mobile fallback', 'Integration help'],
    popular: false,
  },
  {
    name: 'Pro',
    description: 'Product showcases & experiences',
    hours: '60',
    price: '199',
    discount: '$20 for first 3 clients',
    features: ['Up to 3 components', 'Advanced gestures', 'Custom 3D models', '4 revisions', 'Analytics', 'Priority support'],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Full-scale immersive experiences',
    hours: 'Custom',
    price: 'Custom',
    features: ['Unlimited components', 'Multi-gesture flows', 'Custom AI', 'Dedicated PM', 'SLA', 'White-label'],
    popular: false,
  },
];

const PricingSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleBookCall = () => {
    toast.success('Booking received!', { description: 'We\'ll reach out within 24 hours.' });
  };

  const handleGetStarted = (name: string) => {
    toast.success(`${name} selected!`, { description: 'Redirecting to intake form...' });
  };

  const handleContactSales = () => {
    toast.info('Enterprise team will reach out shortly.');
  };

  return (
    <section id="pricing" className="relative py-24 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-foreground/[0.02] blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 mb-4">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Build Your <span className="gradient-text">Component</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto font-mono">
            Custom gesture components. Fixed timelines. No surprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            >
              <GlassCard className={`p-6 h-full flex flex-col ${pkg.popular ? 'border-foreground/30 glow-white' : ''}`}>
                {pkg.popular && (
                  <div className="inline-flex items-center gap-1.5 bg-foreground text-background px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-4 self-start">
                    <Zap className="w-3 h-3" /> Popular
                  </div>
                )}
                <h3 className="text-xl font-display font-bold mb-1">{pkg.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    {pkg.price !== 'Custom' && <span className="text-xs text-muted-foreground">$</span>}
                    <span className="text-4xl font-display font-bold">{pkg.price}</span>
                  </div>
                  {pkg.discount && (
                    <div className="mt-2 inline-flex bg-foreground/10 px-2 py-1 rounded-full">
                      <span className="text-[10px] font-mono">{pkg.discount}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {pkg.hours !== 'Custom' ? `${pkg.hours}h delivery` : 'Tailored scope'}
                  </p>
                </div>
                <div className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant={pkg.popular ? 'default' : 'outline'}
                  size="sm"
                  className="w-full group"
                  onClick={() => pkg.price === 'Custom' ? handleContactSales() : handleGetStarted(pkg.name)}
                >
                  {pkg.price === 'Custom' ? 'Contact' : 'Get Started'}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <GlassCard className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 px-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <p className="font-display font-semibold text-sm">Not sure?</p>
                <p className="text-[10px] text-muted-foreground">Free 30-min call</p>
              </div>
            </div>
            <Button variant="default" size="sm" onClick={handleBookCall} className="group">
              <MessageSquare className="w-3 h-3" /> Book Call
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
