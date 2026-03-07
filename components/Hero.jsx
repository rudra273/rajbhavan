"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BADGE_TEXT = "Trusted Builders Since 2005";
const HERO_HEADING_LINE1 = "We Build Structures";
const HERO_HEADING_LINE2 = "That Last";
const HERO_HEADING_HIGHLIGHT = "Generations";
const HERO_SUBTEXT = "From residential homes to commercial complexes, we bring precision, quality, and trust to every project we undertake.";

const STATS = [
    { value: 18, suffix: "+", label: "Years Experience" },
    { value: 400, suffix: "+", label: "Projects Completed" },
    { value: 200, suffix: "+", label: "Happy Clients" },
    { value: 100, suffix: "+", label: "Team Members" },
];

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
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, startCounting]);
    return count;
}

function StatItem({ value, suffix, label, delay, dark = false }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    const count = useCountUp(value, 2000, isVisible);

    return (
        <div ref={ref} style={{ animationDelay: delay, animation: "heroFade 0.6s ease forwards", opacity: 0 }}>
            <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 500,
                color: dark ? "white" : "#0a0f1a",
                margin: 0,
                lineHeight: 1,
                letterSpacing: "-0.02em",
            }}>
                {count}{suffix}
            </p>
            <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: dark ? "rgba(255,255,255,0.45)" : "#94a3b8",
                margin: "8px 0 0",
            }}>
                {label}
            </p>
        </div>
    );
}

export default function Hero() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
                @keyframes heroFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes heroFadeLeft { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
            `}</style>

            <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

                {/* Background image — right half only on desktop */}
                <div style={{ position: "absolute", inset: 0 }}>
                    <Image
                        src="/homepage/herobanner.png"
                        alt="Raj Bhavan Construction"
                        fill
                        priority
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        sizes="100vw"
                        quality={90}
                    />
                    {/* On desktop: white panel covers left half */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 48%, rgba(255,255,255,0) 68%)",
                    }} />
                    {/* On mobile: light overlay over left side so text is visible */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to right, rgba(255,255,255,0.90) 0%, rgba(255,255,255,0.80) 50%, rgba(255,255,255,0) 100%)",
                    }} className="mobile-overlay" />
                </div>

                <style>{`
                    .hero-grid { display: grid; grid-template-columns: 1fr; }
                    .hero-text-container { padding-right: 0; max-width: 90%; }
                    @media (min-width: 768px) { 
                        .hero-grid { grid-template-columns: 1fr 1fr; }
                        .hero-text-container { padding-right: 48px; max-width: none; }
                        .mobile-overlay { display: none !important; } 
                        .mobile-stats { display: none !important; }
                    }
                    @media (max-width: 767px) { 
                        .desktop-split { display: none !important; } 
                        .mobile-stats { display: grid !important; } 
                    }
                `}</style>

                {/* Content */}
                <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", alignItems: "center", paddingTop: "120px", paddingBottom: "60px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
                        <div className="hero-grid" style={{ gap: "0", alignItems: "center" }}>

                            {/* Left — text */}
                            <div className="hero-text-container">
                                {/* Badge */}
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: "8px",
                                    fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600,
                                    letterSpacing: "0.08em", textTransform: "uppercase", color: "#e07b39",
                                    marginBottom: "28px",
                                    animation: "heroFade 0.5s ease 0.1s forwards", opacity: 0,
                                }}>
                                    <span style={{ width: "20px", height: "1px", background: "#e07b39", display: "inline-block" }} />
                                    {BADGE_TEXT}
                                </div>

                                {/* Heading */}
                                <h1 style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontSize: "clamp(42px, 5.5vw, 76px)",
                                    fontWeight: 300,
                                    color: "#0a0f1a",
                                    lineHeight: 1.05,
                                    letterSpacing: "-0.025em",
                                    margin: "0 0 28px",
                                    animation: "heroFade 0.6s ease 0.25s forwards", opacity: 0,
                                }}>
                                    {HERO_HEADING_LINE1}<br />
                                    {HERO_HEADING_LINE2}{" "}
                                    <em style={{ fontStyle: "italic", fontWeight: 400 }}>{HERO_HEADING_HIGHLIGHT}</em>
                                </h1>

                                {/* Subtext */}
                                <p style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "15px",
                                    color: "#475569",
                                    lineHeight: 1.7,
                                    maxWidth: "420px",
                                    margin: "0 0 40px",
                                    animation: "heroFade 0.6s ease 0.4s forwards", opacity: 0,
                                }}>
                                    {HERO_SUBTEXT}
                                </p>

                                {/* CTA buttons */}
                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", animation: "heroFade 0.6s ease 0.55s forwards", opacity: 0 }}>
                                    <a href="/projects" style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700,
                                        letterSpacing: "0.08em", textTransform: "uppercase",
                                        color: "white", background: "#0a0f1a",
                                        padding: "13px 28px", textDecoration: "none", transition: "background 0.15s",
                                        display: "inline-block",
                                    }}
                                        onMouseOver={e => e.currentTarget.style.background = "#1e293b"}
                                        onMouseOut={e => e.currentTarget.style.background = "#0a0f1a"}
                                    >
                                        View Projects
                                    </a>
                                    <a href="/contact" style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700,
                                        letterSpacing: "0.08em", textTransform: "uppercase",
                                        color: "#0a0f1a", background: "transparent",
                                        border: "1px solid #cbd5e1",
                                        padding: "13px 28px", textDecoration: "none", transition: "border-color 0.15s",
                                        display: "inline-block",
                                    }}
                                        onMouseOver={e => e.currentTarget.style.borderColor = "#0a0f1a"}
                                        onMouseOut={e => e.currentTarget.style.borderColor = "#cbd5e1"}
                                    >
                                        Discuss Your Project
                                    </a>
                                </div>
                            </div>

                            {/* Right — desktop stats panel (floats over image) */}
                            <div className="desktop-split" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div style={{
                                    background: "rgba(10,15,26,0.72)",
                                    backdropFilter: "blur(12px)",
                                    padding: "40px 44px",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "36px 48px",
                                    maxWidth: "380px",
                                    width: "100%",
                                }}>
                                    {STATS.map((stat, i) => (
                                        <StatItem key={stat.label} {...stat} delay={`${0.6 + i * 0.12}s`} dark />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile stats bar — sits below content, over image */}
                <div className="mobile-stats" style={{ display: "none", position: "relative", zIndex: 10, background: "rgba(10,15,26,0.75)", backdropFilter: "blur(8px)", padding: "28px 24px", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    {STATS.map((stat, i) => (
                        <StatItem key={stat.label} {...stat} delay={`${0.7 + i * 0.1}s`} dark />
                    ))}
                </div>

            </section>
        </>
    );
}