"use client";

import Link from "next/link";

const COMPANY_NAME = "Raj Bhavan";
const COMPANY_TAGLINE = "Building excellence with integrity. We deliver top-quality residential and commercial construction projects with craftsmanship you can trust.";
const COPYRIGHT_TEXT = "Raj Bhavan Construction";
const DEVELOPER_NAME = "Rudrapratap Mohanty";
const DEVELOPER_URL = "https://rudrapratap-mohanty.vercel.app/";

const PHONE_NUMBER = "+917008039858";
const PHONE_DISPLAY = "+91 70080 39858";
const EMAIL = "akashchandramohanty@gmail.com";
const ADDRESS = "Chatrapur, Odisha, India";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Reviews", href: "/reviews" },
    { name: "Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
];

const contactItems = [
    {
        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        content: <a href={`tel:${PHONE_NUMBER}`} style={{ color: "#475569", textDecoration: "none", transition: "color 0.15s" }} onMouseOver={e => e.currentTarget.style.color = "#0a0f1a"} onMouseOut={e => e.currentTarget.style.color = "#475569"}>{PHONE_DISPLAY}</a>,
    },
    {
        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        content: <a href={`mailto:${EMAIL}`} style={{ color: "#475569", textDecoration: "none", transition: "color 0.15s" }} onMouseOver={e => e.currentTarget.style.color = "#0a0f1a"} onMouseOut={e => e.currentTarget.style.color = "#475569"}>{EMAIL}</a>,
    },
    {
        icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        content: <span style={{ color: "#475569" }}>{ADDRESS}</span>,
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
                .f-link { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #475569; text-decoration: none; transition: color 0.15s; display: inline-block; padding: 3px 0; }
                .f-link:hover { color: #0a0f1a; }
                .f-dev:hover { color: var(--accent, #e07b39) !important; }
                .f-grid { display: grid; grid-template-columns: 1fr; gap: 40px; padding-bottom: 48px; border-bottom: 1px solid #e2e8f0; }
                @media (min-width: 768px) {
                    .f-grid { grid-template-columns: 1.6fr 1fr 1.4fr; gap: 60px; }
                }
                .f-bottom { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px 0; gap: 12px; }
                @media (min-width: 768px) {
                    .f-bottom { flex-direction: row; justify-content: space-between; text-align: left; }
                }
            `}</style>
            <footer style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 0" }}>

                    {/* Top grid */}
                    <div className="f-grid">

                        {/* Brand col */}
                        <div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent, #e07b39)", margin: "0 0 12px" }}>
                                Since 2005
                            </p>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "30px", fontWeight: 500, color: "#e07b39", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1 }}>
                                {COMPANY_NAME}
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginLeft: "10px", verticalAlign: "middle" }}>
                                    Construction
                                </span>
                            </h3>
                            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, margin: "0 0 0", maxWidth: "300px" }}>
                                {COMPANY_TAGLINE}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 20px" }}>
                                Navigation
                            </p>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                                {quickLinks.map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="f-link">{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 20px" }}>
                                Contact
                            </p>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                                {contactItems.map((item, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                                        <span style={{ color: "var(--accent, #e07b39)", marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                                        <span style={{ fontSize: "13px", lineHeight: 1.5 }}>{item.content}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="f-bottom">
                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                            &copy; {currentYear} {COPYRIGHT_TEXT}. All rights reserved.
                        </p>
                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
                            Designed by{" "}
                            <a
                                href={DEVELOPER_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="f-dev"
                                style={{ color: "#94a3b8", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}
                            >
                                {DEVELOPER_NAME}
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}