"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';

const TrustBar = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="py-20 border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 text-center"
        >
          Trusted by forward-thinking brands
        </motion.p>
      </div>

      {/* Scroll-based velocity text - BIGGER and SLOWER */}
      <ScrollVelocityContainer className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white/10">
        <ScrollVelocityRow baseVelocity={3} direction={1}>
          <span className="mx-12">ACME</span>
          <span className="mx-12">•</span>
          <span className="mx-12">VERTEX</span>
          <span className="mx-12">•</span>
          <span className="mx-12">AXIOM</span>
          <span className="mx-12">•</span>
          <span className="mx-12">NEXUS</span>
          <span className="mx-12">•</span>
          <span className="mx-12">PRISM</span>
          <span className="mx-12">•</span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={3} direction={-1}>
          <span className="mx-12 text-white/5">HEPTACT</span>
          <span className="mx-12 text-white/5">•</span>
          <span className="mx-12 text-white/5">GESTURE</span>
          <span className="mx-12 text-white/5">•</span>
          <span className="mx-12 text-white/5">3D</span>
          <span className="mx-12 text-white/5">•</span>
          <span className="mx-12 text-white/5">IMMERSIVE</span>
          <span className="mx-12 text-white/5">•</span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
};

export default TrustBar;
