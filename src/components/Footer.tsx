import { Github, Facebook, Mail } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'mailto:example@domain.com', icon: Mail, label: 'Email' },
]

export default function Footer() {
  return (
    <footer
      className="w-full border-t py-8 mt-16 transition-colors duration-200"
      style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright — Link spec: sans-serif 12px/400 */}
        <p
          className="text-xs"
          style={{ fontFamily: 'sans-serif', color: 'var(--text-muted)' }}
        >
          © 2026 Hissu. Thiết kế &amp; phát triển từ con số 0.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-colors duration-150 text-[var(--text-placeholder)] hover:text-[var(--text-primary)]"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
