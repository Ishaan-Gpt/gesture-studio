"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Hand,
  Box,
  Sparkles,
  Zap,
  ArrowRight,
  MousePointer,
  RotateCcw,
  Eye,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

// DOTTED TEXTURE for all cards
const DottedTexture = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    />
    {/* Subtle gradient overlay */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)',
      }}
    />
  </div>
);

// Interactive Bento Card with magnetic + hover effects
const BentoCard = ({
  useCase,
  index,
  isInView
}: {
  useCase: typeof useCases[0];
  index: number;
  isInView: boolean;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={useCase.gridClass}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: -mousePos.y,
          rotateY: mousePos.x,
          translateY: mousePos.y === 0 ? 0 : -5,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        whileHover={{
          y: -10,
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.1)',
        }}
        className={cn(
          "group relative h-full p-6 lg:p-8 rounded-2xl border border-white/10",
          "bg-black hover:border-white/30",
          "transition-colors duration-300 cursor-pointer overflow-hidden",
          "[transform-style:preserve-3d] [perspective:1000px]",
          useCase.gridClass.includes('row-span-2') && 'min-h-[350px]'
        )}
      >
        {/* DOTTED TEXTURE */}
        <DottedTexture />

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col [transform-style:preserve-3d]">
          {/* Icon with 3D lift */}
          <motion.div
            className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 mb-4 w-fit"
            whileHover={{ scale: 1.15, rotate: 10, translateZ: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <useCase.icon className="w-6 h-6 text-white/80" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-display font-bold mb-2 text-white group-hover:text-white transition-colors">
            {useCase.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-auto group-hover:text-white/60 transition-colors">
            {useCase.description}
          </p>

          {/* Stats footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
              {useCase.stats}
            </span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const useCases = [
  {
    icon: Hand,
    title: 'Gesture Control',
    description: 'Hand-tracking interactions for touchless web experiences. Navigate, select, and manipulate without touching the screen.',
    stats: 'Zero learning curve',
    gridClass: 'lg:col-span-2 lg:row-span-2',
  },
  {
    icon: Box,
    title: '3D Product Viewers',
    description: 'Interactive 3D models customers can rotate, zoom, and explore.',
    stats: '360° exploration',
    gridClass: '',
  },
  {
    icon: MousePointer,
    title: 'Virtual Cursors',
    description: 'Custom cursor experiences that feel alive and responsive.',
    stats: 'Pixel-perfect',
    gridClass: '',
  },
  {
    icon: RotateCcw,
    title: 'Interactive Demos',
    description: 'Product demonstrations that users control and explore.',
    stats: 'Self-guided',
    gridClass: 'lg:col-span-2',
  },
  {
    icon: Sparkles,
    title: 'Immersive Showcases',
    description: 'Premium presentations for luxury brands and high-end products.',
    stats: 'Award-worthy',
    gridClass: '',
  },
  {
    icon: Zap,
    title: 'Rapid Delivery',
    description: 'From concept to production-ready in 30-96 hours.',
    stats: '30hr minimum',
    gridClass: '',
  },
  {
    icon: Eye,
    title: 'AR Experiences',
    description: 'Augmented reality overlays that blend digital with physical.',
    stats: 'Next-gen',
    gridClass: '',
  },
  {
    icon: Layers,
    title: 'Multi-Layer UI',
    description: 'Complex interfaces with depth, parallax, and 3D elements.',
    stats: 'Premium depth',
    gridClass: '',
  },
];

const UseCasesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="use-cases" className="relative py-32 overflow-hidden" ref={containerRef}>
      <div className="relative z-10 container mx-auto px-6">
        {/* Header with fade-in from left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6 bg-white/[0.02]"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
              What We Build
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-white"
          >
            Our <span className="text-white/40">Capabilities</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            Gesture control, 3D experiences, and interactive showpieces
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <BentoCard
              key={useCase.title}
              useCase={useCase}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
