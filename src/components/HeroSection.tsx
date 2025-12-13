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
      // GSAP timeline for staggered text reveal
      gsap.timeline()
        .fromTo('.hero-line', 
          { y: 100, opacity: 0, skewY: 5 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
        )
        .fromTo('.hero-subtext',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo('.hero-cta',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToDemo = () => {
    document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
  };

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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-foreground/[0.02] blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-foreground/[0.03] blur-[100px]" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-line-scan" />
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-screen py-32 lg:py-0">
          
          {/* Left Column - Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 lg:pr-8">
            {/* Status Badge */}
            <div className="hero-line overflow-hidden mb-8">
              <motion.div
                className="inline-flex items-center gap-3 glass-card rounded-full px-5 py-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  Custom Gesture Components in 30 Hours
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95] tracking-tight">
                WE BUILD
              </h1>
            </div>
            <div className="overflow-hidden mb-2">
              <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95] tracking-tight gradient-text">
                GESTURE-CONTROLLED
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1 className="hero-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.95] tracking-tight">
                EXPERIENCES
              </h1>
            </div>

            {/* Subheadline */}
            <p className="hero-subtext text-base md:text-lg text-muted-foreground max-w-xl mb-10 font-mono leading-relaxed">
              A boutique agency crafting bespoke 3D gesture-controlled components 
              for brands that want to stand out. Webcam-powered. Hardware-free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="xl"
                onClick={scrollToPricing}
                className="hero-cta group text-base"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={handleWatchShowreel}
                className="hero-cta group"
              >
                <Play className="w-4 h-4" />
                Watch Showreel
              </Button>
            </div>

            {/* Client Logos / Trust Bar */}
            <div className="hero-cta mt-16">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
                Trusted by forward-thinking brands
              </p>
              <div className="flex flex-wrap items-center gap-6 md:gap-10 opacity-40">
                {['ACME', 'VERTEX', 'AXIOM', 'NEXUS', 'PRISM'].map((brand) => (
                  <span key={brand} className="text-base md:text-lg font-display font-bold tracking-wider">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 3D Shape */}
          <div className="order-1 lg:order-2 relative h-[400px] sm:h-[500px] lg:h-[700px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <FloatingShape />
              
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] border border-foreground/[0.05] rounded-full animate-pulse-subtle" />
                <div className="absolute w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px] border border-foreground/[0.03] rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToDemo}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-foreground/30 flex items-start justify-center p-2 hover:border-foreground/50 transition-colors"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 h-2 bg-foreground rounded-full"
          />
        </motion.button>
      </motion.div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
