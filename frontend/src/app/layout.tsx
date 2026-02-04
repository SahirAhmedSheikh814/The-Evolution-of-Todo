import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow - Organize Your Life, Achieve Your Goals",
  description: "The modern task management platform designed for productive teams. Beautiful, intuitive, and powerful.",
  keywords: ["task management", "productivity", "todo app", "team collaboration"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
