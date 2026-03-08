import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getProjects, getReviews, getAllPackagesData } from "@/lib/googleSheets";

export async function POST(request) {
    const secret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "").trim();

    if (!secret || token !== secret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { type } = await request.json();

        switch (type) {
            case "projects":
                await getProjects(); // ← fetch fresh data first
                revalidatePath("/projects");
                revalidatePath("/");
                break;
            case "reviews":
                await getReviews(); // ← fetch fresh data first
                revalidatePath("/reviews");
                revalidatePath("/");
                break;
            case "packages":
                await getAllPackagesData(); // ← fetch fresh data first
                revalidatePath("/packages");
                break;
            case "all":
                await Promise.all([getProjects(), getReviews(), getAllPackagesData()]);
                revalidatePath("/projects");
                revalidatePath("/reviews");
                revalidatePath("/packages");
                revalidatePath("/");
                break;
            default:
                return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: `${type} data refreshed successfully`,
            refreshedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Admin refresh error:", error);
        return NextResponse.json({ error: "Refresh failed: " + error.message }, { status: 500 });
    }
}