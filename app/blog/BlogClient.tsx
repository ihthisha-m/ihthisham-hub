'use client'

import { useState, useMemo, useEffect } from 'react'
import { PostMeta } from '@/lib/posts'
import BlogCard from '@/components/BlogCard'
import SearchBar from '@/components/SearchBar'
import SkeletonLoader from '@/components/SkeletonLoader'

const ALL_TAGS = ['All', 'OSCP', 'Bug Bounty', 'Writeups', 'Tools', 'CTF', 'Recon']
const PAGE_SIZE = 9

interface BlogClientProps {
  posts: PostMeta[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [isLoading, setIsLoading] = useState(false)

  // Filter posts
  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        activeTag === 'All' ||
        post.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())

      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))

      return matchesTag && matchesQuery
    })
  }, [posts, query, activeTag])

  const displayed = filtered.slice(0, displayCount)
  const hasMore = displayCount < filtered.length

  // Reset count when filters change
  useEffect(() => {
    setDisplayCount(PAGE_SIZE)
  }, [query, activeTag])

  const loadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setDisplayCount((c) => c + PAGE_SIZE)
      setIsLoading(false)
    }, 600)
  }

  return (
    <>
      {/* Search */}
      <div style={{ marginBottom: '24px' }}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search articles by title, tag or keyword..."
        />
      </div>

      {/* Filter Tags */}
      <div className="filter-tags">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            className={`filter-tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
            id={`filter-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.72rem',
          color: '#4A4A4A',
          marginBottom: '24px',
        }}
      >
        {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="no-results">
          <p className="no-results-title">No articles found</p>
          <p style={{ fontSize: '0.8rem', color: '#4A4A4A' }}>
            Try a different search term or filter
          </p>
        </div>
      ) : (
        <div className="bento-grid">
          {displayed.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              featured={post.featured && index === 0}
              index={index}
            />
          ))}
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonLoader key={`sk-${i}`} />
            ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !isLoading && (
        <div className="load-more-wrapper">
          <button
            className="btn-ghost"
            onClick={loadMore}
            id="load-more-posts-btn"
          >
            Load more articles
          </button>
        </div>
      )}

      {/* End of posts */}
      {!hasMore && filtered.length > PAGE_SIZE && (
        <p
          style={{
            textAlign: 'center',
            marginTop: '48px',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.72rem',
            color: '#4A4A4A',
          }}
        >
          — End of articles —
        </p>
      )}
    </>
  )
}
