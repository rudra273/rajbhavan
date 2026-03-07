"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";

const icons = {
    location: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    area: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>,
    floors: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M3 15h18M9 3v18" /></svg>,
    price: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    package: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    duration: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
};

export default function ProjectDetail({ project }) {
    const details = [
        { icon: icons.location, label: "Location", value: project.location },
        { icon: icons.area, label: "Total Area", value: project.total_area },
        { icon: icons.floors, label: "Floors", value: project.floors },
        { icon: icons.price, label: "Price", value: project.price },
        { icon: icons.package, label: "Package", value: project.package },
        { icon: icons.duration, label: "Duration", value: project.duration },
    ].filter(d => d.value);

    const galleryImages = project.gallery_images || [];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@400;500;600&display=swap');
                .gal-item { overflow: hidden; background: #e2e8f0; }
                .gal-item img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) !important; }
                .gal-item:hover img { transform: scale(1.05) !important; }
                .back-link { display: inline-flex; align-items: center; gap: 7px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #64748b; text-decoration: none; transition: color 0.15s; }
                .back-link:hover { color: #0a0f1a; }
                .stat-row:not(:last-child) { border-bottom: 1px solid #f1f5f9; }
            `}</style>

            <div style={{ paddingTop: "80px", fontFamily: "'DM Sans', sans-serif" }}>

                {/* Header */}
                <section style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "40px 24px 36px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <Link href="/projects" className="back-link" style={{ marginBottom: "20px", display: "inline-flex" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            All Projects
                        </Link>

                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginTop: "8px" }}>
                            <div>
                                {project.category && (
                                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 10px" }}>
                                        {project.category}
                                    </p>
                                )}
                                <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 400, color: "#0a0f1a", margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>
                                    {project.title}
                                </h1>
                            </div>
                            {project.is_featured && (
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b45309", background: "#fef3c7", padding: "5px 12px", borderRadius: "2px", border: "1px solid #fde68a", whiteSpace: "nowrap", alignSelf: "flex-start", marginTop: "6px" }}>
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section style={{ background: "#f8fafc", padding: "48px 24px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>

                            {/* Main Image */}
                            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#e2e8f0" }}>
                                {project.cloudinary_url ? (
                                    <CldImage
                                        src={project.cloudinary_url}
                                        alt={project.title}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "13px" }}>
                                        No image available
                                    </div>
                                )}
                            </div>

                            {/* Stats Panel */}
                            {details.length > 0 && (
                                <div style={{ background: "white", border: "1px solid #e2e8f0" }}>
                                    <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0" }}>
                                        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: 0 }}>
                                            Project Specifications
                                        </p>
                                    </div>
                                    <div>
                                        {details.map(({ icon, label, value }, i) => (
                                            <div key={i} className="stat-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#64748b" }}>
                                                    {icon}
                                                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#64748b", letterSpacing: "0.02em" }}>{label}</span>
                                                </div>
                                                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0a0f1a", textAlign: "right", maxWidth: "55%" }}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                {galleryImages.length > 0 && (
                    <section style={{ background: "white", padding: "60px 24px 80px", borderTop: "1px solid #e2e8f0" }}>
                        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                            <div style={{ marginBottom: "36px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 8px" }}>Gallery</p>
                                    <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400, color: "#0a0f1a", margin: 0, letterSpacing: "-0.02em" }}>
                                        Phases of Development
                                    </h2>
                                </div>
                                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>{galleryImages.length} images</span>
                            </div>

                            {/* Masonry-style grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
                                {galleryImages.map((imgId, index) => (
                                    <div
                                        key={index}
                                        className="gal-item"
                                        style={{ position: "relative", aspectRatio: index % 5 === 0 ? "1/1.2" : "4/3" }}
                                    >
                                        <CldImage
                                            src={imgId}
                                            alt={`${project.title} — ${index + 1}`}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}