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
import { TextScramble } from '@/components/ui/text-scramble';
import { Magnetic } from '@/components/ui/magnetic';
import { Typewriter } from '@/components/ui/typography-effects';

// Original Three.js 3D shape - optimized for performance
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
      <group position={[4, 0, 0]}>
        <mesh ref={torusRef} scale={1.5}>
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo('.hero-line',
        { y: 40, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
        .fromTo('.hero-subtext',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-cta',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPricing = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchShowreel = () => {
    toast.info('Showreel coming soon!', { description: 'Our portfolio video is being finalized.' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen pt-20 overflow-hidden flex items-center"
    >
      {/* Optimized 3D Background - Three.js */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
            <HeroShape />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="hero-line overflow-hidden mb-6">
              <motion.div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  v2.0 System Online
                </span>
              </motion.div>
            </div>

            {/* SEO Optimized Headline with Scramble Effect */}
            <div className="mb-2">
              <h1 className="hero-line text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-white">
                <TextScramble text="THE GESTURE AGENCY" />
              </h1>
            </div>
            <div className="mb-6">
              <h1 className="hero-line text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 drop-shadow-2xl">
                <TextScramble text="BEYOND THE MOUSE" />
              </h1>
            </div>

            {/* Subheadline with Typewriter */}
            <p className="hero-subtext text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light">
              We design the future of web interaction.
              <span className="text-white font-medium"> No sensors. No hardware. Just{' '}
                <Typewriter
                  words={['pure AI', 'precision', 'hand gestures', 'immersion']}
                  className="text-white"
                  typingSpeed={100}
                  deletingSpeed={60}
                  delayBetweenWords={2000}
                />{' '}
              </span>
              Heptact engineers premium, hardware-free gesture interfaces that turn static websites into interactive 3D masterpieces.
            </p>

            {/* CTAs with Magnetic Effect */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic strength={0.4}>
                <Button
                  variant="default"
                  size="lg"
                  onClick={scrollToPricing}
                  className="hero-cta h-14 px-8 rounded-full bg-white text-black hover:bg-gray-200 hover:shadow-2xl hover:shadow-white/20 transition-all text-base font-semibold"
                >
                  View Plans
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Magnetic>

              <Magnetic strength={0.4}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWatchShowreel}
                  className="hero-cta h-14 px-8 rounded-full border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-xl hover:shadow-white/10 backdrop-blur-sm transition-all text-base"
                >
                  <Play className="mr-2 w-4 h-4" />
                  Showreel
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
