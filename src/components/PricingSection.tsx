import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight, Zap, Star, Crown } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small projects and MVPs',
    originalPrice: 199,
    price: 20,
    discount: '90% OFF',
    popular: false,
    features: [
      'Single gesture integration',
      '1 interactive 3D element',
      '48-hour delivery',
      'Basic documentation',
      '7-day support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'For growing businesses and brands',
    originalPrice: 499,
    price: 99,
    discount: '80% OFF',
    popular: true,
    features: [
      'Up to 5 gesture integrations',
      '3 interactive 3D elements',
      '30-hour delivery',
      'Full documentation',
      '30-day support',
      'Source code included',
      'Custom branding',
    ],
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'Complete gesture experience suite',
    originalPrice: 999,
    price: 249,
    discount: '75% OFF',
    popular: false,
    features: [
      'Unlimited gesture integrations',
      'Unlimited 3D elements',
      'Priority 24-hour delivery',
      'Full documentation + training',
      'Lifetime support',
      'Source code + ownership',
      'White-label solution',
      'Dedicated account manager',
    ],
    cta: 'Contact Us',
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
          <div className="inline-flex items-center gap-2 border border-black/10 rounded px-4 py-2 mb-8 bg-black/[0.02]">
            <span className="text-xs uppercase tracking-[0.2em] text-black/50">
              Launch Pricing
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] text-black">
            Insane <span className="text-black/30">Discounts</span>
          </h2>

          <p className="text-lg md:text-xl text-black/50 max-w-2xl mx-auto leading-relaxed">
            Limited time launch offer. Get premium gesture experiences at a fraction of the cost.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className={`relative rounded p-8 ${plan.popular
                ? 'bg-black text-white border-2 border-black scale-105 shadow-2xl'
                : 'bg-white text-black border border-black/10'
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-white text-black px-4 py-1 rounded text-xs uppercase tracking-wider">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Discount badge */}
              <div className={`inline-flex items-center gap-1 rounded px-3 py-1 text-xs font-bold mb-4 ${plan.popular ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                }`}>
                {plan.discount}
              </div>

              <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-white/60' : 'text-black/50'}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className={`text-lg line-through ${plan.popular ? 'text-white/40' : 'text-black/30'}`}>
                  ${plan.originalPrice}
                </span>
                <span className="text-5xl font-display font-bold">${plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-black/50'}`}>
                  /project
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 ${plan.popular ? 'text-white' : 'text-black'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-black/70'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.popular ? 'secondary' : 'default'}
                size="lg"
                onClick={handleGetInTouch}
                className={`w-full group rounded ${plan.popular
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'bg-black text-white hover:bg-black/90'
                  }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-black/50 text-sm mb-4">
            Need a custom solution? Let's talk.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={handleGetInTouch}
            className="rounded border-black/20 text-black hover:bg-black hover:text-white"
          >
            Get Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
