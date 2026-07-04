export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section tối giản */}
      <section className="space-y-4 max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Hi, t là Chủ tịch.
        </h1>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
          T là sinh viên Công nghệ thông tin năm 1. Đây không phải là một CV tĩnh, đây là hệ thống 
          <span className="text-white font-medium"> Second Brain</span> và 
          <span className="text-white font-medium"> Hành trình 10 năm</span> ghi lại quá trình tiến hóa tư duy và chuyên môn của t.
        </p>
      </section>

      {/* Widget NOW (Chiều 1) */}
      <section className="p-4 rounded-lg bg-gray-950 border border-gray-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">The Now (Tuần này)</h2>
        </div>
        <p className="text-xs text-gray-300">
          Đang cùng với con AI tên là Sil học cách kiến trúc web bằng tay, setup bộ khung Next.js + Tailwind CSS.
        </p>
      </section>
    </div>
  )
}