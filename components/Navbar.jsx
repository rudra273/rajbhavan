
"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Work", href: "/projects" },
    { name: "Packages", href: "/packages" },
    { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');
                .nav-link { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #475569; text-decoration: none; padding: 6px 14px; letter-spacing: 0.02em; transition: color 0.15s; position: relative; }
                .nav-link:hover { color: #0a0f1a; }
                .nav-link::after { content: ''; position: absolute; bottom: 0; left: 14px; right: 14px; height: 1px; background: #0a0f1a; transform: scaleX(0); transition: transform 0.2s ease; }
                .nav-link:hover::after { transform: scaleX(1); }
                .cta-btn { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: white; background: #0a0f1a; text-decoration: none; padding: 9px 20px; transition: background 0.15s; }
                .cta-btn:hover { background: #1e293b; }
                .top-link { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: #64748b; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: color 0.15s; letter-spacing: 0.02em; }
                .top-link:hover { color: #0a0f1a; }
                .mob-link { display: block; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #475569; text-decoration: none; padding: 13px 0; border-bottom: 1px solid #f1f5f9; transition: color 0.15s; }
                .mob-link:hover { color: #0a0f1a; }
                .ham-btn { background: none; border: none; cursor: pointer; padding: 6px; color: #475569; display: flex; align-items: center; justify-content: center; transition: color 0.15s; }
                .ham-btn:hover { color: #0a0f1a; }
            `}</style>

            <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}>
                <Link href="/manage" style={{ position: "absolute", top: 0, left: 0, width: "20px", height: "20px", opacity: 0, zIndex: 60 }} aria-label="Manage" />

                {/* Top info bar */}
                <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "7px 24px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "flex-end", gap: "24px" }}>
                        <a href="tel:+917008039858" className="top-link">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            +91 70080 39858
                        </a>
                        <span className="top-link" style={{ cursor: "default" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            Chatrapur &nbsp;<span style={{ color: "#cbd5e1" }}>|</span>&nbsp; Berhampur
                        </span>
                    </div>
                </div>

                {/* Main nav */}
                <nav style={{ background: "white", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>

                        {/* Logo */}
                        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "8px" }}>
                            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 600, color: "#e07b39", letterSpacing: "-0.01em", lineHeight: 1 }}>
                                Raj Bhavan
                            </span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94a3b8" }}>
                                Construction
                            </span>
                        </Link>

                        {/* Desktop links */}
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden-mobile">
                            {navLinks.map(link => (
                                <Link key={link.name} href={link.href} className="nav-link">{link.name}</Link>
                            ))}
                            <Link href="/contact" className="cta-btn" style={{ marginLeft: "12px" }}>
                                Get a Quote
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="ham-btn show-mobile"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            ) : (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    <div style={{
                        overflow: "hidden",
                        maxHeight: mobileOpen ? "360px" : "0",
                        opacity: mobileOpen ? 1 : 0,
                        transition: "max-height 0.3s ease, opacity 0.2s ease",
                        borderTop: mobileOpen ? "1px solid #f1f5f9" : "none",
                    }} className="show-mobile">
                        <div style={{ padding: "4px 24px 20px" }}>
                            {navLinks.map(link => (
                                <Link key={link.name} href={link.href} className="mob-link" onClick={() => setMobileOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                style={{ display: "block", marginTop: "16px", background: "#0a0f1a", color: "white", textAlign: "center", padding: "13px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.15s" }}
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </nav>

                <style>{`
                    @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
                    @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
                `}</style>
            </header>
        </>
    );
}