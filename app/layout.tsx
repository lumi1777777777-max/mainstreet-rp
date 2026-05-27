import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MainStreet RP - Join the City",
  description: "This ain't another city. This is MAINSTREET.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
