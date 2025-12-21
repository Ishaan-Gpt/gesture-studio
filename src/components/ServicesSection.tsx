import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Lightbulb, Layers, Wand2, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Mesh } from 'three';
import { useGesture } from '@/context/GestureContext';

gsap.registerPlugin(ScrollTrigger);

// 3D Gesture-controlled shapes for each service
const GestureShape1 = () => {
    const meshRef = useRef<Mesh>(null);
    const { cursorPosition } = useGesture();

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.elapsedTime;
            meshRef.current.rotation.x = t * 0.1 + (cursorPosition.y - 0.5) * 0.5;
            meshRef.current.rotation.y = t * 0.15 + (cursorPosition.x - 0.5) * 0.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={2}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
            </mesh>
        </Float>
    );
};


const GestureShape2 = () => {
    const meshRef = useRef<Mesh>(null);
    const { cursorPosition } = useGesture();

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.elapsedTime;
            meshRef.current.rotation.y = t * 0.2 + (cursorPosition.x - 0.5) * 0.8;
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} wireframe />
            </mesh>
        </Float>
    );
};

const GestureShape3 = () => {
    const meshRef = useRef<Mesh>(null);
    const { cursorPosition } = useGesture();

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.elapsedTime;
            meshRef.current.rotation.x = (cursorPosition.y - 0.5) * 0.6;
            meshRef.current.rotation.z = t * 0.1;
            meshRef.current.rotation.y = (cursorPosition.x - 0.5) * 0.6;
        }
    });

    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
            <mesh ref={meshRef} scale={2.2}>
                <octahedronGeometry args={[1]} />
                <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.05} />
            </mesh>
        </Float>
    );
};

const GestureShape4 = () => {
    const meshRef = useRef<Mesh>(null);
    const ringRef = useRef<Mesh>(null);
    const { cursorPosition } = useGesture();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2 + (cursorPosition.x - 0.5) * 0.5;
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = t * 0.15;
            ringRef.current.rotation.z = (cursorPosition.y - 0.5) * 0.4;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
            <group>
                <mesh ref={meshRef} scale={1.5}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh ref={ringRef} scale={2.2}>
                    <torusGeometry args={[1, 0.05, 16, 100]} />
                    <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
                </mesh>
            </group>
        </Float>
    );
};

const shapes = [GestureShape1, GestureShape2, GestureShape3, GestureShape4];

const services = [
    {
        id: 1,
        icon: Sparkles,
        title: 'Gesture Integration',
        subtitle: 'To Your Website',
        description: 'Seamlessly add gesture controls to your existing website. Transform any static interface into an interactive, touchless experience.',
        features: [
            'Webcam-powered hand tracking',
            'Zero-latency cursor response',
            'Cross-browser compatible',
            'Mobile & desktop ready',
            'Custom gesture mapping',
        ],
    },
    {
        id: 2,
        icon: Lightbulb,
        title: 'Idea to Gesture',
        subtitle: 'Experience',
        description: 'Share your vision and we bring it to life. From concept to deployment, we craft bespoke gesture-driven experiences.',
        features: [
            'Full creative direction',
            'Brand-aligned design',
            'End-to-end development',
            'User testing included',
            'Launch support',
        ],
    },
    {
        id: 3,
        icon: Layers,
        title: 'Assets to Amazing',
        subtitle: 'Experiences',
        description: 'Transform your existing 3D models, videos, and assets into gesture-controlled masterpieces with maximum impact.',
        features: [
            '3D model optimization',
            'Video gesture sync',
            'Performance tuning',
            'Asset conversion',
            'Quality assurance',
        ],
    },
    {
        id: 4,
        icon: Wand2,
        title: 'Add Gesture to',
        subtitle: 'Existing Experience',
        description: 'Already have a web experience? We layer in gesture controls without disrupting your existing flow.',
        features: [
            'Non-invasive integration',
            'Graceful fallbacks',
            'Analytics included',
            'Documentation',
            'Ongoing support',
        ],
    },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
    const Icon = service.icon;
    const ShapeComponent = shapes[index];

    return (
        <div className="service-panel h-screen w-full flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                                Service 0{service.id}
                            </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] mb-1 text-white">
                            {service.title}
                        </h3>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-white/40 mb-8">
                            {service.subtitle}
                        </h3>

                        <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
                            {service.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-3 mb-10">
                            {service.features.map((feature, i) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white/60" />
                                    </div>
                                    <span className="text-sm font-mono text-white/70">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="lg"
                            className="group rounded-full border-white/20 bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Right Content - 3D Shape */}
                    <div className="order-1 lg:order-2 h-[50vh] lg:h-[60vh]">
                        <Canvas
                            camera={{ position: [0, 0, 5], fov: 50 }}
                            dpr={[1, 1.5]}
                            gl={{ antialias: true, alpha: true }}
                            style={{ background: 'transparent' }}
                        >
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.3} />
                                <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
                                <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
                                <ShapeComponent />
                                <Environment preset="city" />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServicesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const panels = panelsRef.current;

        if (!container || !panels) return;

        const ctx = gsap.context(() => {
            const panelElements = gsap.utils.toArray('.service-panel') as HTMLElement[];

            // Pin the container and scroll through panels
            gsap.to(panelElements, {
                xPercent: -100 * (panelElements.length - 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: (value) => {
                            const step = 1 / (panelElements.length - 1);
                            const index = Math.floor(value / step);
                            const remainder = (value % step) / step;
                            // Aggressive snap: If past 30%, snap forward. Otherwise snap back.
                            return remainder > 0.3 ? (index + 1) * step : index * step;
                        },
                        duration: { min: 0.3, max: 0.6 },
                        delay: 0.1,
                        ease: "power2.inOut"
                    },
                    end: () => '+=' + panels.offsetWidth,
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" className="relative overflow-hidden">
            {/* Section Header */}
            <div className="container mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/[0.02]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                            Our Services
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-white">
                        What We <span className="text-white/40">Build</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-4">
                        Four ways to bring gesture control to your digital experience
                    </p>
                    <p className="text-sm text-white/30 font-mono">
                        Scroll to explore →
                    </p>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div ref={containerRef} className="relative">
                <div
                    ref={panelsRef}
                    className="flex"
                    style={{ width: `${services.length * 100}vw` }}
                >
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
