import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cadre.cl"),
  title: "CADRE Solutions | Transformación Digital para PYMEs",
  description:
    "Automatización, sistemas a medida y transformación digital para PYMEs que quieren crecer sin contratar por inercia.",
  keywords: ["transformación digital", "automatización", "PYMEs", "n8n", "Supabase", "Vercel"],
  icons: {
    icon: [
      { url: "/cadre-logo.png", type: "image/png" },
      { url: "/cadre-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/cadre-logo.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/cadre-logo.png",
    apple: [{ url: "/cadre-logo.png" }],
  },
  openGraph: {
    title: "CADRE Solutions",
    description: "Sistemas digitales a medida para PYMEs.",
    type: "website",
    images: [
      {
        url: "/cadre-logo.png",
        width: 512,
        height: 512,
        alt: "CADRE Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CADRE Solutions",
    description: "Sistemas digitales a medida para PYMEs.",
    images: ["/cadre-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
