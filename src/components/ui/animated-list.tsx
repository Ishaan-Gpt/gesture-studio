"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

interface AnimatedListItem {
    name: string;
    description: string;
    icon?: string;
    color?: string;
    time?: string;
}

export interface AnimatedListProps {
    className?: string;
    items: AnimatedListItem[];
    delay?: number;
}

export const AnimatedList = React.memo(
    ({ className, items, delay = 1000 }: AnimatedListProps) => {
        const [index, setIndex] = useState(0);
        const itemsToShow = useMemo(
            () => items.slice(0, index + 1).reverse(),
            [index, items]
        );

        useEffect(() => {
            const interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % items.length);
            }, delay);

            return () => clearInterval(interval);
        }, [items.length, delay]);

        return (
            <div className={cn("flex flex-col gap-2 overflow-hidden", className)}>
                <AnimatePresence>
                    {itemsToShow.map((item, i) => (
                        <AnimatedListCard key={`${item.name}-${i}`} item={item} />
                    ))}
                </AnimatePresence>
            </div>
        );
    }
);

AnimatedList.displayName = "AnimatedList";

function AnimatedListCard({ item }: { item: AnimatedListItem }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            className="relative rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
        >
            <div className="flex items-center gap-3">
                {item.icon && (
                    <span className="text-xl">{item.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-white truncate">
                            {item.name}
                        </p>
                        {item.time && (
                            <span className="text-xs text-white/40">{item.time}</span>
                        )}
                    </div>
                    <p className="text-xs text-white/50 truncate">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default AnimatedList;
