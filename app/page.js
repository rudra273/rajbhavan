import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import Brands from "@/components/Brands";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { getCachedProjects } from "@/lib/dataCache";

export default async function Home() {
  let projects = [];

  try {
    const allProjects = getCachedProjects();
    projects = allProjects.filter(p => p.is_featured === true || p.is_featured === "true" || p.is_featured === "TRUE").slice(0, 4); // Show only up to 4 featured projects
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About / Intro Section */}
      <AboutIntro />

      {/* Brands We Use Section */}
      <Brands />

      {/* Featured Projects Section */}
      <section className="section-padding bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
              Featured Projects
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Take a look at some of our recent builds that showcase our
              commitment to quality and design.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Projects coming soon...
            </p>
          )}

          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View All Projects
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark to-navy" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get in touch with us today and let&apos;s bring your construction
            vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
