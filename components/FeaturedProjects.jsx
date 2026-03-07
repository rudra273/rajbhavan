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

    // Auto-slide: slide a bit, pause 2s, repeat
    useEffect(() => {
        const el = scrollRef.current;
        if (!el || projects.length <= 1) return;

        let direction = 1;
        const cardWidth = 340;

        const interval = setInterval(() => {
            const maxScroll = el.scrollWidth - el.clientWidth;

            if (direction === 1 && el.scrollLeft >= maxScroll - 5) {
                direction = -1;
            } else if (direction === -1 && el.scrollLeft <= 5) {
                direction = 1;
            }

            el.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
        }, 3000);

        return () => clearInterval(interval);
    }, [projects.length]);

    const scroll = (dir) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: 340 * dir, behavior: "smooth" });
    };

    if (!projects || projects.length === 0) {
        return (
            <p className="text-center text-gray-400">Projects coming soon...</p>
        );
    }

    return (
        <div className="relative group/container">
            {/* Scroll container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {projects.map((project) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="group shrink-0 w-[300px] sm:w-[320px] block"
                    >
                        <div className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-navy-dark h-[380px]">
                            {/* Image */}
                            {project.cloudinary_url ? (
                                <CldImage
                                    src={project.cloudinary_url}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="320px"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />

                            {/* Category badge */}
                            {project.category && (
                                <span className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide z-10">
                                    {project.category}
                                </span>
                            )}

                            {/* Title at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                <h3 className="text-white text-lg font-bold font-[family-name:var(--font-heading)] mb-2">
                                    {project.title}
                                </h3>

                                {/* Hover CTA */}
                                <div className="flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    View Home
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Navigation arrows */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-accent hover:text-white transition-all duration-200 opacity-0 group-hover/container:opacity-100 z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}
            {canScrollRight && (
                <button
                    onClick={() => scroll(1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy hover:bg-accent hover:text-white transition-all duration-200 opacity-0 group-hover/container:opacity-100 z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}
        </div>
    );
}
