import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gresham Recordings",
  description: "Gresham Recordings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
            color="#4D7C0F"
            height={3}         // Height of 4px
            showSpinner={false} // Disable spinner
            shadow="0 0 10px #FFFF00, 0 0 5px #FFFF00" // Custom yellow shadow
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
