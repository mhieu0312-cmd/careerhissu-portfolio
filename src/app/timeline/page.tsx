import Link from 'next/link'
import { getAllPosts } from '../../lib/mdx'
import { ArrowRight, Milestone, Sparkles } from 'lucide-react'

export const revalidate = 0

export default function TimelinePage() {
  const journeyPosts = getAllPosts('journey')

  return (
    <div className="animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <div style={{ marginBottom: '48px' }}>
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
          ⏳ THE TIMELINE
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
          Dòng thời gian ghi chép lại các cột mốc quan trọng, bài học kinh
          nghiệm xương máu và định hướng tương lai qua từng học kỳ và từng năm học.
        </p>
      </div>

      {journeyPosts.length > 0 ? (
        /* Timeline track */
        <div
          className="relative"
          style={{
            marginLeft: '20px',
            paddingLeft: '32px',
            borderLeft: '2px solid var(--border-default)',
          }}
        >
          {journeyPosts.map((post, idx) => {
            const isMilestone = post.milestone === true || idx === 0

            return (
              <div
                key={post.slug}
                className="relative group"
                style={{ marginBottom: '32px' }}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute transition-all duration-200"
                  style={{
                    left: '-41px',
                    top: '24px',
                    width: isMilestone ? '18px' : '14px',
                    height: isMilestone ? '18px' : '14px',
                    marginLeft: isMilestone ? '-2px' : '0px',
                    borderRadius: '50%',
                    backgroundColor: isMilestone ? '#B8D927' : 'var(--border-medium)',
                    border: `2px solid var(--bg-primary)`,
                    boxShadow: isMilestone ? '0 0 0 3px rgba(184, 217, 39, 0.25)' : 'none',
                    zIndex: 1,
                  }}
                />

                {/* Content Card — Default Card spec */}
                <div
                  className="flex flex-col gap-3 p-6 rounded-[12px] border transition-all duration-200 group-hover:shadow-[0px_4px_12px_rgba(9,9,11,0.04)] group-hover:border-[var(--border-medium)]"
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border-default)',
                  }}
                >
                  {/* Period badge + Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center gap-1.5"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isMilestone ? '#272D1F' : 'var(--text-muted)',
                        backgroundColor: isMilestone ? '#B8D927' : 'var(--bg-tertiary)',
                        padding: '3px 10px',
                        borderRadius: '23px',
                        border: `1px solid ${isMilestone ? '#B8D927' : 'var(--border-default)'}`,
                      }}
                    >
                      {isMilestone && <Sparkles size={10} />}
                      {post.period || 'Mốc Thời Gian'}
                    </span>

                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        color: 'var(--text-placeholder)',
                      }}
                    >
                      {post.date}
                    </span>
                  </div>

                  {/* Title — H3 spec: 20px / 500 */}
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Google Sans', 'Inter', sans-serif",
                        fontSize: '20px',
                        fontWeight: 500,
                        lineHeight: '28px',
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {post.title}
                    </h2>
                    {post.subtitle && (
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '13px',
                          color: 'var(--text-placeholder)',
                          margin: 0,
                        }}
                      >
                        {post.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  {post.summary && (
                    <p
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

                  {/* Read link — Minimal Link Button spec */}
                  <div className="flex justify-end">
                    <Link
                      href={`/brain/journey/${post.slug}`}
                      className="inline-flex items-center gap-1 group/link no-underline text-[var(--accent-electric)] hover:text-[var(--accent-electric-hover)] hover:underline font-sans text-xs font-normal"
                    >
                      Đọc chi tiết hành trình
                      <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="flex flex-col items-center justify-center py-20 rounded-[12px] border border-dashed"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-secondary)' }}
        >
          <Milestone size={40} style={{ color: 'var(--border-medium)', marginBottom: '16px' }} />
          <p
            style={{
              fontFamily: "'Google Sans', 'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '6px',
            }}
          >
            Chưa có cột mốc nào
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-muted)' }}>
            Hành trình đang được cập nhật. Hãy quay lại sau!
          </p>
        </div>
      )}
    </div>
  )
}