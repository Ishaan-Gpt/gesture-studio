import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GestureDemo from './GestureDemo';
import { ChevronLeft, ChevronRight, Smartphone, Layers, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const demos = [
  {
    id: 1,
    title: 'Product Showcase',
    description: 'Rotate, zoom, and explore 3D products with natural hand gestures',
    icon: Smartphone,
    gradient: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: 'Card Gallery',
    description: 'Navigate stacks of content with intuitive swipe and pinch controls',
    icon: Layers,
    gradient: 'from-secondary to-accent',
  },
  {
    id: 3,
    title: 'Data Visualization',
    description: 'Interact with 3D charts and graphs using spatial gestures',
    icon: BarChart3,
    gradient: 'from-accent to-primary',
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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Experience the <span className="gradient-text">Magic</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enable your camera and control these 3D experiences with just your hands.
            No special hardware required—just your webcam.
          </p>
        </motion.div>
      </div>

      {/* Demo Navigation */}
      <div className="container mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-4"
        >
          {demos.map((demo, index) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(index)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeDemo === index
                  ? 'glass-card border-primary/40 shadow-glow'
                  : 'bg-muted/20 hover:bg-muted/40'
              }`}
            >
              <demo.icon className={`w-5 h-5 ${
                activeDemo === index ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span className={`font-medium ${
                activeDemo === index ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {demo.title}
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Demo Container */}
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Navigation Arrows */}
          <Button
            variant="glass"
            size="icon"
            onClick={prevDemo}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 hidden lg:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            onClick={nextDemo}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 hidden lg:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Demo Card */}
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="aspect-video rounded-2xl overflow-hidden border border-border/50"
          >
            <GestureDemo
              title={demos[activeDemo].title}
              description={demos[activeDemo].description}
            />
          </motion.div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 lg:hidden">
            <Button variant="ghost" size="icon" onClick={prevDemo}>
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              {demos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeDemo === index ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" onClick={nextDemo}>
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="container mx-auto px-6 mt-8"
      >
        <p className="text-center text-sm text-muted-foreground">
          🔒 Your camera feed is processed locally in your browser. No video data is sent to any server.
        </p>
      </motion.div>
    </section>
  );
};

export default DemoShowcase;
