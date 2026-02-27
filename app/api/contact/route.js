import { appendContactSubmission } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, mobile, email, plotLocation, plotSize } = body;

        // Validate required fields
        if (!name || !name.trim()) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }
        if (!mobile || !mobile.trim() || !/^[6-9]\d{9}$/.test(mobile.trim())) {
            return NextResponse.json(
                { error: "A valid 10-digit mobile number is required" },
                { status: 400 }
            );
        }

        // Append to Google Sheet (checks for duplicate mobile)
        const result = await appendContactSubmission({
            name: name.trim(),
            mobile: mobile.trim(),
            email: email?.trim() || "",
            plotLocation: plotLocation?.trim() || "",
            plotSize: plotSize?.trim() || "",
        });

        if (result.duplicate) {
            return NextResponse.json(
                { error: "This mobile number has already been submitted." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Form submitted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form submission error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
