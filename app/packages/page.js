import { getAllPackagesData } from "@/lib/googleSheets";
import PackagesClient from "@/components/PackagesClient";

export const metadata = {
    title: "House Construction Packages & Pricing in Chatrapur & Berhampur",
    description:
        "Affordable house construction packages in Chatrapur & Berhampur. Compare features, get transparent pricing and a personalised quote from Raj Bhavan Construction.",
    keywords:
        "construction packages Chatrapur, house building cost Berhampur, construction rate Odisha, building packages Ganjam, affordable construction Chatrapur",
    alternates: {
        canonical: "/packages",
    },
    openGraph: {
        title: "Construction Packages & Pricing | Raj Bhavan Construction",
        description:
            "Transparent house construction packages for Chatrapur & Berhampur. Compare and get a free quote.",
    },
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