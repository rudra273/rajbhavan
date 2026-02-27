import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { getCachedProjects } from "@/lib/dataCache";

export default async function Home() {
  let projects = [];

  try {
    const allProjects = getCachedProjects();
    projects = allProjects.slice(0, 4); // Show only 3-4 featured projects
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About / Intro Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)] mb-5">
                Crafting Quality{" "}
                <span className="text-accent">Construction</span> Since 2005
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                At Raj Bhavan Construction, we believe in building more than
                structures — we build trust, relationships, and legacies. With
                over 18 years of experience in the construction industry, our
                team delivers projects that stand the test of time.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                From residential homes to large-scale commercial builds, we
                combine modern techniques with traditional craftsmanship to
                deliver results that exceed expectations.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  "Residential",
                  "Commercial",
                  "Renovation",
                  "Interior",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-cream text-navy text-sm font-medium px-4 py-2 rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🏗️",
                  title: "Expert Team",
                  desc: "Skilled professionals with years of experience",
                },
                {
                  icon: "✅",
                  title: "Quality First",
                  desc: "Premium materials and precise workmanship",
                },
                {
                  icon: "⏰",
                  title: "On Time",
                  desc: "We deliver projects on schedule, every time",
                },
                {
                  icon: "💰",
                  title: "Fair Pricing",
                  desc: "Transparent costs with no hidden charges",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-cream rounded-xl p-5 text-center border border-gray-200/60 hover:border-accent/30 transition-colors duration-200"
                >
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <h4 className="text-navy font-semibold text-sm mb-1 font-[family-name:var(--font-heading)]">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
