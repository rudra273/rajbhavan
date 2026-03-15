import Link from "next/link";

// ─── Shop Contact & Location ──────────────────────────────────────────────────
const shopInfo = {
  phone: {
    dial: "+917008039858",
    display: "+91 70080 39858",
  },
  address: {
    line1: "MAA HOME INTERIOR, Near Daya filling station, NH-16 by pass, Chatrapur",
    line2: "Ganjam, Odisha — 761020",
  },
  hours: {
    weekday: "Mon – Sat: 9:00 AM – 7:00 PM",
    weekend: "Sunday: 10:00 AM – 4:00 PM",
  },
  serving: "Berhampur, Bhubaneswar & nearby areas",
  bulkNote: "Bulk & project orders available",
};

// ─── WhatsApp Message Templates ───────────────────────────────────────────────
const waMessages = {
  enquiry: "Hi! I'm interested in your hardware products. Can you help me?",
  directions: "Hi! I want to visit your hardware shop. Can you share the exact address?",
};

// ─── Page Text Content ────────────────────────────────────────────────────────
const content = {
  hero: {
    label: "Premium Interior Hardware",
    titleLine1: "Hardware That",
    titleLine2: "Finishes the Story",
    subtitle:
      "Door handles, locks, hinges, cabinet fittings — every last detail, sourced from trusted manufacturers and available at our store.",
  },
  categories: {
    label: "Our Categories",
    heading: "What We Stock",
    desc: "A curated selection of interior hardware for every room, every style, and every budget.",
  },
  visit: {
    label: "Visit Us",
    titleLine1: "Come See It",
    titleLine2: "In Person",
    desc: "Walk in to our store to touch, feel, and compare finishes before you decide. Our team is happy to help you pick the right hardware for your project.",
  },
  cta: {
    label: "Complete Your Build",
    heading: "Need hardware for your construction project?",
    desc: "We supply hardware directly to our construction clients at preferential rates. Let us handle everything from bricks to handles.",
  },
};

// ─── Product Categories ───────────────────────────────────────────────────────
const products = [
  {
    category: "Door Handles & Knobs",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.57 1.3 4.83 3.27 6.19L8 20h8l-.27-4.81C17.7 13.83 19 11.57 19 9c0-3.87-3.13-7-7-7z" />
        <line x1="8" y1="20" x2="16" y2="20" />
      </svg>
    ),
    items: ["Tubular Lever Handles", "Mortise Handles", "Pull Handles", "Round & Square Knobs", "D-Shape Handles", "Flush Pulls"],
    desc: "Elegant handles and knobs in matte black, satin gold, chrome, and antique brass finishes.",
  },
  {
    category: "Locks & Latches",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    items: ["Mortise Locks", "Cylindrical Deadbolts", "Rim Locks", "Digital & Smart Locks", "Bathroom Latches", "Security Chains & Bolts"],
    desc: "High-security locks from trusted brands. From classic key locks to smart digital entry systems.",
  },

  {
    category: "Sliding & Folding Hardware",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="6" x2="22" y2="6" />
        <rect x="4" y="10" width="7" height="10" rx="1" />
        <rect x="13" y="10" width="7" height="10" rx="1" />
        <path d="M11 6v4M13 6v4" />
      </svg>
    ),
    items: ["Sliding Door Track Systems", "Barn Door Hardware", "Pocket Door Kits", "Bi-Fold Door Hardware", "Sliding Window Fittings", "Soft-Close Runners"],
    desc: "Premium sliding and barn door systems to maximize space without compromising on style.",
  },
  {
    category: "Cabinet & Furniture Hardware",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
        <circle cx="16" cy="8" r="1" fill="currentColor" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    items: ["Cabinet Pulls & Knobs", "Drawer Slides (Full-Extension)", "Soft-Close Cabinet Hinges", "Wardrobe Fittings", "Bed Hardware & Brackets", "Shelf Support Pins"],
    desc: "Everything you need to outfit kitchens, wardrobes, and modular furniture with precision hardware.",
  },
  {
    category: "Bathroom Fittings",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1" />
        <path d="M2 12h20v2a8 8 0 0 1-8 8H10a8 8 0 0 1-8-8v-2z" />
      </svg>
    ),
    items: ["Towel Rings & Rails", "Toilet Roll Holders", "Robe Hooks", "Shower & Glass Door Fittings", "Mirror Clips & Brackets", "Grab Bars"],
    desc: "Designer bathroom accessories in matte black, brushed nickel, and polished chrome to complete your bath.",
  },
  {
    category: "Window Hardware",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    items: ["Casement Window Handles", "Stays & Restrictors", "Window Locks & Bolts", "Friction Stays", "Tilt & Turn Hardware", "Mosquito & Fly Screen Fittings"],
    desc: "Strong, weather-resistant window hardware designed for long life in all climates.",
  },
  {
    category: "Glass & Partition Fittings",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="4" y1="16" x2="20" y2="16" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
    items: ["Glass Door Hinges (Spider & Patch)", "Glass Clamps & U-Channels", "Glass Railings & Balustrades", "Partition Wall Brackets", "Shower Enclosure Hardware", "Frameless Glass Pulls"],
    desc: "Professional-grade glass fittings for a sleek, open-plan look in offices, homes, and bathrooms.",
  },
  {
    category: "Staircase & Railing Accessories",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 20 8 20 8 16 12 16 12 12 16 12 16 8 20 8 20 4" />
        <line x1="4" y1="4" x2="20" y2="20" />
      </svg>
    ),
    items: ["SS Handrail Brackets", "Balusters & Newel Posts", "Railing End Caps", "Stair Nosing Strips", "Wall Handrail Supports", "Floor Flanges"],
    desc: "Stainless steel and MS accessories to build safe, stylish staircases and balcony railings.",
  },
  {
    category: "Decorative & Feature Hardware",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    items: ["Decorative Escutcheon Plates", "Key Hole Covers", "Door Viewers (Peepholes)", "Door Stops & Buffers", "Door Closers", "Numerals & Name Plates"],
    desc: "Finishing touches that make every door a design statement — from classic brass to contemporary matte.",
  },
];

const finishes = [
  { name: "Matte Black", hex: "#222222" },
  { name: "Satin Gold", hex: "#c8a84b" },
  { name: "Chrome", hex: "#a8b4be" },
  { name: "Antique Brass", hex: "#8B6914" },
  { name: "Rose Gold", hex: "#c4806a" },
  { name: "Brushed Nickel", hex: "#7a8a92" },
  { name: "Stainless Steel", hex: "#8d9da6" },
  { name: "Antique Copper", hex: "#7a4f2e" },
];

export const metadata = {
  title: "Hardware Shop in Chatrapur \u2014 Door Handles, Locks & Fittings | Raj Bhavan",
  description:
    "Buy premium interior hardware in Chatrapur & Berhampur \u2014 door handles, locks, hinges, cabinet fittings & sliding hardware. Visit Maa Home Interior on NH-16, Chatrapur, Ganjam.",
  keywords:
    "hardware shop Chatrapur, door handles Berhampur, locks and hinges Ganjam, cabinet fittings Odisha, interior hardware store near me, Maa Home Interior Chatrapur",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Hardware Shop \u2014 Door Handles, Locks & Fittings | Raj Bhavan",
    description:
      "Premium interior hardware in Chatrapur & Berhampur. Door handles, locks, hinges, cabinet fittings & more.",
  },
};

export default function ShopPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        .shop-card { background: white; border: 1px solid #e5e5e5; padding: 32px; transition: box-shadow 0.2s, border-color 0.2s; }
        .shop-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); border-color: #c8c8c8; }
        .shop-pill { display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; background: #f2f2f2; color: #555555; padding: 4px 10px; margin: 3px 3px 3px 0; border-radius: 2px; letter-spacing: 0.02em; }
        .shop-cta-btn { display: inline-flex; align-items: center; gap: 10px; background: #111111; color: white; border: 1px solid white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 28px; text-decoration: none; transition: background 0.15s; }
        .shop-cta-btn:hover { background: #2a2a2a; }
        .shop-cta-outline { display: inline-flex; align-items: center; gap: 10px; background: white; color: #111111; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 13px 28px; text-decoration: none; border: 1px solid #e5e5e5; transition: border-color 0.15s; }
        .shop-cta-outline:hover { border-color: #111111; }
        .finish-dot { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #e5e5e5; display: inline-block; }
      `}</style>

      {/* Hero */}
      <section style={{ background: "#0d0d0d", paddingTop: "140px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 16px" }}>
            {content.hero.label}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 300, color: "white", margin: "0 0 20px", lineHeight: 1, letterSpacing: "-0.025em" }}>
            {content.hero.titleLine1}<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#e07b39" }}>{content.hero.titleLine2}</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#a3a3a3", maxWidth: "520px", lineHeight: 1.7, margin: "0 0 40px" }}>
            {content.hero.subtitle}
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href={`tel:${shopInfo.phone.dial}`} className="shop-cta-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Call to Enquire
            </a>
            <a
              href={`https://wa.me/${shopInfo.phone.dial}?text=${encodeURIComponent(waMessages.enquiry)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shop-cta-outline"
              style={{ borderColor: "#333333" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Available Finishes */}
      <section style={{ background: "#f7f7f7", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", padding: "32px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999999", whiteSpace: "nowrap" }}>
            Available Finishes
          </span>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            {finishes.map(f => (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span className="finish-dot" style={{ background: f.hex }} title={f.name} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6b6b6b" }}>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ background: "#f7f7f7", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "52px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 12px" }}>
              {content.categories.label}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#111111", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              {content.categories.heading}
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#6b6b6b", maxWidth: "480px", lineHeight: 1.6, margin: 0 }}>
              {content.categories.desc}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
            {products.map(p => (
              <div key={p.category} className="shop-card">
                <div style={{ color: "#e07b39", marginBottom: "16px" }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 500, color: "#111111", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                  {p.category}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#6b6b6b", lineHeight: 1.6, margin: "0 0 16px" }}>
                  {p.desc}
                </p>
                <div>
                  {p.items.map(item => (
                    <span key={item} className="shop-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Shop */}
      <section style={{ background: "white", borderTop: "1px solid #e5e5e5", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 16px" }}>
              {content.visit.label}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, color: "#111111", margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {content.visit.titleLine1}<br />
              <em style={{ fontStyle: "italic" }}>{content.visit.titleLine2}</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#6b6b6b", lineHeight: 1.7, margin: "0 0 32px", maxWidth: "420px" }}>
              {content.visit.desc}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href={`tel:${shopInfo.phone.dial}`} className="shop-cta-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                {shopInfo.phone.display}
              </a>
              <a
                href={`https://wa.me/${shopInfo.phone.dial}?text=${encodeURIComponent(waMessages.directions)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shop-cta-outline"
              >
                Get Directions on WhatsApp
              </a>
            </div>
          </div>

          {/* Shop Info Card */}
          <div style={{ background: "#f7f7f7", border: "1px solid #e5e5e5", padding: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#e07b39", marginTop: "2px", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999999", margin: "0 0 6px" }}>Address</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#111111", margin: 0, lineHeight: 1.6 }}>
                    {shopInfo.address.line1}<br />
                    {shopInfo.address.line2}
                  </p>
                </div>
              </div>

              <div style={{ height: "1px", background: "#e5e5e5" }} />

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#e07b39", marginTop: "2px", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999999", margin: "0 0 6px" }}>Phone</p>
                  <a href={`tel:${shopInfo.phone.dial}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#111111", textDecoration: "none", display: "block", lineHeight: 1.6 }}>
                    {shopInfo.phone.display}
                  </a>
                </div>
              </div>

              <div style={{ height: "1px", background: "#e5e5e5" }} />

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#e07b39", marginTop: "2px", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999999", margin: "0 0 6px" }}>Store Hours</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#111111", margin: 0, lineHeight: 1.7 }}>
                    {shopInfo.hours.weekday}<br />
                    {shopInfo.hours.weekend}
                  </p>
                </div>
              </div>

              <div style={{ height: "1px", background: "#e5e5e5" }} />

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ color: "#e07b39", marginTop: "2px", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#999999", margin: "0 0 6px" }}>Also Serving</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#111111", margin: 0, lineHeight: 1.6 }}>
                    {shopInfo.serving}<br />
                    <span style={{ color: "#6b6b6b", fontSize: "12px" }}>{shopInfo.bulkNote}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "#0d0d0d", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 20px" }}>
            {content.cta.label}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "white", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {content.cta.heading}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#a3a3a3", margin: "0 0 36px", lineHeight: 1.7 }}>
            {content.cta.desc}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="shop-cta-btn">
              Get a Construction Quote
            </Link>
            <Link href="/packages" className="shop-cta-outline" style={{ borderColor: "#333333" }}>
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
