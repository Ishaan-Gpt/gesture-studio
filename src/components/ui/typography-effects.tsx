"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterProps {
    words: string[];
    className?: string;
    cursorClassName?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenWords?: number;
}

export function Typewriter({
    words,
    className,
    cursorClassName,
    typingSpeed = 80,
    deletingSpeed = 50,
    delayBetweenWords = 1500,
}: TypewriterProps) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < currentWord.length) {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delayBetweenWords);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentWord.slice(0, currentText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

    return (
        <span className={className}>
            {currentText}
            <span className={cn("animate-blink", cursorClassName)}>|</span>
        </span>
    );
}

interface HighlightTextProps {
    children: string;
    className?: string;
    highlightClassName?: string;
    delay?: number;
}

export function HighlightText({
    children,
    className,
    highlightClassName = "bg-yellow-500/20",
    delay = 0,
}: HighlightTextProps) {
    return (
        <motion.span
            initial={{ backgroundSize: "0% 100%" }}
            whileInView={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            viewport={{ once: true }}
            className={cn(
                "bg-gradient-to-r from-transparent via-current to-transparent bg-no-repeat bg-left",
                highlightClassName,
                className
            )}
            style={{ backgroundPosition: "0% 100%", paddingBottom: "2px" }}
        >
            {children}
        </motion.span>
    );
}

interface FadeInTextProps {
    children: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    by?: "word" | "character";
}

export function FadeInText({
    children,
    className,
    delay = 0,
    staggerDelay = 0.03,
    by = "word",
}: FadeInTextProps) {
    const items = by === "word" ? children.split(" ") : children.split("");

    return (
        <span className={className}>
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + index * staggerDelay, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="inline-block"
                >
                    {item}
                    {by === "word" && " "}
                </motion.span>
            ))}
        </span>
    );
}

interface BoxRevealProps {
    children: React.ReactNode;
    className?: string;
    boxColor?: string;
    duration?: number;
    delay?: number;
}

export function BoxReveal({
    children,
    className,
    boxColor = "white",
    duration = 0.5,
    delay = 0,
}: BoxRevealProps) {
    return (
        <div className={cn("relative overflow-hidden", className)}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: delay + duration, duration: 0.001 }}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
            <motion.div
                initial={{ left: 0 }}
                whileInView={{ left: "100%" }}
                transition={{ delay, duration, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="absolute inset-0"
                style={{ backgroundColor: boxColor }}
            />
        </div>
    );
}

export default Typewriter;
