import { google } from "googleapis";

// Read-only auth — used for Projects, Reviews, Packages (existing sheet)
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

// Read+Write auth — used ONLY for the Contact submissions sheet
function getWriteAuthClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
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
 * Columns: id, title, description, cloudinary_url, category, is_featured
 */
export async function getProjects() {
    const data = await getSheetData("Projects");
    return data.map(project => ({
        ...project,
        is_featured: project.is_featured === "TRUE" || project.is_featured === "true"
    }));
}

// ============================================================
// 🏗️ PROJECTS CRUD (Admin) 
// ============================================================

export async function createProject(projectData) {
    const auth = getWriteAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    // Generate a new ID based on existing projects
    const existing = await getProjects();
    const newId = existing.length > 0 ? Math.max(...existing.map(p => Number(p.id) || 0)) + 1 : 1;

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Projects!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    newId,
                    projectData.title || "",
                    projectData.description || "",
                    projectData.cloudinary_url || "",
                    projectData.category || "",
                    projectData.is_featured ? "TRUE" : "FALSE"
                ],
            ],
        },
    });

    return { success: true, id: newId };
}

export async function updateProject(id, projectData) {
    const auth = getWriteAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    // Find the row to update
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Projects",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) throw new Error("No data found");

    // id is column A (index 0). Assumes first row is header, so row 2 is index 1.
    const rowIndex = rows.findIndex((row, idx) => idx > 0 && row[0] == id);
    if (rowIndex === -1) throw new Error(`Project with ID ${id} not found`);

    const sheetRowNumber = rowIndex + 1; // 1-based index for sheets

    await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `Projects!A${sheetRowNumber}:F${sheetRowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    id, // ID remains same
                    projectData.title,
                    projectData.description,
                    projectData.cloudinary_url,
                    projectData.category,
                    projectData.is_featured ? "TRUE" : "FALSE"
                ],
            ],
        },
    });

    return { success: true };
}

export async function deleteProject(id) {
    const auth = getWriteAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Projects",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) throw new Error("No data found");

    const rowIndex = rows.findIndex((row, idx) => idx > 0 && row[0] == id);
    if (rowIndex === -1) throw new Error(`Project with ID ${id} not found`);

    // Instead of deleting the row entirely (which can mess up sheet boundaries if not careful with the sheetId),
    // we will clear the row. Or, we can use batchUpdate to actually delete the dimension.
    // For simplicity, we'll clear the row contents so it's empty, and update `getSheetData` to filter out empty rows, 
    // or we can do a proper delete row request.

    // Proper delete row request requires sheetId (the numeric ID of the tab, which we'd have to find)
    // To find the sheetId for "Projects":
    const sheetMeta = await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    const projectsSheetMeta = sheetMeta.data.sheets.find(s => s.properties.title === "Projects");
    if (!projectsSheetMeta) throw new Error("Projects sheet not found");

    const sheetId = projectsSheetMeta.properties.sheetId;

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        requestBody: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: sheetId,
                            dimension: "ROWS",
                            startIndex: rowIndex, // 0-based
                            endIndex: rowIndex + 1
                        }
                    }
                }
            ]
        }
    });

    return { success: true };
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
    Essential: { tag: "Budget Friendly", color: "from-slate-600 to-slate-700" },
    Standard: { tag: "Most Popular", color: "from-blue-600 to-blue-700" },
    Premium: { tag: "Best Value", color: "from-emerald-700 to-emerald-800" },
    Luxury: { tag: "Premium Living", color: "from-amber-700 to-amber-800" },
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

// ============================================================
// 📬 CONTACT FORM — Write submissions to a separate sheet
// ============================================================

/**
 * Append a contact form submission to the Contact sheet.
 * Checks for duplicate mobile numbers before writing.
 * Uses the separate GOOGLE_CONTACT_SHEET_ID and write-scoped auth.
 *
 * @param {{ name: string, mobile: string, email?: string, plotLocation?: string, plotSize?: string }} formData
 * @returns {{ duplicate: boolean }}
 */
export async function appendContactSubmission(formData) {
    const auth = getWriteAuthClient();
    const sheets = google.sheets({ version: "v4", auth });

    // Check for duplicate mobile number (column C)
    const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_CONTACT_SHEET_ID,
        range: "Sheet1!C:C",
    });

    const existingMobiles = (existing.data.values || [])
        .flat()
        .map((m) => m.trim());

    if (existingMobiles.includes(formData.mobile)) {
        return { duplicate: true };
    }

    const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
    });

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_CONTACT_SHEET_ID,
        range: "Sheet1!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    timestamp,
                    formData.name,
                    formData.mobile,
                    formData.email || "",
                    formData.plotLocation || "",
                    formData.plotSize || "",
                ],
            ],
        },
    });

    return { duplicate: false };
}
