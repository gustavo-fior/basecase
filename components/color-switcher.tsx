"use client"

import * as React from "react"
import { useCallback } from "react"
import { themeColors, type ThemeColor } from "@/config/colors"

export function ColorThemeSwitcher() {
  const [currentColorKey, setCurrentColorKey] = React.useState<ThemeColor>("blue")
  const [isAnimating, setIsAnimating] = React.useState(false)

  const setThemeColor = useCallback(() => {
    // Get next color key
    const colorKeys = Object.keys(themeColors) as ThemeColor[]
    const currentIndex = colorKeys.indexOf(currentColorKey)
    const nextIndex = (currentIndex + 1) % colorKeys.length
    const nextColor = colorKeys[nextIndex]
    
    const colors = themeColors[nextColor]
    const root = document.documentElement
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-background-light', colors.light)
    root.style.setProperty('--color-background-dark', colors.dark)

    setCurrentColorKey(nextColor)
    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }, [currentColorKey])

  return (
    <button
      onClick={setThemeColor}
      className={`
        p-2 rounded-full relative
        ${isAnimating ? 'animate-bounce' : ''}
        hover:scale-110 transition-all
        group
      `}
    >
      <div className="w-6 h-6 relative">
        <div 
          className={`
            absolute inset-0 rounded-full z-10 transition-all duration-300
            opacity-0 group-hover:opacity-100
          `}
          style={{
            backgroundImage: 'linear-gradient(45deg, #5b2d7a 0%, #2d4b7a 19%, #2d5a27 39%, #ce4b01 60%, #b80002 80%, #ab2d5a 100%)',
            backgroundColor: '#5b2d7a'
          }}
        />
        <div 
          className="absolute inset-0 rounded-full transition-colors group-hover:opacity-0"
          style={{ backgroundColor: themeColors[currentColorKey].primary }}
        />
      </div>
      <span className="sr-only">Change theme color</span>
    </button>
  )
}