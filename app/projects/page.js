import ProjectCard from "@/components/ProjectCard";
import { getCachedProjects } from "@/lib/dataCache";

export const metadata = {
    title: "Our Projects | Raj Bhavan Construction",
    description: "Browse our portfolio of completed residential and commercial construction projects.",
};

export default async function ProjectsPage() {
    let projects = [];
    try {
        projects = getCachedProjects();
    } catch (error) {
        console.error("Error fetching projects:", error);
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600&display=swap');
            `}</style>
            <div style={{ paddingTop: "80px" }}>

                {/* Page Header */}
                <section style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "64px 24px 48px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#0a0f1a", margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>
                                Our Projects
                            </h1>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748b", maxWidth: "380px", margin: 0, lineHeight: 1.6 }}>
                                From modern residences to large-scale commercial buildings — every project built with intention.
                            </p>
                        </div>
                        {projects.length > 0 && (
                            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 500, color: "#0a0f1a", lineHeight: 1 }}>{projects.length}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94a3b8", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>projects completed</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Projects Grid */}
                <section style={{ background: "#f8fafc", padding: "48px 24px 80px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        {projects.length > 0 ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "2px" }}>
                                {projects.map((project) => (
                                    <ProjectCard key={project.id} {...project} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "80px 24px" }}>
                                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#94a3b8", fontWeight: 400, margin: 0 }}>
                                    No projects available yet.
                                </p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#cbd5e1", marginTop: "8px" }}>
                                    Check back soon.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}