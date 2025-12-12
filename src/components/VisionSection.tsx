import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from './GlassCard';
import { MousePointer2, Smartphone, Accessibility } from 'lucide-react';

const painPoints = [
  {
    icon: MousePointer2,
    title: 'Click Fatigue',
    description: 'Endless clicking and scrolling creates friction between users and content.',
    color: 'cyan' as const,
  },
  {
    icon: Smartphone,
    title: 'Touch Limitations',
    description: 'Touchscreens restrict interaction to 2D planes, ignoring spatial possibilities.',
    color: 'purple' as const,
  },
  {
    icon: Accessibility,
    title: 'Accessibility Gaps',
    description: 'Traditional interfaces exclude users who struggle with precise motor control.',
    color: 'accent' as const,
  },
];

const VisionSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              The Future of{' '}
              <span className="gradient-text-cyan">Web Interaction</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Current web interfaces are stuck in the past. Point, click, scroll—the same paradigm 
              for decades. It's time for something revolutionary. Something that feels as natural 
              as reaching out and touching.
            </p>

            {/* Pain Points */}
            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                >
                  <GlassCard
                    className="flex items-start gap-4 p-4"
                    glowColor={point.color}
                  >
                    <div className={`p-2 rounded-lg ${
                      point.color === 'cyan' ? 'bg-primary/20 text-primary' :
                      point.color === 'purple' ? 'bg-secondary/20 text-secondary' :
                      'bg-accent/20 text-accent'
                    }`}>
                      <point.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Metaphor */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/20"
                  animate={{
                    scale: [1, 1.2 + i * 0.1, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                />
              ))}
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="relative w-64 h-64"
                >
                  {/* Orbiting elements */}
                  {['Before', 'After', 'Future'].map((label, i) => (
                    <motion.div
                      key={label}
                      className="absolute glass-card px-4 py-2"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${i * 120}deg) translateX(100px) rotate(-${i * 120}deg)`,
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className={`text-sm font-medium ${
                        label === 'Future' ? 'gradient-text' : 'text-muted-foreground'
                      }`}>
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Center glow */}
                <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary opacity-30 blur-3xl animate-pulse-glow" />
                <div className="relative glass-card p-6 rounded-full">
                  <span className="text-4xl">🖐️</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
