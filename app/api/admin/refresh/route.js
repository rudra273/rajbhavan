import { NextResponse } from "next/server";
import {
    refreshProjects,
    refreshReviews,
    refreshPackages,
    refreshAll,
} from "@/lib/dataCache";

export async function POST(request) {
    // ── Auth check ──────────────────────────────────────────
    const secret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!secret || token !== secret) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // ── Refresh the requested data type ─────────────────────
    try {
        const { type } = await request.json();

        switch (type) {
            case "projects":
                await refreshProjects();
                break;
            case "reviews":
                await refreshReviews();
                break;
            case "packages":
                await refreshPackages();
                break;
            case "all":
                await refreshAll();
                break;
            default:
                return NextResponse.json(
                    { error: `Unknown type: ${type}` },
                    { status: 400 }
                );
        }

        return NextResponse.json({
            success: true,
            message: `${type} data refreshed successfully`,
            refreshedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Admin refresh error:", error);
        return NextResponse.json(
            { error: "Refresh failed: " + error.message },
            { status: 500 }
        );
    }
}
