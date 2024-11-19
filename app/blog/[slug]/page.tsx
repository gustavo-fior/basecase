import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import 'highlight.js/styles/github-dark.css'
import Layout from '@/components/layout'

type Params = {
  slug: string
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: Params
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
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

export default async function BlogPost(props: Props) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className="py-8">
        <h1 className="text-3xl font-bold mb-4 lowercase">{post.title}</h1>
        <div className="mb-8 text-sm">
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
          className="prose prose-neutral dark:prose-invert max-w-none prose-h1:lowercase prose-h2:lowercase prose-h3:lowercase
                   prose-h1:font-mono prose-h2:font-mono prose-h3:font-mono
                   prose-h1:text-foreground prose-h2:text-foreground prose-h3:text-foreground
                   prose-p:text-foreground
                   prose-code:font-mono prose-code:bg-secondary prose-code:p-1 prose-code:rounded
                   prose-pre:bg-secondary prose-pre:p-4 prose-pre:rounded-lg
                   prose-a:text-primary hover:prose-a:opacity-70
                   prose-strong:text-foreground prose-em:text-muted-foreground
                   prose-blockquote:border-border prose-blockquote:text-muted-foreground
                   prose-li:text-foreground prose-li:marker:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </Layout>
  )
}