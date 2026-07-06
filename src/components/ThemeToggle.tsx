'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Đợi mount client để tránh hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="fixed bottom-5 right-5 w-11 h-11" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Chuyển sang Light Mode' : 'Chuyển sang Dark Mode'}
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center transition-all duration-150 w-11 h-11 rounded-[64px] border border-[var(--border-default)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] shadow-[var(--shadow-hover)] cursor-pointer"
    >
      {isDark ? (
        <Sun size={18} style={{ color: '#B8D927' }} />
      ) : (
        <Moon size={18} style={{ color: 'var(--text-secondary)' }} />
      )}
    </button>
  )
}