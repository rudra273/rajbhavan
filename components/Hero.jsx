"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── Hero Data ───────────────────────────────────────────
const BADGE_TEXT = "Trusted Builders Since 2005";
const HERO_HEADING_LINE1 = "We Build Structures";
const HERO_HEADING_LINE2 = "That Last";
const HERO_HEADING_HIGHLIGHT = "Generations";
const HERO_SUBTEXT =
    "From residential homes to commercial complexes, we bring precision, quality, and trust to every project we undertake.";

const STATS = [
    { value: 18, suffix: "+", label: "Years Experience" },
    { value: 400, suffix: "+", label: "Projects Completed" },
    { value: 200, suffix: "+", label: "Happy Clients" },
    { value: 100, suffix: "+", label: "Team Members" },
];

// ─── Animated Counter Hook ───────────────────────────────
function useCountUp(target, duration = 2000, startCounting = false) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!startCounting || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out curve for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [target, duration, startCounting]);

    return count;
}

// ─── Single Stat Item ────────────────────────────────────
function StatItem({ value, suffix, label, delay }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const count = useCountUp(value, 2000, isVisible);

    return (
        <div ref={ref} className="text-center hero-fade-in" style={{ animationDelay: delay }}>
            <p className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)]">
                {count}{suffix}
            </p>
            <p className="text-gray-400 text-xs md:text-sm mt-2 uppercase tracking-wider">
                {label}
            </p>
        </div>
    );
}

// ─── Hero Component ──────────────────────────────────────
export default function Hero() {
    return (
        <section className="relative min-h-0 md:min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/homepage/herobanner.png"
                alt="Raj Bhavan Construction"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/60 to-navy-dark/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-28 md:pb-16">
                    {/* Two-column layout on desktop */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">

                        {/* Left Column — Text Content */}
                        <div className="lg:flex-1 lg:max-w-2xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-accent px-3 py-1 rounded-full text-xs font-medium mb-6 hero-fade-in" style={{ animationDelay: '0.1s' }}>
                                <span className="w-2 h-2 bg-accent rounded-full" />
                                {BADGE_TEXT}
                            </div>

                            {/* Heading — bigger sizes */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight font-[family-name:var(--font-heading)] mb-6 hero-fade-in" style={{ animationDelay: '0.25s' }}>
                                {HERO_HEADING_LINE1}
                                <br />
                                {HERO_HEADING_LINE2}{" "}
                                <span className="text-accent">{HERO_HEADING_HIGHLIGHT}</span>
                            </h1>

                            {/* Accent bar + Subtext */}
                            <div className="flex items-start gap-3 hero-fade-in" style={{ animationDelay: '0.4s' }}>
                                <div className="w-1 rounded-full bg-accent shrink-0 mt-0.5 self-stretch" />
                                <p className="text-gray-300 text-lg sm:text-xl max-w-lg leading-relaxed">
                                    {HERO_SUBTEXT}
                                </p>
                            </div>
                        </div>

                        {/* Right Column — Stats (desktop) */}
                        <div className="hidden lg:grid grid-cols-2 gap-x-16 gap-y-10">
                            {STATS.map((stat, index) => (
                                <StatItem
                                    key={stat.label}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    label={stat.label}
                                    delay={`${0.6 + index * 0.15}s`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Bar — mobile/tablet only (no divider lines) */}
                <div className="lg:hidden hero-stats-bar hero-fade-in" style={{ animationDelay: '0.7s' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                            {STATS.map((stat) => (
                                <StatItem
                                    key={stat.label}
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    label={stat.label}
                                    delay="0.7s"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade into next section */}

        </section>
    );
}
