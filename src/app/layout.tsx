import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bunkly — Find Your Perfect Stay",
  description:
    "Search and book hotels, resorts, and vacation rentals worldwide. Best price guarantee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
