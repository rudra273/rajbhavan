// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { CldImage } from "next-cloudinary";

// export default function FeaturedProjects({ projects }) {
//     const scrollRef = useRef(null);
//     const [canScrollLeft, setCanScrollLeft] = useState(false);
//     const [canScrollRight, setCanScrollRight] = useState(true);

//     const checkScroll = () => {
//         const el = scrollRef.current;
//         if (!el) return;
//         setCanScrollLeft(el.scrollLeft > 5);
//         setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
//     };

//     // Auto-slide: slide a bit, pause 2s, repeat
//     useEffect(() => {
//         const el = scrollRef.current;
//         if (!el || projects.length <= 1) return;

//         let direction = 1;
//         const cardWidth = 340;

//         const interval = setInterval(() => {
//             const maxScroll = el.scrollWidth - el.clientWidth;

//             if (direction === 1 && el.scrollLeft >= maxScroll - 5) {
//                 direction = -1;
//             } else if (direction === -1 && el.scrollLeft <= 5) {
//                 direction = 1;
//             }

//             el.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [projects.length]);

//     const scroll = (dir) => {
//         const el = scrollRef.current;
//         if (!el) return;
//         el.scrollBy({ left: 340 * dir, behavior: "smooth" });
//     };

//     if (!projects || projects.length === 0) {
//         return (
//             <p className="text-center text-gray-400">Projects coming soon...</p>
//         );
//     }

//     return (
//         <div className="relative group/container">
//             {/* Scroll container */}
//             <div
//                 ref={scrollRef}
//                 onScroll={checkScroll}
//                 className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
//                 style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//                 {projects.map((project) => (
//                     <Link
//                         key={project.id}
//                         href={`/projects/${project.id}`}
//                         className="group shrink-0 w-[300px] sm:w-[320px] block"
//                     >
//                         <div className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-navy-dark h-[380px]">
//                             {/* Image */}
//                             {project.cloudinary_url ? (
//                                 <CldImage
//                                     src={project.cloudinary_url}
//                                     alt={project.title}
//                                     fill
//                                     className="object-cover group-hover:scale-110 transition-transform duration-700"
//                                     sizes="320px"
//                                 />
//                             ) : (
//                                 <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
//                                     No Image
//                                 </div>
//                             )}

//                             {/* Gradient overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />

//                             {/* Category badge */}
//                             {project.category && (
//                                 <span className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide z-10">
//                                     {project.category}
//                                 </span>
//                             )}

//                             {/* Title at bottom */}
//                             <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
//                                 <h3 className="text-white text-lg font-bold font-[family-name:var(--font-heading)] mb-2">
//                                     {project.title}
//                                 </h3>

//                                 {/* Hover CTA */}
//                                 <div className="flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                                     View Home
//                                     <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                     </svg>
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>

//             {/* Navigation arrows */}
//             {canScrollLeft && (
//                 <button
//                     onClick={() => scroll(-1)}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-accent hover:text-white transition-all duration-200 opacity-0 group-hover/container:opacity-100 z-20"
//                 >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                 </button>
//             )}
//             {canScrollRight && (
//                 <button
//                     onClick={() => scroll(1)}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-accent hover:text-white transition-all duration-200 opacity-0 group-hover/container:opacity-100 z-20"
//                 >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                 </button>
//             )}
//         </div>
//     );
// }

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
                                    View Project
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