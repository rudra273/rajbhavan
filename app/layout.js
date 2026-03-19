import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://raj-bhavan.vercel.app";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Raj Bhavan Construction | Best House Construction Contractor & Builder in Chatrapur & Berhampur",
    template: "%s | Raj Bhavan Construction",
  },
  description:
    "Raj Bhavan Construction is the leading house construction contractor and builder in Chatrapur, Berhampur & Ganjam, Odisha. 18+ years experience in residential & commercial building construction. Get free quote today.",
  keywords: [
    "house construction Chatrapur",
    "builder in Chatrapur",
    "construction contractor Berhampur",
    "house builder Berhampur",
    "building contractor Ganjam",
    "residential construction Odisha",
    "commercial construction Chatrapur",
    "home construction Berhampur",
    "civil contractor Chatrapur",
    "best builder in Berhampur",
    "Raj Bhavan Construction",
    "construction company Odisha",
    "house building contractor near me",
    "building construction Ganjam district",
    "affordable house construction Odisha",
  ],
  authors: [{ name: "Raj Bhavan Construction" }],
  creator: "Raj Bhavan Construction",
  publisher: "Raj Bhavan Construction",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Raj Bhavan Construction",
    title: "Raj Bhavan Construction | Best House Construction Contractor in Chatrapur & Berhampur",
    description:
      "Trusted house construction contractor & builder in Chatrapur and Berhampur, Odisha. 18+ years of quality residential & commercial building construction.",
    images: [
      {
        url: "/homepage/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Raj Bhavan Construction — House Building Contractor in Chatrapur & Berhampur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raj Bhavan Construction | Builder in Chatrapur & Berhampur",
    description:
      "Leading house construction contractor in Chatrapur & Berhampur. Quality residential & commercial construction.",
    images: ["/homepage/hero.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "76640fc266209747",
  },
  icons: {
    icon: "/logo-bold.svg",
    shortcut: "/logo-bold.svg",
    apple: "/logo-bold.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor", "HomeAndConstructionBusiness"],
  "@id": `${BASE_URL}/#business`,
  name: "Raj Bhavan Construction",
  description:
    "Leading construction company in Chatrapur and Berhampur, Odisha. Top-rated house construction contractor and builder in Ganjam district with 18+ years experience in residential & commercial building construction.",
  url: BASE_URL,
  telephone: "+917008039858",
  email: "akashchandramohanty@gmail.com",
  image: `${BASE_URL}/homepage/hero.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chatrapur",
    addressLocality: "Chatrapur",
    addressRegion: "Odisha",
    postalCode: "761020",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.355,
    longitude: 84.612,
  },
  areaServed: [
    { "@type": "City", name: "Chatrapur" },
    { "@type": "City", name: "Berhampur" },
    { "@type": "AdministrativeArea", name: "Ganjam District" },
    { "@type": "State", name: "Odisha" },
  ],
  serviceArea: [
    { "@type": "City", name: "Chatrapur", containedInPlace: { "@type": "State", name: "Odisha" } },
    { "@type": "City", name: "Berhampur", containedInPlace: { "@type": "State", name: "Odisha" } },
    { "@type": "AdministrativeArea", name: "Ganjam District" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "19:00",
  },
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "House Construction in Chatrapur", areaServed: "Chatrapur, Odisha" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "House Construction in Berhampur", areaServed: "Berhampur, Odisha" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Building Construction in Ganjam", areaServed: "Ganjam District, Odisha" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Hardware Supply" } },
    ],
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best construction company in Chatrapur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Raj Bhavan Construction is the leading construction company in Chatrapur, Odisha. With 18+ years of experience and 400+ completed projects, we specialize in residential and commercial building construction across Chatrapur and Ganjam district.",
      },
    },
    {
      "@type": "Question",
      name: "Which is the best construction company in Berhampur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Raj Bhavan Construction is a top-rated house construction contractor serving Berhampur (Brahmapur) and the entire Ganjam district. Call +91 70080 39858 for a free quote.",
      },
    },
    {
      "@type": "Question",
      name: "How much does house construction cost in Chatrapur or Berhampur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "House construction costs in Chatrapur and Berhampur vary based on design, materials, and area. Raj Bhavan Construction offers transparent pricing packages starting from economy to premium finishes. Contact us for a free detailed estimate.",
      },
    },
    {
      "@type": "Question",
      name: "Does Raj Bhavan Construction build in Berhampur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Raj Bhavan Construction operates across Berhampur, Chatrapur, and all of Ganjam district in Odisha. We handle residential homes, commercial complexes, and renovation projects throughout the region.",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${inter.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
