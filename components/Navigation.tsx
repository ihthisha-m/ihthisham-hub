'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ExternalLink, Menu, X } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        className="nav-desktop"
        style={{ background: isOpen ? 'rgba(0,0,0,0.97)' : undefined }}
      >
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            ihthisham
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            <Link
              href="/blog"
              className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            <a
              href="https://github.com/ihthisham"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-external"
              id="nav-github-link"
            >
              GitHub
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            id="nav-hamburger-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="nav-drawer" id="nav-mobile-drawer">
          <Link href="/blog" className={isActive('/blog') ? 'active' : ''} style={{ color: isActive('/blog') ? '#FF0000' : undefined }}>
            Blog
          </Link>
          <Link href="/about" className={isActive('/about') ? 'active' : ''} style={{ color: isActive('/about') ? '#FF0000' : undefined }}>
            About
          </Link>
          <a
            href="https://github.com/ihthisham"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </>
  )
}
