"use client";

import { useState } from "react";

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
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'duplicate' | 'error' | null

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
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        // Clear status on new input
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

            if (!res.ok) {
                throw new Error(data.error || "Submission failed");
            }

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
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Success / Error Feedback */}
            {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Thank you! We&apos;ll get back to you shortly.
                </div>
            )}
            {submitStatus === "duplicate" && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    You&apos;ve already submitted the form. Please call us at <a href="tel:+917008039858" className="font-semibold underline">+91 7008039858</a>
                </div>
            )}
            {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 102 0V5zm-1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Something went wrong. Please try again.
                </div>
            )}

            {/* Name */}
            <div className="relative">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    disabled={submitting}
                    className={`peer w-full px-0 py-2 text-sm bg-transparent border-0 border-b-2 
                        ${errors.name ? "border-red-400" : focused.name ? "border-navy" : "border-gray-300"}
                        focus:outline-none focus:ring-0 transition-colors duration-300 text-charcoal
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder=" "
                />
                <label
                    htmlFor="name"
                    className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none
                        ${isActive("name") ? "-top-2.5 text-[11px] text-navy font-medium" : "top-2 text-gray-400"}`}
                >
                    Name <span className="text-red-400">*</span>
                </label>
                {errors.name && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>
                )}
            </div>

            {/* Mobile Number */}
            <div className="relative">
                <div className="flex items-center border-b-2 transition-colors duration-300"
                    style={{ borderColor: errors.mobile ? "#f87171" : focused.mobile ? "#1a1f36" : "#d1d5db" }}>
                    <span className={`text-xs pr-2 transition-colors duration-300 ${focused.mobile ? "text-navy" : "text-gray-400"}`}>
                        +91
                    </span>
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
                        className="peer w-full px-0 py-2 text-sm bg-transparent border-0 focus:outline-none focus:ring-0 text-charcoal
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder=" "
                    />
                </div>
                <label
                    htmlFor="mobile"
                    className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none
                        ${isActive("mobile") ? "-top-2.5 text-[11px] text-navy font-medium" : "top-2 text-gray-400 pl-7"}`}
                >
                    Mobile Number <span className="text-red-400">*</span>
                </label>
                {errors.mobile && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.mobile}</p>
                )}
            </div>

            {/* Email */}
            <div className="relative">
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    disabled={submitting}
                    className={`peer w-full px-0 py-2 text-sm bg-transparent border-0 border-b-2
                        ${focused.email ? "border-navy" : "border-gray-300"}
                        focus:outline-none focus:ring-0 transition-colors duration-300 text-charcoal
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    placeholder=" "
                />
                <label
                    htmlFor="email"
                    className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none
                        ${isActive("email") ? "-top-2.5 text-[11px] text-navy font-medium" : "top-2 text-gray-400"}`}
                >
                    Email
                </label>
            </div>

            {/* Plot Location & Size */}
            <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                    <input
                        type="text"
                        id="plotLocation"
                        name="plotLocation"
                        value={formData.plotLocation}
                        onChange={handleChange}
                        onFocus={() => handleFocus("plotLocation")}
                        onBlur={() => handleBlur("plotLocation")}
                        disabled={submitting}
                        className={`peer w-full px-0 py-2 text-sm bg-transparent border-0 border-b-2
                            ${focused.plotLocation ? "border-navy" : "border-gray-300"}
                            focus:outline-none focus:ring-0 transition-colors duration-300 text-charcoal
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder=" "
                    />
                    <label
                        htmlFor="plotLocation"
                        className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none
                            ${isActive("plotLocation") ? "-top-2.5 text-[11px] text-navy font-medium" : "top-2 text-gray-400"}`}
                    >
                        Plot Location
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        id="plotSize"
                        name="plotSize"
                        value={formData.plotSize}
                        onChange={handleChange}
                        onFocus={() => handleFocus("plotSize")}
                        onBlur={() => handleBlur("plotSize")}
                        disabled={submitting}
                        className={`peer w-full px-0 py-2 text-sm bg-transparent border-0 border-b-2
                            ${focused.plotSize ? "border-navy" : "border-gray-300"}
                            focus:outline-none focus:ring-0 transition-colors duration-300 text-charcoal
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        placeholder=" "
                    />
                    <label
                        htmlFor="plotSize"
                        className={`absolute left-0 text-sm transition-all duration-300 pointer-events-none
                            ${isActive("plotSize") ? "-top-2.5 text-[11px] text-navy font-medium" : "top-2 text-gray-400"}`}
                    >
                        Plot Size
                    </label>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-white py-2.5 rounded-md font-medium text-sm tracking-wide
                    hover:bg-accent-dark active:scale-[0.98] transition-all duration-200 cursor-pointer mt-2
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
                {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                    </span>
                ) : (
                    "Submit"
                )}
            </button>
        </form>
    );
}
