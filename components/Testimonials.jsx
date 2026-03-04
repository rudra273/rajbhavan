import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";
import reviews from "@/data/reviews.json";

export default function Testimonials() {
    // Show up to 3 reviews
    const displayReviews = reviews.slice(0, 3);

    if (displayReviews.length === 0) return null;

    return (
        <section className="section-padding bg-cream relative overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-8 right-8 md:top-12 md:right-16 text-accent/[0.07] text-[12rem] md:text-[18rem] font-serif leading-none pointer-events-none select-none" aria-hidden="true">
                &ldquo;
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="mb-12">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                        Testimonials
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
                            What Our Clients Say
                        </h2>
                        <Link
                            href="/reviews"
                            className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors duration-200 group"
                        >
                            Read More Reviews
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
                </div>

                {/* Reviews Grid */}
                <div className={`grid grid-cols-1 ${displayReviews.length >= 2 ? 'md:grid-cols-2' : ''} ${displayReviews.length >= 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
                    {displayReviews.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </div>
            </div>
        </section>
    );
}
