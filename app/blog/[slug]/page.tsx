import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import 'highlight.js/styles/github-dark.css'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(await params.slug)
  if (!post) return {}

  return {
    title: post.title.toLowerCase(),
    description: post.meta?.['og:description'] || '',
    openGraph: {
      title: (post.meta?.['og:title'] || post.title).toLowerCase(),
      description: post.meta?.['og:description'] || '',
      images: post.meta?.['og:image'] ? [post.meta['og:image']] : [],
    },
    twitter: {
      card: post.meta?.['twitter:card'] || 'summary',
      title: (post.meta?.['twitter:title'] || post.title).toLowerCase(),
      description: post.meta?.['twitter:description'] || '',
      images: post.meta?.['twitter:image'] ? [post.meta['twitter:image']] : [],
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(await params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen font-mono">
      <div className="px-4 max-w-4xl mx-auto py-8">
        <article className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4 lowercase">{post.title}</h1>
          <div className="mb-8 text-sm text-gray-500">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).toLowerCase()}</time>
            <span className="mx-2">•</span>
            <span>{post.readingTimeMin} min read</span>
            {post.meta?.author && (
              <>
                <span className="mx-2">•</span>
                <span>{post.meta.author.toLowerCase()}</span>
              </>
            )}
          </div>
          <div 
            className="prose prose-invert max-w-none prose-h1:lowercase prose-h2:lowercase prose-h3:lowercase
                       prose-h1:font-mono prose-h2:font-mono prose-h3:font-mono
                       prose-code:font-mono prose-code:bg-gray-800 prose-code:p-1 prose-code:rounded
                       prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg
                       prose-a:text-blue-400 hover:prose-a:text-blue-300
                       prose-strong:text-white prose-em:text-gray-300
                       prose-blockquote:border-gray-700 prose-blockquote:text-gray-400
                       prose-li:marker:text-gray-500"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </div>
    </div>
  )
}