import { getPost, getRelatedPosts, getAllPostSlugs } from '@/lib/posts'
import { extractHeadings } from '@/lib/headings'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReadingProgress from '@/components/ReadingProgress'
import TableOfContents from '@/components/TableOfContents'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import BlogCard from '@/components/BlogCard'
import Tag from '@/components/Tag'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const related = getRelatedPosts(slug, post.tags, 3)

  return (
    <>
      <ReadingProgress />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        {/* Post Header */}
        <div className="post-header">
          <div className="post-meta">
            <time dateTime={post.date}>{post.date}</time>
            <span className="post-meta-sep">•</span>
            <span>{post.readTime}</span>
            <span className="post-meta-sep">•</span>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#808080',
              lineHeight: 1.6,
              maxWidth: '600px',
            }}
          >
            {post.excerpt}
          </p>
        </div>

        {/* Content + TOC layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: headings.length > 0 ? '1fr 260px' : '1fr',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Article Content */}
          <article>
            <MarkdownRenderer content={post.content} />
          </article>

          {/* Sidebar TOC */}
          {headings.length > 0 && (
            <aside
              style={{
                display: 'none',
              }}
              className="toc-sidebar"
            >
              <style>{`
                @media (min-width: 1024px) {
                  .toc-sidebar { display: block !important; }
                }
              `}</style>
              <TableOfContents headings={headings} />
            </aside>
          )}
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="related-posts">
            <h2
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '1.1rem',
                color: '#FFFFFF',
                marginBottom: '24px',
                fontWeight: 700,
              }}
            >
              Related Articles
            </h2>
            <div className="related-posts-grid">
              {related.map((rp, i) => (
                <BlogCard key={rp.slug} post={rp} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
