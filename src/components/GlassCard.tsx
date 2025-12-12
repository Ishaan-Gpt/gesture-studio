import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'accent';
  hover?: boolean;
}

const GlassCard = ({
  children,
  className,
  glowColor = 'cyan',
  hover = true,
  ...props
}: GlassCardProps) => {
  const glowStyles = {
    cyan: 'hover:shadow-glow hover:border-primary/40',
    purple: 'hover:shadow-glow-purple hover:border-secondary/40',
    accent: 'hover:shadow-glow-accent hover:border-accent/40',
  };

  return (
    <motion.div
      className={cn(
        'glass-card p-6 transition-all duration-300',
        hover && glowStyles[glowColor],
        className
      )}
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
