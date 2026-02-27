"use client";

import { useState } from "react";

const DATA_TYPES = [
    {
        type: "projects",
        label: "Projects",
        icon: "🏗️",
        desc: "Gallery & featured projects",
        color: "from-blue-500 to-indigo-600",
    },
    {
        type: "reviews",
        label: "Reviews",
        icon: "⭐",
        desc: "Customer testimonials",
        color: "from-amber-500 to-orange-600",
    },
    {
        type: "packages",
        label: "Packages",
        icon: "📦",
        desc: "Pricing & package details",
        color: "from-emerald-500 to-teal-600",
    },
    {
        type: "all",
        label: "All Data",
        icon: "🔄",
        desc: "Refresh everything at once",
        color: "from-purple-500 to-violet-600",
    },
];

export default function AdminPage() {
    const [secret, setSecret] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState({});
    const [results, setResults] = useState({});

    const handleLogin = (e) => {
        e.preventDefault();
        if (secret.trim()) {
            setAuthenticated(true);
        }
    };

    const handleRefresh = async (type) => {
        setLoading((prev) => ({ ...prev, [type]: true }));
        setResults((prev) => ({ ...prev, [type]: null }));

        try {
            const res = await fetch("/api/admin/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${secret}`,
                },
                body: JSON.stringify({ type }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Refresh failed");
            }

            setResults((prev) => ({
                ...prev,
                [type]: { success: true, message: data.message, time: data.refreshedAt },
            }));
        } catch (err) {
            setResults((prev) => ({
                ...prev,
                [type]: { success: false, message: err.message },
            }));
        } finally {
            setLoading((prev) => ({ ...prev, [type]: false }));
        }
    };

    // ── Login Screen ────────────────────────────────────────
    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔐</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                            Admin Panel
                        </h1>
                        <p className="text-gray-400 text-sm mt-2">
                            Enter your admin secret to continue
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Admin Secret
                        </label>
                        <input
                            type="password"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            placeholder="Enter secret key…"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 mb-6"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent/25"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ── Admin Dashboard ─────────────────────────────────────
    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-28 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)] mb-3">
                        Data Management
                    </h1>
                    <p className="text-gray-400 max-w-lg mx-auto">
                        Refresh your site data from Google Sheets. Click a button below to
                        pull the latest data.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {DATA_TYPES.map((item) => {
                        const isLoading = loading[item.type];
                        const result = results[item.type];

                        return (
                            <div
                                key={item.type}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-200"
                            >
                                {/* Icon + Info */}
                                <div className="flex items-start gap-4 mb-5">
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shrink-0`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">
                                            {item.label}
                                        </h3>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>

                                {/* Refresh Button */}
                                <button
                                    onClick={() => handleRefresh(item.type)}
                                    disabled={isLoading}
                                    className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${isLoading
                                            ? "bg-white/10 text-gray-400 cursor-not-allowed"
                                            : "bg-accent hover:bg-accent-dark text-white hover:shadow-lg hover:shadow-accent/25"
                                        }`}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                            Refreshing…
                                        </span>
                                    ) : (
                                        `Refresh ${item.label}`
                                    )}
                                </button>

                                {/* Result Toast */}
                                {result && (
                                    <div
                                        className={`mt-3 px-4 py-2.5 rounded-lg text-sm ${result.success
                                                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                                                : "bg-red-500/10 border border-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {result.success ? "✅ " : "❌ "}
                                        {result.message}
                                        {result.time && (
                                            <span className="block text-xs text-gray-500 mt-1">
                                                {new Date(result.time).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Info note */}
                <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                    <p className="text-gray-400 text-sm">
                        💡 Data is also automatically refreshed every time you deploy (during <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-accent">npm run build</code>).
                    </p>
                </div>
            </div>
        </div>
    );
}
