import { getAllPackagesData } from "@/lib/googleSheets";
import PackagesClient from "@/components/PackagesClient";

export const metadata = {
    title: "Packages | Raj Bhavan Construction",
    description: "Choose a package, compare features, and get a personalised quote — all with clear, upfront pricing.",
};

export default async function PackagesPage() {
    let data = null;

    try {
        data = await getAllPackagesData();
    } catch (error) {
        console.error("Error fetching packages:", error);
    }

    return <PackagesClient data={data} />;
}