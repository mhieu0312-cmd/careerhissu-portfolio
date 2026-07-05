'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Brain, Calendar, Compass } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: 'THE PORTAL', href: '/', icon: Compass },
    { name: 'THE BRAIN', href: '/brain', icon: Brain },
    { name: 'THE TIMELINE', href: '/timeline', icon: Calendar },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/40 bg-white/80 backdrop-blur-md dark:border-gray-800/40 dark:bg-gray-950/80 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="font-bold text-sm">H</span>
          </div>
          <span className="font-semibold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
            Hissu.dev
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
