import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export const metadata: Metadata = {
  title: "Hissu.dev — Second Brain & Portfolio",
  description: "Hệ thống Second Brain và hành trình 10 năm của một sinh viên CNTT năm nhất, xây dựng từ vạch xuất phát.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Google Sans & Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
        <ThemeProvider>
          <Header />
          {/* max-w-5xl (~1024px) — tối ưu readability cho nội dung wiki/blog */}
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
            {children}
          </main>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}