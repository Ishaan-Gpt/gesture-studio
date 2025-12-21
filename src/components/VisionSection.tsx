"use client";

import { Hand, Rocket, Code, Zap, Sparkles } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Heptact's process/timeline data
const heptactTimelineData = [
  {
    id: 1,
    title: "Discovery",
    date: "Phase 01",
    content: "Strategic consultation to define your gesture interface requirements and brand objectives.",
    category: "Strategic",
    icon: Sparkles,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Architecture",
    date: "Phase 02",
    content: "Crafting custom 3D logic and AI-driven gesture mapping specifically for your environment.",
    category: "Design",
    icon: Code,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Intelligence",
    date: "Phase 03",
    content: "Deep-level integration into your tech stack. Clean, high-performance neural deployment.",
    category: "Integration",
    icon: Hand,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Optimization",
    date: "Phase 04",
    content: "Rigorous stress testing, gesture calibration, and ultra-smooth performance tuning.",
    category: "Testing",
    icon: Zap,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 40,
  },
  {
    id: 5,
    title: "Deployment",
    date: "Phase 05",
    content: "Your gesture experience goes live. Elite-grade support and documented maintenance.",
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
