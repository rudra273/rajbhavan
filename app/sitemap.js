import { getProjects } from "@/lib/googleSheets";

const BASE_URL = "https://raj-bhavan.vercel.app";

export default async function sitemap() {
  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/packages`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  let projectRoutes = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap: failed to fetch projects", error);
  }

  return [...staticRoutes, ...projectRoutes];
}
