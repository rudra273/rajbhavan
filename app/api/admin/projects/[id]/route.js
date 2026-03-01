import { NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/googleSheets";

// Helper for auth validation
function isAdminAuthenticated(req) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    return token === process.env.ADMIN_SECRET;
}

export async function PUT(req, { params }) {
    if (!isAdminAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await req.json();
        const result = await updateProject(id, body);

        // Refresh project cache
        const { refreshProjects } = await import("@/lib/dataCache");
        await refreshProjects();

        return NextResponse.json(result);
    } catch (error) {
        console.error("PUT Project Error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    if (!isAdminAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const result = await deleteProject(id);

        // Refresh project cache
        const { refreshProjects } = await import("@/lib/dataCache");
        await refreshProjects();

        return NextResponse.json(result);
    } catch (error) {
        console.error("DELETE Project Error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
