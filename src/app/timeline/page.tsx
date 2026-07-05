import Link from 'next/link'
import { getAllPosts } from '../../lib/mdx'
import { Calendar, ArrowRight, Milestone, Sparkles } from 'lucide-react'

export const revalidate = 0

export default function TimelinePage() {
  // Lấy toàn bộ bài viết từ danh mục journey
  const journeyPosts = getAllPosts('journey')

  return (
    <div className="space-y-10 py-4 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          ⏳ THE TIMELINE
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base leading-relaxed max-w-xl">
          Dòng thời gian ghi chép lại các cột mốc quan trọng, bài học kinh nghiệm xương máu và định hướng trong tương lai của t qua từng học kỳ và từng năm học.
        </p>
      </div>

      {journeyPosts.length > 0 ? (
        <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 pl-6 sm:pl-8 space-y-12 py-2">
          {journeyPosts.map((post, idx) => {
            // Xác định icon và màu sắc đặc biệt cho các cột mốc quan trọng
            const isMilestone = post.milestone === true || idx === 0
            
            return (
              <div key={post.slug} className="relative group">
                {/* Timeline Dot Indicator */}
                <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 transition-all duration-300 ${
                  isMilestone 
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-500 scale-125 glow-indicator' 
                    : 'bg-gray-400 dark:bg-gray-700 group-hover:bg-indigo-500 group-hover:scale-110'
                }`} />

                {/* Content Card */}
                <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/20 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-900/50 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded font-mono ${
                      isMilestone 
                        ? 'bg-pink-50 text-pink-600 dark:bg-pink-950/20 dark:text-pink-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {post.period || 'Mốc Thời Gian'}
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 font-mono">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {isMilestone && <Sparkles size={16} className="text-pink-500 animate-pulse" />}
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        {post.subtitle}
                      </p>
                    )}
                  </div>

                  {post.summary && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {post.summary}
                    </p>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Link
                      href={`/brain/journey/${post.slug}`}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group/btn hover:gap-2 transition-all"
                    >
                      Đọc chi tiết hành trình
                      <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
          <Milestone className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700" />
          <h3 className="mt-4 text-sm font-semibold text-gray-950 dark:text-white">Chưa có cột mốc nào</h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            Hành trình đang được cập nhật. Hãy quay lại sau!
          </p>
        </div>
      )}
    </div>
  )
}