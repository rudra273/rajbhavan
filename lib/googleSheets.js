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

// ============================================================
// 📦 PACKAGES — Prices + City-specific package details
// ============================================================

/** UI metadata per package name (not stored in the sheet) */
const PACKAGE_META = {
    Essential: { tag: "Budget Friendly", color: "from-emerald-500 to-teal-600" },
    Standard: { tag: "Most Popular", color: "from-blue-500 to-indigo-600" },
    Premium: { tag: "Best Value", color: "from-purple-500 to-violet-600" },
    Luxury: { tag: "Premium Living", color: "from-amber-500 to-orange-600" },
};

const CITIES = ["Chatrapur", "Berhampur"];
const PACKAGES = ["Essential", "Standard", "Premium", "Luxury"];

/**
 * Fetch pricing rows from the "Prices" tab.
 * Columns: City | Package | Price
 * @returns {Promise<Array<{City:string, Package:string, Price:string}>>}
 */
export async function getPrices() {
    return getSheetData("Prices");
}

/**
 * Fetch package detail rows for a single city tab.
 * Columns: Package | Category | Details (pipe-separated)
 * @param {string} citySheetName – must match a sheet tab name exactly
 * @returns {Promise<Array<{Package:string, Category:string, Details:string}>>}
 */
export async function getCityPackageDetails(citySheetName) {
    return getSheetData(citySheetName);
}

/**
 * Build the full CITY_DATA object the packages page expects.
 *
 * Shape:
 *   { [city]: { [package]: { price, tag, color, sections: [{ title, items }] } } }
 *
 * @returns {Promise<{cityData: object, packages: string[], cities: string[]}>}
 */
export async function getAllPackagesData() {
    // 1. Prices lookup  —  city+package → price string
    const priceRows = await getPrices();
    const priceMap = {};
    for (const row of priceRows) {
        const key = `${row.City}__${row.Package}`;
        priceMap[key] = row.Price;
    }

    // 2. Per-city details
    const cityData = {};

    for (const city of CITIES) {
        const detailRows = await getCityPackageDetails(city);
        cityData[city] = {};

        for (const pkg of PACKAGES) {
            // Filter rows for this package
            const rows = detailRows.filter((r) => r.Package === pkg);

            // Build sections array — one entry per category
            const sections = rows.map((r) => ({
                title: r.Category,
                items: r.Details
                    ? r.Details.split(" | ").map((s) => s.trim()).filter(Boolean)
                    : [],
            }));

            const meta = PACKAGE_META[pkg] || { tag: pkg, color: "from-gray-500 to-gray-600" };

            cityData[city][pkg] = {
                price: priceMap[`${city}__${pkg}`] || "",
                tag: meta.tag,
                color: meta.color,
                sections,
            };
        }
    }

    return { cityData, packages: PACKAGES, cities: CITIES };
}
