export default function ReviewCard({ name, review_text, date }) {

    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/60">


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
