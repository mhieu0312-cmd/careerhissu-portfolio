import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "CareerHissu Portfolio",
  description: "My Second Brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <Header />
          {/* Layout bọc ngoài cho đẹp */}
          <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}