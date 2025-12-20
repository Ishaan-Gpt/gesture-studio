"use client";

import { Hand, Rocket, Code, Zap, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Heptact's process/timeline data
const heptactTimelineData = [
    {
        id: 1,
        title: "Concept",
        date: "Day 1-2",
        content: "We discuss your vision and define the interactive experience you need.",
        category: "Planning",
        icon: Sparkles,
        relatedIds: [2],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 2,
        title: "Design",
        date: "Day 3-7",
        content: "UI/UX design with gesture interactions and 3D elements mapped out.",
        category: "Design",
        icon: Code,
        relatedIds: [1, 3],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 3,
        title: "Development",
        date: "Day 8-25",
        content: "Building gesture controls, 3D models, and interactive components.",
        category: "Development",
        icon: Hand,
        relatedIds: [2, 4],
        status: "in-progress" as const,
        energy: 70,
    },
    {
        id: 4,
        title: "Testing",
        date: "Day 26-28",
        content: "Cross-browser testing, gesture calibration, and performance optimization.",
        category: "Testing",
        icon: Zap,
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 40,
    },
    {
        id: 5,
        title: "Launch",
        date: "Day 30",
        content: "Final deployment, handoff, and support documentation.",
        category: "Release",
        icon: Rocket,
        relatedIds: [4],
        status: "pending" as const,
        energy: 20,
    },
];

export function ConceptToComponent() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="process" className="relative" ref={containerRef}>
            {/* Header overlay on black background */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-16 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-6 text-center"
                >
                    <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/[0.02]">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                            Our Process
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-white">
                        Concept to <span className="text-white/40">Component</span>
                    </h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto mb-4">
                        Click nodes to explore our development process
                    </p>
                    <p className="text-sm text-white/30 font-mono">
                        Interactive • Orbital Timeline
                    </p>
                </motion.div>
            </div>

            {/* Orbital Timeline Component */}
            <RadialOrbitalTimeline timelineData={heptactTimelineData} />
        </section>
    );
}

export default ConceptToComponent;
