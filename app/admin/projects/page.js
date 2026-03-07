"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

export default function AdminProjects() {
    const [secret, setSecret] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        cloudinary_url: "",
        category: "",
        is_featured: false,
        location: "",
        total_area: "",
        floors: "",
        price: "",
        package: "",
        duration: "",
        gallery_images: []
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (secret.trim()) {
            setAuthenticated(true);
            fetchProjects(secret);
        }
    };

    const fetchProjects = async (token) => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/projects", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setProjects(data.data || []);
            }
        } catch (error) {
            console.error("Failed to load projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                cloudinary_url: project.cloudinary_url,
                category: project.category,
                is_featured: project.is_featured === true || project.is_featured === "true" || project.is_featured === "TRUE",
                location: project.location || "",
                total_area: project.total_area || "",
                floors: project.floors || "",
                price: project.price || "",
                package: project.package || "",
                duration: project.duration || "",
                gallery_images: Array.isArray(project.gallery_images)
                    ? project.gallery_images
                    : (project.gallery_images ? project.gallery_images.split(",").map(s => s.trim()).filter(Boolean) : [])
            });
        } else {
            setEditingProject(null);
            setFormData({
                title: "", cloudinary_url: "", category: "", is_featured: false,
                location: "", total_area: "", floors: "", price: "", package: "", duration: "",
                gallery_images: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.cloudinary_url) {
            alert("Title and Image are required!");
            return;
        }

        setIsSaving(true);
        const method = editingProject ? "PUT" : "POST";
        const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${secret}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchProjects(secret);
                setIsModalOpen(false);
            } else {
                const error = await res.json();
                alert(error.error || "Failed to save project");
            }
        } catch (error) {
            console.error(error);
            alert("Error saving project");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${secret}` }
            });
            if (res.ok) {
                await fetchProjects(secret);
            } else {
                alert("Failed to delete project");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            gallery_images: prev.gallery_images.filter((_, i) => i !== index)
        }));
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light px-4">
                <form onSubmit={handleLogin} className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Manage Projects</h1>
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="Enter admin secret…"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white mb-6"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-semibold">
                        Continue
                    </button>
                    <a href="/admin" className="block text-center mt-4 text-gray-400 text-sm hover:text-white">Go Back</a>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-28 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
                            Projects Manager
                        </h1>
                        <p className="text-gray-400 mt-2">Add, Edit, and feature projects.</p>
                    </div>
                    <div className="space-x-4">
                        <a href="/admin" className="px-4 py-2 border border-white/10 rounded-lg text-gray-300 hover:bg-white/5">
                            Back
                        </a>
                        <button
                            onClick={() => handleOpenModal()}
                            className="bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-lg font-semibold"
                        >
                            + Add Project
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-white py-20">Loading projects...</div>
                ) : (
                    <div className="grid gap-6">
                        {projects.length === 0 && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-400">
                                No projects found. Click Add Project to get started.
                            </div>
                        )}
                        {projects.map((project) => (
                            <div key={project.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex gap-6 items-center flex-col sm:flex-row">
                                <div className="w-full sm:w-48 h-32 bg-black/20 rounded-lg overflow-hidden shrink-0 relative">
                                    {project.cloudinary_url ? (
                                        <CldImage
                                            src={project.cloudinary_url}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        {project.title}
                                        {project.is_featured && (
                                            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full border border-yellow-500/30">
                                                Featured
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                                    {project.location && (
                                        <p className="text-gray-300 text-sm mt-1">📍 {project.location}</p>
                                    )}
                                </div>
                                <div className="flex gap-2 sm:flex-col shrink-0">
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit/Create Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
                        <div className="bg-navy border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {editingProject ? "Edit Project" : "Add New Project"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white"
                                    />
                                </div>

                                {/* Main Image Upload */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Main Image *</label>
                                    <CldUploadWidget
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cloudi"}
                                        onSuccess={(result) => {
                                            if (result?.info?.public_id) {
                                                setFormData((prev) => ({ ...prev, cloudinary_url: result.info.public_id }));
                                            }
                                        }}
                                    >
                                        {({ open }) => {
                                            return (
                                                <div className="flex gap-4 items-center">
                                                    <button type="button" onClick={() => open()} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg border border-white/10 text-sm">
                                                        Upload with Cloudinary
                                                    </button>
                                                    {formData.cloudinary_url && (
                                                        <span className="text-green-400 text-sm">✅ Image uploaded</span>
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </CldUploadWidget>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-[#1b2b4d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                                    >
                                        <option value="" disabled>Select a category</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Industrial">Industrial</option>
                                        <option value="Interior Design">Interior Design</option>
                                        <option value="Renovation">Renovation</option>
                                    </select>
                                </div>

                                {/* New Detail Fields - 2 column grid */}
                                <div className="border-t border-white/10 pt-4 mt-2">
                                    <p className="text-white font-semibold mb-3">Project Details</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="e.g. Old Airport"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Total Area</label>
                                            <input
                                                type="text"
                                                value={formData.total_area}
                                                onChange={e => setFormData({ ...formData, total_area: e.target.value })}
                                                placeholder="e.g. 5,730 sqft"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Floors</label>
                                            <input
                                                type="text"
                                                value={formData.floors}
                                                onChange={e => setFormData({ ...formData, floors: e.target.value })}
                                                placeholder="e.g. G+4.5"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Price</label>
                                            <input
                                                type="text"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                placeholder="e.g. ₹1.01 Crore"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Package</label>
                                            <select
                                                value={formData.package}
                                                onChange={e => setFormData({ ...formData, package: e.target.value })}
                                                className="w-full bg-[#1b2b4d] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-accent"
                                            >
                                                <option value="">Select Package</option>
                                                <option value="Essential">Essential</option>
                                                <option value="Standard">Standard</option>
                                                <option value="Premium">Premium</option>
                                                <option value="Luxury">Luxury</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Duration</label>
                                            <input
                                                type="text"
                                                value={formData.duration}
                                                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                                placeholder="e.g. 12 Months"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Featured Checkbox */}
                                <div className="flex items-center gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={formData.is_featured}
                                        onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="w-5 h-5 rounded accent-accent"
                                    />
                                    <label htmlFor="is_featured" className="text-white">Feature this project?</label>
                                </div>

                                {/* Gallery Images */}
                                <div className="border-t border-white/10 pt-4 mt-2">
                                    <p className="text-white font-semibold mb-3">Gallery Images (optional)</p>
                                    <CldUploadWidget
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "cloudi"}
                                        onSuccess={(result) => {
                                            if (result?.info?.public_id) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    gallery_images: [...prev.gallery_images, result.info.public_id]
                                                }));
                                            }
                                        }}
                                    >
                                        {({ open }) => (
                                            <button type="button" onClick={() => open()} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg border border-white/10 text-sm">
                                                + Add Gallery Image
                                            </button>
                                        )}
                                    </CldUploadWidget>

                                    {formData.gallery_images.length > 0 && (
                                        <div className="mt-3 grid grid-cols-3 gap-3">
                                            {formData.gallery_images.map((imgId, index) => (
                                                <div key={index} className="relative group rounded-lg overflow-hidden bg-black/20 aspect-video">
                                                    <CldImage
                                                        src={imgId}
                                                        alt={`Gallery ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 text-gray-300 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-lg font-semibold disabled:opacity-50"
                                    >
                                        {isSaving ? "Saving..." : "Save Project"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
