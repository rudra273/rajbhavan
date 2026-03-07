"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import reviews from "@/data/reviews.json";

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const displayReviews = reviews.slice(0, 6);
    const total = displayReviews.length;

    const goTo = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(index);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [isTransitioning]);

    const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
    const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

    useEffect(() => {
        if (isPaused || total <= 1) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next, isPaused, total]);

    if (total === 0) return null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
                .t-arrow { width: 38px; height: 38px; background: none; border: 1px solid #e2e8f0; color: #475569; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
                .t-arrow:hover { border-color: #0a0f1a; color: #0a0f1a; }
                .t-dot { border: none; padding: 0; cursor: pointer; border-radius: 100px; transition: all 0.3s ease; background: #e2e8f0; }
                .t-dot.active { background: var(--accent, #e07b39); }
                .t-dot:hover { background: #cbd5e1; }
                .t-viewmore { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #0a0f1a; text-decoration: none; border: 1px solid #e2e8f0; padding: 10px 20px; transition: border-color 0.15s; }
                .t-viewmore:hover { border-color: #0a0f1a; }
                .t-viewmore svg { transition: transform 0.15s; }
                .t-viewmore:hover svg { transform: translateX(3px); }
            `}</style>

            <section style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #f8fafc 50%, #f0f4f8 100%)", borderTop: "1px solid #e2e8f0", padding: "80px 24px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>

                        {/* Left */}
                        <div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent, #e07b39)", margin: "0 0 14px" }}>
                                Testimonials
                            </p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(30px, 3.5vw, 46px)", fontWeight: 400, color: "#0a0f1a", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 20px", whiteSpace: "nowrap" }}>
                                What Our <em style={{ fontStyle: "italic", fontWeight: 300 }}>Clients Say</em>
                            </h2>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", lineHeight: 1.75, margin: "0 0 32px", borderLeft: "2px solid #e2e8f0", paddingLeft: "16px" }}>
                                We have a wealth of experience working as main building contractors on all kinds of projects — from home improvements to large-scale new builds.
                            </p>
                            <Link href="/reviews" className="t-viewmore">
                                All Reviews
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </Link>
                        </div>

                        {/* Right — sliding card */}
                        <div
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Card window */}
                            <div style={{ position: "relative", overflow: "hidden", minHeight: "260px", border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                                {displayReviews.map((review, index) => (
                                    <div
                                        key={review.id}
                                        style={{
                                            position: "absolute", inset: 0,
                                            transform: `translateX(${(index - current) * 100}%)`,
                                            opacity: index === current ? 1 : 0,
                                            transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
                                            padding: "28px 32px",
                                            display: "flex", flexDirection: "column",
                                        }}
                                    >
                                        <svg width="32" height="24" viewBox="0 0 36 28" fill="none" style={{ opacity: 0.08, marginBottom: "12px", flexShrink: 0 }}>
                                            <path d="M0 28V17.333C0 7.704 4.667 2.074 14 0L15.75 3.267C11.083 4.444 8.458 7.111 7.875 11.259H14.875V28H0ZM21.125 28V17.333C21.125 7.704 25.792 2.074 35.125 0L36.875 3.267C32.208 4.444 29.583 7.111 29 11.259H36V28H21.125Z" fill="#0a0f1a" />
                                        </svg>

                                        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 400, color: "#1e293b", lineHeight: 1.6, margin: "0 0 20px", letterSpacing: "0.01em", flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>
                                            {review.review_text}
                                        </p>

                                        {/* Author — always visible */}
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.06)", flexShrink: 0 }}>
                                            <div style={{ width: "34px", height: "34px", background: "#0a0f1a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>
                                                {review.name?.charAt(0)?.toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0a0f1a", margin: 0 }}>{review.name}</p>
                                                {review.date && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#94a3b8", margin: "2px 0 0" }}>{review.date}</p>}
                                            </div>
                                            <div style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent, #e07b39)", opacity: 0.7, flexShrink: 0 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Controls */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px" }}>
                                <div style={{ display: "flex", gap: "6px" }}>
                                    <button className="t-arrow" onClick={prev} aria-label="Previous">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                    </button>
                                    <button className="t-arrow" onClick={next} aria-label="Next">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                    </button>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    {displayReviews.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`t-dot ${i === current ? "active" : ""}`}
                                            onClick={() => goTo(i)}
                                            style={{ width: i === current ? "24px" : "8px", height: "8px" }}
                                            aria-label={`Review ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}