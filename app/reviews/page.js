import ReviewCard from "@/components/ReviewCard";
import { getReviews } from "@/lib/googleSheets";


export const metadata = {
    title: "Customer Reviews — Trusted Builder in Chatrapur & Berhampur",
    description:
        "Read real reviews from homeowners in Chatrapur, Berhampur & Ganjam who built their dream homes with Raj Bhavan Construction. 200+ happy clients.",
    keywords:
        "Raj Bhavan Construction reviews, builder reviews Chatrapur, construction feedback Berhampur, trusted contractor Ganjam, customer testimonials",
    alternates: {
        canonical: "/reviews",
    },
    openGraph: {
        title: "Customer Reviews | Raj Bhavan Construction",
        description:
            "200+ happy clients. Read what homeowners in Chatrapur & Berhampur say about Raj Bhavan Construction.",
    },
};

export default async function ReviewsPage() {
    let reviews = [];
    try {
        reviews = await getReviews();
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@400;500;600&display=swap');
            `}</style>
            <div style={{ paddingTop: "80px", fontFamily: "'DM Sans', sans-serif" }}>

                {/* Header */}
                <section style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "64px 24px 48px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 12px" }}>
                            Testimonials
                        </p>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "#0a0f1a", margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>
                                What Our Clients Say
                            </h1>
                            <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "340px", margin: 0, lineHeight: 1.6 }}>
                                Don&apos;t just take our word for it — hear from the people we&apos;ve built for.
                            </p>
                        </div>

                        {reviews.length > 0 && (
                            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 500, color: "#0a0f1a", lineHeight: 1 }}>{reviews.length}</span>
                                <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>verified reviews</span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Reviews Grid */}
                <section style={{ background: "#f8fafc", padding: "48px 24px 80px" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                        {reviews.length > 0 ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2px" }}>
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} {...review} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "80px 24px" }}>
                                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#94a3b8", fontWeight: 400, margin: 0 }}>
                                    No reviews yet.
                                </p>
                                <p style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "8px" }}>Check back soon.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}