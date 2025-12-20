import React from 'react';

interface HeptagonLogoProps {
    size?: number;
    className?: string;
}

const HeptagonLogo: React.FC<HeptagonLogoProps> = ({ size = 32, className = "" }) => {
    // Generate points for a regular heptagon
    const points = Array.from({ length: 7 }, (_, i) => {
        const angle = (2 * Math.PI * i) / 7 - Math.PI / 2;
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Outer heptagon outline */}
            <polygon
                points={points}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                className="opacity-20"
            />

            {/* Middle heptagon with glow */}
            <polygon
                points={points}
                fill="none"
                stroke="url(#logo-gradient)"
                strokeWidth="4"
                strokeLinejoin="round"
                filter="url(#glow)"
                transform="scale(0.85) translate(8.8, 8.8)"
            />

            {/* Inner solid heptagon */}
            <polygon
                points={points}
                fill="currentColor"
                strokeLinejoin="round"
                transform="scale(0.4) translate(75, 75)"
                className="opacity-80"
            />

            {/* Futuristic accents */}
            <circle cx="50" cy="10" r="2" fill="currentColor" />
            <line x1="50" y1="10" x2="50" y2="25" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
    );
};

export default HeptagonLogo;
