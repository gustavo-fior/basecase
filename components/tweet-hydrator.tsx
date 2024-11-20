'use client'

import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import EmbeddedTweet from './embedded-tweet'

export default function TweetHydrator({ content }: { content: string }) {
  useEffect(() => {
    const tweetElements = document.querySelectorAll('div[data-tweet]')
    
    tweetElements.forEach((element) => {
      const tweetData = JSON.parse(element.getAttribute('data-tweet') || '{}')
      
      const processedTweetData = {
        ...tweetData,
        content: tweetData.content.replace(/\\n/g, '\n')
      }
      
      let root = (element as any)._reactRoot
      if (!root) {
        root = createRoot(element)
        ;(element as any)._reactRoot = root
      }
      
      root.render(<EmbeddedTweet {...processedTweetData} />)
    })

    return () => {
      tweetElements.forEach((element) => {
        const root = (element as any)._reactRoot
        if (root) {
          root.unmount()
          delete (element as any)._reactRoot
        }
      })
    }
  }, [content])

  return null
}
