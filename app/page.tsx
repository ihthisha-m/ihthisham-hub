import { getAllPosts } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ihthisham — Offensive Security Researcher',
  description:
    'Offensive security research, OSCP preparation journey, bug bounty writeups, and CTF walkthroughs.',
}

export default function HomePage() {
  const allPosts = getAllPosts()
  const latestPosts = allPosts.slice(0, 3)

  return (
    <>
      {/* ──────────────── HERO ──────────────── */}
      <section className="hero-section dot-matrix-bg" id="hero">
        {/* Background overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(255,0,0,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Name with glitch effect */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-title">
            <span className="hero-title-glitch" data-text="IHTHISHAM">
              IHTHISHAM
            </span>
          </h1>

          <p className="hero-tagline">
            <span>Offensive Security</span> Research &amp; Writeups
          </p>

          <div className="hero-cta">
            <Link href="/blog" className="btn-primary" id="hero-blog-btn">
              Read Articles →
            </Link>
            <Link href="/about" className="btn-ghost" id="hero-about-btn">
              About Me
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-dot" />
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ──────────────── LATEST POSTS ──────────────── */}
      {latestPosts.length > 0 && (
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '80px 24px',
          }}
          id="latest-posts"
        >
          <div className="section-header">
            <h2 className="section-title">Recent Articles</h2>
            <Link
              href="/blog"
              className="section-subtitle"
              style={{ transition: 'color 200ms', textDecoration: 'none' }}
              id="view-all-posts-link"
            >
              View all →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {latestPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
            <Link href="/blog" className="btn-ghost" id="view-all-posts-btn">
              View all posts →
            </Link>
          </div>
        </section>
      )}

      {/* ──────────────── STATS BAR ──────────────── */}
      <section
        style={{
          borderTop: '1px solid #1F1F1F',
          borderBottom: '1px solid #1F1F1F',
          padding: '32px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {[
            { label: 'Articles Published', value: String(allPosts.length).padStart(2, '0') },
            { label: 'OSCP Progress', value: '~60%' },
            { label: 'Topics Covered', value: '05+' },
            { label: 'Status', value: 'Active' },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#FF0000',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {value}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#4A4A4A', fontFamily: 'Space Mono, monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
