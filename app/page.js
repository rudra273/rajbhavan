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
      {/* Hero Section */}
      <Hero />

      {/* About / Intro Section */}
      <AboutIntro />

      {/* Brands We Use Section */}
      <Brands />

      {/* Featured Projects Section */}
      <section className="section-padding bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Split Header — title left, link right */}
          <div className="mb-10">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              Our Work
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy font-[family-name:var(--font-heading)]">
                  Signature Builds
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

          <FeaturedProjects projects={projects} />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-cream">
        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30" />

        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Label pill */}
          <span className="inline-block bg-accent/10 text-accent font-semibold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Let&apos;s Build Together
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy font-[family-name:var(--font-heading)] mb-4 leading-tight">
            Let&apos;s Turn Your Vision Into<br className="hidden sm:block" /> Four Walls and a Roof
          </h2>
          <p className="text-gray-500 text-base sm:text-lg mb-2 max-w-2xl mx-auto">
            Get in touch with us today and let&apos;s bring your construction
            vision to life.
          </p>
          <p className="text-gray-400 text-sm mb-10">
            Free consultation &bull; No obligations &bull; Quick response
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`https://wa.me/917008039858?text=${encodeURIComponent("Hi! I'm interested in your construction services. Can we discuss my project?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3.5 rounded-xl text-base font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-[#25D366]/30 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a
              href="tel:+917008039858"
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-accent text-gray-600 hover:text-accent bg-white px-8 py-3.5 rounded-xl text-base font-semibold tracking-wide transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
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
