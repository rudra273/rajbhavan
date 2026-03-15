import Link from "next/link";

const hardware = [
  {
    name: "Door Handles & Knobs",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07b39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <line x1="14" y1="12" x2="18" y2="12" />
      </svg>
    ),
  },
  {
    name: "Mortise & Smart Locks",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07b39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="#e07b39" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Sliding Door Systems",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07b39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="6" x2="22" y2="6" />
        <rect x="5" y="9" width="7" height="12" rx="1" />
        <rect x="12" y="9" width="7" height="12" rx="1" />
        <circle cx="8.5" cy="15" r="0.8" fill="#e07b39" stroke="none" />
        <circle cx="15.5" cy="15" r="0.8" fill="#e07b39" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Cabinet Hardware",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07b39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="9" rx="1" />
        <rect x="3" y="12" width="18" height="9" rx="1" />
        <line x1="12" y1="7.5" x2="12" y2="7.5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="16.5" x2="14" y2="16.5" />
      </svg>
    ),
  },
  {
    name: "Bathroom Fittings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07b39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1z" />
        <line x1="6" y1="12" x2="6" y2="6" />
        <path d="M6 6a2 2 0 0 1 4 0v6" />
      </svg>
    ),
  },
  {
    name: "Curtain & Window Hardware",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e07b39" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="5" x2="22" y2="5" />
        <path d="M4 5 Q6 14 4 19" />
        <path d="M11 5 Q9 14 11 19" />
        <path d="M13 5 Q15 14 13 19" />
        <path d="M20 5 Q18 14 20 19" />
      </svg>
    ),
  },
];

const tags = ["Door Handles", "Locks", "Cabinet Hardware", "Bathroom Fittings", "Sliding Systems", "Curtain Rails"];

export default function ShopTeaser() {
  return (
    <section style={{ background: "#0d0d0d", padding: "80px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 16px" }}>
            Premium Hardware Shop
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, color: "white", margin: "0 0 20px", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            Beyond Construction —<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#e07b39" }}>We Sell Hardware Too</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#a3a3a3", lineHeight: 1.7, margin: "0 0 28px", maxWidth: "440px" }}>
            Visit our store for premium interior hardware — door handles, locks, hinges, cabinet fittings, bathroom accessories, and much more. Available in matte black, satin gold, chrome, and antique brass.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
            {tags.map(tag => (
              <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#999999", background: "#1a1a1a", padding: "5px 12px", borderRadius: "2px", letterSpacing: "0.03em" }}>{tag}</span>
            ))}
          </div>
          <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#e07b39", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none", transition: "background 0.15s" }}>
            Browse Our Hardware Shop
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#2a2a2a", border: "1px solid #2a2a2a" }}>
          {hardware.map(item => (
            <div key={item.name} style={{ background: "#141414", padding: "24px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ flexShrink: 0, lineHeight: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#e5e5e5", lineHeight: 1.4 }}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
