import { getAllPosts } from '@/lib/posts'
import BlogClient from './BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all cybersecurity writeups, OSCP prep notes, bug bounty reports, and CTF walkthroughs.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">All Articles</h1>
        <p className="page-description">
          Cybersecurity writeups, OSCP journey, and bug bounty notes.
        </p>
      </div>

      <BlogClient posts={posts} />
    </div>
  )
}
