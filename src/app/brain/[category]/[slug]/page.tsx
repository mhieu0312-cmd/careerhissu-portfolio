import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug } from '../../../../lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Calendar, Clock, ArrowLeft, Folder } from 'lucide-react'

// Thiết lập render động để luôn cập nhật nội dung bài viết mới nhất
export const revalidate = 0

interface PostPageProps {
  params: {
    category: string;
    slug: string;
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  now: 'The Now',
  craft: 'The Craft',
  garden: 'The Garden',
  journey: 'The Journey',
}

export default function PostPage({ params }: PostPageProps) {
  const { category, slug } = params
  
  const post = getPostBySlug(category, slug)

  if (!post) {
    notFound()
  }

  // Tính thời gian đọc ước tính (khoảng 200 từ / phút)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="space-y-8 py-4 animate-fade-in">
      {/* Back Button */}
      <div>
        <Link
          href={`/brain?category=${category}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Quay lại {CATEGORY_LABELS[category] || category}
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-gray-200/50 dark:border-gray-800/50 pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
          <div className="flex items-center gap-1">
            <Folder size={14} />
            <span className="uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-400">
              {CATEGORY_LABELS[category] || category}
            </span>
          </div>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>~{readingTime} phút đọc</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-light italic">
            "{post.summary}"
          </p>
        )}
      </div>

      {/* Markdown Content rendered as HTML */}
      <article className="prose dark:prose-invert max-w-none pb-12">
        <MDXRemote source={post.content} />
      </article>
    </div>
  )
}
