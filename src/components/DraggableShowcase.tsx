"use client";

import React, { useState } from "react";
import {
    DraggableCardBody,
    DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGesture } from "@/context/GestureContext";
import { Hand, MousePointer2, Box, Sparkles, Zap, Eye } from "lucide-react";

// Educational transformations
const transformations = [
    {
        title: "Gesture Navigation",
        icon: Hand,
        before: {
            title: "Traditional Click & Scroll",
            points: ["Mouse/touchpad required", "Physical contact needed", "Poor accessibility"],
        },
        after: {
            title: "Hand Tracking Control",
            points: ["Navigate with gestures", "Zero contact required", "Fully accessible"],
        },
        className: "absolute top-10 left-[15%] rotate-[-5deg]",
    },
    {
        title: "3D Product Viewers",
        icon: Box,
        before: {
            title: "Flat 2D Images",
            points: ["Single view angle", "No depth", "Limited exploration"],
        },
        after: {
            title: "Interactive 3D Models",
            points: ["Rotate & zoom freely", "Every angle visible", "Full immersion"],
        },
        className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
        title: "Touchless Interfaces",
        icon: MousePointer2,
        before: {
            title: "Click-Heavy UI",
            points: ["Click for everything", "Tedious navigation", "Hand strain"],
        },
        after: {
            title: "Gesture-Based Actions",
            points: ["Pinch to click", "Swipe to scroll", "Natural control"],
        },
        className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
        title: "360° Product Views",
        icon: Sparkles,
        before: {
            title: "Limited Angles",
            points: ["1-2 photos only", "Details hidden", "Incomplete view"],
        },
        after: {
            title: "Full Rotation Control",
            points: ["Complete 360° spin", "All details visible", "Total confidence"],
        },
        className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
        title: "Immersive Experiences",
        icon: Eye,
        before: {
            title: "Passive Browsing",
            points: ["Scroll and read", "No engagement", "Low retention"],
        },
        after: {
            title: "Active Participation",
            points: ["User controlled", "High engagement", "Memorable UX"],
        },
        className: "absolute top-20 right-[30%] rotate-[2deg]",
    },
    {
        title: "Rapid Development",
        icon: Zap,
        before: {
            title: "Slow Dev Cycles",
            points: ["Weeks to months", "Many revisions", "Delayed launch"],
        },
        after: {
            title: "30-96 Hour Delivery",
            points: ["Live in days", "Fast iteration", "Quick testing"],
        },
        className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
];

// Scanline Effect
const Scanline = () => (
    <motion.div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 50%, transparent)',
            height: '20px',
            width: '100%',
        }}
        animate={{
            top: ['-20px', '100%'],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
        }}
    />
);

// Animated Dots Texture - Enhanced
const AnimatedDotsTexture = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large moving dots */}
        <motion.div
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px)',
                backgroundSize: '40px 40px',
            }}
            animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
            }}
        />
        {/* Fixed grid */}
        <div
            className="absolute inset-0 opacity-10"
            style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}
        />
        <Scanline />
    </div>
);

// Animated Tech Grid Texture - Enhanced
const AnimatedTechGridTexture = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moving vertical lines */}
        <motion.div
            className="absolute inset-0 opacity-30"
            style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '30px 100%',
            }}
            animate={{
                backgroundPosition: ['0px 0px', '30px 0px'],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
            }}
        />
        {/* Cross hatch pattern */}
        <div
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)',
            }}
        />
        <Scanline />
    </div>
);

// Flip Card Component
const EducationalFlipCard = ({ item, index }: { item: typeof transformations[0]; index: number }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = item.icon;

    return (
        <DraggableCardBody key={index} className={item.className}>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(!isFlipped);
                }}
                className="absolute inset-0 [perspective:1000px] cursor-pointer"
            >
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full [transform-style:preserve-3d]"
                >
                    {/* FRONT - Problem */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-black rounded-lg overflow-hidden border border-white/10">
                        <AnimatedDotsTexture />

                        {/* Content */}
                        <div className="relative z-10 h-full p-8 flex flex-col items-center text-center">
                            {/* Icon with glow */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 blur-lg bg-red-500/20 rounded-full scale-150" />
                                <div className="relative inline-flex p-4 rounded-xl bg-white/5 border border-white/10">
                                    <Icon className="w-8 h-8 text-white/90" />
                                </div>
                            </div>

                            {/* Challenge badge */}
                            <div className="mb-4">
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                                    THE CHALLENGE
                                </span>
                            </div>

                            {/* Title - SIGNIFICANTLY BIGGER */}
                            <h3 className="text-3xl font-display font-bold text-white mb-8 leading-tight tracking-tight">
                                {item.before.title}
                            </h3>

                            {/* Points - BIGGER & SPACED */}
                            <div className="w-full flex-1 flex flex-col justify-center gap-4">
                                {item.before.points.map((point, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="flex items-center gap-3 text-lg text-white/60 text-left"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/50 shadow-[0_0_8px_rgba(248,113,113,0.5)]" />
                                        <span className="leading-snug">{point}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Flip hint with animated arrow */}
                            <div className="mt-8 flex items-center gap-2 group/hint">
                                <span className="text-xs font-mono text-white/30 uppercase tracking-widest group-hover/hint:text-white/60 transition-colors">
                                    SOLUTION
                                </span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Zap className="w-3 h-3 text-red-400/40 group-hover/hint:text-red-400 transition-colors" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* BACK - Solution */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-black rounded-lg overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <AnimatedTechGridTexture />

                        {/* Glow spots */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 blur-[80px] rounded-full" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full" />

                        {/* Content */}
                        <div className="relative z-10 h-full p-8 flex flex-col items-center text-center">
                            {/* Live Badge */}
                            <div className="mb-4">
                                <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    HEPTACT SOLUTION
                                </span>
                            </div>

                            {/* Title - SIGNIFICANTLY BIGGER */}
                            <h3 className="text-3xl font-display font-bold text-white mb-8 leading-tight tracking-tight">
                                {item.after.title}
                            </h3>

                            {/* Points - BIGGER & SPACED */}
                            <div className="w-full flex-1 flex flex-col justify-center gap-4">
                                {item.after.points.map((point, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="flex items-center gap-3 text-lg text-white/90 text-left"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                        <span className="leading-snug">{point}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Success Accent */}
                            <div className="mt-8">
                                <div className="flex items-center gap-1.5 text-xs font-mono text-white/20 uppercase tracking-[0.3em]">
                                    <Sparkles className="w-3 h-3" />
                                    READY TO DEPLOY
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </DraggableCardBody>
    );
};

export function DraggableShowcase() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const { isEnabled } = useGesture();

    return (
        <section className="relative py-32 overflow-hidden" ref={containerRef}>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2 mb-8 bg-white/[0.03] backdrop-blur-md">
                        <motion.div
                            className="relative flex h-2 w-2"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </motion.div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/60">
                            The Paradigm Shift
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white leading-tight">
                        Problems We <span className="text-white/30 italic">Solve.</span>
                    </h2>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto font-light tracking-wide">
                        {isEnabled
                            ? "Navigate the future with hand gestures • Click to flip cards"
                            : "Click and drag to explore • Click to reveal the transformation"
                        }
                    </p>
                </motion.div>
            </div>

            {/* Draggable + Flippable Educational Cards */}
            <DraggableCardContainer className="relative flex min-h-[700px] w-full items-center justify-center overflow-clip">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03]">
                    <span className="text-[15rem] font-black uppercase tracking-tighter text-white">TRANSFORM</span>
                </div>
                {transformations.map((item, index) => (
                    <EducationalFlipCard key={index} item={item} index={index} />
                ))}
            </DraggableCardContainer>

            {/* Bottom Accent */}
            <div className="container mx-auto px-6 mt-16 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-white/20 font-mono text-xs uppercase tracking-[0.5em]"
                >
                    Touchless • Immersive • 96hr Delivery
                </motion.div>
            </div>
        </section>
    );
}

export default DraggableShowcase;
