import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '../../../../lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

export const revalidate = 0

interface PostPageProps {
  params: {
    category: string
    slug: string
  }
}

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  now:     { label: 'The Now',     color: '#10B981' },
  craft:   { label: 'The Craft',   color: '#3B82F6' },
  garden:  { label: 'The Garden',  color: '#F59E0B' },
  journey: { label: 'The Journey', color: '#EC4899' },
}

export default function PostPage({ params }: PostPageProps) {
  const { category, slug } = params
  const post = getPostBySlug(category, slug)

  if (!post) notFound()

  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)
  const catMeta = CATEGORY_META[category] || { label: category, color: '#A1A1AA' }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '32px', paddingBottom: '80px' }}>

      {/* ── Back link — Minimal Link Button spec ─────────── */}
      <div style={{ marginBottom: '32px' }}>
        <Link
          href={`/brain?category=${category}`}
          className="inline-flex items-center gap-1.5 group transition-all duration-150 no-underline text-[var(--accent-electric)] hover:text-[var(--accent-electric-hover)] hover:underline font-sans text-xs font-normal"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
          Quay lại {catMeta.label}
        </Link>
      </div>

      {/* ── Article Header ────────────────────────────────── */}
      <header style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border-default)' }}>

        {/* Breadcrumb metadata — Breadcrumb Navigation spec */}
        <div
          className="flex flex-wrap items-center gap-2 mb-6"
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: 'var(--text-muted)',
          }}
        >
          {/* Category badge */}
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] font-bold uppercase tracking-wider"
            style={{
              fontSize: '11px',
              backgroundColor: `${catMeta.color}18`,
              color: catMeta.color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catMeta.color }} />
            {catMeta.label}
          </span>

          <span style={{ color: 'var(--border-medium)' }}>/</span>

          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>{post.date}</span>
          </div>

          <span style={{ color: 'var(--border-medium)' }}>/</span>

          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>~{readingTime} phút đọc</span>
          </div>
        </div>

        {/* H1 — Display spec: 54px / 600 / Google Sans */}
        <h1
          style={{
            fontFamily: "'Google Sans', 'Inter', sans-serif",
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 600,
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '16px',
          }}
        >
          {post.title}
        </h1>

        {/* Summary / Lead */}
        {post.summary && (
          <p
            style={{
              fontFamily: "'Google Sans', 'Inter', sans-serif",
              fontSize: '17px',
              fontWeight: 400,
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
              borderLeft: '3px solid #B8D927',
              paddingLeft: '16px',
              fontStyle: 'normal',
              margin: 0,
            }}
          >
            {post.summary}
          </p>
        )}
      </header>

      {/* ── MDX Body ─────────────────────────────────────── */}
      <article className="prose max-w-none">
        <MDXRemote source={post.content} />
      </article>
    </div>
  )
}
