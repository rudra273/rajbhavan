import ReviewCard from "@/components/ReviewCard";
import { getCachedReviews } from "@/lib/dataCache";

export const metadata = {
    title: "Customer Reviews | Raj Bhavan Construction",
    description:
        "See what our clients say about our work. Real reviews from real customers.",
};

export default async function ReviewsPage() {
    let reviews = [];

    try {
        reviews = getCachedReviews();
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }

    return (
        <div className="pt-20 md:pt-24">
            {/* Page Header */}
            <section className="bg-navy text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                        Testimonials
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
                        What Our Clients Say
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto mb-6">
                        Don&apos;t just take our word for it — hear from the people
                        we&apos;ve built for.
                    </p>

                    {/* Stats summary */}
                    {reviews.length > 0 && (
                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="text-center">
                                <p className="text-accent text-3xl font-bold font-[family-name:var(--font-heading)]">
                                    {reviews.length}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">Total Reviews</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="section-padding bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} {...review} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">
                                No reviews available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
