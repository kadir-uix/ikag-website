import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ika-solutions.com";
const title = "IKAG | AI Travel Concierge";
const description =
  "IKAG is a private AI travel concierge for curated stays, dining, wellness, local recommendations, and on-demand guest requests.";
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "IKAG AI travel concierge",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | IKAG",
  },
  description,
  applicationName: "IKAG",
  keywords: [
    "IKAG",
    "AI travel concierge",
    "private travel concierge",
    "luxury travel app",
    "Dubai concierge",
    "hotel guest experience",
    "travel recommendations",
    "dining reservations",
    "wellness bookings",
  ],
  authors: [{ name: "IKAG" }],
  creator: "IKAG",
  publisher: "IKAG",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "IKAG",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  category: "travel",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
