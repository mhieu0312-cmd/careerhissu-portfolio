import ThemeToggle from "../components/ThemeToggle";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-400">THE PORTAL</h1>
        <nav className="space-x-8">
          <a href="/brain" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">THE BRAIN</a>
          <a href="/timeline" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">THE TIMELINE</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hi, t là Chủ tịch.
          </h2>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            T là sinh viên Công nghệ thông tin năm 1. Đây không phải là một CV tĩnh, đây là hệ thống
            <strong className="text-gray-900 dark:text-white font-semibold"> Second Brain </strong> và
            <strong className="text-gray-900 dark:text-white font-semibold"> Hành trình 10 năm </strong>
            ghi lại quá trình tiến hóa tư duy và chuyên môn của t.
          </p>
        </section>

        {/* Khối The Now */}
        <section className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 shadow-inner">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <h3 className="text-base font-medium text-emerald-600 dark:text-emerald-400">THE NOW (TUẦN NÀY)</h3>
          </div>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            Đang cùng với con AI tên là Sil học cách kiến trúc web bằng tay, setup bộ khung Next.js + Tailwind CSS.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-800 mt-16">
        <p className="text-sm text-gray-500 dark:text-gray-600">© 2026 - Xây dựng từ vạch xuất phát.</p>
      </footer>

      {/* Gọi nút Toggle ra */}
      <ThemeToggle />
    </div>
  );
}