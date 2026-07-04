export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">⏳ THE TIMELINE</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Hành trình tiến hóa và trưởng thành của t qua các năm.
        </p>
      </div>

      <div className="border-l border-gray-800 pl-4 space-y-6">
        {/* Cột mốc 2026 */}
        <div className="relative">
          <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
          <h3 className="text-sm font-semibold text-white">2026 — Đặt những viên gạch đầu tiên</h3>
          <p className="text-xs text-gray-500 mt-1">Cuối năm 1 Đại học</p>
          <p className="text-xs text-gray-400 mt-2">
            GPA thoi thóp không làm t lùi bước. Quyết định tự tay đập bỏ tư duy template cũ để xây dựng hệ thống Second Brain / Portfolio bằng Next.js cùng với Sil.
          </p>
        </div>
      </div>
    </div>
  )
}