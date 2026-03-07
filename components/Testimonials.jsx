"use client";

import { useState, useEffect, useCallback } from "react";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import reviews from "@/data/reviews.json";

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const displayReviews = reviews.slice(0, 6); // Show up to 6 reviews
    const total = displayReviews.length;

    const goTo = useCallback(
        (index) => {
            if (isTransitioning) return;
            setIsTransitioning(true);
            setCurrent(index);
            setTimeout(() => setIsTransitioning(false), 600);
        },
        [isTransitioning]
    );

    const next = useCallback(() => {
        goTo((current + 1) % total);
    }, [current, total, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + total) % total);
    }, [current, total, goTo]);

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (isPaused || total <= 1) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next, isPaused, total]);

    if (total === 0) return null;

    return (
        <section className="section-padding bg-navy relative overflow-hidden">
            {/* Decorative elements */}
            <div
                className="absolute top-0 right-0 w-96 h-96 bg-accent/[0.06] rounded-full blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 left-0 w-72 h-72 bg-accent/[0.04] rounded-full blur-3xl"
                aria-hidden="true"
            />
            {/* Large decorative quote */}
            <div
                className="absolute top-6 left-6 md:top-10 md:left-16 text-accent text-6xl md:text-8xl font-serif leading-none pointer-events-none select-none opacity-80"
                aria-hidden="true"
            >
                &ldquo;
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header + Navigation Row */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8 lg:mb-0">
                    {/* Left: Section Header */}
                    <div className="lg:w-[40%] lg:pr-8">
                        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                            Testimonials
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
                            What Our Client&apos;s Say
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            We Have A Wealth Of Experience Working As Main
                            Building Contractors On All Kinds Of Projects, Big
                            And Small, From Home Maintenance And Improvements To
                            Extensions, Refurbishments And New Builds.
                        </p>
                        <Link
                            href="/reviews"
                            className="inline-flex items-center gap-2 border border-white/30 hover:border-accent text-white hover:text-accent px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 group"
                        >
                            View More
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Right: Sliding Review Card */}
                    <div
                        className="lg:w-[58%] relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Review card container */}
                        <div className="relative overflow-hidden rounded-2xl min-h-[260px]">
                            {displayReviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className="absolute inset-0 w-full transition-all duration-600 ease-in-out"
                                    style={{
                                        transform: `translateX(${(index - current) * 100}%)`,
                                        opacity:
                                            index === current ? 1 : 0.3,
                                        transition:
                                            "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease",
                                    }}
                                >
                                    <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-8 h-full shadow-xl relative">
                                        {/* Decorative closing quote */}
                                        <div
                                            className="absolute top-6 right-8 text-white/20 text-7xl font-serif leading-none pointer-events-none select-none"
                                            aria-hidden="true"
                                        >
                                            &rdquo;
                                        </div>

                                        {/* Review text */}
                                        <p className="text-gray-200 text-base leading-relaxed mb-6 relative z-10 max-w-lg">
                                            {review.review_text}
                                        </p>

                                        {/* Author info */}
                                        <div className="flex items-center gap-3 relative z-10">
                                            <div className="w-11 h-11 bg-white/15 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-6 h-6 text-white/60"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-base capitalize">
                                                    {review.name}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    customer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation arrows + dots */}
                        <div className="flex items-center justify-between mt-6">
                            {/* Prev/Next arrows */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={prev}
                                    className="w-10 h-10 rounded-full border border-white/20 hover:border-accent text-white hover:text-accent flex items-center justify-center transition-all duration-300"
                                    aria-label="Previous review"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={next}
                                    className="w-10 h-10 rounded-full border border-white/20 hover:border-accent text-white hover:text-accent flex items-center justify-center transition-all duration-300"
                                    aria-label="Next review"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Dots indicator */}
                            <div className="flex items-center gap-2">
                                {displayReviews.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goTo(index)}
                                        className={`rounded-full transition-all duration-300 ${index === current
                                            ? "w-8 h-2.5 bg-accent"
                                            : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                                            }`}
                                        aria-label={`Go to review ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
