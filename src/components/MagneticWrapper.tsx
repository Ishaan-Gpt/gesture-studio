import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface MagneticWrapperProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the pull is
}

const MagneticWrapper = ({ children, className = "", strength = 0.5 }: MagneticWrapperProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(position.x, springConfig);
    const y = useSpring(position.y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        position.x.set(middleX * strength);
        position.y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        position.x.set(0);
        position.y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default MagneticWrapper;
