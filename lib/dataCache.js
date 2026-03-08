import fs from "fs";
import path from "path";
import os from "os";
import { getProjects, getReviews, getAllPackagesData } from "./googleSheets.js";

// ─── Paths to the JSON cache files ────────────────────────
const DATA_DIR = path.join(process.cwd(), "data");
const TMP_DIR = os.tmpdir(); // maps to /tmp on Vercel

const PROJECTS_FILE_STATIC = path.join(DATA_DIR, "projects.json");
const REVIEWS_FILE_STATIC = path.join(DATA_DIR, "reviews.json");
const PACKAGES_FILE_STATIC = path.join(DATA_DIR, "packages.json");

const PROJECTS_FILE_TMP = path.join(TMP_DIR, "projects.json");
const REVIEWS_FILE_TMP = path.join(TMP_DIR, "reviews.json");
const PACKAGES_FILE_TMP = path.join(TMP_DIR, "packages.json");

// ─── Helpers ──────────────────────────────────────────────
function readJSON(tmpPath, staticPath, fallback) {
    // 1. Try reading from /tmp/ first
    try {
        if (fs.existsSync(tmpPath)) {
            const raw = fs.readFileSync(tmpPath, "utf-8");
            return JSON.parse(raw);
        }
    } catch (err) {
        console.warn(`Failed reading from tmpPath ${tmpPath}:`, err);
    }

    // 2. Fall back to static file
    try {
        if (fs.existsSync(staticPath)) {
            const raw = fs.readFileSync(staticPath, "utf-8");
            return JSON.parse(raw);
        }
    } catch (err) {
        console.warn(`Failed reading from staticPath ${staticPath}:`, err);
    }

    return fallback;
}

function writeJSON(tmpPath, data) {
    // Ensure the tmp directory exists
    if (!fs.existsSync(TMP_DIR)) {
        fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
}

// ─── READ from cache (used by pages / API routes) ─────────
export function getCachedProjects() {
    return readJSON(PROJECTS_FILE_TMP, PROJECTS_FILE_STATIC, []);
}

export function getCachedReviews() {
    return readJSON(REVIEWS_FILE_TMP, REVIEWS_FILE_STATIC, []);
}

export function getCachedPackages() {
    return readJSON(PACKAGES_FILE_TMP, PACKAGES_FILE_STATIC, {});
}

// ─── WRITE to cache (fetch from Google Sheets → save JSON) ─
export async function refreshProjects() {
    const projects = await getProjects();
    writeJSON(PROJECTS_FILE_TMP, projects);
    console.log(`✅ Refreshed projects.json  (${projects.length} items)`);
    return projects;
}

export async function refreshReviews() {
    const reviews = await getReviews();
    writeJSON(REVIEWS_FILE_TMP, reviews);
    console.log(`✅ Refreshed reviews.json   (${reviews.length} items)`);
    return reviews;
}

export async function refreshPackages() {
    const data = await getAllPackagesData();
    writeJSON(PACKAGES_FILE_TMP, data);
    console.log(`✅ Refreshed packages.json`);
    return data;
}

export async function refreshAll() {
    await Promise.all([refreshProjects(), refreshReviews(), refreshPackages()]);
    console.log("✅ All data refreshed successfully.");
}
