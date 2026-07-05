import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

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
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <ThemeProvider>
          {/* Layout bọc ngoài cho đẹp */}
          <div className="max-w-3xl mx-auto px-4 py-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}