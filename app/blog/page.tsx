import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'blog',
  description: 'first check to future founders',
}

export default async function BlogPage() {
  try {
    const posts = await getAllPosts()

    return (
      <div className="min-h-screen font-mono">
        <div className="px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-mono mb-8">blog</h1>
          <div className="space-y-12">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl font-mono mb-2 group-hover:text-blue-600">
                    {post.meta?.['og:title'] || post.title}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm mb-4 font-mono">
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).toLowerCase()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTimeMin} min read</span>
                    {post.meta?.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{post.meta.author.toLowerCase()}</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 font-mono">
                    {post.meta?.['og:description'] || ''}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen font-mono">
        <div className="px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl font-mono mb-8">blog</h1>
          <p className="text-gray-600">no posts found.</p>
        </div>
      </div>
    )
  }
}
