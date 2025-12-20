"use client";

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

// Before/After transformation examples
const transformations = [
    {
        id: 1,
        before: {
            title: 'Boring Nav',
            description: 'Standard click-based navigation',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGtkMzJhN2c4NWd3M3J3OGpyMTFxdWN4OWVkbG8ycnVkMjZiMWlxciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif',
        },
        after: {
            title: 'Gesture Nav',
            description: 'Hand-tracking navigation',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJ3bXZvOTFjNHM3ZGw3Yzl0cGZsNmZ5ZnpqYzN0Zm1hNjBpZnB5ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnxpQ3ghPiB2Hp6/giphy.gif',
        },
    },
    {
        id: 2,
        before: {
            title: 'Flat Image',
            description: 'Static 2D product photo',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm9yZ2RiMzVzbWtzODF1eHRvaWxlbWh6cWZ6YjZ1dDFkcmI2bTFsZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT0xeJpnrWC4XWblEk/giphy.gif',
        },
        after: {
            title: '3D Model',
            description: 'Interactive 3D exploration',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjhqaDJrZnRoN3JvbmJjd3R5YzJ0YmFjenQ0ZGN6bm5rY3B5dHJhNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6ZsYq8hHcL8uIhW0/giphy.gif',
        },
    },
    {
        id: 3,
        before: {
            title: 'Static Site',
            description: 'Traditional web experience',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXRhbWVpYnN5bG10OXJ3eGoyMXBjZnVnODI0OHc3NXV0dG9ybW9nbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlNQ03J5JxX6lva/giphy.gif',
        },
        after: {
            title: 'Interactive',
            description: 'Immersive touchless control',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNhd2J3b3BlaTltdGN6OWN6YmRnZXprdWM2bno0YzB0Zmw0eTNveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKSjRrfIPjeiVyM/giphy.gif',
        },
    },
    {
        id: 4,
        before: {
            title: '2D Product',
            description: 'Flat product showcase',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjdvaDZ1c2IxeGRyZHU1dGRlaGQ1eDR6aGZ5MTI1eWFmZ3UyaWw1eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGcguWZHRC2HyBRS/giphy.gif',
        },
        after: {
            title: '360° Viewer',
            description: 'Full rotation control',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmw3YWQ5N2U5MGt6OTNjdzR0N3p6YjJkdXc0aWE5emhrcGZ5aWs2MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif',
        },
    },
    {
        id: 5,
        before: {
            title: 'Basic Portfolio',
            description: 'Standard scrolling site',
            image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2J2MHN3dW5sNzlkb3VqbXJxZDZ3ZGMxaTJ1cmhxNjZsNXpnNWx0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRuo6sLetdllPAQ/giphy.gif',
        },
        after: {
            title: 'Gesture Control',
            description: 'Hands-free navigation',
            gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGlic3BxcDF5eWlkM3Z1b2ZqMzNobW9hZHN6bGdxZXdiZWY3ZWEwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPlifLxdigmIJJC/giphy.gif',
        },
    },
];

// Flip Card Component
const FlipCard = ({ item, index }: { item: typeof transformations[0]; index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const x = useMotionValue(0);
    const rotateY = useTransform(x, [-150, 0, 150], [180, 0, -180]);
    const cardRef = useRef<HTMLDivElement>(null);

    // Flip threshold
    const handleDragEnd = () => {
        const xVal = x.get();
        if (Math.abs(xVal) > 50) {
            setIsFlipped(!isFlipped);
        }
        x.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-50px' }}
            className="relative h-[380px] md:h-[420px] [perspective:1200px]"
        >
            <motion.div
                ref={cardRef}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ x }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative w-full h-full cursor-grab active:cursor-grabbing [transform-style:preserve-3d]"
            >
                {/* FRONT - Before State */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                        {/* Dotted texture */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            }}
                        />

                        {/* Image */}
                        <div className="relative h-48 md:h-56 overflow-hidden">
                            <img
                                src={item.before.image}
                                alt={item.before.title}
                                className="w-full h-full object-cover opacity-60 grayscale"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            {/* Before badge */}
                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">Before</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-white/60 mb-2">
                                {item.before.title}
                            </h3>
                            <p className="text-sm text-white/40 mb-4">
                                {item.before.description}
                            </p>

                            {/* Swipe hint */}
                            <div className="flex items-center gap-2 text-white/30">
                                <ArrowLeftRight className="w-4 h-4" />
                                <span className="text-xs font-mono">Drag or tap to flip</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK - After State */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

                        {/* GIF */}
                        <div className="relative h-48 md:h-56 overflow-hidden">
                            <img
                                src={item.after.gif}
                                alt={item.after.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                            {/* After badge */}
                            <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-white" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">After</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                                {item.after.title}
                            </h3>
                            <p className="text-sm text-white/60 mb-4">
                                {item.after.description}
                            </p>

                            {/* Enhanced indicator */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs font-mono text-green-400/80">Interactive</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const BeforeAfterCards = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });

    return (
        <section className="relative py-32 overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/[0.02]"
                    >
                        <ArrowLeftRight className="w-3 h-3 text-white/50" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                            Transformations
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-white"
                    >
                        Before <span className="text-white/40">&</span> After
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg text-white/50 max-w-2xl mx-auto mb-4"
                    >
                        Drag or tap the cards to see the transformation
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {transformations.map((item, index) => (
                        <FlipCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {/* Bottom hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <p className="text-sm text-white/30 font-mono">
                        All transformations delivered in 30-96 hours
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default BeforeAfterCards;
