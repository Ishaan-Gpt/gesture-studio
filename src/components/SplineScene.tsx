"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function SplineScene() {
    const [SplineComponent, setSplineComponent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Dynamically import Spline
        import('@splinetool/react-spline')
            .then((mod) => {
                setSplineComponent(() => mod.default);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load Spline:', err);
                setHasError(true);
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Header overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 pt-24 pb-8">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-4 bg-black/50 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                                Interactive 3D
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                            Experience the <span className="text-white/40">Future</span>
                        </h2>
                        <p className="text-sm text-white/50 max-w-md mx-auto">
                            Interact with this 3D scene using your mouse or gestures
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Spline 3D Scene */}
            <div className="absolute inset-0">
                {isLoading && (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <p className="text-sm font-mono text-white/40">Loading 3D Experience...</p>
                        </div>
                    </div>
                )}
                {hasError && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                        <div className="text-center">
                            <p className="text-white/40 font-mono text-sm">[ 3D Scene Placeholder ]</p>
                            <p className="text-white/20 text-xs mt-2">Interactive experience coming soon</p>
                        </div>
                    </div>
                )}
                {SplineComponent && !hasError && (
                    <SplineComponent
                        scene="https://prod.spline.design/DVV7r-6OY7keG2IC/scene.splinecode"
                        className="w-full h-full"
                    />
                )}
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}

export default SplineScene;
