import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FloatingShape from './FloatingShape';
import { ArrowRight, Play } from 'lucide-react';
import { toast } from 'sonner';

const HeroSection = () => {
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
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-32">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-foreground/[0.02] blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-foreground/[0.03] blur-[80px]" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-line-scan" />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 glass-card rounded-full px-5 py-2.5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Custom Gesture Components Built in 30 Hours
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-display font-bold leading-[0.9] mb-6 tracking-tight"
        >
          <span className="block">WE BUILD</span>
          <span className="block gradient-text">GESTURE-CONTROLLED</span>
          <span className="block">EXPERIENCES</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-mono leading-relaxed"
        >
          A boutique agency crafting bespoke 3D gesture-controlled components 
          for brands that want to stand out. Webcam-powered. Hardware-free.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <Button
            variant="default"
            size="xl"
            onClick={scrollToPricing}
            className="group text-base"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="xl"
            onClick={handleWatchShowreel}
            className="group"
          >
            <Play className="w-4 h-4" />
            Watch Showreel
          </Button>
        </motion.div>

        {/* 3D Shape - Centered & Prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl mx-auto h-[350px] md:h-[450px]"
        >
          <FloatingShape />
          
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] border border-foreground/[0.05] rounded-full animate-pulse-subtle" />
            <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] border border-foreground/[0.03] rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>

        {/* Client Logos / Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Trusted by forward-thinking brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['ACME', 'VERTEX', 'AXIOM', 'NEXUS', 'PRISM'].map((brand) => (
              <span key={brand} className="text-lg md:text-xl font-display font-bold tracking-wider">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
