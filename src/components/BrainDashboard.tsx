'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Calendar, FolderOpen, Tag, X } from 'lucide-react'
import { PostData } from '../lib/mdx'

interface BrainDashboardProps {
  initialPosts: PostData[]
}

const CATEGORY_MAP: Record<string, { label: string; color: string; bg: string }> = {
  now: { label: 'The Now', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/20' },
  craft: { label: 'The Craft', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/20' },
  garden: { label: 'The Garden', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/20' },
  journey: { label: 'The Journey', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/20' },
}

export default function BrainDashboard({ initialPosts }: BrainDashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  // Lắng nghe URL params để đồng bộ filter category từ trang chủ
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && ['now', 'craft', 'garden', 'journey'].includes(categoryParam)) {
      setActiveCategory(categoryParam)
    } else {
      setActiveCategory('all')
    }
  }, [searchParams])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    // Cập nhật query param trên URL
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/brain?${params.toString()}`, { scroll: false })
  }

  // Lọc bài viết
  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Introduction */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          THE BRAIN (WIKI/DOCS)
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base leading-relaxed">
          Nơi chứa mọi dòng suy nghĩ, kiến thức, mã nguồn thử nghiệm và tài liệu học tập của t. Tất cả được liên kết với nhau.
        </p>
      </div>

      {/* Control Panel (Search & Filters) */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, project, thẻ tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3.5 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'now', 'craft', 'garden', 'journey'].map((cat) => {
            const isSelected = activeCategory === cat
            const meta = CATEGORY_MAP[cat]
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                    : 'bg-white dark:bg-gray-900/30 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {cat === 'all' ? 'TẤT CẢ' : meta?.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Document Grid/List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 font-mono border-b border-gray-200/50 dark:border-gray-800/50 pb-2">
          <span>DANH SÁCH TÀI LIỆU</span>
          <span>{filteredPosts.length} kết quả</span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post) => {
              const meta = CATEGORY_MAP[post.category] || { label: post.category, color: 'text-gray-600', bg: 'bg-gray-100' }
              return (
                <article
                  key={`${post.category}/${post.slug}`}
                  className="p-5 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-900/20 hover:bg-gray-50/50 dark:hover:bg-gray-900/60 hover:border-indigo-200 dark:hover:border-indigo-950/60 hover:shadow-sm transition-all duration-300 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${meta.bg} ${meta.color}`}>
                        {meta.label}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 font-mono">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <Link href={`/brain/${post.category}/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    {post.summary && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    )}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/60 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-800/50 px-2 py-0.5 rounded-full cursor-pointer transition-colors"
                        >
                          <Tag size={10} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
            <FolderOpen className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-700" />
            <h3 className="mt-4 text-sm font-semibold text-gray-950 dark:text-white">Không có ghi chú nào</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
              Hãy thử tìm kiếm với từ khóa khác hoặc chuyển danh mục lọc.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
