import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import Brands from "@/components/Brands";
import Testimonials from "@/components/Testimonials";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { getCachedProjects } from "@/lib/dataCache";

export default async function Home() {
  let projects = [];

  try {
    const allProjects = getCachedProjects();
    projects = allProjects.filter(p => p.is_featured === true || p.is_featured === "true" || p.is_featured === "TRUE").slice(0, 3);
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
          {/* Split Header — title left, link right */}
          <div className="mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Our Work
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
                  Featured Projects
                </h2>
                <p className="text-gray-500 mt-2 max-w-lg">
                  Take a look at some of our recent builds that showcase our
                  commitment to quality and design.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-semibold text-sm transition-colors duration-200 group shrink-0"
              >
                View All Projects
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Projects coming soon...
            </p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy to-navy-dark" />
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-3">
            Get in touch with us today and let&apos;s bring your construction
            vision to life.
          </p>
          <p className="text-gray-500 text-sm mb-10">
            Free consultation &bull; No obligations &bull; Quick response
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Contact Us Today
            </Link>
            <a
              href="tel:+917008039858"
              className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-accent text-gray-300 hover:text-accent px-8 py-3.5 rounded-lg text-lg font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call +91 70080 39858
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
