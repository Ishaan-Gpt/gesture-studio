import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import { MousePointer2, Smartphone, Accessibility, ArrowRight } from 'lucide-react';

const painPoints = [
  {
    icon: MousePointer2,
    title: 'Click Fatigue',
    description: 'Endless clicking creates friction between users and content.',
    number: '01',
  },
  {
    icon: Smartphone,
    title: 'Touch Limitations',
    description: 'Touchscreens restrict interaction to 2D planes.',
    number: '02',
  },
  {
    icon: Accessibility,
    title: 'Accessibility Gaps',
    description: 'Traditional interfaces exclude users with motor control challenges.',
    number: '03',
  },
];

const VisionSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-foreground" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">The Problem</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[1.1]">
              INTERFACES
              <br />
              <span className="text-muted-foreground">ARE BROKEN</span>
            </h2>
            
            <p className="text-base text-muted-foreground mb-12 font-mono leading-relaxed max-w-md">
              The same point-and-click paradigm for decades. 
              We built something different.
            </p>

            {/* Pain Points */}
            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <GlassCard className="flex items-center gap-6 p-5 rounded-lg group cursor-default">
                    <span className="text-xs font-mono text-muted-foreground">{point.number}</span>
                    <div className="p-2 rounded bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                      <point.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground">{point.title}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{point.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Grid pattern */}
              <div className="absolute inset-0 grid-bg rounded-lg opacity-50" />
              
              {/* Animated circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-foreground/10"
                  style={{ 
                    inset: `${i * 15}%`,
                  }}
                  animate={{
                    rotate: i % 2 === 0 ? 360 : -360,
                  }}
                  transition={{
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass-card rounded-full p-8"
                >
                  <span className="text-6xl">🖐️</span>
                </motion.div>
              </div>

              {/* Floating labels */}
              {['Natural', 'Intuitive', 'Seamless'].map((label, i) => (
                <motion.div
                  key={label}
                  className="absolute glass-card rounded px-3 py-1.5"
                  style={{
                    top: `${20 + i * 30}%`,
                    left: i % 2 === 0 ? '10%' : '70%',
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;