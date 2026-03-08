"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const DATA_TYPES = [
    {
        type: "projects", label: "Projects",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v12" /></svg>
    },
    {
        type: "reviews", label: "Reviews",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    },
    {
        type: "packages", label: "Packages",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
    },
    {
        type: "all", label: "All Data",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
    },
];

const FIELD = ({ label, children }) => (
    <div>
        <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "6px" }}>
            {label}
        </label>
        {children}
    </div>
);

const INPUT_STYLE = {
    width: "100%",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "9px 12px",
    fontSize: "13px",
    color: "#0f172a",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
};

const SELECT_STYLE = {
    ...INPUT_STYLE,
    cursor: "pointer",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "32px",
};

export default function ManagePage() {
    const [secret, setSecret] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState({});
    const [results, setResults] = useState({});
    const [projects, setProjects] = useState([]);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "", cloudinary_url: "", category: "", is_featured: false,
        location: "", total_area: "", floors: "", price: "", package: "", duration: "",
        gallery_images: []
    });
    const [isSaving, setIsSaving] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        if (secret.trim()) { setAuthenticated(true); fetchProjects(secret); }
    };

    const handleRefresh = async (type) => {
        setLoading((prev) => ({ ...prev, [type]: true }));
        setResults((prev) => ({ ...prev, [type]: null }));
        try {
            const res = await fetch("/api/admin/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
                body: JSON.stringify({ type }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Refresh failed");
            setResults((prev) => ({ ...prev, [type]: { success: true, message: data.message } }));
            if (type === "projects" || type === "all") fetchProjects(secret);
        } catch (err) {
            setResults((prev) => ({ ...prev, [type]: { success: false, message: err.message } }));
        } finally {
            setLoading((prev) => ({ ...prev, [type]: false }));
            setTimeout(() => setResults((prev) => ({ ...prev, [type]: null })), 4000);
        }
    };

    const fetchProjects = async (token) => {
        setProjectsLoading(true);
        try {
            const res = await fetch("/api/admin/projects", { headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) { const data = await res.json(); setProjects(data.data || []); }
        } catch (error) { console.error("Failed to load projects", error); }
        finally { setProjectsLoading(false); }
    };

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title, cloudinary_url: project.cloudinary_url, category: project.category,
                is_featured: project.is_featured === true || project.is_featured === "true" || project.is_featured === "TRUE",
                location: project.location || "", total_area: project.total_area || "", floors: project.floors || "",
                price: project.price || "", package: project.package || "", duration: project.duration || "",
                gallery_images: Array.isArray(project.gallery_images)
                    ? project.gallery_images
                    : (project.gallery_images ? project.gallery_images.split(",").map(s => s.trim()).filter(Boolean) : [])
            });
        } else {
            setEditingProject(null);
            setFormData({ title: "", cloudinary_url: "", category: "", is_featured: false, location: "", total_area: "", floors: "", price: "", package: "", duration: "", gallery_images: [] });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.cloudinary_url) { alert("Title and Image are required!"); return; }
        setIsSaving(true);
        const method = editingProject ? "PUT" : "POST";
        const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
        try {
            const res = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` }, body: JSON.stringify(formData) });
            if (res.ok) { await fetchProjects(secret); setIsModalOpen(false); }
            else { const error = await res.json(); alert(error.error || "Failed to save project"); }
        } catch (error) { alert("Error saving project"); }
        finally { setIsSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this project?")) return;
        try {
            const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${secret}` } });
            if (res.ok) await fetchProjects(secret);
            else alert("Failed to delete project");
        } catch (error) { console.error(error); }
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({ ...prev, gallery_images: prev.gallery_images.filter((_, i) => i !== index) }));
    };

    const fd = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

    // ── Login ────────────────────────────────────────────────
    if (!authenticated) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
                    * { box-sizing: border-box; }
                    input:focus { border-color: #0f172a !important; box-shadow: 0 0 0 3px rgba(15,23,42,0.08) !important; }
                    button:active { transform: translateY(1px); }
                `}</style>
                <div style={{ width: "100%", maxWidth: "400px", padding: "0 20px" }}>
                    <div style={{ marginBottom: "32px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0f172a", color: "white", padding: "7px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", marginBottom: "24px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            ADMIN
                        </div>
                        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "36px", fontWeight: 400, color: "#0f172a", margin: 0, lineHeight: 1.1 }}>
                            Workspace
                        </h1>
                        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "8px", margin: "8px 0 0" }}>
                            Enter your credentials to access the admin panel.
                        </p>
                    </div>
                    <form onSubmit={handleLogin} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                        <FIELD label="Admin Secret">
                            <input
                                type="password"
                                value={secret}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Enter your secret key"
                                style={{ ...INPUT_STYLE, marginBottom: "20px" }}
                                autoFocus
                            />
                        </FIELD>
                        <button type="submit" style={{ width: "100%", background: "#0f172a", color: "white", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em", transition: "background 0.15s" }}
                            onMouseOver={e => e.currentTarget.style.background = "#1e293b"}
                            onMouseOut={e => e.currentTarget.style.background = "#0f172a"}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // ── Dashboard ────────────────────────────────────────────
    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", paddingTop: "120px", paddingBottom: "60px" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
                * { box-sizing: border-box; }
                .sync-btn:hover { background: #0f172a !important; color: white !important; }
                .row-hover:hover { background: #f8fafc !important; }
                .action-btn:hover { opacity: 1 !important; }
                .modal-input:focus { border-color: #0f172a !important; box-shadow: 0 0 0 3px rgba(15,23,42,0.07) !important; }
                @keyframes fadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
                @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
                @keyframes spin { to { transform:rotate(360deg); } }
                .animate-in { animation: fadeIn 0.2s ease forwards; }
                .modal-in { animation: slideUp 0.22s ease forwards; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                input[type=checkbox] { accent-color: #0f172a; width:15px; height:15px; cursor:pointer; }
                @media (max-width: 768px) {
                    .sync-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .modal-grid-2 { grid-template-columns: 1fr !important; }
                    .modal-grid-3 { grid-template-columns: 1fr !important; }
                    .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; }
                    .header-flex { flex-direction: column; align-items: flex-start !important; gap: 16px; }
                    .table-wrapper { display: none !important; }
                    .mobile-cards { display: grid !important; grid-template-columns: 1fr; gap: 16px; }
                    .content-padding { padding: 0 16px !important; }
                }
                @media (min-width: 769px) {
                    .mobile-cards { display: none !important; }
                }
                @media (max-width: 480px) {
                    .sync-grid { grid-template-columns: 1fr !important; }
                    .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>

            <div className="content-padding" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

                {/* Header */}
                <div className="header-flex" style={{ marginBottom: "40px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 6px" }}>Admin Panel</p>
                        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "32px", fontWeight: 400, color: "#0f172a", margin: 0, lineHeight: 1 }}>
                            Content Manager
                        </h1>
                    </div>
                    <button
                        onClick={() => { setAuthenticated(false); setSecret(""); setProjects([]); }}
                        style={{ fontSize: "12px", color: "#94a3b8", background: "none", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "7px 14px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                        onMouseOver={e => { e.currentTarget.style.color = "#0f172a"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
                        onMouseOut={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                    >
                        Sign out
                    </button>
                </div>

                {/* Sync Bar */}
                <div style={{ marginBottom: "40px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 14px" }}>Data Sync</p>
                    <div className="sync-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                        {DATA_TYPES.map((item) => {
                            const isLoading = loading[item.type];
                            const result = results[item.type];
                            return (
                                <div key={item.type} style={{ position: "relative", background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <span style={{ color: "#64748b" }}>{item.icon}</span>
                                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{item.label}</span>
                                    </div>
                                    <button
                                        className="sync-btn"
                                        onClick={() => handleRefresh(item.type)}
                                        disabled={isLoading}
                                        style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.04em", color: isLoading ? "#94a3b8" : "#0f172a", background: isLoading ? "#f1f5f9" : "#f1f5f9", border: "none", borderRadius: "7px", padding: "6px 12px", cursor: isLoading ? "not-allowed" : "pointer", transition: "all 0.15s", fontFamily: "inherit" }}
                                    >
                                        {isLoading ? (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                                <span style={{ width: "10px", height: "10px", border: "2px solid #cbd5e1", borderTopColor: "#64748b", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                                                Syncing
                                            </span>
                                        ) : "Sync"}
                                    </button>
                                    {result && (
                                        <div className="animate-in" style={{ position: "absolute", bottom: "calc(100% + 8px)", right: 0, background: result.success ? "#0f172a" : "#ef4444", color: "white", fontSize: "11px", fontWeight: 500, padding: "6px 12px", borderRadius: "8px", whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 10 }}>
                                            {result.message}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Projects Section */}
                <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden" }}>
                    {/* Section Header */}
                    <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 3px" }}>
                                Projects — {projectsLoading ? "..." : projects.length} total
                            </p>
                            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#0f172a", margin: 0 }}>
                                Project Library
                            </h2>
                        </div>
                        <button
                            onClick={() => handleOpenModal()}
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#0f172a", color: "white", border: "none", borderRadius: "10px", padding: "10px 18px", fontSize: "13px", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em", fontFamily: "inherit", transition: "background 0.15s" }}
                            onMouseOver={e => e.currentTarget.style.background = "#1e293b"}
                            onMouseOut={e => e.currentTarget.style.background = "#0f172a"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            New Project
                        </button>
                    </div>

                    {/* Projects Table */}
                    {projectsLoading ? (
                        <div style={{ padding: "60px 24px", textAlign: "center", color: "#94a3b8", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                            <span style={{ width: "20px", height: "20px", border: "2px solid #e2e8f0", borderTopColor: "#94a3b8", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                            <span style={{ fontSize: "13px" }}>Loading projects...</span>
                        </div>
                    ) : projects.length === 0 ? (
                        <div style={{ padding: "60px 24px", textAlign: "center", color: "#94a3b8", borderTop: "1px dashed #e2e8f0" }}>
                            <p style={{ fontSize: "14px", margin: 0 }}>No projects yet. Add your first one.</p>
                        </div>
                    ) : (
                        <>
                            <div className="table-wrapper">
                                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
                                    <thead>
                                        <tr style={{ background: "#f8fafc" }}>
                                            {["Project", "Category", "Location", "Package", "Status", ""].map((h, i) => (
                                                <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap" }}>
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project, idx) => (
                                            <tr key={project.id} className="row-hover" style={{ borderBottom: idx < projects.length - 1 ? "1px solid #f1f5f9" : "none", transition: "background 0.1s" }}>
                                                <td style={{ padding: "14px 16px" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                                        <div style={{ width: "44px", height: "44px", borderRadius: "8px", overflow: "hidden", background: "#f1f5f9", flexShrink: 0, position: "relative" }}>
                                                            {project.cloudinary_url ? (
                                                                <CldImage src={project.cloudinary_url} alt={project.title} fill style={{ objectFit: "cover" }} />
                                                            ) : (
                                                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>{project.title}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: "14px 16px" }}>
                                                    <span style={{ fontSize: "12px", color: "#475569", background: "#f1f5f9", padding: "3px 10px", borderRadius: "100px", fontWeight: 500 }}>
                                                        {project.category || "—"}
                                                    </span>
                                                </td>
                                                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{project.location || "—"}</td>
                                                <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{project.package || "—"}</td>
                                                <td style={{ padding: "14px 16px" }}>
                                                    {(project.is_featured === true || project.is_featured === "true" || project.is_featured === "TRUE") && (
                                                        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#b45309", background: "#fef3c7", padding: "3px 10px", borderRadius: "100px" }}>
                                                            Featured
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ padding: "14px 16px", textAlign: "right" }}>
                                                    <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                                                        <button
                                                            className="action-btn"
                                                            onClick={() => handleOpenModal(project)}
                                                            style={{ fontSize: "12px", fontWeight: 600, color: "#475569", background: "none", border: "1px solid #e2e8f0", borderRadius: "7px", padding: "6px 14px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", opacity: 0.8 }}
                                                            onMouseOver={e => { e.currentTarget.style.borderColor = "#0f172a"; e.currentTarget.style.color = "#0f172a"; }}
                                                            onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="action-btn"
                                                            onClick={() => handleDelete(project.id)}
                                                            style={{ fontSize: "12px", fontWeight: 600, color: "#ef4444", background: "none", border: "1px solid #fecaca", borderRadius: "7px", padding: "6px 14px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", opacity: 0.8 }}
                                                            onMouseOver={e => { e.currentTarget.style.background = "#fef2f2"; }}
                                                            onMouseOut={e => { e.currentTarget.style.background = "none"; }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards View */}
                            <div className="mobile-cards">
                                {projects.map((project, idx) => (
                                    <div key={project.id} style={{ borderBottom: idx < projects.length - 1 ? "1px solid #e2e8f0" : "none", padding: "12px 10px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                                            <div style={{ display: "flex", gap: "12px" }}>
                                                <div style={{ width: "48px", height: "48px", borderRadius: "8px", overflow: "hidden", background: "#e2e8f0", flexShrink: 0, position: "relative" }}>
                                                    {project.cloudinary_url ? (
                                                        <CldImage src={project.cloudinary_url} alt={project.title} fill style={{ objectFit: "cover" }} />
                                                    ) : (
                                                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: "0 0 4px", fontSize: "14px", color: "#0f172a" }}>{project.title}</h3>
                                                    <span style={{ fontSize: "11px", color: "#475569", background: "#f1f5f9", padding: "3px 8px", borderRadius: "100px", border: "1px solid #e2e8f0" }}>
                                                        {project.category || "No Category"}
                                                    </span>
                                                </div>
                                            </div>
                                            {(project.is_featured === true || project.is_featured === "true" || project.is_featured === "TRUE") && (
                                                <span style={{ color: "#b45309", fontSize: "16px", background: "#fef3c7", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>★</span>
                                            )}
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px", fontSize: "12px", color: "#64748b" }}>
                                            <div><strong>Loc:</strong> {project.location || "—"}</div>
                                            <div><strong>Pkg:</strong> {project.package || "—"}</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button type="button" className="action-btn" onClick={() => handleOpenModal(project)} style={{ flex: 1, fontSize: "12px", fontWeight: 600, color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px", cursor: "pointer", transition: "0.15s" }}>Edit</button>
                                            <button type="button" className="action-btn" onClick={() => handleDelete(project.id)} style={{ flex: 1, fontSize: "12px", fontWeight: 600, color: "#ef4444", background: "white", border: "1px solid #fecaca", borderRadius: "6px", padding: "8px", cursor: "pointer", transition: "0.15s" }}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── Modal ── */}
            {
                isModalOpen && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)", padding: "16px" }}>
                        <div className="modal-in" style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "680px", maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.16)", overflow: "hidden" }}>

                            {/* Modal Header */}
                            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 2px" }}>
                                        {editingProject ? "Editing" : "New Entry"}
                                    </p>
                                    <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "22px", fontWeight: 400, color: "#0f172a", margin: 0 }}>
                                        {editingProject ? editingProject.title : "Add Project"}
                                    </h2>
                                </div>
                                <button type="button" aria-label="Close" onClick={() => setIsModalOpen(false)} style={{ width: "40px", height: "40px", background: "#f1f5f9", border: "none", borderRadius: "8px", cursor: "pointer", color: "#475569", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s", zIndex: 10 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                                <form id="project-form" onSubmit={handleSubmit}>
                                    <div style={{ display: "grid", gap: "20px" }}>

                                        {/* Title + Category + Image row */}
                                        <FIELD label="Project Title *">
                                            <input type="text" required value={formData.title} onChange={e => fd("title", e.target.value)} className="modal-input" style={{ ...INPUT_STYLE }} placeholder="e.g. Whitefield Residence" />
                                        </FIELD>

                                        <div className="modal-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                            <FIELD label="Category">
                                                <select value={formData.category} onChange={e => fd("category", e.target.value)} className="modal-input" style={SELECT_STYLE}>
                                                    <option value="" disabled>Select category</option>
                                                    <option value="Residential">Residential</option>
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Industrial">Industrial</option>
                                                    <option value="Interior Design">Interior Design</option>
                                                    <option value="Renovation">Renovation</option>
                                                </select>
                                            </FIELD>

                                            <FIELD label="Main Image *">
                                                <CldUploadWidget
                                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cloudi"}
                                                    onSuccess={(result) => { if (result?.info?.public_id) fd("cloudinary_url", result.info.public_id); }}
                                                >
                                                    {({ open }) => (
                                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <button type="button" onClick={() => open()} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", fontWeight: 500, color: "#475569", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                                                                onMouseOver={e => e.currentTarget.style.borderColor = "#0f172a"}
                                                                onMouseOut={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                                                            >
                                                                Upload image
                                                            </button>
                                                            {formData.cloudinary_url && (
                                                                <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#16a34a", fontWeight: 500 }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                                    Uploaded
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </CldUploadWidget>
                                            </FIELD>
                                        </div>

                                        {/* Divider */}
                                        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                                            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 16px" }}>Project Details</p>
                                            <div className="modal-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
                                                {[
                                                    { label: "Location", key: "location", placeholder: "e.g. Old Airport" },
                                                    { label: "Total Area", key: "total_area", placeholder: "e.g. 5,730 sqft" },
                                                    { label: "Floors", key: "floors", placeholder: "e.g. G+4" },
                                                    { label: "Price", key: "price", placeholder: "e.g. ₹1.01 Cr" },
                                                    { label: "Duration", key: "duration", placeholder: "e.g. 12 Months" },
                                                ].map(({ label, key, placeholder }) => (
                                                    <FIELD key={key} label={label}>
                                                        <input type="text" value={formData[key]} onChange={e => fd(key, e.target.value)} className="modal-input" style={{ ...INPUT_STYLE, fontSize: "13px" }} placeholder={placeholder} />
                                                    </FIELD>
                                                ))}
                                                <FIELD label="Package">
                                                    <select value={formData.package} onChange={e => fd("package", e.target.value)} className="modal-input" style={{ ...SELECT_STYLE, fontSize: "13px" }}>
                                                        <option value="">Select</option>
                                                        <option value="Essential">Essential</option>
                                                        <option value="Standard">Standard</option>
                                                        <option value="Premium">Premium</option>
                                                        <option value="Luxury">Luxury</option>
                                                    </select>
                                                </FIELD>
                                            </div>
                                        </div>

                                        {/* Featured toggle */}
                                        <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", cursor: "pointer" }}>
                                            <input type="checkbox" id="is_featured" checked={formData.is_featured} onChange={e => fd("is_featured", e.target.checked)} />
                                            <div>
                                                <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", margin: 0 }}>Featured Project</p>
                                                <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0" }}>Highlighted across the site</p>
                                            </div>
                                        </label>

                                        {/* Gallery */}
                                        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                                                <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: 0 }}>Gallery Images</p>
                                                <CldUploadWidget
                                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cloudi"}
                                                    onSuccess={(result) => { if (result?.info?.public_id) setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, result.info.public_id] })); }}
                                                >
                                                    {({ open }) => (
                                                        <button type="button" onClick={() => open()} style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", background: "none", border: "1px solid #e2e8f0", borderRadius: "7px", padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.15s" }}
                                                            onMouseOver={e => e.currentTarget.style.borderColor = "#0f172a"}
                                                            onMouseOut={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                                                        >
                                                            + Add images
                                                        </button>
                                                    )}
                                                </CldUploadWidget>
                                            </div>

                                            {formData.gallery_images.length > 0 ? (
                                                <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
                                                    {formData.gallery_images.map((imgId, index) => (
                                                        <div key={index} style={{ position: "relative", borderRadius: "8px", overflow: "hidden", background: "#f1f5f9", aspectRatio: "1", border: "1px solid #e2e8f0" }}>
                                                            <CldImage src={imgId} alt="Gallery" fill style={{ objectFit: "cover" }} />
                                                            <button type="button" onClick={() => removeGalleryImage(index)} style={{ position: "absolute", top: "4px", right: "4px", width: "18px", height: "18px", background: "rgba(15,23,42,0.75)", border: "none", borderRadius: "50%", color: "white", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{ border: "1px dashed #e2e8f0", borderRadius: "10px", padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
                                                    No gallery images added
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Modal Footer */}
                            <div style={{ padding: "16px 24px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: "10px", background: "#fafafa" }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ fontSize: "13px", fontWeight: 500, color: "#64748b", background: "none", border: "1px solid #e2e8f0", borderRadius: "9px", padding: "9px 20px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                                    onMouseOver={e => e.currentTarget.style.color = "#0f172a"}
                                    onMouseOut={e => e.currentTarget.style.color = "#64748b"}
                                >
                                    Cancel
                                </button>
                                <button type="submit" form="project-form" disabled={isSaving} style={{ fontSize: "13px", fontWeight: 700, color: "white", background: isSaving ? "#94a3b8" : "#0f172a", border: "none", borderRadius: "9px", padding: "9px 24px", cursor: isSaving ? "not-allowed" : "pointer", fontFamily: "inherit", letterSpacing: "0.02em", transition: "background 0.15s" }}
                                    onMouseOver={e => { if (!isSaving) e.currentTarget.style.background = "#1e293b"; }}
                                    onMouseOut={e => { if (!isSaving) e.currentTarget.style.background = "#0f172a"; }}
                                >
                                    {isSaving ? "Saving..." : "Save Project"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}