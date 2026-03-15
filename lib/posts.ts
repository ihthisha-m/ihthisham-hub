import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  featured: boolean
  readTime: string
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  featured: boolean
  readTime: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()
}

export function getAllPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(postsDirectory)
    return files
      .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx?$/, ''))
  } catch {
    return []
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter(Boolean) as PostMeta[]

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostMeta(slug: string): PostMeta | null {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const rt = readingTime(content)

    return {
      slug,
      title: data.title ?? 'Untitled',
      date: formatDate(data.date ?? new Date().toISOString()),
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      readTime: `${Math.ceil(rt.minutes)} min read`,
    }
  } catch {
    return null
  }
}

export function getPost(slug: string): Post | null {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`)
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const rt = readingTime(content)

    return {
      slug,
      title: data.title ?? 'Untitled',
      date: formatDate(data.date ?? new Date().toISOString()),
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      readTime: `${Math.ceil(rt.minutes)} min read`,
      content,
    }
  } catch {
    return null
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[], max = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug)
  const scored = all.map((p) => ({
    ...p,
    score: p.tags.filter((t) => tags.includes(t)).length,
  }))
  scored.sort((a, b) => b.score - a.score || 0)
  return scored.slice(0, max)
}
