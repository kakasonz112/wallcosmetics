import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Wall Cosmetics — Premium Korean Wallpaper & Interior Film",
    template: "%s | Wall Cosmetics",
  },
  description:
    "Wall Cosmetics is Singapore's trusted supplier of premium Korean interior films and wallpapers. Discover wood, stone, fabric, and solid-colour finishes for homes and commercial spaces.",
  keywords: [
    "Korean wallpaper Singapore",
    "interior film",
    "Korean interior film",
    "wall covering",
    "Bodaq film",
    "decorative film",
    "wallpaper supplier Singapore",
  ],
  authors: [{ name: "Wall Cosmetics" }],
  creator: "Wall Cosmetics",
  metadataBase: new URL("https://wallcosmetics.com"),
  openGraph: {
    title: "Wall Cosmetics — Premium Korean Wallpaper & Interior Film",
    description:
      "Singapore's trusted supplier of premium Korean interior films. Wood, stone, fabric & solid-colour finishes for every surface.",
    url: "https://wallcosmetics.com",
    siteName: "Wall Cosmetics",
    images: [
      {
        url: "/wallcosmetics_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Wall Cosmetics — Korean Interior Film",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  icons: {
    icon: "/wallcosmetics_logo.png",
    shortcut: "/wallcosmetics_logo.png",
    apple: "/wallcosmetics_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
