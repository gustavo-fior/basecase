"use client"

import * as React from "react"
import { useCallback } from "react"
import { themeColors, type ThemeColor } from "@/config/colors"

export function ColorThemeSwitcher() {
  const [currentColorKey, setCurrentColorKey] = React.useState<ThemeColor>("blue")
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [prevColor, setPrevColor] = React.useState<string>("")
  const [nextColorPreview, setNextColorPreview] = React.useState<string>("")

  const setThemeColor = useCallback(() => {
    const colorKeys = Object.keys(themeColors) as ThemeColor[]
    const currentIndex = colorKeys.indexOf(currentColorKey)
    const nextIndex = (currentIndex + 1) % colorKeys.length
    const nextColor = colorKeys[nextIndex]
    
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
    setNextColorPreview(themeColors[nextColor].primary)
    
    setIsAnimating(true)
    
    setTimeout(() => {
      const colors = themeColors[nextColor]
      const root = document.documentElement
      
      root.style.setProperty('--color-primary', colors.primary)
      root.style.setProperty('--color-secondary', colors.secondary)
      root.style.setProperty('--color-background-light', colors.light)
      root.style.setProperty('--color-background-dark', colors.dark)

      setCurrentColorKey(nextColor)
      setIsAnimating(false)
    }, 500)
    
    setPrevColor(currentColor)
  }, [currentColorKey])

  const getNextColor = () => {
    const colorKeys = Object.keys(themeColors) as ThemeColor[]
    const currentIndex = colorKeys.indexOf(currentColorKey)
    const nextIndex = (currentIndex + 1) % colorKeys.length
    return themeColors[colorKeys[nextIndex]].primary
  }

  return (
    <button
      onClick={setThemeColor}
      className={`
        p-2 rounded-full relative
        ${isAnimating ? 'animate-bounce scale-110' : ''}
        hover:scale-110 transition-all duration-500
        max-sm:bg-gray-100 max-sm:dark:bg-gray-800
        w-10 h-10
      `}
    >
      <div className="w-6 h-6 relative">
        <div 
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{ 
            background: `linear-gradient(45deg, ${prevColor || 'var(--color-primary)'}, ${
              isAnimating ? nextColorPreview : getNextColor()
            })`
          }}
        />
      </div>
      <span className="sr-only">Change theme color</span>
    </button>
  )
}