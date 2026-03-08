
import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import Brands from "@/components/Brands";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import Link from "next/link";
import { getCachedProjects } from "@/lib/dataCache";

export default async function Home() {
  let projects = [];
  try {
    const allProjects = getCachedProjects();
    projects = allProjects.filter(p => p.is_featured === true || p.is_featured === "true" || p.is_featured === "TRUE").slice(0, 8);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
                .cta-wa { display: inline-flex; align-items: center; gap: 10px; background: #0a0f1a; color: white; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 14px 28px; text-decoration: none; transition: background 0.15s; }
                .cta-wa:hover { background: #1e293b; }
                .cta-call { display: inline-flex; align-items: center; gap: 10px; background: white; color: #0a0f1a; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 13px 28px; text-decoration: none; border: 1px solid #e2e8f0; transition: border-color 0.15s; }
                .cta-call:hover { border-color: #0a0f1a; }
                .view-all { display: inline-flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #475569; text-decoration: none; transition: color 0.15s; }
                .view-all:hover { color: #0a0f1a; }
                .view-all svg { transition: transform 0.15s; }
                .view-all:hover svg { transform: translateX(3px); }
            `}</style>

      <Hero />
      <AboutIntro />
      <Brands />

      {/* Featured Projects  test*/}
      <section style={{ background: "#f8fafc", padding: "80px 0", overflow: "hidden", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "36px", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 10px" }}>
                Our Work
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#0a0f1a", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1 }}>
                Signature Builds
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", margin: 0, maxWidth: "420px", lineHeight: 1.6 }}>
                A selection of recent projects showcasing our commitment to quality and design.
              </p>
            </div>
            <Link href="/projects" className="view-all">
              View All Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </div>
          <FeaturedProjects projects={projects} />
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section style={{ background: "white", borderTop: "1px solid #e2e8f0", padding: "100px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 20px" }}>
            Let&apos;s Build Together
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "#0a0f1a", margin: "0 0 20px", lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            Let&apos;s Turn Your Vision Into<br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>Four Walls and a Roof</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: "0 auto 12px", maxWidth: "480px" }}>
            Get in touch today and let&apos;s bring your construction vision to life.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94a3b8", letterSpacing: "0.04em", margin: "0 0 44px" }}>
            Free consultation &nbsp;&bull;&nbsp; No obligations &nbsp;&bull;&nbsp; Quick response
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/917008039858?text=${encodeURIComponent("Hi! I'm interested in your construction services. Can we discuss my project?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-wa"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
            <a href="tel:+917008039858" className="cta-call">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Call +91 70080 39858
            </a>
          </div>
        </div>
      </section>
    </>
  );
}