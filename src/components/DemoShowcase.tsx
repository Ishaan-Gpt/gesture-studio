import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GestureDemo from './GestureDemo';
import { ChevronLeft, ChevronRight, Box, Layers, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const demos = [
  {
    id: 1,
    title: 'Product Showcase',
    description: 'Rotate & zoom 3D products with gestures',
    icon: Box,
    modelType: 'product' as const,
  },
  {
    id: 2,
    title: 'Card Gallery',
    description: 'Navigate cards with swipe gestures',
    icon: Layers,
    modelType: 'cards' as const,
  },
  {
    id: 3,
    title: 'Data Visualization',
    description: 'Explore 3D charts with spatial input',
    icon: BarChart3,
    modelType: 'dataviz' as const,
  },
];

const DemoShowcase = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  const nextDemo = () => setActiveDemo((prev) => (prev + 1) % demos.length);
  const prevDemo = () => setActiveDemo((prev) => (prev - 1 + demos.length) % demos.length);

  return (
    <section id="demos" className="relative py-24 overflow-hidden" ref={containerRef}>
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-foreground" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Live Demos</span>
            <div className="w-8 h-px bg-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            SEE IT IN ACTION
          </h2>
          
          <p className="text-sm text-muted-foreground max-w-md mx-auto font-mono">
            Enable camera. Control with hands. Zero hardware.
          </p>
        </motion.div>
      </div>

      {/* Demo Tabs */}
      <div className="container mx-auto px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-1"
        >
          {demos.map((demo, index) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-mono text-xs uppercase tracking-wider ${
                activeDemo === index
                  ? 'glass-card border-foreground/20 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <demo.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{demo.title}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Demo */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <Button
            variant="glass"
            size="icon"
            onClick={prevDemo}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 hidden lg:flex rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={nextDemo}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 hidden lg:flex rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

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
              modelType={demos[activeDemo].modelType}
            />
          </motion.div>

          <div className="flex justify-center gap-2 mt-6">
            {demos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveDemo(index)}
                className={`w-6 h-1 rounded-full transition-all duration-300 ${
                  activeDemo === index ? 'bg-foreground' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="container mx-auto px-6 mt-8"
      >
        <p className="text-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          ⦿ Processed locally • No data sent
        </p>
      </motion.div>
    </section>
  );
};

export default DemoShowcase;
