import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NewsModal from "@/components/NewsModal";

export const metadata: Metadata = {
  title: "Martincitas C.F.",
  description: "Sitio oficial de Martincitas Club de Futbol",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-white">
      <body className="min-h-screen overflow-x-hidden bg-white text-black">
        <Navbar />

        <main className="min-h-screen bg-white">
          {children}
        </main>
        <Analytics />
        <NewsModal />
      </body>
    </html>
  );
}