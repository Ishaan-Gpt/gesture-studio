import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import HeptagonLogo from './HeptagonLogo';

const LoadingAnimation = ({ onComplete }: { onComplete?: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds for snappy feel
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 500); // Small delay before unmounting
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Central Composition */}
      <div className="relative flex flex-col items-center justify-center">

        {/* Main Logo Container */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          {/* Outer Spinning Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-foreground/10 border-t-foreground/80"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Counter-Spinning Ring */}
          <motion.div
            className="absolute inset-4 rounded-full border border-foreground/10 border-b-foreground/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Pulsing Heptagon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeptagonLogo size={48} />
          </motion.div>
        </div>

        {/* Text Loading & Progress */}
        <div className="flex flex-col items-center gap-4 w-64">
          <div className="flex items-center justify-between w-full text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span>System Init</span>
            <span>{Math.round(progress)}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.02 }}
            />
          </div>

          <motion.div
            className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ESTABLISHING CONNECTION...
          </motion.div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-foreground/30" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-foreground/30" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-foreground/30" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-foreground/30" />
    </div>
  );
};

export default LoadingAnimation;
