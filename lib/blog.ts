import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeFormat from 'rehype-format'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'
import { h } from 'hastscript'
import type { Node } from 'unist'
import type { Element } from 'hast'

export interface BlogPost {
  slug: string
  content: string
  meta: {
    'og:title'?: string
    'og:description'?: string
    'og:image'?: string
    'twitter:image'?: string
    'twitter:card'?: string
    'twitter:title'?: string
    'twitter:description'?: string
    author?: string
  }
  title: string
  date: string
  readingTimeMin: number
  hidden: boolean
  isDraft: boolean
}

const postsDirectory = path.join(process.cwd(), 'app/blog')

function createTweetComponent() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'tweet') {
        const props = node.properties || {}
        
        // Helper function to safely convert string numbers
        const parseNumericProp = (value: unknown): number => {
          if (typeof value === 'string') {
            return Number(value.replace(/[{}]/g, ''))
          }
          if (typeof value === 'number') {
            return value
          }
          return 0
        }

        // Convert string numbers and booleans to proper types
        const tweetData = {
          name: String(props.name || ''),
          handle: String(props.handle || ''),
          content: String(props.content || ''),
          avatar: String(props.avatar || ''),
          date: String(props.date || ''),
          likes: parseNumericProp(props.likes),
          retweets: parseNumericProp(props.retweets),
          replies: parseNumericProp(props.replies),
          verified: props.verified === 'true' || props.verified === '{true}',
          url: String(props.url || ''),
          mediaUrl: String(props.mediaurl || props.mediaUrl || ''),
          mediaType: String(props.mediatype || props.mediaType || 'image'),
          mediaAspectRatio: String(props.mediaaspectratio || props.mediaAspectRatio || '')
        }
                
        const tweetNode = h('div', {
          className: 'tweet-embed my-4',
          'data-tweet': JSON.stringify(tweetData)
        })
        
        Object.assign(node, tweetNode)
      }
    })
  }
}

function addTargetBlankToLinks() {
  return (tree: Node) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'a') {
        node.properties = node.properties || {}
        node.properties.target = '_blank'
        node.properties.rel = 'noopener noreferrer'
      }
    })
  }
}

async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(createTweetComponent)
    .use(addTargetBlankToLinks)
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(content)

  return result.toString()
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Add drafts directory to search paths in development
    const searchPaths = [postsDirectory]
    if (process.env.NODE_ENV === 'development') {
      searchPaths.push(path.join(postsDirectory, 'drafts'))
    }

    // Get files from all search paths
    const allFiles = await Promise.all(
      searchPaths.map(dir => fs.promises.readdir(dir).catch(() => []))
    )
    
    const allPosts = await Promise.all(
      allFiles.flat()
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx$/, '')
          const possiblePaths = searchPaths.map(dir => path.join(dir, fileName))
          const fullPath = possiblePaths.find(p => fs.existsSync(p)) || possiblePaths[0]
          
          const fileContents = await fs.promises.readFile(fullPath, 'utf8')
          const { data } = matter(fileContents)

          // Add isDraft flag based on file location
          const isDraft = fullPath.includes(path.join('blog', 'drafts'))

          return {
            slug,
            content: '',
            meta: data.meta || {},
            title: data.title || '',
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            readingTimeMin: data.readingTimeMin || 1,
            hidden: data.hidden || false,
            isDraft,
          }
        })
    )

    // Filter posts based on environment and draft status
    const visiblePosts = allPosts.filter(post => {
      if (process.env.NODE_ENV === 'production') {
        return !post.hidden
      }
      // In development, hide posts that are both draft AND hidden
      return !(post.isDraft && post.hidden)
    })

    return visiblePosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const searchPaths = [
      path.join(postsDirectory, `${slug}.mdx`),
      process.env.NODE_ENV === 'development' 
        ? path.join(postsDirectory, 'drafts', `${slug}.mdx`)
        : null
    ].filter(Boolean) as string[]

    // Try to find the file in any of the possible paths
    const fullPath = searchPaths.find(p => fs.existsSync(p))
    if (!fullPath) {
      throw new Error('Post not found')
    }

    const fileContents = await fs.promises.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await processMarkdown(content)

    return {
      slug,
      content: processedContent,
      meta: data.meta || {},
      title: data.title || '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      readingTimeMin: data.readingTimeMin || 1,
      hidden: data.hidden || false,
      isDraft: false,
    }
  } catch (error) {
    console.error('Error getting post by slug:', error)
    return null
  }
}
