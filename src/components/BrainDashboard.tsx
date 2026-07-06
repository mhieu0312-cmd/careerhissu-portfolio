'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Calendar, FolderOpen, Tag, X, ArrowRight } from 'lucide-react'
import { PostData } from '../lib/mdx'

interface BrainDashboardProps {
  initialPosts: PostData[]
}

// Map màu sắc cho từng category — theo Design System accent colors
const CATEGORY_META: Record<string, { label: string; dotColor: string; bgColor: string; textColor: string }> = {
  now: {
    label: 'The Now',
    dotColor: '#10B981',
    bgColor: '#F0FDF4',
    textColor: '#059669',
  },
  craft: {
    label: 'The Craft',
    dotColor: '#3B82F6',
    bgColor: '#EFF6FF',
    textColor: '#2563EB',
  },
  garden: {
    label: 'The Garden',
    dotColor: '#F59E0B',
    bgColor: '#FFFBEB',
    textColor: '#D97706',
  },
  journey: {
    label: 'The Journey',
    dotColor: '#EC4899',
    bgColor: '#FDF2F8',
    textColor: '#DB2777',
  },
}

// Dark mode fallback cho category colors
const CATEGORY_META_DARK: Record<string, { bgColor: string; textColor: string }> = {
  now:    { bgColor: '#022C22', textColor: '#34D399' },
  craft:  { bgColor: '#1E3A5F', textColor: '#60A5FA' },
  garden: { bgColor: '#451A03', textColor: '#FBBF24' },
  journey:{ bgColor: '#500724', textColor: '#F472B6' },
}

const FILTER_TABS = ['all', 'now', 'craft', 'garden', 'journey'] as const

export default function BrainDashboard({ initialPosts }: BrainDashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [isDark, setIsDark] = useState(false)

  // Đồng bộ filter category từ URL params
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && ['now', 'craft', 'garden', 'journey'].includes(cat)) {
      setActiveCategory(cat)
    } else {
      setActiveCategory('all')
    }
  }, [searchParams])

  // Detect dark mode
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains('dark'))
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'all') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/brain?${params.toString()}`, { scroll: false })
  }

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCat = activeCategory === 'all' || post.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      (post.summary && post.summary.toLowerCase().includes(q)) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)))
    return matchesCat && matchesSearch
  })

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '64px' }}>

      {/* ── Page Header ──────────────────────────────────────── */}
      <div style={{ marginBottom: '40px' }}>
        {/* H1 — 48px / 500 / Google Sans */}
        <h1
          style={{
            fontFamily: "'Google Sans', 'Inter', sans-serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 500,
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          THE BRAIN
        </h1>
        <p
          style={{
            fontFamily: "'Google Sans', 'Inter', sans-serif",
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
          }}
        >
          Nơi chứa mọi dòng suy nghĩ, kiến thức, mã nguồn thử nghiệm và tài
          liệu học tập. Tất cả đều được liên kết với nhau.
        </p>
      </div>

      {/* ── Search & Filter ────────────────────────────────── */}
      <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Search Input — theo Text Input Field spec */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2"
            size={16}
            style={{ color: 'var(--text-placeholder)' }}
          />
          <input
            id="brain-search"
            type="text"
            placeholder="Tìm kiếm bài học, project, thẻ tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: '44px',
              paddingRight: searchQuery ? '44px' : '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              borderRadius: '8px',
              border: '1px solid var(--border-medium)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3B82F6'
              e.target.style.boxShadow = '0px 0px 0px 3px rgba(59, 130, 246, 0.15)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-medium)'
              e.target.style.boxShadow = 'none'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-150 text-[var(--text-placeholder)] bg-transparent hover:bg-[var(--bg-tertiary)] border-none cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Tabs — Pill shape (border-radius 23px), Secondary Button spec active = Neon Lime */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((cat) => {
            const isActive = activeCategory === cat
            const meta = CATEGORY_META[cat]
            const label = cat === 'all' ? 'Tất cả' : meta?.label

            return (
              <button
                key={cat}
                id={`filter-${cat}`}
                onClick={() => handleCategoryChange(cat)}
                className={`inline-flex items-center gap-1.5 h-8 px-[14px] rounded-[23px] font-inter text-[13px] font-semibold transition-all duration-150 cursor-pointer
                  ${isActive 
                    ? 'bg-[#B8D927] border-[1.5px] border-[#B8D927] text-[#272D1F]' 
                    : 'bg-transparent border border-[var(--border-medium)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--border-strong)]'
                  }`}
              >
                {meta?.dotColor && cat !== 'all' && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isActive ? '#272D1F' : meta.dotColor }}
                  />
                )}
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Results Header ────────────────────────────────── */}
      <div
        className="flex items-center justify-between pb-3 mb-4"
        style={{
          borderBottom: '1px solid var(--border-default)',
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--text-placeholder)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span>Danh sách tài liệu</span>
        <span>{filteredPosts.length} kết quả</span>
      </div>

      {/* ── Document List ─────────────────────────────────── */}
      {filteredPosts.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredPosts.map((post) => {
            const meta = CATEGORY_META[post.category] || {
              label: post.category,
              dotColor: '#A1A1AA',
              bgColor: '#FAFAFA',
              textColor: '#71717A',
            }
            const darkMeta = CATEGORY_META_DARK[post.category]

            return (
              <article
                key={`${post.category}/${post.slug}`}
                className="group relative flex flex-col gap-3 p-6 rounded-[12px] border transition-all duration-200 bg-[var(--bg-primary)] border-[var(--border-default)] hover:shadow-[var(--shadow-hover)] hover:border-[var(--border-medium)]"
              >
                {/* Category + Date */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: isDark && darkMeta ? darkMeta.bgColor : meta.bgColor,
                      color: isDark && darkMeta ? darkMeta.textColor : meta.textColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: isDark && darkMeta ? darkMeta.textColor : meta.dotColor }}
                    />
                    {meta.label}
                  </span>
                  <div
                    className="flex items-center gap-1.5"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-placeholder)' }}
                  >
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Google Sans', 'Inter', sans-serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '1.4',
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  <Link
                    href={`/brain/${post.category}/${post.slug}`}
                    className="transition-colors duration-150 no-underline text-[var(--text-primary)] hover:text-[var(--accent-electric)]"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Summary */}
                {post.summary && (
                  <p
                    className="line-clamp-2"
                    style={{
                      fontFamily: "'Google Sans', 'Inter', sans-serif",
                      fontSize: '14px',
                      lineHeight: '1.65',
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    {post.summary}
                  </p>
                )}

                {/* Tags — pill spec */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="tag-pill cursor-pointer"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read link — top-right hover arrow */}
                <div className="flex justify-end">
                  <Link
                    href={`/brain/${post.category}/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: 'var(--accent-electric)',
                      textDecoration: 'none',
                    }}
                  >
                    Đọc bài <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="flex flex-col items-center justify-center py-20 rounded-[12px] border border-dashed"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-secondary)' }}
        >
          <FolderOpen size={40} style={{ color: 'var(--border-medium)', marginBottom: '16px' }} />
          <p
            style={{
              fontFamily: "'Google Sans', 'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            Không có ghi chú nào
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: 'var(--text-muted)',
            }}
          >
            Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục lọc.
          </p>
        </div>
      )}
    </div>
  )
}
