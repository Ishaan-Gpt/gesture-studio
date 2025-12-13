import { motion } from 'framer-motion';

interface HeptagonLogoProps {
  size?: number;
  className?: string;
}

const HeptagonLogo = ({ size = 32, className = '' }: HeptagonLogoProps) => {
  // Generate heptagon points
  const points = [];
  const radius = 45;
  const centerX = 50;
  const centerY = 50;
  
  for (let i = 0; i < 7; i++) {
    const angle = (i * 2 * Math.PI) / 7 - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      whileHover={{ scale: 1.1, rotate: 360 / 14 }}
      transition={{ duration: 0.3 }}
    >
      <polygon
        points={points.join(' ')}
        fill="white"
        stroke="white"
        strokeWidth="2"
      />
    </motion.svg>
  );
};

export default HeptagonLogo;
