import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from './GlassCard';
import {
  Check,
  Clock,
  Zap,
  ArrowRight,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';

const packages = [
  {
    name: 'Starter',
    description: 'Perfect for landing pages & simple interactions',
    hours: '30',
    price: '4,500',
    features: [
      '1 custom gesture component',
      'Basic gesture recognition (rotate, zoom)',
      '2 revision rounds',
      'Mobile fallback UI',
      'Integration support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For product showcases & interactive experiences',
    hours: '60',
    price: '8,500',
    features: [
      'Up to 3 gesture components',
      'Advanced gesture recognition',
      'Custom 3D model integration',
      '4 revision rounds',
      'Analytics dashboard',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Full-scale immersive web experiences',
    hours: 'Custom',
    price: 'Custom',
    features: [
      'Unlimited components',
      'Multi-gesture workflows',
      'Custom AI training',
      'Dedicated project manager',
      'SLA guarantee',
      'White-label solution',
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleBookCall = () => {
    toast.success('Booking request received!', { 
      description: 'We\'ll reach out within 24 hours to schedule your call.' 
    });
  };

  const handleGetStarted = (packageName: string) => {
    toast.success(`${packageName} package selected!`, {
      description: 'Redirecting to project intake form...',
    });
  };

  const handleContactSales = () => {
    toast.info('Opening contact form...', {
      description: 'Our enterprise team will reach out shortly.',
    });
  };

  return (
    <section id="pricing" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-foreground/[0.02] blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Transparent Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Your Component, <span className="gradient-text">Our Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We build custom gesture-controlled 3D components tailored to your brand. 
            Fixed timelines. No surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
            >
              <GlassCard 
                className={`p-8 h-full flex flex-col ${
                  pkg.popular ? 'border-foreground/30 glow-white' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="inline-flex items-center gap-2 bg-foreground text-background px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-6 self-start">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-display font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    {pkg.price !== 'Custom' && <span className="text-sm text-muted-foreground">$</span>}
                    <span className="text-5xl font-display font-bold">{pkg.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {pkg.hours !== 'Custom' ? `${pkg.hours} hours delivery` : 'Tailored to your needs'}
                  </p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={pkg.popular ? 'default' : 'outline'}
                  size="lg"
                  className="w-full group"
                  onClick={() => pkg.price === 'Custom' ? handleContactSales() : handleGetStarted(pkg.name)}
                >
                  {pkg.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Book a Call CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <GlassCard className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 px-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-display font-semibold">Not sure which package?</p>
                <p className="text-sm text-muted-foreground">Book a free 30-min strategy call</p>
              </div>
            </div>
            <Button variant="default" size="lg" onClick={handleBookCall} className="group">
              <MessageSquare className="w-4 h-4" />
              Book a Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </GlassCard>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto mt-20 text-center"
        >
          <blockquote className="text-xl md:text-2xl font-display italic text-muted-foreground mb-6">
            "They delivered a gesture-controlled product configurator in just 3 weeks. 
            Our conversion rate jumped 40% on mobile."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-foreground/20 to-foreground/10" />
            <div className="text-left">
              <div className="font-display font-semibold">Marcus Chen</div>
              <div className="text-sm text-muted-foreground">VP Product, LuxTech</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
