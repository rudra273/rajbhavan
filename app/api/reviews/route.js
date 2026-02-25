import { getReviews } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export async function GET() {
    try {
        const reviews = await getReviews();
        return NextResponse.json({ reviews }, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
