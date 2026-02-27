/**
 * Seed script — fetches all data from Google Sheets and writes JSON cache files.
 * Run manually:   node scripts/seed-data.mjs
 * Runs automatically before every `npm run build`.
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { refreshAll } from "../lib/dataCache.js";

console.log("🔄 Seeding data from Google Sheets…");

try {
    await refreshAll();
    console.log("🎉 Seed complete — JSON files are ready in data/");
} catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
}
