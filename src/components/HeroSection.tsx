import { useState, useEffect } from "react";
import { VoidHero } from "@/components/ui/void-hero";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Typewriter effect for dynamic text
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
            <span className="inline-block w-[2px] h-[0.8em] bg-white/60 ml-1 animate-pulse" />
        </>
    );
};

const HeroSection = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDemo = () => {
        toast.info('Demo coming soon!');
    };

    return (
        <section id="hero" className="h-screen w-full relative">
            {/* Void Hero 3D Background */}
            <VoidHero
                title=""
                description=""
            />

            {/* Custom content overlay */}
            <div className="absolute bottom-12 left-6 md:bottom-16 md:left-12 lg:bottom-20 lg:left-16 z-20 max-w-lg">
                {/* Title with typewriter */}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-white leading-[1.1]">
                    <span className="block">Command the</span>
                    <span className="block bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                        web <TypewriterWord words={['touchless', 'contactless', 'seamlessly']} />
                    </span>
                </h1>

                {/* Subtext - faded */}
                <p className="text-sm md:text-base leading-relaxed text-white/35 mb-10 max-w-sm">
                    We design gesture-controlled 3D experiences
                    that let your users navigate screens
                    without ever touching them.
                </p>

                {/* CTAs */}
                <div className="flex gap-3">
                    <Button
                        size="default"
                        onClick={scrollToContact}
                        className="h-10 px-5 rounded bg-white text-black hover:bg-white/90 text-sm font-medium"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        size="default"
                        onClick={handleDemo}
                        className="h-10 px-5 rounded border-white/20 text-white/70 hover:bg-white/5 text-sm"
                    >
                        Watch Demo
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
