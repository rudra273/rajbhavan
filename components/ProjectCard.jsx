export default function ProjectCard({ title, description, cloudinary_url, category }) {
    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60">
            {/* Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                    src={cloudinary_url}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Category Badge */}
                {category && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        {category}
                    </span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-navy font-[family-name:var(--font-heading)] mb-2 group-hover:text-accent transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
}
