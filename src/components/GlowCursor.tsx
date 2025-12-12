import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const GlowCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main glow orb */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Outer glow */}
        <div 
          className="absolute -inset-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(0, 0%, 100%, 0.08) 0%, transparent 70%)',
          }}
        />
        
        {/* Middle glow */}
        <div 
          className="absolute -inset-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(0, 0%, 100%, 0.12) 0%, transparent 70%)',
          }}
        />
        
        {/* Core orb */}
        <div 
          className="w-4 h-4 rounded-full relative"
          style={{
            background: 'radial-gradient(circle, hsla(0, 0%, 100%, 0.9) 0%, hsla(0, 0%, 100%, 0.4) 50%, transparent 70%)',
            boxShadow: '0 0 20px hsla(0, 0%, 100%, 0.5), 0 0 40px hsla(0, 0%, 100%, 0.3), 0 0 60px hsla(0, 0%, 100%, 0.1)',
          }}
        />
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div 
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(0, 0%, 100%, 0.05) 0%, transparent 60%)',
          }}
        />
      </motion.div>
    </>
  );
};

export default GlowCursor;
