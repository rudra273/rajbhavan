import { getAllPackagesData } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await getAllPackagesData();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching packages:", error);
        return NextResponse.json(
            { error: "Failed to fetch packages" },
            { status: 500 }
        );
    }
}
