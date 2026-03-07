"use client";

import Image from "next/image";

const brands = [
    { name: "UltraTech", logo: "/brands/ultratech.svg" },
    { name: "Dalmia", logo: "/brands/dalmia.svg" },
    { name: "Ramco", logo: "/brands/ramco.jpg" },
    { name: "Tata", logo: "/brands/tata.svg" },
    { name: "JSW", logo: "/brands/jsw.svg" },
    { name: "Jindal", logo: "/brands/jindal.png" },
    { name: "Havells", logo: "/brands/havells.svg" },
    { name: "Jaquar", logo: "/brands/jaquar.png" },
    { name: "Finolex", logo: "/brands/finolex.png" },
    { name: "Panasonic", logo: "/brands/panasonic.svg" },
    { name: "Legrand", logo: "/brands/legrand.png" },
    { name: "Asian", logo: "/brands/asian.svg" },
    { name: "Berger", logo: "/brands/berger.svg" },
    { name: "Indigo", logo: "/brands/indigo.png" },
    { name: "Nerolac", logo: "/brands/nerolac.svg" },
];

const row1 = brands.slice(0, 8);
const row2 = brands.slice(8);

function BrandItem({ brand }) {
    return (
        <div style={{ flexShrink: 0, margin: "0 32px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "90px" }}>
            <Image
                src={brand.logo}
                alt={brand.name}
                width={90}
                height={44}
                style={{ objectFit: "contain", filter: "grayscale(100%)", opacity: 0.7, transition: "opacity 0.2s" }}
                draggable={false}
                onMouseOver={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.filter = "grayscale(0%)"; }}
                onMouseOut={e => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.filter = "grayscale(100%)"; }}
            />
        </div>
    );
}

function MarqueeRow({ items, reverse = false }) {
    const tripled = [...items, ...items, ...items];
    return (
        <div style={{ overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, white, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, white, transparent)", zIndex: 10, pointerEvents: "none" }} />
            <div
                className={reverse ? "marquee-track marquee-reverse" : "marquee-track"}
                style={{ display: "flex", alignItems: "center", width: "fit-content" }}
            >
                {tripled.map((brand, i) => (
                    <BrandItem key={`${brand.name}-${i}`} brand={brand} />
                ))}
            </div>
        </div>
    );
}

export default function Brands() {
    return (
        <section style={{ background: "white", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "64px 0", overflow: "hidden" }}>

            {/* Header */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 40px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 10px" }}>
                        Trusted Partners
                    </p>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, color: "#0a0f1a", margin: 0, letterSpacing: "-0.02em", lineHeight: 1 }}>
                        Brands We Use
                    </h2>
                </div>
            </div>

            {/* Desktop: single row */}
            <div className="hidden-mobile-brands">
                <MarqueeRow items={brands} />
            </div>

            {/* Mobile: two rows */}
            <div className="show-mobile-brands" style={{ display: "none", flexDirection: "column", gap: "28px" }}>
                <MarqueeRow items={row1} />
                <MarqueeRow items={row2} reverse />
            </div>

            <style>{`
                @media (min-width: 768px) { .hidden-mobile-brands { display: block; } .show-mobile-brands { display: none !important; } }
                @media (max-width: 767px) { .hidden-mobile-brands { display: none; } .show-mobile-brands { display: flex !important; } }
            `}</style>
        </section>
    );
}