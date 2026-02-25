import Link from "next/link";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy-dark text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-accent text-2xl font-bold font-[family-name:var(--font-heading)] mb-3">
                            Raj Bhavan
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Building excellence with integrity. We deliver top-quality
                            residential and commercial construction projects with
                            craftsmanship you can trust.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
                            Contact Us
                        </h4>
                        <ul className="space-y-3">
                            {/* Phone */}
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-accent mt-0.5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <div>
                                    <a
                                        href="tel:+919876543210"
                                        className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
                                    >
                                        +91 98765 43210
                                    </a>
                                </div>
                            </li>

                            {/* Email */}
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-accent mt-0.5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:info@rajbhavan.com"
                                    className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
                                >
                                    info@rajbhavan.com
                                </a>
                            </li>

                            {/* Address */}
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-accent mt-0.5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-gray-400 text-sm">
                                    Bhubaneswar, Odisha, India
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-gray-500 text-xs">
                        © {currentYear} Raj Bhavan Construction. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Designed with ❤️ for quality construction
                    </p>
                </div>
            </div>
        </footer>
    );
}
