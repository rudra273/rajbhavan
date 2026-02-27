"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Reviews", href: "/reviews" },
    { name: "Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            {/* Top Info Bar */}
            <div className="bg-[#0f1b2d] text-gray-300 text-xs sm:text-sm border-b border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-5 py-1.5">
                    {/* Phone Number */}
                    <a
                        href="tel:+917008039858"
                        className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200 font-medium"
                    >
                        <svg
                            className="w-3.5 h-3.5 text-accent"
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
                        +917008039858
                    </a>

                    {/* Locations */}
                    <div className="flex items-center gap-1.5 font-medium">
                        <svg
                            className="w-3.5 h-3.5 text-accent"
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
                        Chatrapur <span className="opacity-50">|</span> Berhampur
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-navy shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16">
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
                                GET FREE CONSULTATION
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
                            GET FREE CONSULTATION
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
