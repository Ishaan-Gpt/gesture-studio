"use client";

import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface VelocityScrollProps {
    text: string;
    defaultVelocity?: number;
    className?: string;
}

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    className?: string;
}

function ParallaxText({ children, baseVelocity = 5, className }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 200,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
            <motion.div
                className={cn("flex whitespace-nowrap flex-nowrap gap-4", className)}
                style={{ x }}
            >
                {Array.from({ length: 4 }).map((_, i) => (
                    <span key={i} className="block">
                        {children}{" "}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// Helper function to wrap values
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function VelocityScroll({
    text,
    defaultVelocity = 3,
    className,
}: VelocityScrollProps) {
    return (
        <section className="relative w-full overflow-hidden py-8">
            <ParallaxText baseVelocity={defaultVelocity} className={className}>
                {text}
            </ParallaxText>
            <ParallaxText baseVelocity={-defaultVelocity} className={className}>
                {text}
            </ParallaxText>
        </section>
    );
}

export default VelocityScroll;
