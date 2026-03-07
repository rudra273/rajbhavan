"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

export default function FeaturedProjects({ projects }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 5);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || projects.length <= 1) return;
        let direction = 1;
        const cardWidth = 340;
        const interval = setInterval(() => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (direction === 1 && el.scrollLeft >= maxScroll - 5) direction = -1;
            else if (direction === -1 && el.scrollLeft <= 5) direction = 1;
            el.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
        }, 3000);
        return () => clearInterval(interval);
    }, [projects.length]);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: 340 * dir, behavior: "smooth" });
    };

    if (!projects || projects.length === 0) {
        return <p style={{ textAlign: "center", color: "#94a3b8", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>Projects coming soon.</p>;
    }

    return (
        <>
            <style>{`
                .fp-track { scrollbar-width: none; -ms-overflow-style: none; }
                .fp-track::-webkit-scrollbar { display: none; }
                .fp-card-img { transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important; }
                .fp-card:hover .fp-card-img { transform: scale(1.06) !important; }
                .fp-cta { opacity: 0; transform: translateY(6px); transition: opacity 0.25s ease, transform 0.25s ease; }
                .fp-card:hover .fp-cta { opacity: 1; transform: translateY(0); }
                .fp-arrow { opacity: 0; transition: opacity 0.2s ease, background 0.15s; }
                .fp-wrap:hover .fp-arrow { opacity: 1; }
                .fp-arrow:hover { background: #0a0f1a !important; color: white !important; }
            `}</style>

            <div className="fp-wrap" style={{ position: "relative" }}>
                {/* Scroll track */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="fp-track"
                    style={{ display: "flex", gap: "2px", overflowX: "auto", scrollBehavior: "smooth", margin: "0 -24px", padding: "0 24px 0" }}
                >
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="fp-card"
                            style={{ flexShrink: 0, width: "320px", display: "block", textDecoration: "none", position: "relative", height: "400px", overflow: "hidden", background: "#0a0f1a" }}
                        >
                            {/* Image */}
                            {project.cloudinary_url ? (
                                <CldImage
                                    src={project.cloudinary_url}
                                    alt={project.title}
                                    fill
                                    className="fp-card-img"
                                    style={{ objectFit: "cover" }}
                                    sizes="320px"
                                />
                            ) : (
                                <div style={{ width: "100%", height: "100%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                </div>
                            )}

                            {/* Gradient */}
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,12,24,0.9) 0%, rgba(8,12,24,0.3) 50%, transparent 75%)" }} />

                            {/* Category */}
                            {project.category && (
                                <span style={{ position: "absolute", top: "16px", left: "16px", zIndex: 10, fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "white", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)", padding: "4px 10px" }}>
                                    {project.category}
                                </span>
                            )}

                            {/* Bottom content */}
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", zIndex: 10 }}>
                                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 500, color: "white", margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                                    {project.title}
                                </h3>
                                <div className="fp-cta" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                                    View Home
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Nav arrows */}
                {canScrollLeft && (
                    <button
                        className="fp-arrow"
                        onClick={() => scroll(-1)}
                        style={{ position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)", width: "40px", height: "40px", background: "white", border: "1px solid #e2e8f0", color: "#0a0f1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 20 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                )}
                {canScrollRight && (
                    <button
                        className="fp-arrow"
                        onClick={() => scroll(1)}
                        style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "40px", height: "40px", background: "white", border: "1px solid #e2e8f0", color: "#0a0f1a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 20 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                )}
            </div>
        </>
    );
}