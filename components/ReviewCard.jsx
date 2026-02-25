export default function ReviewCard({ name, rating, review_text, date }) {
    const stars = parseInt(rating) || 5;

    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/60">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < stars ? "text-star" : "text-gray-300"
                            }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                &ldquo;{review_text}&rdquo;
            </p>

            {/* Author & Date */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex items-center gap-2">
                    {/* Avatar circle with initial */}
                    <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center text-sm font-bold">
                        {name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <span className="text-navy font-semibold text-sm">{name}</span>
                </div>
                {date && (
                    <span className="text-gray-400 text-xs">{date}</span>
                )}
            </div>
        </div>
    );
}
