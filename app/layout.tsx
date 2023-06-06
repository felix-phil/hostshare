import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import { Inter, Flow_Circular, Poppins } from "next/font/google";
import Navbar from "./Navbar";
import { Metadata } from "next";
// import { useEffect, useState } from "react";

const flowCircular = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Vacation Homes & Condo Rentals - HostShare",
  description: "Easy to get",
  openGraph: {
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={flowCircular.className}>
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="flex-1 flex flex-col items-center overflow-y-auto w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
