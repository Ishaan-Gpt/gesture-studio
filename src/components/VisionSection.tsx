"use client";

import { Hand, Rocket, Code, Zap, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Heptact's process/timeline data
const heptactTimelineData = [
  {
    id: 1,
    title: "Brief",
    date: "Day 1-2",
    content: "30-minute discovery call. We understand your vision, requirements, and brand identity.",
    category: "Planning",
    icon: Sparkles,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Build",
    date: "Day 3-25",
    content: "Our team crafts custom 3D elements and gesture interactions tailored to your brand.",
    category: "Design",
    icon: Code,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Integrate",
    date: "Day 26-28",
    content: "Seamless integration with your existing tech stack. Clean, documented code.",
    category: "Development",
    icon: Hand,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Test",
    date: "Day 29",
    content: "Cross-browser testing, gesture calibration, and performance optimization.",
    category: "Testing",
    icon: Zap,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 40,
  },
  {
    id: 5,
    title: "Ship",
    date: "Day 30",
    content: "Delivered in 30-96 hours. Production-ready, optimized, and fully tested.",
    category: "Release",
    icon: Rocket,
    relatedIds: [4],
    status: "pending" as const,
    energy: 20,
  },
];

const VisionSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });

  return (
    <section id="vision" className="relative" ref={containerRef}>
      {/* Header - reduced spacing from py-12 to py-8 */}
      <div className="relative z-20 py-8 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/[0.02]">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              How It Works
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-white">
            Concept to <span className="text-white/40">Component</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-2">
            Click nodes to explore our development process
          </p>
          <p className="text-xs text-white/30 font-mono">
            Interactive • Auto-Rotating Timeline
          </p>
        </motion.div>
      </div>

      {/* Orbital Timeline Component */}
      <RadialOrbitalTimeline timelineData={heptactTimelineData} />
    </section>
  );
};

export default VisionSection;
