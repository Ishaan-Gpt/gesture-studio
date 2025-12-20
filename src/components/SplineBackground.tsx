"use client";

import { Suspense, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Spline scenes for different sections
const splineScenes = {
    hero: "https://prod.spline.design/FNw66ZrpkiaiARyk/scene.splinecode",
    services: "https://prod.spline.design/4vBRQaopxYpVqvIX/scene.splinecode",
    vision: "https://prod.spline.design/qwdFFMI4r0CAbMiz/scene.splinecode",
};

interface SplineBackgroundProps {
    sceneUrl: string;
    className?: string;
}

function SplineLoader() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        </div>
    );
}

export function SplineBackground({ sceneUrl, className }: SplineBackgroundProps) {
    const [SplineComponent, setSplineComponent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, margin: '100px' });

    useEffect(() => {
        // Only load Spline when in view
        if (isInView && !SplineComponent && !hasError) {
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
        }
    }, [isInView, SplineComponent, hasError]);

    return (
        <div ref={containerRef} className={className}>
            {isInView && (
                <>
                    {isLoading && <SplineLoader />}
                    {hasError && (
                        <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent" />
                    )}
                    {SplineComponent && !hasError && (
                        <Suspense fallback={<SplineLoader />}>
                            <SplineComponent
                                scene={sceneUrl}
                                className="w-full h-full"
                            />
                        </Suspense>
                    )}
                </>
            )}
        </div>
    );
}

// Export scene URLs for use in other components
export { splineScenes };
export default SplineBackground;
