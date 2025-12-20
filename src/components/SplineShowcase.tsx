"use client";

import { Suspense, lazy, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Lazy load Spline
const Spline = lazy(() => import('@splinetool/react-spline'));

// Abstract/Ball Spline scene - Full interactive section
const ABSTRACT_SCENE = "https://prod.spline.design/4vBRQaopxYpVqvIX/scene.splinecode";

export function SplineShowcase() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "200px" });
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Full-screen Spline Background */}
            <div className="absolute inset-0">
                {isInView && (
                    <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center bg-black">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <p className="text-sm font-mono text-white/40">Initializing Experience...</p>
                            </div>
                        </div>
                    }>
                        <Spline
                            scene={ABSTRACT_SCENE}
                            onLoad={() => setIsLoaded(true)}
                            className="w-full h-full"
                            style={{
                                // Tailored to website colors - white/glow effect
                                filter: 'brightness(1.1) saturate(0.1) contrast(1.15)',
                            }}
                        />
                    </Suspense>
                )}

                {/* Subtle gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Content overlay - centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center px-6"
                >
                    <p className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">
                        Immersive Experience
                    </p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6">
                        Feel the <span className="text-white/30">Dimension</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto">
                        Move your cursor to interact with the 3D space
                    </p>
                </motion.div>
            </div>

            {/* Interactive hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
            >
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                        Interactive • Move to explore
                    </span>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 3 }}
                className="absolute bottom-10 right-10 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest writing-mode-vertical">
                        Scroll
                    </span>
                    <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default SplineShowcase;
