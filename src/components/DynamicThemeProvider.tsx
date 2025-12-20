"use client";

import { useEffect, useState, ReactNode, createContext, useContext } from 'react';
import { motion } from 'framer-motion';

// Define section IDs and their background colors
const sectionColors: Record<string, { bg: string; theme: 'dark' | 'light' }> = {
    'hero': { bg: 'rgb(0, 0, 0)', theme: 'dark' },       // PITCH BLACK
    'services': { bg: 'rgb(0, 0, 0)', theme: 'dark' },
    'vision': { bg: 'rgb(0, 0, 0)', theme: 'dark' },
    'use-cases': { bg: 'rgb(0, 0, 0)', theme: 'dark' },
    'testimonials': { bg: 'rgb(255, 255, 255)', theme: 'light' },
    'pricing': { bg: 'rgb(255, 255, 255)', theme: 'light' },
    'contact': { bg: 'rgb(0, 0, 0)', theme: 'dark' },
};

interface ThemeContextType {
    currentTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType>({ currentTheme: 'dark' });

export function useTheme() {
    return useContext(ThemeContext);
}

interface DynamicThemeProviderProps {
    children: ReactNode;
}

export function DynamicThemeProvider({ children }: DynamicThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
    const [currentColor, setCurrentColor] = useState<string>('rgb(0, 0, 0)'); // PITCH BLACK

    useEffect(() => {
        const checkCurrentSection = () => {
            const scrollY = window.scrollY;
            const viewportMiddle = scrollY + window.innerHeight / 2;

            for (const [sectionId, { bg, theme }] of Object.entries(sectionColors)) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const top = rect.top + scrollY;
                    const bottom = top + rect.height;

                    if (viewportMiddle >= top && viewportMiddle <= bottom) {
                        if (currentColor !== bg) {
                            setCurrentColor(bg);
                        }
                        if (currentTheme !== theme) {
                            setCurrentTheme(theme);
                        }
                        break;
                    }
                }
            }
        };

        checkCurrentSection();

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkCurrentSection();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentColor, currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme }}>
            {children}
            <DynamicBackground currentColor={currentColor} />
        </ThemeContext.Provider>
    );
}

function DynamicBackground({ currentColor }: { currentColor: string }) {
    return (
        <>
            {/* Main background with instant transition */}
            <motion.div
                className="fixed inset-0 z-0 pointer-events-none"
                animate={{ backgroundColor: currentColor }}
                transition={{
                    duration: 0.15, // Very fast transition
                    ease: "easeInOut"
                }}
            />

            {/* Gradient overlay to blend sections seamlessly */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            linear-gradient(to bottom, 
                                transparent 0%, 
                                rgba(0,0,0,0.02) 50%, 
                                transparent 100%
                            )
                        `,
                        backgroundSize: '100% 200vh',
                        backgroundPosition: 'center',
                    }}
                />
            </div>
        </>
    );
}

export default DynamicThemeProvider;
