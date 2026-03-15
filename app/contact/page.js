import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const PHONE_NUMBER = "+917008039858";
const PHONE_DISPLAY = "+91 70080 39858";
const WHATSAPP_NUMBER = "917008039858";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'm interested in your construction services. Can we discuss my project?");
const EMAIL = "akashchandramohanty@gmail.com";
const OFFICE_ADDRESS = "Chatrapur, Odisha, India";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60497.05!2d84.612!3d19.355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d4e6b5d2b3b2d%3A0x4c6a4e17cd81f2e!2sChatrapur%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
const HOURS_SHORT = "Everyday, 9am — 7pm";

export const metadata = {
    title: "Contact Raj Bhavan Construction — Builder in Chatrapur & Berhampur",
    description:
        "Contact Raj Bhavan Construction for house building, renovation or commercial construction in Chatrapur, Berhampur & Ganjam. Call +91 70080 39858 or visit our office.",
    keywords:
        "contact builder Chatrapur, construction enquiry Berhampur, Raj Bhavan phone number, building contractor contact Ganjam, free construction quote Odisha",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Us | Raj Bhavan Construction",
        description:
            "Get in touch for house construction in Chatrapur & Berhampur. Call, WhatsApp or visit our Chatrapur office.",
    },
};

const contactDetails = [
    {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        label: "Phone",
        value: <a href={`tel:${PHONE_NUMBER}`} className="c-contact-link">{PHONE_DISPLAY}</a>,
    },
    {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        label: "Email",
        value: <a href={`mailto:${EMAIL}`} className="c-contact-link">{EMAIL}</a>,
    },
    {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        label: "Office",
        value: <span style={{ color: "#475569" }}>{OFFICE_ADDRESS}</span>,
    },
    {
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        label: "Hours",
        value: <span style={{ color: "#475569" }}>{HOURS_SHORT}</span>,
    },
];

export default function ContactPage() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
                .c-wa-btn { display: block; background: #0a0f1a; color: white; text-align: center; padding: 13px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: background 0.15s; }
                .c-wa-btn:hover { background: #1e293b; }
                .c-call-btn { display: block; background: white; color: #0a0f1a; text-align: center; padding: 12px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border: 1px solid #e2e8f0; transition: border-color 0.15s; }
                .c-call-btn:hover { border-color: #0a0f1a; }
                .c-contact-link { color: #475569; text-decoration: none; transition: color 0.15s; }
                .c-contact-link:hover { color: #0a0f1a; }
                .c-grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
                .c-form-col { padding: 52px 48px 52px 24px; border-right: 1px solid #e2e8f0; }
                .c-info-grid { gap: 64px; }
                @media (max-width: 768px) {
                    .c-grid-2 { grid-template-columns: 1fr !important; }
                    .c-form-col { padding: 40px 24px !important; border-right: none !important; border-bottom: 1px solid #e2e8f0; }
                    .c-info-grid { gap: 40px !important; }
                }
            `}</style>

            <div style={{ paddingTop: "80px", fontFamily: "'DM Sans', sans-serif" }}>

                {/* Header */}
                <section style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "56px 24px 48px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 300, color: "#0a0f1a", margin: 0, lineHeight: 1, letterSpacing: "-0.025em" }}>
                                Contact Us
                            </h1>
                            <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "360px", margin: 0, lineHeight: 1.65 }}>
                                Have a project in mind? Reach out via phone or WhatsApp and let&apos;s get started.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Form + Map */}
                <section style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "0" }}>
                    <div className="c-grid-2" style={{ maxWidth: "1200px", margin: "0 auto" }}>

                        {/* Form */}
                        <div className="c-form-col">
                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e07b39", margin: "0 0 12px" }}>
                                Get In Touch
                            </p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400, color: "#0a0f1a", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                                Get a Free Quote
                            </h2>
                            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 32px", lineHeight: 1.6 }}>
                                Fill in your details and our team will get back to you shortly.
                            </p>
                            <ContactForm />
                        </div>

                        {/* Map */}
                        <div style={{ minHeight: "480px", overflow: "hidden" }}>
                            <iframe
                                src={MAP_EMBED_URL}
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: "block", minHeight: "480px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Raj Bhavan Construction - Chatrapur, Odisha"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact info + CTAs */}
                <section style={{ background: "white", padding: "64px 24px 80px" }}>
                    <div className="c-grid-2 c-info-grid" style={{ maxWidth: "1200px", margin: "0 auto", alignItems: "start" }}>

                        {/* Left — info */}
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent, #e07b39)", margin: "0 0 14px" }}>
                                Reach Us
                            </p>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 400, color: "#0a0f1a", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                                Let&apos;s Talk
                            </h2>
                            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.75, margin: "0 0 36px", borderLeft: "2px solid #e2e8f0", paddingLeft: "16px", maxWidth: "380px" }}>
                                Whether you&apos;re planning a new home, renovating your space, or need a commercial build — our team is ready to help.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                                {contactDetails.map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: i < contactDetails.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                                        <span style={{ color: "var(--accent, #e07b39)", flexShrink: 0 }}>{item.icon}</span>
                                        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", width: "48px", flexShrink: 0 }}>{item.label}</span>
                                        <span style={{ fontSize: "13px" }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — CTAs */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                            {/* WhatsApp */}
                            <div style={{ border: "1px solid #e2e8f0", overflow: "hidden" }}>
                                <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: "14px" }}>
                                    <div style={{ width: "40px", height: "40px", background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#16a34a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#0a0f1a", margin: 0 }}>WhatsApp Us</p>
                                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>Quick response, usually within minutes</p>
                                    </div>
                                </div>
                                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="c-wa-btn">
                                    Start WhatsApp Chat
                                </a>
                            </div>

                            {/* Call */}
                            <div style={{ border: "1px solid #e2e8f0", overflow: "hidden" }}>
                                <div style={{ padding: "20px 20px 16px", display: "flex", alignItems: "center", gap: "14px" }}>
                                    <div style={{ width: "40px", height: "40px", background: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #e07b39)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.4a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#0a0f1a", margin: 0 }}>Call Us</p>
                                        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>{HOURS_SHORT}</p>
                                    </div>
                                </div>
                                <a href={`tel:${PHONE_NUMBER}`} className="c-call-btn">
                                    Call {PHONE_DISPLAY}
                                </a>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}