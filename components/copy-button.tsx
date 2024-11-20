'use client'

import { useEffect } from 'react'

export default function CopyButton() {
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('pre')
      
      codeBlocks.forEach(codeBlock => {
        if (codeBlock.querySelector('.copy-button')) return
        
        const copyButton = document.createElement('button')
        copyButton.className = 'copy-button'
        copyButton.innerHTML = '<svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'
        
        copyButton.addEventListener('click', async () => {
          const code = codeBlock.textContent || ''
          await navigator.clipboard.writeText(code)
          
          copyButton.innerHTML = '<svg class="copy-icon text-green-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>'
          
          setTimeout(() => {
            copyButton.innerHTML = '<svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>'
          }, 2000)
        })
        
        codeBlock.style.position = 'relative'
        codeBlock.appendChild(copyButton)
      })
    }

    // Initial setup
    addCopyButtons()

    // Optional: Setup MutationObserver for dynamic content
    const observer = new MutationObserver(() => {
      addCopyButtons()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
