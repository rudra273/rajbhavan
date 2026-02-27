import { getCachedReviews } from "@/lib/dataCache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const reviews = getCachedReviews();
        return NextResponse.json({ reviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
