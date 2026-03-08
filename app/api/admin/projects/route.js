import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/googleSheets";
import { revalidatePath } from "next/cache";

// Helper for auth validation
function isAdminAuthenticated(req) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    return token === process.env.ADMIN_SECRET;
}

export async function GET(req) {
    if (!isAdminAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await getProjects();
        return NextResponse.json({ data });
    } catch (error) {
        console.error("GET Projects Error:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req) {
    if (!isAdminAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        if (!body.title || !body.cloudinary_url) {
            return NextResponse.json({ error: "Title and Image are required" }, { status: 400 });
        }

        const result = await createProject(body);

        // Revalidate cache
        revalidatePath("/projects");
        revalidatePath("/");

        return NextResponse.json(result);
    } catch (error) {
        console.error("POST Project Error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
