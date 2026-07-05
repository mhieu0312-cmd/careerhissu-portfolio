import Link from 'next/link'
import { getPostBySlug } from '../lib/mdx'
import { Sprout, Hammer, Sparkles, Milestone, ArrowRight } from 'lucide-react'

export default function HomePage() {
  // Lấy dữ liệu động của The Now từ folder content/now/now.mdx
  const nowPost = getPostBySlug('now', 'now')
  const nowText = nowPost?.summary || 'Đang cùng với con AI tên là Sil học cách kiến trúc web bằng tay, setup bộ khung Next.js + Tailwind CSS.'
  const nowUpdateDate = nowPost?.date || '2026-07-05'

  const dimensions = [
    {
      name: 'The Now',
      desc: 'Tuần này t đang học gì, làm gì? Những cập nhật nhanh về thói quen và mục tiêu ngắn hạn.',
      href: '/brain?category=now',
      color: 'from-emerald-500 to-teal-500',
      icon: Sparkles,
    },
    {
      name: 'The Craft',
      desc: 'Nơi trưng bày sản phẩm thực tế: đồ án môn học, code thử nghiệm và các tool tự viết.',
      href: '/brain?category=craft',
      color: 'from-blue-500 to-indigo-500',
      icon: Hammer,
    },
    {
      name: 'The Garden',
      desc: 'Vườn tri thức số: các ghi chép công nghệ, giải thuật, cấu trúc dữ liệu và tóm tắt sách.',
      href: '/brain?category=garden',
      color: 'from-amber-500 to-orange-500',
      icon: Sprout,
    },
    {
      name: 'The Journey',
      desc: 'Lịch sử tiến hóa cá nhân: dòng thời gian năm 1, mục tiêu năm 2 và kế hoạch 10 năm.',
      href: '/timeline',
      color: 'from-pink-500 to-rose-500',
      icon: Milestone,
    },
  ]

  return (
    <div className="space-y-16 py-4 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-6 max-w-2xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight leading-none">
          Hi, t là <span className="text-gradient font-black">Chủ tịch</span>.
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg">
          T đang là sinh viên ngành Công nghệ thông tin năm thứ nhất. Đây không phải là một CV tĩnh, đây là hệ thống
          <strong className="text-gray-950 dark:text-white font-semibold"> Second Brain </strong> và
          <strong className="text-gray-950 dark:text-white font-semibold"> Hành trình 10 năm </strong> 
          để t tự ghi chép lại quá trình phát triển năng lực tư duy, viết code và tích lũy kiến thức mỗi ngày.
        </p>
      </section>

      {/* Dynamic Widget NOW */}
      <section className="p-6 rounded-2xl border border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/30 dark:bg-emerald-950/10 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              The Now (Hiện tại)
            </h2>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">Cập nhật: {nowUpdateDate}</span>
        </div>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          {nowText}
        </p>
        <div className="mt-4 flex justify-end">
          <Link href="/brain?category=now" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all">
            Xem nhật ký tuần này <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      {/* 4 Dimensions Grid */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Khám phá 4 Chiều Không Gian
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dữ liệu được tổ chức có hệ thống để liên kết giữa lý thuyết, thực hành và hành trình phát triển bản thân.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim) => {
            const Icon = dim.icon
            return (
              <Link
                key={dim.name}
                href={dim.href}
                className="group p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/40 hover:bg-gray-50/50 dark:hover:bg-gray-900/80 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                {/* Background glow decoration */}
                <div className={`absolute -right-4 -bottom-4 w-12 h-12 bg-gradient-to-tr ${dim.color} opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500`} />
                
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${dim.color} flex items-center justify-center text-white shadow-md shadow-gray-500/10`}>
                    <Icon size={20} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      {dim.name}
                      <ArrowRight size={14} className="text-gray-400 dark:text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {dim.desc}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}