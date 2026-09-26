import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/(pages)/navbar/page";
import { ToastContainer } from "react-toastify";
import MySessionProvider from "@/sessionProvider/MySessionProvider";
import NavbarWrapper from "@/components/NavbarWrapper/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart | Everyday finds",
  description: "Shop fashion, technology, home, and more at FreshCart.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
     <MySessionProvider>
         <NavbarWrapper/>
        <ToastContainer/>
        {children}
     </MySessionProvider>

        </body>
    </html>
  );
}
