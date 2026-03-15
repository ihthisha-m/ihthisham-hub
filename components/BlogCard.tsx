import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import Tag from './Tag'

interface BlogCardProps {
  post: PostMeta
  featured?: boolean
  style?: React.CSSProperties
  index?: number
}

export default function BlogCard({ post, featured, style, index = 0 }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`blog-card ${featured ? 'featured' : ''}`}
      style={{
        animationDelay: `${700 + index * 100}ms`,
        animation: `fadeSlideUp 400ms ease-out ${700 + index * 100}ms both`,
        ...style,
      }}
      id={`blog-card-${post.slug}`}
    >
      {/* Featured Badge */}
      {featured && post.featured && (
        <div className="featured-badge">
          <span>★</span>
          Featured
        </div>
      )}

      {/* Meta */}
      <div className="card-meta">
        <time dateTime={post.date}>{post.date}</time>
        <span className="card-meta-dot">•</span>
        <span>{post.readTime}</span>
      </div>

      {/* Title */}
      <h3 className="card-title">{post.title}</h3>

      {/* Excerpt */}
      <p className="card-excerpt">{post.excerpt}</p>

      {/* Footer */}
      <div className="card-footer">
        <div className="card-tags">
          {post.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="card-arrow">→</span>
      </div>
    </Link>
  )
}
