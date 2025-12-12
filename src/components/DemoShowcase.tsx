import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GestureDemo from './GestureDemo';
import { ChevronLeft, ChevronRight, Box, Layers, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const demos = [
  {
    id: 1,
    title: 'Product Showcase',
    description: 'Rotate, zoom, and explore 3D products with hand gestures',
    icon: Box,
  },
  {
    id: 2,
    title: 'Card Gallery',
    description: 'Navigate content with intuitive swipe controls',
    icon: Layers,
  },
  {
    id: 3,
    title: 'Data Visualization',
    description: 'Interact with 3D charts using spatial gestures',
    icon: BarChart3,
  },
];

const DemoShowcase = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const nextDemo = () => setActiveDemo((prev) => (prev + 1) % demos.length);
  const prevDemo = () => setActiveDemo((prev) => (prev - 1 + demos.length) % demos.length);

  return (
    <section id="demos" className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-foreground" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Interactive Demos</span>
            <div className="w-12 h-px bg-foreground" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            EXPERIENCE THE
            <br />
            <span className="text-muted-foreground">DIFFERENCE</span>
          </h2>
          
          <p className="text-base text-muted-foreground max-w-lg mx-auto font-mono">
            Enable your camera and control these 3D experiences with just your hands.
          </p>
        </motion.div>
      </div>

      {/* Demo Navigation */}
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-2"
        >
          {demos.map((demo, index) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(index)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 font-mono text-sm uppercase tracking-wider ${
                activeDemo === index
                  ? 'glass-card border-foreground/20 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <demo.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{demo.title}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Demo Container */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Navigation Arrows */}
          <Button
            variant="glass"
            size="icon"
            onClick={prevDemo}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 hidden lg:flex rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={nextDemo}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 hidden lg:flex rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Demo Card */}
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="aspect-video rounded-lg overflow-hidden border border-border"
          >
            <GestureDemo
              title={demos[activeDemo].title}
              description={demos[activeDemo].description}
            />
          </motion.div>

          {/* Demo Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {demos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveDemo(index)}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  activeDemo === index ? 'bg-foreground' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="container mx-auto px-6 mt-12"
      >
        <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-wider">
          ⦿ Camera feed processed locally • No data sent to servers
        </p>
      </motion.div>
    </section>
  );
};

export default DemoShowcase;