"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Play, CheckCircle2, TrendingUp, Users, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Real metrics showcase
const metrics = [
    { label: 'Engagement Increase', value: '+340%', icon: TrendingUp },
    { label: 'Time on Page', value: '4.2x', icon: Clock },
    { label: 'User Satisfaction', value: '98%', icon: Users },
];

const CaseStudySection = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            id="case-study"
            className="relative py-32 overflow-hidden"
            ref={containerRef}
        >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2 mb-8 bg-white/[0.03] backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/60">
                            Real Results
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white leading-tight">
                        See It In <span className="text-white/30">Action</span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        From static product pages to immersive gesture-controlled experiences.
                        Here's what transformation looks like.
                    </p>
                </motion.div>

                {/* Main Case Study Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        {/* Demo Video/Interactive Area */}
                        <div className="relative aspect-video bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
                            {/* Placeholder for demo - gradient background with interactive hint */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Grid pattern */}
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                    }}
                                />

                                {/* Animated floating elements */}
                                <motion.div
                                    className="absolute w-32 h-32 rounded-xl border border-white/10 bg-white/5"
                                    style={{ top: '20%', left: '20%' }}
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                    className="absolute w-24 h-24 rounded-full border border-white/10 bg-white/5"
                                    style={{ top: '30%', right: '25%' }}
                                    animate={{
                                        y: [0, 20, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                />
                                <motion.div
                                    className="absolute w-20 h-20 rounded-lg border border-white/10 bg-white/5"
                                    style={{ bottom: '25%', left: '30%' }}
                                    animate={{
                                        x: [0, 15, 0],
                                        rotate: [0, -10, 0]
                                    }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                />

                                {/* Play button overlay */}
                                <motion.button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="relative z-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Play className="w-8 h-8 text-white ml-1" />
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-white/30"
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </motion.button>
                            </div>

                            {/* Interactive hint */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                <span className="text-xs font-mono text-white/40 uppercase tracking-wider bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                                    Click to watch • 45 seconds
                                </span>
                            </div>
                        </div>

                        {/* Content below video */}
                        <div className="p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Left: Project Details */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-white/80" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-display font-bold text-white">LuxeAuto Configurator</h3>
                                            <p className="text-sm text-white/40 font-mono">Automotive • 3D Experience</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mt-8">
                                        {/* The Problem */}
                                        <div>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">The Challenge</h4>
                                            <p className="text-white/70 leading-relaxed">
                                                Static product images weren't converting. Customers couldn't visualize
                                                customizations, leading to hesitation and lost sales.
                                            </p>
                                        </div>

                                        {/* The Solution */}
                                        <div>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">Our Solution</h4>
                                            <p className="text-white/70 leading-relaxed">
                                                Gesture-controlled 3D car configurator. Users rotate, zoom, and
                                                customize with natural hand movements. Zero learning curve.
                                            </p>
                                        </div>

                                        {/* Deliverables */}
                                        <div>
                                            <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">Delivered In 72 Hours</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {['Hand tracking', 'Rotate & Zoom', 'Color picker', 'Mobile fallback'].map((item) => (
                                                    <span key={item} className="text-xs font-mono text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Results */}
                                <div className="border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-8">The Results</h4>

                                    <div className="space-y-8">
                                        {metrics.map((metric, index) => {
                                            const Icon = metric.icon;
                                            return (
                                                <motion.div
                                                    key={metric.label}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: 0.4 + index * 0.1 }}
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="w-5 h-5 text-white/60" />
                                                    </div>
                                                    <div>
                                                        <div className="text-3xl font-display font-bold text-white">{metric.value}</div>
                                                        <div className="text-sm text-white/50">{metric.label}</div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Client Quote */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={isInView ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.8 }}
                                        className="mt-10 pt-8 border-t border-white/10"
                                    >
                                        <blockquote className="text-white/60 italic leading-relaxed mb-4">
                                            "The gesture controls transformed how customers experience our vehicles.
                                            It's not just a feature—it's a competitive advantage."
                                        </blockquote>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/10" />
                                            <div>
                                                <div className="text-sm font-semibold text-white/80">Marcus Chen</div>
                                                <div className="text-xs text-white/40 font-mono">Head of Digital, LuxeAuto</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="text-center mt-16"
                >
                    <p className="text-white/40 text-sm mb-6">
                        Ready to see similar results for your brand?
                    </p>
                    <Button
                        size="lg"
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group rounded-full bg-white text-black hover:bg-white/90 px-8"
                    >
                        View Pricing
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudySection;
