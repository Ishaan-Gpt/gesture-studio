import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Sparkles, Info } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter Kit',
    description: 'Perfect for testing gesture technology on your site',
    price: 20,
    priceNote: 'one-time',
    popular: false,
    deliverables: [
      'Single gesture type (e.g., rotate OR zoom)',
      '1 interactive 3D element',
      'Webcam hand tracking integration',
      'Mobile touch fallback included',
    ],
    requirements: [
      'Your existing website URL',
      '3D model file (optional, we can provide)',
    ],
    timeline: '48-72 hours',
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'Full gesture experience for product showcases & demos',
    price: 99,
    priceNote: 'per project',
    popular: true,
    deliverables: [
      'Up to 5 gesture types (rotate, zoom, swipe, pinch, pan)',
      '3 interactive 3D elements',
      'Hand tracking: click, scroll, navigate',
      'Cross-browser + mobile responsive',
      'Custom branding & styling',
      'Full source code ownership',
    ],
    requirements: [
      'Design brief or reference',
      'Brand assets (logo, colors)',
      '3D models or product images',
    ],
    timeline: '3-5 days',
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'White-label gesture solutions for agencies & brands',
    price: 249,
    priceNote: 'starting from',
    popular: false,
    deliverables: [
      'Unlimited gesture integrations',
      'Unlimited 3D elements',
      'Custom gesture mapping',
      'Analytics dashboard integration',
      'White-label solution',
      'Full documentation + training',
      'Dedicated Slack/Discord support',
      'Priority 24-hour delivery option',
    ],
    requirements: [
      'Discovery call to scope project',
      'Access to your dev environment',
    ],
    timeline: 'Custom timeline',
    cta: 'Let\'s Talk',
  },
];

const PricingSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleGetInTouch = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative py-32 overflow-hidden bg-white" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-black/[0.02] blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-black/10 rounded-full px-5 py-2 mb-8 bg-black/[0.02]">
            <Sparkles className="w-3 h-3 text-black/50" />
            <span className="text-xs uppercase tracking-[0.2em] text-black/50">
              Launch Pricing
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] text-black">
            Simple, <span className="text-black/30">Transparent</span> Pricing
          </h2>

          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
            No hidden fees. Know exactly what you're getting and what we need from you to start.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className={`relative rounded-xl ${plan.popular
                ? 'bg-black text-white border-2 border-black lg:scale-105 shadow-2xl z-10'
                : 'bg-white text-black border border-black/10'
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-white text-black px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg">
                    Recommended
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/60' : 'text-black/50'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-display font-bold">${plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-black/50'}`}>
                    {plan.priceNote}
                  </span>
                </div>

                {/* Timeline */}
                <div className={`text-xs font-mono uppercase tracking-wider mb-8 ${plan.popular ? 'text-white/40' : 'text-black/40'}`}>
                  Delivery: {plan.timeline}
                </div>

                {/* Deliverables */}
                <div className="mb-6">
                  <h4 className={`text-xs font-mono uppercase tracking-wider mb-4 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>
                    What You Get
                  </h4>
                  <ul className="space-y-3">
                    {plan.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-green-400' : 'text-green-600'}`} />
                        <span className={`text-sm leading-snug ${plan.popular ? 'text-white/80' : 'text-black/70'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h4 className={`text-xs font-mono uppercase tracking-wider mb-3 flex items-center gap-2 ${plan.popular ? 'text-white/50' : 'text-black/40'}`}>
                    <Info className="w-3 h-3" />
                    What We Need From You
                  </h4>
                  <ul className="space-y-2">
                    {plan.requirements.map((item) => (
                      <li key={item} className={`text-xs ${plan.popular ? 'text-white/50' : 'text-black/50'}`}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  variant={plan.popular ? 'secondary' : 'default'}
                  size="lg"
                  onClick={handleGetInTouch}
                  className={`w-full group rounded-lg ${plan.popular
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-black text-white hover:bg-black/90'
                    }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <div className="border border-black/10 rounded-xl p-6 bg-black/[0.02]">
            <h4 className="text-lg font-display font-semibold text-black mb-2">
              Need something custom?
            </h4>
            <p className="text-sm text-black/50 mb-4">
              We build bespoke gesture experiences for brands with specific requirements.
              Complex integrations, custom gestures, or ongoing partnerships—let's scope it together.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={handleGetInTouch}
              className="rounded-lg border-black/20 text-black hover:bg-black hover:text-white"
            >
              Get Custom Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
