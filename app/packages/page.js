"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PACKAGE_NAMES = ["Essential", "Standard", "Premium", "Luxury"];
const CITIES = ["Chatrapur", "Berhampur"];

// ── Expandable Row ──────────────────────────────────────
function ExpandableRow({ title, items }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: "1px solid #f1f5f9" }}>
            <button
                onClick={() => setOpen(!open)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.12s" }}
                onMouseOver={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseOut={e => e.currentTarget.style.background = "none"}
            >
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0a0f1a" }}>{title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
            <div style={{ overflow: "hidden", maxHeight: open ? "600px" : "0", opacity: open ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.2s ease" }}>
                <ul style={{ listStyle: "none", margin: 0, padding: "0 20px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {items.map((item, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#475569", lineHeight: 1.5 }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #e07b39)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "2px", flexShrink: 0 }}>
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Per-package glassy palette
const CARD_PALETTE = {
    Essential: { bg: "rgba(241,245,249,0.6)", border: "rgba(203,213,225,0.6)", glow: "rgba(148,163,184,0.05)", tag: "#94a3b8" },
    Standard: { bg: "rgba(219,234,254,0.45)", border: "rgba(147,197,253,0.5)", glow: "rgba(59,130,246,0.08)", tag: "#3b82f6" },
    Premium: { bg: "rgba(254,243,199,0.5)", border: "rgba(252,211,77,0.5)", glow: "rgba(234,179,8,0.1)", tag: "#ca8a04" },
    Luxury: { bg: "rgba(243,232,255,0.45)", border: "rgba(216,180,254,0.5)", glow: "rgba(168,85,247,0.08)", tag: "#9333ea" },
};

// ── Package Card ────────────────────────────────────────
function PackageCard({ name, pkg, isSelected, onSelect }) {
    const pal = CARD_PALETTE[name] || CARD_PALETTE.Essential;
    return (
        <button
            onClick={() => onSelect(name)}
            style={{
                textAlign: "left", padding: "24px",
                background: pal.bg,
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                border: isSelected ? `2px solid ${pal.tag}` : `1px solid ${pal.border}`,
                cursor: "pointer", transition: "border-color 0.15s, box-shadow 0.15s",
                position: "relative", width: "100%",
                boxShadow: isSelected ? `0 0 0 3px ${pal.glow}, 0 2px 16px ${pal.glow}` : `0 1px 8px ${pal.glow}`,
            }}
            onMouseOver={e => { if (!isSelected) { e.currentTarget.style.borderColor = pal.tag; e.currentTarget.style.boxShadow = `0 4px 20px ${pal.glow}`; } }}
            onMouseOut={e => { if (!isSelected) { e.currentTarget.style.borderColor = pal.border; e.currentTarget.style.boxShadow = `0 1px 8px ${pal.glow}`; } }}
        >
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: pal.tag, margin: "0 0 10px" }}>
                {pkg.tag}
            </p>
            <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "24px", fontWeight: 500, color: "#0a0f1a", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                {name}
            </h4>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 500, color: "#0a0f1a", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                {pkg.price}
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#64748b" }}>
                {pkg.sections.length} categories included
            </p>
            {isSelected && (
                <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={pal.tag} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
            )}
        </button>
    );
}

// ── Comparison Card ─────────────────────────────────────
function ComparisonCard({ packageName, pkg }) {
    return (
        <div style={{ flex: "1 1 300px", background: "white", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent, #e07b39)", margin: "0 0 6px" }}>
                    {pkg.tag}
                </p>
                <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#0a0f1a", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                    {packageName}
                </h4>
                <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 400, color: "#475569", margin: 0 }}>
                    {pkg.price}
                </p>
            </div>
            <div>
                {pkg.sections.map((section, i) => (
                    <ExpandableRow key={i} title={section.title} items={section.items} />
                ))}
            </div>
        </div>
    );
}

// ── Page ────────────────────────────────────────────────
export default function PackagesPage() {
    const [city, setCity] = useState("Chatrapur");
    const [compareA, setCompareA] = useState("Essential");
    const [compareB, setCompareB] = useState("Standard");
    const [cityData, setCityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/packages")
            .then(res => { if (!res.ok) throw new Error("Failed to fetch packages"); return res.json(); })
            .then(data => { setCityData(data.cityData); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    const SELECT_STYLE = {
        fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
        color: "#0a0f1a", background: "white", border: "1px solid #e2e8f0",
        padding: "8px 32px 8px 12px", cursor: "pointer", outline: "none",
        appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
    };

    if (loading) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
            <div style={{ textAlign: "center" }}>
                <span style={{ width: "24px", height: "24px", border: "2px solid #e2e8f0", borderTopColor: "#94a3b8", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#94a3b8", marginTop: "12px" }}>Loading packages...</p>
            </div>
        </div>
    );

    if (error || !cityData) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#ef4444" }}>{error || "Unable to load package data"}</p>
        </div>
    );

    const cityPackages = cityData[city];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
            `}</style>

            {/* Header */}
            <section style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "140px 24px 56px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                        <div>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#0a0f1a", margin: "0 0 12px", lineHeight: 1, letterSpacing: "-0.025em" }}>
                                Build With<br />
                                <em style={{ fontStyle: "italic", fontWeight: 400 }}>Transparency</em>
                            </h1>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", maxWidth: "440px", lineHeight: 1.7, margin: 0 }}>
                                Choose a package, compare features, and get a personalised quote — all with clear, upfront pricing.
                            </p>
                        </div>

                        {/* Steps */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {[
                                { n: "01", text: "Select a package" },
                                { n: "02", text: "Review and compare" },
                                { n: "03", text: "Send your details" },
                            ].map(s => (
                                <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, color: "var(--accent, #e07b39)", lineHeight: 1, minWidth: "24px" }}>{s.n}</span>
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#475569" }}>{s.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section style={{ background: "#f8fafc", padding: "64px 24px", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

                    {/* Section header + city selector */}
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
                        <div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 8px" }}>Packages</p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, color: "#0a0f1a", margin: 0, letterSpacing: "-0.02em" }}>
                                {city}
                            </h2>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#64748b", fontWeight: 500 }}>City</span>
                            <select value={city} onChange={e => setCity(e.target.value)} style={SELECT_STYLE}>
                                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Cards grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", marginBottom: "64px" }}>
                        {PACKAGE_NAMES.map(name => (
                            <PackageCard
                                key={name}
                                name={name}
                                pkg={cityPackages[name]}
                                isSelected={compareA === name || compareB === name}
                                onSelect={n => { if (compareA !== n && compareB !== n) setCompareA(n); }}
                            />
                        ))}
                    </div>

                    {/* Compare section */}
                    <div>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                            <div>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 8px" }}>Side by Side</p>
                                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#0a0f1a", margin: 0, letterSpacing: "-0.02em" }}>
                                    Compare Packages
                                </h3>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <select value={compareA} onChange={e => setCompareA(e.target.value)} style={SELECT_STYLE}>
                                    {PACKAGE_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em" }}>VS</span>
                                <select value={compareB} onChange={e => setCompareB(e.target.value)} style={SELECT_STYLE}>
                                    {PACKAGE_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                            <ComparisonCard packageName={compareA} pkg={cityPackages[compareA]} />
                            <ComparisonCard packageName={compareB} pkg={cityPackages[compareB]} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: "white", padding: "80px 24px", borderTop: "1px solid #e2e8f0", textAlign: "center" }}>
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 14px" }}>
                        Custom Build
                    </p>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 300, color: "#0a0f1a", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
                        Looking for a<br />
                        <em style={{ fontStyle: "italic", fontWeight: 400 }}>Personalised Package?</em>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: "0 0 36px" }}>
                        Share your requirements and we&apos;ll create a custom package tailored just for you.
                    </p>
                    <Link
                        href="/contact"
                        style={{ display: "inline-block", background: "#0a0f1a", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 32px", textDecoration: "none", transition: "background 0.15s" }}
                        onMouseOver={e => e.currentTarget.style.background = "#1e293b"}
                        onMouseOut={e => e.currentTarget.style.background = "#0a0f1a"}
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </>
    );
}