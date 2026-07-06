import Link from 'next/link'
import { getPostBySlug } from '../lib/mdx'
import { ArrowRight, Sprout, Hammer, Sparkles, Milestone } from 'lucide-react'

export const revalidate = 0

export default function HomePage() {
  // Lấy dữ liệu động The Now từ content/now/now.mdx
  const nowPost = getPostBySlug('now', 'now')
  const nowText =
    nowPost?.summary ||
    'Đang cùng với con AI tên là Sil học cách kiến trúc web bằng tay, setup bộ khung Next.js + Tailwind CSS.'
  const nowDate = nowPost?.date || '2026-07-05'

  const dimensions = [
    {
      name: 'The Now',
      desc: 'Tuần này t đang học gì, làm gì? Cập nhật nhanh về thói quen và mục tiêu ngắn hạn.',
      href: '/brain?category=now',
      Icon: Sparkles,
      accent: '#10B981', // emerald
    },
    {
      name: 'The Craft',
      desc: 'Sản phẩm thực tế: đồ án môn học, code thử nghiệm và các tool tự viết.',
      href: '/brain?category=craft',
      Icon: Hammer,
      accent: '#3B82F6', // blue
    },
    {
      name: 'The Garden',
      desc: 'Vườn tri thức số: ghi chép công nghệ, giải thuật, cấu trúc dữ liệu và tóm tắt sách.',
      href: '/brain?category=garden',
      Icon: Sprout,
      accent: '#F59E0B', // amber
    },
    {
      name: 'The Journey',
      desc: 'Lịch sử tiến hóa cá nhân: timeline năm 1, mục tiêu năm 2 và kế hoạch 10 năm.',
      href: '/timeline',
      Icon: Milestone,
      accent: '#EC4899', // pink
    },
  ]

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '64px' }}>

      {/* ── Hero Section ──────────────────────────────────────── */}
      <section style={{ marginBottom: '64px', maxWidth: '720px' }}>
        {/* Badge "Open to Learn" */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span
            className="relative flex h-2.5 w-2.5"
          >
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: '#B8D927' }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: '#B8D927' }}
            />
          </span>
          <span
            className="btn-secondary flex items-center gap-2 duration-10 font-inter text-xs font-semibold"
            style={{ fontFamily: "'Inter', sans-serif", color: '#B8D927' }}
          >
            Đang học · Năm 1 CNTT
          </span>
        </div>

        {/* H1 — 54px / 600 / Google Sans */}
        <h1
          className="mb-6 leading-tight"
          style={{
            fontFamily: "'Google Sans', 'Inter', sans-serif",
            fontSize: 'clamp(36px, 6vw, 54px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          Xin chào, tôi là{' '}
          <span
            className="relative inline-block"
          >
            <span className="relative z-10">Hiếu</span>
            {/* Neon lime highlight underline */}
            <span
              className="absolute bottom-1 left-0 right-0 h-2 -z-0 opacity-40 rounded"
              style={{ backgroundColor: '#B8D927' }}
            />
          </span>
          .
        </h1>

        {/* Body — Google Sans 14px / muted */}
        <p
          className="leading-relaxed"
          style={{
            fontFamily: "'Google Sans', 'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '1.75',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
          }}
        >
          Tôi là sinh viên ngành Công nghệ thông tin năm thứ nhất. Đây không
          phải là một CV tĩnh — đây là hệ thống{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            Second Brain
          </strong>{' '}
          và{' '}
          <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            Hành trình 10 năm
          </strong>{' '}
          ghi chép lại quá trình phát triển tư duy, viết code và tích lũy kiến
          thức mỗi ngày.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Link
            href="/brain"
            className="btn-primary flex items-center gap-2 no-underline"
            style={{ textDecoration: 'none' }}
          >
            Khám phá The Brain
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/timeline"
            className="btn-secondary flex items-center gap-2 no-underline"
            style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
          >
            Xem Timeline
          </Link>
        </div>
      </section>

      {/* ── The Now Widget — Elevated Card ────────────────────── */}
      <section style={{ marginBottom: '64px' }}>
        <div
          className="relative overflow-hidden rounded-[12px] p-6 transition-shadow duration-200 hover:shadow-[0px_4px_12px_rgba(9,9,11,0.06)]"
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-default)',
            boxShadow: '0px 4px 12px rgba(9, 9, 11, 0.04)',
          }}
        >
          {/* Subtle lime glow trang trí */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
            style={{ backgroundColor: '#B8D927', transform: 'translate(30%, -30%)' }}
          />

          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: '#B8D927' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: '#B8D927' }}
                />
              </span>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ fontFamily: "'Inter', sans-serif", color: '#B8D927' }}
              >
                The Now — Tuần này
              </span>
            </div>
            <span
              className="text-xs font-mono"
              style={{ color: 'var(--text-placeholder)' }}
            >
              Cập nhật: {nowDate}
            </span>
          </div>

          {/* Content */}
          <p
            className="leading-relaxed"
            style={{
              fontFamily: "'Google Sans', 'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: '1.7',
              color: 'var(--text-secondary)',
            }}
          >
            {nowText}
          </p>

          {/* Link */}
          <div className="flex justify-end mt-4">
            <Link
              href="/brain?category=now"
              className="inline-flex items-center gap-1 text-xs font-semibold group text-[var(--accent-electric)] hover:text-[var(--accent-electric-hover)] hover:underline no-underline font-inter"
            >
              Xem nhật ký tuần này
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4 Dimension Cards ─────────────────────────────────── */}
      <section>
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontFamily: "'Google Sans', 'Inter', sans-serif",
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '28px',
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            Khám phá 4 Chiều Không Gian
          </h2>
          <p
            style={{
              fontFamily: "'Google Sans', 'Inter', sans-serif",
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
            }}
          >
            Dữ liệu được tổ chức có hệ thống để liên kết lý thuyết, thực hành và hành trình phát triển bản thân.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map(({ name, desc, href, Icon, accent }) => (
            <Link
              key={name}
              href={href}
              className="group relative overflow-hidden flex flex-col gap-4 p-6 rounded-[12px] border transition-all duration-200 no-underline bg-[var(--bg-secondary)] border-[var(--border-default)] hover:shadow-[var(--shadow-hover)] hover:border-[var(--border-medium)]"
            >
              {/* Subtle accent glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.08] blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.15]"
                style={{ backgroundColor: accent, transform: 'translate(30%, -30%)' }}
              />

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">
                {/* Card title H3 spec */}
                <h3
                  className="flex items-center gap-1.5 mb-2"
                  style={{
                    fontFamily: "'Google Sans', 'Inter', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px',
                    color: 'var(--text-primary)',
                  }}
                >
                  {name}
                  <ArrowRight
                    size={14}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    style={{ color: 'var(--text-placeholder)' }}
                  />
                </h3>
                <p
                  style={{
                    fontFamily: "'Google Sans', 'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}