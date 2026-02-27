import Link from "next/link";
import Image from "next/image";

// ─── Hero Data ───────────────────────────────────────────
const BADGE_TEXT = "Trusted Builders Since 2005";
const HERO_HEADING_LINE1 = "Building Your";
const HERO_HEADING_HIGHLIGHT = "Dreams";
const HERO_HEADING_LINE2 = "Into Reality";
const HERO_SUBTEXT =
    "From residential homes to commercial complexes, we bring precision, quality, and trust to every project we undertake.";

const STATS = [
    { value: "18+", label: "Years Experience" },
    { value: "400+", label: "Projects Completed" },
    { value: "200+", label: "Happy Clients" },
    { value: "100+", label: "Team Members" },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image
                src="/homepage/herobanner.png"
                alt="Raj Bhavan Construction"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/0 via-navy-dark/60 to-navy-dark" />
            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-pulse">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    {BADGE_TEXT}
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-heading)] mb-6">
                    {HERO_HEADING_LINE1}{" "}
                    <span className="text-accent">{HERO_HEADING_HIGHLIGHT}</span>{" "}
                    <br className="hidden sm:block" />
                    {HERO_HEADING_LINE2}
                </h1>

                {/* Subtext */}
                <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    {HERO_SUBTEXT}
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
                    {STATS.map((stat) => (
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
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />     </section>
    );
}
