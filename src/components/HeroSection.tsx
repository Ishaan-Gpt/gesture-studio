import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FloatingShape from './FloatingShape';
import { ArrowDown, Zap } from 'lucide-react';

const HeroSection = () => {
  const scrollToDemo = () => {
    document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-line-scan" />
      </div>
      
      {/* Content Grid - Text Left, 3D Right */}
      <div className="relative z-10 container mx-auto px-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full pt-24">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 glass-card rounded-full px-5 py-2 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Now Available</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-xs font-mono uppercase tracking-widest">v1.0</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[0.95] mb-6 tracking-tight"
            >
              <span className="block text-foreground">CONTROL</span>
              <span className="block text-foreground">THE WEB</span>
              <span className="block gradient-text">WITH YOUR HANDS</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg text-muted-foreground max-w-lg mb-10 font-mono leading-relaxed"
            >
              Revolutionary gesture-controlled 3D components. 
              No hardware required. Just your webcam.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="default"
                size="xl"
                onClick={scrollToDemo}
                className="group"
              >
                <Zap className="w-4 h-4" />
                Try Demo
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl">
                Documentation
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex gap-12 mt-16"
            >
              {[
                { value: '60', label: 'FPS' },
                { value: '<3s', label: 'Load Time' },
                { value: '99%', label: 'Accuracy' },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
          >
            <FloatingShape />
            
            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-0 w-32 h-32 border border-foreground/10 rounded-full animate-pulse-subtle" />
            <div className="absolute bottom-1/4 left-0 w-24 h-24 border border-foreground/5 rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-foreground/30 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-1 h-2 bg-foreground rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;