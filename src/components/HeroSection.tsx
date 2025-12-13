import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FloatingShape from './FloatingShape';
import { ArrowRight, Play } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.hero-line', 
          { y: 60, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
        )
        .fromTo('.hero-subtext',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchShowreel = () => {
    toast.info('Showreel coming soon!', { description: 'Our portfolio video is being finalized.' });
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] mt-20 flex items-center"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-foreground/[0.02] blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-foreground/[0.03] blur-[80px]" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left - Text */}
          <div ref={textRef} className="order-2 lg:order-1">
            {/* Badge */}
            <div className="hero-line overflow-hidden mb-6">
              <motion.div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                  Custom Components in 30 Hours
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <h1 className="hero-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1] tracking-tight">
                WE BUILD
              </h1>
            </div>
            <div className="overflow-hidden mb-1">
              <h1 className="hero-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1] tracking-tight gradient-text">
                GESTURE-DRIVEN
              </h1>
            </div>
            <div className="overflow-hidden mb-6">
              <h1 className="hero-line text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1] tracking-tight">
                3D EXPERIENCES
              </h1>
            </div>

            {/* Subheadline */}
            <p className="hero-subtext text-sm md:text-base text-muted-foreground max-w-md mb-8 font-mono leading-relaxed">
              Bespoke webcam-powered gesture components for brands that demand innovation. No hardware. Pure magic.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={scrollToPricing}
                className="hero-cta group"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleWatchShowreel}
                className="hero-cta group"
              >
                <Play className="w-4 h-4" />
                Watch Showreel
              </Button>
            </div>
          </div>

          {/* Right - 3D Shape */}
          <div className="order-1 lg:order-2 relative h-[300px] sm:h-[350px] lg:h-[450px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <FloatingShape />
              
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] border border-foreground/[0.05] rounded-full animate-pulse-subtle" />
                <div className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] border border-foreground/[0.03] rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
