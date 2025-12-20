"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
    {
        name: "Alex Chen",
        role: "CTO, TechVenture",
        body: "Heptact transformed our product demos. Customers can now interact with our 3D models using just their hands. Conversion rates up 40%.",
        img: "https://avatar.vercel.sh/alex",
    },
    {
        name: "Sarah Miller",
        role: "Creative Director, Luxe Brand",
        body: "The gesture controls feel magical. Our luxury showcase now feels truly premium and immersive.",
        img: "https://avatar.vercel.sh/sarah",
    },
    {
        name: "Marcus Johnson",
        role: "Head of Digital, AutoCorp",
        body: "Car configurator with gesture control. Our customers love exploring options without clicking. Pure innovation.",
        img: "https://avatar.vercel.sh/marcus",
    },
    {
        name: "Emily Zhang",
        role: "Product Lead, StartupX",
        body: "30-hour delivery and flawless execution. Heptact over-delivered on every aspect of our project.",
        img: "https://avatar.vercel.sh/emily",
    },
    {
        name: "David Park",
        role: "Founder, DesignStudio",
        body: "We've worked with many agencies. Heptact's attention to detail and technical expertise is unmatched.",
        img: "https://avatar.vercel.sh/david",
    },
    {
        name: "Lisa Thompson",
        role: "Marketing VP, Enterprise Co",
        body: "The touchless interface wowed our board. It's not just a feature, it's a competitive advantage.",
        img: "https://avatar.vercel.sh/lisa",
    },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);
const fourthColumn = [...testimonials.slice(0, 2)].reverse();

const TestimonialCard = ({
    img,
    name,
    role,
    body,
}: {
    img: string;
    name: string;
    role: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl p-5",
                "bg-black/5 hover:bg-black/10",
                "transition-all duration-300",
                "w-60"
            )}
        >
            <div className="flex flex-row items-center gap-3 mb-3">
                <img
                    className="rounded-full"
                    width="36"
                    height="36"
                    alt={name}
                    src={img}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-semibold text-black">
                        {name}
                    </figcaption>
                    <p className="text-[10px] font-mono text-black/40 uppercase tracking-wider">{role}</p>
                </div>
            </div>
            <blockquote className="text-sm text-black/70 leading-relaxed">
                "{body}"
            </blockquote>
        </figure>
    );
};

export function TestimonialsSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden"
            ref={containerRef}
        >
            {/* Seamless gradient transitions at boundaries */}
            <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />
            <div className="absolute -bottom-32 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-10" />

            {/* Header - integrated into the flow, not a separate container */}
            <div className="relative z-10 pt-20 pb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto px-6"
                >
                    <div className="inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-1.5 mb-6 bg-black/[0.02]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/50">
                            Testimonials
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-black">
                        Loved by <span className="text-black/30">Innovators</span>
                    </h2>
                    <p className="text-lg text-black/50">
                        See what our clients say about their gesture experiences
                    </p>
                </motion.div>
            </div>

            {/* 3D Marquee - seamlessly integrated, no borders or containers */}
            <div className="relative flex h-[450px] w-full flex-row items-center justify-center overflow-hidden [perspective:400px] pb-16">
                <div
                    className="flex flex-row items-center gap-4"
                    style={{
                        transform: "translateX(0px) translateY(0px) translateZ(-50px) rotateX(10deg) rotateY(-5deg) rotateZ(15deg)",
                    }}
                >
                    <Marquee pauseOnHover vertical className="[--duration:25s]">
                        {firstColumn.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} {...testimonial} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
                        {secondColumn.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} {...testimonial} />
                        ))}
                    </Marquee>
                    <Marquee pauseOnHover vertical className="[--duration:28s]">
                        {thirdColumn.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} {...testimonial} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover vertical className="[--duration:32s]">
                        {fourthColumn.map((testimonial) => (
                            <TestimonialCard key={testimonial.name} {...testimonial} />
                        ))}
                    </Marquee>
                </div>

                {/* Seamless fade gradients - blending with white background */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent"></div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
