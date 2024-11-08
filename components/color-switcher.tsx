"use client"

import * as React from "react"
import { useCallback } from "react"
import { themeColors, type ThemeColor } from "@/config/colors"

export function ColorThemeSwitcher() {
  const [currentColorKey, setCurrentColorKey] = React.useState<ThemeColor>("blue")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [prevColor, setPrevColor] = React.useState<string>("")

  const setThemeColor = useCallback(() => {
    const colorKeys = Object.keys(themeColors) as ThemeColor[]
    const currentIndex = colorKeys.indexOf(currentColorKey)
    const nextIndex = (currentIndex + 1) % colorKeys.length
    const nextColor = colorKeys[nextIndex]
    
    setPrevColor(getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim())
    
    const colors = themeColors[nextColor]
    const root = document.documentElement
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-background-light', colors.light)
    root.style.setProperty('--color-background-dark', colors.dark)

    setCurrentColorKey(nextColor)
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
      `}
    >
      <div className="w-6 h-6 relative">
        <div 
          className="absolute inset-0 rounded-full transition-all duration-300"
          style={{ 
            background: isAnimating 
              ? `linear-gradient(45deg, ${prevColor}, var(--color-primary))`
              : 'var(--color-primary)'
          }}
        />
      </div>
      <span className="sr-only">Change theme color</span>
    </button>
  )
}