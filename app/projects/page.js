import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/googleSheets";

export const revalidate = 60;

export const metadata = {
    title: "Our Projects | Raj Bhavan Construction",
    description:
        "Browse our portfolio of completed residential and commercial construction projects.",
};

export default async function ProjectsPage() {
    let projects = [];

    try {
        projects = await getProjects();
    } catch (error) {
        console.error("Error fetching projects:", error);
    }

    return (
        <div className="pt-20 md:pt-24">
            {/* Page Header */}
            <section className="bg-navy text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                        Our Portfolio
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
                        Our Projects
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Explore our diverse range of construction projects — from modern
                        residences to large-scale commercial buildings.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    {projects.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} {...project} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">
                                No projects available yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
