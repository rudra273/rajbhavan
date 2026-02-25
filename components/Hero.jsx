import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-navy-dark">
                {/* Gradient overlay pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light opacity-90" />
                {/* Decorative geometric shapes */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-pulse">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Trusted Builders Since 2005
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-heading)] mb-6">
                    Building Your{" "}
                    <span className="text-accent">Dreams</span>{" "}
                    <br className="hidden sm:block" />
                    Into Reality
                </h1>

                {/* Subtext */}
                <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    From residential homes to commercial complexes, we bring precision,
                    quality, and trust to every project we undertake.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/projects"
                        className="bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
                    >
                        View Our Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="border-2 border-gray-500 hover:border-accent text-gray-300 hover:text-accent px-8 py-3.5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Get in Touch
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
                    {[
                        { value: "18+", label: "Years Experience" },
                        { value: "500+", label: "Projects Completed" },
                        { value: "200+", label: "Happy Clients" },
                        { value: "50+", label: "Team Members" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-accent text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)]">
                                {stat.value}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
