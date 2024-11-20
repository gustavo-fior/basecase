'use client'

import { useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import EmbeddedTweet from './embedded-tweet'

export default function TweetHydrator({ content }: { content: string }) {
  useEffect(() => {
    try {
      const tweetElements = document.querySelectorAll('div[data-tweet]')
      
      tweetElements.forEach((element) => {
        try {
          const rawData = element.getAttribute('data-tweet')
          if (!rawData) return
          
          const tweetData = JSON.parse(rawData)
          
          const processedTweetData = {
            ...tweetData,
            content: tweetData.content?.replace(/\\n/g, '\n') || '',
            likes: Number(tweetData.likes),
            retweets: Number(tweetData.retweets),
            replies: Number(tweetData.replies),
            verified: Boolean(tweetData.verified),
            mediaUrl: tweetData.mediaUrl || '',
            mediaType: tweetData.mediaType || 'image',
            mediaAspectRatio: tweetData.mediaAspectRatio || ''
          }
                    
          let root = (element as { _reactRoot?: Root })._reactRoot
          if (!root) {
            root = createRoot(element)
            ;(element as { _reactRoot?: Root })._reactRoot = root
          }
          
          root.render(<EmbeddedTweet {...processedTweetData} />)
        } catch (error) {
          console.error('Error processing tweet element:', error)
        }
      })
    } catch (error) {
      console.error('Error in tweet hydration:', error)
    }
  }, [content])

  return null
}
