'use client'

import { useEffect } from 'react'
import { createRoot, Root } from 'react-dom/client'
import EmbeddedVideo from './embedded-video'

export default function VideoHydrator({ content }: { content: string }) {
  useEffect(() => {
    try {
      const videoElements = document.querySelectorAll('div[data-video]')
      
      videoElements.forEach((element) => {
        try {
          const rawData = element.getAttribute('data-video')
          if (!rawData) return
          
          const videoData = JSON.parse(rawData)
          
          const processedVideoData = {
            ...videoData,
            aspectRatio: videoData.aspectRatio || '16/9',
            type: videoData.type || 'video/mp4'
          }
                    
          let root = (element as { _reactRoot?: Root })._reactRoot
          if (!root) {
            root = createRoot(element)
            ;(element as { _reactRoot?: Root })._reactRoot = root
          }
          
          root.render(<EmbeddedVideo {...processedVideoData} />)
        } catch (error) {
          console.error('Error processing video element:', error)
        }
      })
    } catch (error) {
      console.error('Error in video hydration:', error)
    }
  }, [content])

  return null
}
