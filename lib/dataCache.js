import fs from "fs";
import path from "path";
import { getProjects, getReviews, getAllPackagesData } from "./googleSheets.js";

// ─── Paths to the JSON cache files ────────────────────────
const DATA_DIR = path.join(process.cwd(), "data");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const PACKAGES_FILE = path.join(DATA_DIR, "packages.json");

// ─── Helpers ──────────────────────────────────────────────
function readJSON(filePath, fallback) {
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

function writeJSON(filePath, data) {
    // Ensure the data directory exists
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ─── READ from cache (used by pages / API routes) ─────────
export function getCachedProjects() {
    return readJSON(PROJECTS_FILE, []);
}

export function getCachedReviews() {
    return readJSON(REVIEWS_FILE, []);
}

export function getCachedPackages() {
    return readJSON(PACKAGES_FILE, {});
}

// ─── WRITE to cache (fetch from Google Sheets → save JSON) ─
export async function refreshProjects() {
    const projects = await getProjects();
    writeJSON(PROJECTS_FILE, projects);
    console.log(`✅ Refreshed projects.json  (${projects.length} items)`);
    return projects;
}

export async function refreshReviews() {
    const reviews = await getReviews();
    writeJSON(REVIEWS_FILE, reviews);
    console.log(`✅ Refreshed reviews.json   (${reviews.length} items)`);
    return reviews;
}

export async function refreshPackages() {
    const data = await getAllPackagesData();
    writeJSON(PACKAGES_FILE, data);
    console.log(`✅ Refreshed packages.json`);
    return data;
}

export async function refreshAll() {
    await Promise.all([refreshProjects(), refreshReviews(), refreshPackages()]);
    console.log("✅ All data refreshed successfully.");
}
