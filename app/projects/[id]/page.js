import { getProjects } from "@/lib/googleSheets";
import ProjectDetail from "@/components/ProjectDetail";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const projects = await getProjects();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return { title: "Project Not Found | Raj Bhavan Construction" };
    }

    return {
        title: `${project.title} — ${project.category || "Construction"} Project in ${project.location || "Chatrapur & Berhampur"}`,
        description: `${project.title} — a ${project.category || "construction"} project by Raj Bhavan Construction in ${project.location || "Chatrapur, Berhampur, Ganjam, Odisha"}. View photos, details and specifications.`,
        openGraph: {
            title: `${project.title} | Raj Bhavan Construction`,
            description: `${project.category || "Construction"} project by Raj Bhavan Construction in ${project.location || "Chatrapur & Berhampur"}.`,
            images: project.gallery_images?.[0] ? [{ url: project.gallery_images[0], alt: project.title }] : [],
        },
        alternates: {
            canonical: `/projects/${id}`,
        },
    };
}

export default async function ProjectDetailPage({ params }) {
    const { id } = await params;
    const projects = await getProjects();
    const project = projects.find((p) => p.id === id);

    if (!project) notFound();

    return <ProjectDetail project={project} />;
}