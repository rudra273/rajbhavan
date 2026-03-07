import { getCachedProjects } from "@/lib/dataCache";
import ProjectDetail from "@/components/ProjectDetail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const projects = getCachedProjects();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return { title: "Project Not Found | Raj Bhavan Construction" };
    }

    return {
        title: `${project.title} | Raj Bhavan Construction`,
        description: `View details of ${project.title} — a ${project.category || "construction"} project by Raj Bhavan Construction.`,
    };
}

export default async function ProjectDetailPage({ params }) {
    const { id } = await params;
    const projects = getCachedProjects();
    const project = projects.find((p) => p.id === id);

    if (!project) notFound();

    return <ProjectDetail project={project} />;
}