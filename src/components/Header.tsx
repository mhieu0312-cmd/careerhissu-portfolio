'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { name: 'Portal', href: '/' },
  { name: 'The Brain', href: '/brain' },
  { name: 'The Timeline', href: '/timeline' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border-default)] bg-[var(--bg-primary)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          {/* Logo mark — Neon Lime square */}
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center font-bold text-sm transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: '#B8D927', color: '#272D1F' }}
          >
            H
          </div>
          <span
            className="font-semibold text-[15px] tracking-tight transition-colors duration-200"
            style={{ fontFamily: "'Google Sans', 'Inter', sans-serif", color: 'var(--text-primary)' }}
          >
            Hissu.dev
          </span>
        </Link>

        {/* Navigation — theo spec: Inter 16px/600, h-8, px-3, border-radius 12px */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center h-8 px-3 rounded-[12px] text-sm font-semibold transition-all duration-150 font-inter no-underline
                  ${isActive 
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]' 
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {item.name}
                {/* Active indicator — neon lime underline */}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: '#B8D927' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
