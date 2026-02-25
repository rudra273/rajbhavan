import Link from "next/link";

export const metadata = {
    title: "Contact Us | Raj Bhavan Construction",
    description:
        "Get in touch with Raj Bhavan Construction. Call us, WhatsApp us, or visit our office.",
};

export default function ContactPage() {
    const phoneNumber = "+91 98765 43210"; // Replace with actual
    const whatsappNumber = "919876543210"; // Replace with actual (no +)
    const whatsappMessage = encodeURIComponent(
        "Hi! I'm interested in your construction services. Can we discuss my project?"
    );

    return (
        <div className="pt-20 md:pt-24">
            {/* Page Header */}
            <section className="bg-navy text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">
                        Get In Touch
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Have a project in mind? We&apos;d love to hear from you. Reach out
                        via phone or WhatsApp and let&apos;s get started.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-gray-100">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* Left - Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-navy font-[family-name:var(--font-heading)] mb-4">
                                    Let&apos;s Talk
                                </h2>
                                <p className="text-gray-500 leading-relaxed">
                                    Whether you&apos;re planning a new home, renovating your
                                    space, or need a commercial build — our team is ready to help
                                    bring your vision to life.
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                                    <svg
                                        className="w-6 h-6 text-accent"
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
                                </div>
                                <div>
                                    <h3 className="text-navy font-semibold mb-1">Phone</h3>
                                    <a
                                        href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                                        className="text-gray-500 hover:text-accent transition-colors duration-200"
                                    >
                                        {phoneNumber}
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                                    <svg
                                        className="w-6 h-6 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-navy font-semibold mb-1">Email</h3>
                                    <a
                                        href="mailto:info@rajbhavan.com"
                                        className="text-gray-500 hover:text-accent transition-colors duration-200"
                                    >
                                        info@rajbhavan.com
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                                    <svg
                                        className="w-6 h-6 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-navy font-semibold mb-1">Office</h3>
                                    <p className="text-gray-500">
                                        Bhubaneswar, Odisha, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right - WhatsApp CTA + Call CTA */}
                        <div className="flex flex-col gap-5">
                            {/* WhatsApp Card */}
                            <Link
                                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#25D366]/40 shadow-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-[#25D366]/10 rounded-xl flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors duration-200">
                                        <svg
                                            className="w-8 h-8 text-[#25D366]"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-navy text-lg font-bold font-[family-name:var(--font-heading)]">
                                            WhatsApp Us
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Quick response, usually within minutes
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-[#25D366] text-white text-center py-3 rounded-lg font-semibold group-hover:bg-[#1ebe5d] transition-colors duration-200">
                                    Start WhatsApp Chat →
                                </div>
                            </Link>

                            {/* Call Card */}
                            <a
                                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-accent/40 shadow-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                                        <svg
                                            className="w-8 h-8 text-accent"
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
                                    </div>
                                    <div>
                                        <h3 className="text-navy text-lg font-bold font-[family-name:var(--font-heading)]">
                                            Call Us
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Available Mon-Sat, 9am — 7pm
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-accent text-white text-center py-3 rounded-lg font-semibold group-hover:bg-accent-dark transition-colors duration-200">
                                    Call {phoneNumber} →
                                </div>
                            </a>

                            {/* Business hours */}
                            <div className="bg-cream rounded-xl p-5 border border-gray-200/60">
                                <h4 className="text-navy font-semibold text-sm mb-3 font-[family-name:var(--font-heading)]">
                                    🕐 Business Hours
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Monday — Saturday</span>
                                        <span className="text-navy font-medium">9:00 AM — 7:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Sunday</span>
                                        <span className="text-navy font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
