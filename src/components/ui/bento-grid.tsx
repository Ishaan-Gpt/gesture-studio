"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps {
    name: string;
    className?: string;
    background?: ReactNode;
    Icon?: React.ElementType;
    description?: string;
    href?: string;
    cta?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoCard({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: BentoCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            key={name}
            className={cn(
                "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
                "bg-white/[0.02] border border-white/10",
                "[box-shadow:0_0_0_1px_rgba(255,255,255,.03),0_2px_4px_rgba(0,0,0,.4),0_12px_24px_rgba(0,0,0,.4)]",
                "transform-gpu",
                className
            )}
        >
            <div>{background}</div>
            <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                {Icon && (
                    <Icon className="h-12 w-12 origin-left transform-gpu text-white/60 transition-all duration-300 ease-in-out group-hover:scale-75" />
                )}
                <h3 className="text-xl font-semibold text-white">
                    {name}
                </h3>
                <p className="max-w-lg text-white/50">{description}</p>
            </div>

            <div
                className={cn(
                    "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                )}
            >
                {href && (
                    <a
                        href={href}
                        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                        {cta}
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                )}
            </div>
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[0.03]" />
        </motion.div>
    );
}
