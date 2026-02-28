export default function AboutIntro() {
    return (
        <section className="section-padding bg-white -mt-[1px] relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left - Text */}
                    <div>
                        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                            Who We Are
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-5">
                            Crafting Quality{" "}
                            <span className="text-accent">Construction</span> Since 2005
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-4">
                            At Raj Bhavan Construction, we believe in building more than
                            structures — we build trust, relationships, and legacies. With
                            over 18 years of experience in the construction industry, our
                            team delivers projects that stand the test of time.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-6">
                            From residential homes to large-scale commercial builds, we
                            combine modern techniques with traditional craftsmanship to
                            deliver results that exceed expectations.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                {
                                    label: "Residential",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Commercial",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                                            <path d="M9 22v-4h6v4" />
                                            <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Renovation",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                        </svg>
                                    ),
                                },
                                {
                                    label: "Interior",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
                                            <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
                                            <path d="M4 18v2M20 18v2" />
                                        </svg>
                                    ),
                                },
                            ].map((tag) => (
                                <span
                                    key={tag.label}
                                    className="inline-flex items-center gap-2 bg-white text-navy text-sm font-medium pl-3 pr-4 py-2 rounded-lg border border-gray-200/80 shadow-sm hover:shadow-md hover:border-navy/20 transition-all duration-200"
                                >
                                    <span className="text-navy/50">{tag.icon}</span>
                                    {tag.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right - Feature cards */}
                    <div className="grid grid-cols-2 gap-5">
                        {[
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                ),
                                title: "Expert Team",
                                desc: "Skilled professionals with years of experience",
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                ),
                                title: "Quality First",
                                desc: "Premium materials and precise workmanship",
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                ),
                                title: "On Time",
                                desc: "We deliver projects on schedule, every time",
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="6" width="20" height="12" rx="2" />
                                        <circle cx="12" cy="12" r="2" />
                                        <path d="M6 12h.01M18 12h.01" />
                                    </svg>
                                ),
                                title: "Fair Pricing",
                                desc: "Transparent costs with no hidden charges",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center text-navy mb-4 group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <h4 className="text-navy font-semibold text-[15px] mb-1.5 font-[family-name:var(--font-heading)]">
                                    {item.title}
                                </h4>
                                <p className="text-gray-400 text-[13px] leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
