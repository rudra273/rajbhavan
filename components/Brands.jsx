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
        <div
            className="flex-shrink-0 mx-4 sm:mx-6 md:mx-10 flex items-center justify-center"
            style={{ minWidth: "100px" }}
        >
            <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={60}
                className="object-contain"
                draggable={false}
            />
        </div>
    );
}

function MarqueeRow({ items, reverse = false }) {
    const tripled = [...items, ...items, ...items];
    return (
        <div className="overflow-hidden relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-cream to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-cream to-transparent z-10" />

            <div
                className={reverse ? "marquee-track marquee-reverse" : "marquee-track"}
                style={{ width: "fit-content" }}
            >
                {tripled.map((brand, index) => (
                    <BrandItem key={`${brand.name}-${index}`} brand={brand} />
                ))}
            </div>
        </div>
    );
}

export default function Brands() {
    return (
        <section className="py-12 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
                <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                    Trusted Partners
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
                    Brands We Use
                </h2>
            </div>

            {/* Desktop: single row with all brands */}
            <div className="hidden md:block">
                <MarqueeRow items={brands} />
            </div>

            {/* Mobile: two rows — row1 scrolls left, row2 scrolls right */}
            <div className="md:hidden flex flex-col gap-6">
                <MarqueeRow items={row1} />
                <MarqueeRow items={row2} reverse />
            </div>
        </section>
    );
}
