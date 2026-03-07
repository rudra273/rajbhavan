"use client";

export default function ReviewCard({ name, review_text, date }) {
    const initial = name?.charAt(0)?.toUpperCase() || "?";

    return (
        <div style={{
            background: "white",
            border: "1px solid #e2e8f0",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            transition: "box-shadow 0.2s ease",
            fontFamily: "'DM Sans', sans-serif",
        }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.07)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "none"}
        >
            {/* Quote mark */}
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none" style={{ opacity: 0.12, flexShrink: 0 }}>
                <path d="M0 20V12.667C0 5.778 3.556 1.556 10.667 0L12 2.444C8.667 3.333 6.778 5.333 6.222 8.444H11.556V20H0ZM16.444 20V12.667C16.444 5.778 20 1.556 27.111 0L28.444 2.444C25.111 3.333 23.222 5.333 22.667 8.444H28V20H16.444Z" fill="#0a0f1a" />
            </svg>

            {/* Review text */}
            <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "17px",
                fontWeight: 400,
                color: "#1e293b",
                lineHeight: 1.65,
                margin: 0,
                flex: 1,
                letterSpacing: "0.01em",
            }}>
                {review_text}
            </p>

            {/* Author row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                        width: "34px", height: "34px",
                        background: "#0a0f1a",
                        color: "white",
                        borderRadius: "2px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", fontWeight: 700,
                        flexShrink: 0,
                        letterSpacing: "0.04em",
                        fontFamily: "'DM Sans', sans-serif",
                    }}>
                        {initial}
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#0a0f1a", margin: 0, lineHeight: 1.2 }}>{name}</p>
                        {date && <p style={{ fontSize: "11px", color: "#94a3b8", margin: "3px 0 0", fontWeight: 400 }}>{date}</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}