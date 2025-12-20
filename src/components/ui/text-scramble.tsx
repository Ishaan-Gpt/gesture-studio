"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
    text: string;
    className?: string;
    speed?: number;
}

export function TextScramble({ text, className = "", speed = 50 }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text.split('').map(() => ''));
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!isInView || hasAnimated) return;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        const textArray = text.split('');
        let frame = 0;

        const animate = () => {
            setDisplayText(current => {
                return textArray.map((char, index) => {
                    if (char === ' ') return ' ';

                    const progress = frame / 60;
                    const charProgress = (index / textArray.length);

                    if (progress > charProgress) {
                        return char;
                    } else if (progress > charProgress - 0.1) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    } else {
                        return '';
                    }
                });
            });

            frame++;

            if (frame < 80) {
                requestAnimationFrame(animate);
            } else {
                setDisplayText(textArray);
                setHasAnimated(true);
            }
        };

        animate();
    }, [isInView, text, hasAnimated]);

    return (
        <span ref={ref} className={className}>
            {displayText.join('')}
        </span>
    );
}

export default TextScramble;
