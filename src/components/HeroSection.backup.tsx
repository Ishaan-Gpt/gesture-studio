import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import gsap from 'gsap';

// Lazy load Spline
const Spline = lazy(() => import('@splinetool/react-spline'));

// Typewriter with word cycling
const TypewriterWord = ({ words }: { words: string[] }) => {
    const [currentWord, setCurrentWord] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[wordIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentWord.length < word.length) {
                    setCurrentWord(word.slice(0, currentWord.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            } else {
                if (currentWord.length > 0) {
                    setCurrentWord(word.slice(0, currentWord.length - 1));
                } else {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 40 : 90);

        return () => clearTimeout(timeout);
    }, [currentWord, isDeleting, wordIndex, words]);

    return (
        <>
            {currentWord}
            <span className="inline-block w-[3px] h-[0.9em] bg-white/60 ml-1 animate-pulse" />
        </>
    );
};

const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-title',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
            );
            gsap.fromTo('.hero-sub',
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
            );
            gsap.fromTo('.hero-btn',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.9 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDemo = () => {
        toast.info('Demo coming soon!');
    };

    return (
        <section
            ref={heroRef}
            id="hero"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            <div className="container mx-auto px-6 lg:px-12">
                {/* 40% content - 20% gap - 40% model */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between min-h-screen py-32 lg:py-0">

                    {/* LEFT: Content (40%) */}
                    <div className="w-full lg:w-[42%] z-10">

                        {/* Title with gradient shading */}
                        <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight mb-8">
                            <span className="block text-white drop-shadow-sm">
                                Command the
                            </span>
                            <span className="block bg-gradient-to-b from-white via-white/80 to-white/30 bg-clip-text text-transparent">
                                web <TypewriterWord words={['touchless', 'contactless', 'seamlessly']} />
                            </span>
                        </h1>

                        {/* Subtext - faded, relaxed */}
                        <p className="hero-sub text-lg text-white/35 leading-[1.7] max-w-[380px] mb-14">
                            We design gesture-controlled 3D experiences
                            that let your users navigate without
                            ever touching a screen.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                onClick={scrollToContact}
                                className="hero-btn h-12 px-7 rounded bg-white text-black hover:bg-white/90 text-sm font-medium"
                            >
                                Get Started
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleDemo}
                                className="hero-btn h-12 px-7 rounded border-white/15 text-white/80 hover:bg-white/5 text-sm"
                            >
                                Watch Demo
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT: 3D Model (40%) - clipped to hide watermark */}
                    <div className="hidden lg:block w-[42%] h-[80vh] relative">
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                clipPath: 'inset(0 0 45px 0)',
                                transform: 'scale(0.7)',
                                transformOrigin: 'center center'
                            }}
                        >
                            <Suspense fallback={
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-10 h-10 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
                                </div>
                            }>
                                <Spline
                                    scene="https://prod.spline.design/p9F8WLqtMAwQ7QOo/scene.splinecode"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        filter: 'grayscale(100%) contrast(1.05) brightness(1.02)'
                                    }}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
