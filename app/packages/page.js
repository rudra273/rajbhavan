"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PACKAGE_NAMES = ["Essential", "Standard", "Premium", "Luxury"];
const CITIES = ["Chatrapur", "Berhampur"];


function PackageCard({ name, pkg, isSelected, onSelect }) {
    return (
        <button
            onClick={() => onSelect(name)}
            className={`relative group text-left rounded-2xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isSelected
                ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                : "border-gray-200 bg-white hover:border-accent/40"
                }`}
        >
            {/* Tag */}
            <span
                className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white bg-gradient-to-r ${pkg.color} mb-4`}
            >
                {pkg.tag}
            </span>

            <h4 className="text-xl font-bold text-navy font-[family-name:var(--font-heading)] mb-1">
                {name}
            </h4>
            <p className="text-2xl font-extrabold text-accent mb-3">{pkg.price}</p>
            <p className="text-gray-500 text-sm">
                {pkg.sections.length} categories included
            </p>

            {isSelected && (
                <div className="absolute top-4 right-4">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}
        </button>
    );
}

function ExpandableRow({ title, items }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-3.5 px-4 text-left hover:bg-gray-50 transition-colors duration-150 group"
            >
                <span className="text-sm font-semibold text-navy group-hover:text-accent transition-colors">
                    {title}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="px-4 pb-4 space-y-2">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ComparisonCard({ packageName, pkg }) {
    return (
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${pkg.color} px-6 py-5`}>
                <h4 className="text-xl font-bold text-white font-[family-name:var(--font-heading)]">
                    {packageName}
                </h4>
                <p className="text-white/90 text-lg font-semibold mt-1">{pkg.price}</p>
            </div>
            {/* Rows*/}
            <div className="divide-y divide-gray-100">
                {pkg.sections.map((section, i) => (
                    <ExpandableRow key={i} title={section.title} items={section.items} />
                ))}
            </div>
        </div>
    );
}


export default function PackagesPage() {
    const [city, setCity] = useState("Chatrapur");
    const [compareA, setCompareA] = useState("Essential");
    const [compareB, setCompareB] = useState("Standard");
    const [cityData, setCityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/packages")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch packages");
                return res.json();
            })
            .then((data) => {
                setCityData(data.cityData);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // While loading or on error, show a themed loading / error state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Loading packages…</p>
                </div>
            </div>
        );
    }

    if (error || !cityData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light">
                <div className="text-center">
                    <p className="text-red-400 text-lg mb-2">Something went wrong</p>
                    <p className="text-gray-500 text-sm">{error || "Unable to load package data"}</p>
                </div>
            </div>
        );
    }

    const cityPackages = cityData[city];

    return (
        <>
            {/* ——— HERO BANNER ——— */}
            <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-light" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white font-[family-name:var(--font-heading)] leading-tight mb-6">
                        Let&apos;s Build Home With{" "}
                        <span className="text-accent">Transparency</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                        Choose a package, compare features, and get a personalised quote — all with clear, upfront pricing.
                    </p>

                    {/* 3 Steps */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
                        {[
                            { step: "1", text: "Select any package" },
                            { step: "2", text: "Review and compare" },
                            { step: "3", text: "Send us your customised details" },
                        ].map((s, i) => (
                            <div key={s.step} className="flex items-center gap-3 sm:gap-4">
                                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm font-bold">
                                        {s.step}
                                    </span>
                                    <span className="text-white text-sm font-medium">{s.text}</span>
                                </div>
                                {i < 2 && (
                                    <svg className="hidden sm:block w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ——— PACKAGES SECTION ——— */}
            <section className="section-padding bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Heading + City Selector */}
                    <div className="text-center mb-10">
                        <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                            Our Offerings
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-4">
                            Packages
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Currently showing for{" "}
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="inline-block bg-cream border border-gray-300 text-navy font-semibold rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
                            >
                                {CITIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>

                    {/* City Name */}
                    <h3 className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)] mb-6 text-center">
                        {city}
                    </h3>

                    {/* Package Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {PACKAGE_NAMES.map((name) => (
                            <PackageCard
                                key={name}
                                name={name}
                                pkg={cityPackages[name]}
                                isSelected={compareA === name || compareB === name}
                                onSelect={(n) => {
                                    if (compareA !== n && compareB !== n) {
                                        setCompareA(n);
                                    }
                                }}
                            />
                        ))}
                    </div>

                    {/* ——— COMPARE SECTION ——— */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)] mb-6 text-center">
                            Compare Packages
                        </h3>

                        {/* Selectors */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Package 1:
                                </label>
                                <select
                                    value={compareA}
                                    onChange={(e) => setCompareA(e.target.value)}
                                    className="bg-cream border border-gray-300 text-navy font-semibold rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                >
                                    {PACKAGE_NAMES.map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <span className="text-gray-400 font-bold text-lg">VS</span>

                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Package 2:
                                </label>
                                <select
                                    value={compareB}
                                    onChange={(e) => setCompareB(e.target.value)}
                                    className="bg-cream border border-gray-300 text-navy font-semibold rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                >
                                    {PACKAGE_NAMES.map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Side-by-side Cards */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <ComparisonCard
                                packageName={compareA}
                                pkg={cityPackages[compareA]}
                            />
                            <ComparisonCard
                                packageName={compareB}
                                pkg={cityPackages[compareB]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ——— CTA BANNER ——— */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
                        Looking for Personalized Home Construction?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Share your requirements and we&apos;ll create a custom package tailored just for you.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </>
    );
}
