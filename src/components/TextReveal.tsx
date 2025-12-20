import { useRef } from 'react';
import { useInView, motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

const TextReveal = ({ text, className = "", delay = 0 }: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            <span className="sr-only">{text}</span>
            <motion.span
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ staggerChildren: 0.1, delayChildren: delay }}
                aria-hidden
            >
                {words.map((word, i) => (
                    <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
                        {word.split("").map((char, j) => (
                            <motion.span
                                key={j}
                                className="inline-block"
                                variants={{
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                        rotateX: 90,
                                        filter: "blur(10px)"
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        rotateX: 0,
                                        filter: "blur(0px)",
                                        transition: {
                                            type: "spring",
                                            damping: 12,
                                            stiffness: 100
                                        }
                                    }
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </span>
    );
};

export default TextReveal;
