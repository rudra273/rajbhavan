import { getCachedProjects } from "@/lib/dataCache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const projects = getCachedProjects();
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}
