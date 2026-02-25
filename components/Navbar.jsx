"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="bg-navy fixed top-0 left-0 w-full z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-accent text-2xl md:text-3xl font-extrabold tracking-tight font-[family-name:var(--font-heading)]">
                            Raj Bhavan
                        </span>
                        <span className="hidden sm:inline text-gray-300 text-sm font-light tracking-wider uppercase">
                            Construction
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-accent px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="ml-3 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors duration-200"
                        >
                            Get a Quote
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-300 hover:text-accent focus:outline-none transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-navy-light border-t border-gray-700 px-4 py-3 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-gray-300 hover:text-accent hover:bg-navy px-3 py-2.5 rounded-md text-base font-medium transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        className="block bg-accent hover:bg-accent-dark text-white text-center px-3 py-2.5 rounded-md text-base font-semibold mt-2 transition-colors duration-200"
                    >
                        Get a Quote
                    </Link>
                </div>
            </div>
        </nav>
    );
}
