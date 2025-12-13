import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { Mesh } from 'three';

// Inline 3D shape for seamless integration
const HeroShape = () => {
  const torusRef = useRef<Mesh>(null);
  const sphereRef = useRef<Mesh>(null);
  const wireframeRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15;
      torusRef.current.rotation.y = t * 0.25;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.2;
      sphereRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.1;
      wireframeRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[2, 0, 0]}>
        <mesh ref={torusRef} scale={1.8}>
          <torusKnotGeometry args={[1, 0.32, 128, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        
        <mesh ref={sphereRef} scale={0.7}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.7}
            roughness={0.3}
            envMapIntensity={1.5}
          />
        </mesh>

        <mesh ref={wireframeRef} scale={3.5}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.08} transparent />
        </mesh>

        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI * 2) / 5) * 3,
              Math.sin((i * Math.PI * 2) / 5) * 0.6,
              Math.sin((i * Math.PI * 2) / 5) * 3
            ]}
          >
            <octahedronGeometry args={[0.1]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} emissive="#ffffff" emissiveIntensity={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo('.hero-line', 
          { y: 40, opacity: 0, skewY: 2 },
          { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.08, ease: 'power4.out' }
        )
        .fromTo('.hero-subtext',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-cta',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out' },
          '-=0.2'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchShowreel = () => {
    toast.info('Showreel coming soon!', { description: 'Our portfolio video is being finalized.' });
  };

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative h-screen pt-20 overflow-hidden"
    >
      {/* Full-screen 3D Canvas - seamlessly integrated */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
            <spotLight position={[0, 10, 0]} intensity={0.4} angle={0.3} penumbra={1} />
            <HeroShape />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="hero-line overflow-hidden mb-4">
              <motion.div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                  Custom Components in 30 Hours
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <h1 className="hero-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight">
                WE BUILD
              </h1>
            </div>
            <div className="overflow-hidden mb-1">
              <h1 className="hero-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight gradient-text">
                GESTURE-DRIVEN
              </h1>
            </div>
            <div className="overflow-hidden mb-5">
              <h1 className="hero-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] tracking-tight">
                3D EXPERIENCES
              </h1>
            </div>

            {/* Subheadline */}
            <p className="hero-subtext text-xs md:text-sm text-muted-foreground max-w-md mb-6 font-mono leading-relaxed">
              Bespoke webcam-powered gesture components for brands that demand innovation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                size="default"
                onClick={scrollToPricing}
                className="hero-cta group"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="default"
                onClick={handleWatchShowreel}
                className="hero-cta group"
              >
                <Play className="w-4 h-4" />
                Watch Showreel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle ambient elements */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-foreground/[0.02] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] rounded-full bg-foreground/[0.015] blur-[60px] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
