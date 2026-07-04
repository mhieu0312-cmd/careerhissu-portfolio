import './globals.css'

export const metadata = {
  title: 'My Second Brain | Portfolio',
  description: 'Digital Identity and Second Brain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto px-4 antialiased min-h-screen flex flex-col">
        {/* Thanh Điều Hướng Tối Giản */}
        <nav className="py-8 flex justify-between items-center text-sm font-medium text-gray-400">
          <a href="/" className="hover:text-white transition-colors">THE PORTAL</a>
          <div className="flex gap-6">
            <a href="/brain" className="hover:text-white transition-colors">THE BRAIN</a>
            <a href="/timeline" className="hover:text-white transition-colors">THE TIMELINE</a>
          </div>
        </nav>

        {/* Nội dung các trang sẽ được bơm vào đây */}
        <main className="flex-grow pt-8">
          {children}
        </main>

        <footer className="py-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} - Xây dựng từ vạch xuất phát.
        </footer>
      </body>
    </html>
  )
}