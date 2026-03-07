const TAGS = [
    {
        label: "Residential",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    },
    {
        label: "Commercial",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></svg>,
    },
    {
        label: "Renovation",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    },
    {
        label: "Interior",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" /><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" /><path d="M4 18v2M20 18v2" /></svg>,
    },
];

const FEATURES = [
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        title: "Expert Team",
        desc: "Skilled professionals with years of hands-on experience.",
    },
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
        title: "Quality First",
        desc: "Premium materials and precise workmanship on every build.",
    },
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        title: "On Time",
        desc: "We deliver projects on schedule, every time.",
    },
    {
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>,
        title: "Fair Pricing",
        desc: "Transparent costs with no hidden charges.",
    },
];

export default function AboutIntro() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600&display=swap');
                .feat-item:not(:last-child) { border-bottom: 1px solid #f1f5f9; }
            `}</style>
            <section style={{ background: "white", borderTop: "1px solid #e2e8f0", padding: "80px 24px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>

                        {/* Left */}
                        <div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 14px" }}>
                                Why Choose Us
                            </p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#0a0f1a", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 28px" }}>
                                Crafting Quality Construction<br />
                                <em style={{ fontStyle: "italic", fontWeight: 300 }}>Since 2005</em>
                            </h2>

                            <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: "20px", marginBottom: "32px" }}>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#475569", lineHeight: 1.75, margin: "0 0 14px" }}>
                                    At Raj Bhavan Construction, we believe in building more than structures — we build trust, relationships, and legacies. With over 18 years of experience, our team delivers projects that stand the test of time.
                                </p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#475569", lineHeight: 1.75, margin: 0 }}>
                                    From residential homes to large-scale commercial builds, we combine modern techniques with traditional craftsmanship to deliver results that exceed expectations.
                                </p>
                            </div>

                            {/* Tags */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {TAGS.map(tag => (
                                    <span key={tag.label} style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "7px 14px" }}>
                                        <span style={{ color: "#94a3b8" }}>{tag.icon}</span>
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right — feature list */}
                        <div style={{ border: "1px solid #e2e8f0" }}>
                            {FEATURES.map((item, i) => (
                                <div key={item.title} className="feat-item" style={{ display: "flex", alignItems: "flex-start", gap: "20px", padding: "24px" }}>
                                    <div style={{ width: "40px", height: "40px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#475569", flexShrink: 0 }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0a0f1a", margin: "0 0 5px", letterSpacing: "0.01em" }}>{item.title}</p>
                                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}