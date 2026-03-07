"use client";

import { useState } from "react";

const PHONE_NUMBER = "+917008039858";
const PHONE_DISPLAY = "+91 70080 39858";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        plotLocation: "",
        plotSize: "",
    });

    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
            newErrors.mobile = "Enter a valid 10-digit mobile number";
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
        if (submitStatus) setSubmitStatus(null);
    };

    const handleFocus = (name) => setFocused((prev) => ({ ...prev, [name]: true }));
    const handleBlur = (name) => setFocused((prev) => ({ ...prev, [name]: false }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        setSubmitStatus(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.status === 409) {
                setSubmitStatus("duplicate");
                return;
            }

            if (!res.ok) throw new Error(data.error || "Submission failed");

            setSubmitStatus("success");
            setFormData({ name: "", mobile: "", email: "", plotLocation: "", plotSize: "" });
            setErrors({});
        } catch (err) {
            console.error("Submit error:", err);
            setSubmitStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    const isActive = (name) => focused[name] || formData[name];

    return (
        <>
            <style>{`
                .cf-field { position: relative; margin-bottom: 28px; }
                .cf-input {
                    width: 100%;
                    padding: 10px 0 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #0a0f1a;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid #d1d5db;
                    outline: none;
                    transition: border-color 0.2s;
                    box-sizing: border-box;
                }
                .cf-input:disabled { opacity: 0.5; cursor: not-allowed; }
                .cf-input--focused { border-bottom-color: #0a0f1a; }
                .cf-input--error { border-bottom-color: #e07b39; }
                .cf-label {
                    position: absolute;
                    left: 0;
                    font-family: 'DM Sans', sans-serif;
                    color: #94a3b8;
                    pointer-events: none;
                    transition: all 0.2s;
                    top: 10px;
                    font-size: 13px;
                }
                .cf-label--active {
                    top: -10px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: #0a0f1a;
                }
                .cf-label--focused { color: #e07b39; }
                .cf-error {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: #e07b39;
                    margin-top: 4px;
                }
                .cf-required { color: #e07b39; }
                .cf-prefix-wrap {
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #d1d5db;
                    transition: border-color 0.2s;
                }
                .cf-prefix {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #94a3b8;
                    padding: 10px 8px 8px 0;
                    transition: color 0.2s;
                    white-space: nowrap;
                    flex-shrink: 0;
                }
                .cf-prefix--focused { color: #0a0f1a; }
                .cf-prefix-input {
                    flex: 1;
                    padding: 10px 0 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #0a0f1a;
                    background: transparent;
                    border: none;
                    outline: none;
                }
                .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }
                .cf-submit {
                    width: 100%;
                    margin-top: 8px;
                    padding: 13px 24px;
                    background: #0a0f1a;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    border: none;
                    cursor: pointer;
                    transition: background 0.15s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .cf-submit:hover:not(:disabled) { background: #1e293b; }
                .cf-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .cf-alert {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    padding: 12px 14px;
                    margin-bottom: 24px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    line-height: 1.5;
                    border-left: 2px solid;
                }
                .cf-alert--success { background: #f0fdf4; border-color: #16a34a; color: #15803d; }
                .cf-alert--duplicate { background: #fffbeb; border-color: #e07b39; color: #92400e; }
                .cf-alert--error { background: #fff7ed; border-color: #e07b39; color: #9a3412; }
                .cf-alert a { color: inherit; font-weight: 700; }
                .cf-spinner { animation: cf-spin 0.8s linear infinite; }
                @keyframes cf-spin { to { transform: rotate(360deg); } }
                @media (max-width: 480px) {
                    .cf-grid { grid-template-columns: 1fr; gap: 0; }
                }
            `}</style>

            <form onSubmit={handleSubmit} noValidate>

                {/* Status messages */}
                {submitStatus === "success" && (
                    <div className="cf-alert cf-alert--success">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: 1 }}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Thank you — we&apos;ll get back to you shortly.</span>
                    </div>
                )}
                {submitStatus === "duplicate" && (
                    <div className="cf-alert cf-alert--duplicate">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: 1 }}>
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Already submitted. Please call us at <a href={`tel:${PHONE_NUMBER}`}>{PHONE_DISPLAY}</a>.</span>
                    </div>
                )}
                {submitStatus === "error" && (
                    <div className="cf-alert cf-alert--error">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: 1 }}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        <span>Something went wrong. Please try again.</span>
                    </div>
                )}

                {/* Name */}
                <div className="cf-field">
                    <label
                        htmlFor="name"
                        className={`cf-label ${isActive("name") ? "cf-label--active" : ""} ${focused.name && isActive("name") ? "cf-label--focused" : ""}`}
                    >
                        Full Name <span className="cf-required">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={() => handleBlur("name")}
                        disabled={submitting}
                        className={`cf-input ${errors.name ? "cf-input--error" : focused.name ? "cf-input--focused" : ""}`}
                        placeholder=" "
                        autoComplete="name"
                    />
                    {errors.name && <p className="cf-error">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div className="cf-field">
                    <label
                        htmlFor="mobile"
                        className={`cf-label ${isActive("mobile") ? "cf-label--active" : ""} ${focused.mobile && isActive("mobile") ? "cf-label--focused" : ""}`}
                        style={!isActive("mobile") ? { paddingLeft: "30px" } : {}}
                    >
                        Mobile Number <span className="cf-required">*</span>
                    </label>
                    <div
                        className="cf-prefix-wrap"
                        style={{ borderColor: errors.mobile ? "#e07b39" : focused.mobile ? "#0a0f1a" : "#d1d5db" }}
                    >
                        <span className={`cf-prefix ${focused.mobile ? "cf-prefix--focused" : ""}`}>+91</span>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            onFocus={() => handleFocus("mobile")}
                            onBlur={() => handleBlur("mobile")}
                            maxLength={10}
                            disabled={submitting}
                            className="cf-prefix-input"
                            placeholder=" "
                            autoComplete="tel"
                        />
                    </div>
                    {errors.mobile && <p className="cf-error">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div className="cf-field">
                    <label
                        htmlFor="email"
                        className={`cf-label ${isActive("email") ? "cf-label--active" : ""} ${focused.email && isActive("email") ? "cf-label--focused" : ""}`}
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        disabled={submitting}
                        className={`cf-input ${focused.email ? "cf-input--focused" : ""}`}
                        placeholder=" "
                        autoComplete="email"
                    />
                </div>

                {/* Plot Location + Size */}
                <div className="cf-grid">
                    <div className="cf-field">
                        <label
                            htmlFor="plotLocation"
                            className={`cf-label ${isActive("plotLocation") ? "cf-label--active" : ""} ${focused.plotLocation && isActive("plotLocation") ? "cf-label--focused" : ""}`}
                        >
                            Plot Location
                        </label>
                        <input
                            type="text"
                            id="plotLocation"
                            name="plotLocation"
                            value={formData.plotLocation}
                            onChange={handleChange}
                            onFocus={() => handleFocus("plotLocation")}
                            onBlur={() => handleBlur("plotLocation")}
                            disabled={submitting}
                            className={`cf-input ${focused.plotLocation ? "cf-input--focused" : ""}`}
                            placeholder=" "
                        />
                    </div>
                    <div className="cf-field">
                        <label
                            htmlFor="plotSize"
                            className={`cf-label ${isActive("plotSize") ? "cf-label--active" : ""} ${focused.plotSize && isActive("plotSize") ? "cf-label--focused" : ""}`}
                        >
                            Plot Size
                        </label>
                        <input
                            type="text"
                            id="plotSize"
                            name="plotSize"
                            value={formData.plotSize}
                            onChange={handleChange}
                            onFocus={() => handleFocus("plotSize")}
                            onBlur={() => handleBlur("plotSize")}
                            disabled={submitting}
                            className={`cf-input ${focused.plotSize ? "cf-input--focused" : ""}`}
                            placeholder=" "
                        />
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={submitting} className="cf-submit">
                    {submitting ? (
                        <>
                            <svg className="cf-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        "SUBMIT"
                    )}
                </button>

            </form>
        </>
    );
}