import { google } from "googleapis";

function getAuthClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    return auth;
}

async function getSheetData(sheetName) {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: sheetName,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    // First row is headers, rest are data
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || "";
        });
        return obj;
    });

    return data;
}

/**
 * Fetch all projects from the "Projects" sheet
 * Columns: id, title, description, cloudinary_url, category
 */
export async function getProjects() {
    return getSheetData("Projects");
}

/**
 * Fetch all reviews from the "Reviews" sheet
 * Columns: id, name, rating, review_text, date
 */
export async function getReviews() {
    return getSheetData("Reviews");
}
