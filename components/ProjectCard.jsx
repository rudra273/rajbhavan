"use client";

import Link from "next/link";
import { CldImage } from 'next-cloudinary';

export default function ProjectCard({ id, title, cloudinary_url, category, location, total_area, floors, price }) {
    const stats = [
        { label: "Location", value: location, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg> },
        { label: "Area", value: total_area, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> },
        { label: "Floors", value: floors, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 9h18M3 15h18M9 3v18" /></svg> },
        { label: "Price", value: price, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12" /><path d="M6 8h12" /><path d="M6 13h3c3.5 0 5-2 5-5s-1.5-5-5-5" /><path d="M9 13l6 9" /></svg> },
    ].filter(s => s.value);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500;600&display=swap');
                .proj-card { position: relative; display: block; overflow: hidden; background: #0a0f1a; text-decoration: none; outline: none; }
                .proj-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,12,24,0.92) 0%, rgba(8,12,24,0.4) 45%, transparent 70%); z-index: 1; pointer-events: none; }
                .proj-img { transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
                .proj-card:hover .proj-img, .proj-card:focus .proj-img { transform: scale(1.06); }
                .proj-base { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 24px; transform: translateY(0); transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); pointer-events: none; }
                .proj-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; overflow: hidden; max-height: 0; opacity: 0; transition: max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease; margin-top: 0; }
                .proj-card:hover .proj-stats, .proj-card:focus .proj-stats { max-height: 120px; opacity: 1; margin-top: 14px; }
                .proj-divider { width: 24px; height: 1px; background: rgba(255,255,255,0.25); margin: 10px 0 0; transition: width 0.4s ease; }
                .proj-card:hover .proj-divider, .proj-card:focus .proj-divider { width: 100%; background: rgba(255,255,255,0.12); }
                .proj-arrow { pointer-events: auto; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; opacity: 0; transform: translateX(-6px); transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s, border-color 0.2s; }
                .proj-card:hover .proj-arrow, .proj-card:focus .proj-arrow { opacity: 1; transform: translateX(0); }
                .proj-arrow:hover { border-color: rgba(255,255,255,0.6) !important; }
                .proj-cat { display: inline-block; font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: white; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); padding: 4px 10px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.15); margin-bottom: 10px; }
                .proj-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 500; color: white; line-height: 1.2; margin: 0; letter-spacing: -0.01em; }
                .stat-label { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); display: block; margin-bottom: 2px; }
                .stat-value { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.9); display: flex; align-items: center; gap: 5px; }

                .mobile-hidden-link { position: absolute; inset: 0; z-index: 1; display: block; cursor: pointer; }
                @media (max-width: 768px) {
                    .proj-stats { max-height: 120px; opacity: 1; margin-top: 14px; }
                    .proj-divider { width: 100%; background: rgba(255,255,255,0.12); }
                    .proj-arrow { opacity: 1; transform: translateX(0); }
                }
            `}</style>
            <div tabIndex="0" role="button" className="proj-card group" style={{ display: "block", textDecoration: "none" }}>
                <Link href={`/projects/${id}`} className="mobile-hidden-link" aria-label={title}></Link>
                {/* Image */}
                <div style={{ height: "400px", position: "relative", overflow: "hidden" }}>
                    {cloudinary_url ? (
                        <CldImage
                            src={cloudinary_url}
                            alt={title}
                            fill
                            className="proj-img"
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div style={{ width: "100%", height: "100%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        </div>
                    )}
                </div>

                {/* Overlay Content */}
                <div className="proj-base">
                    {category && <span className="proj-cat">{category}</span>}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                        <h3 className="proj-title">{title}</h3>
                        <Link href={`/projects/${id}`} className="proj-arrow" aria-label={`View ${title} details`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                        </Link>
                    </div>

                    <div className="proj-divider" />

                    {stats.length > 0 && (
                        <div className="proj-stats">
                            {stats.map(({ label, value, icon }) => (
                                <div key={label}>
                                    <span className="stat-label">{label}</span>
                                    <span className="stat-value">{icon}{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}