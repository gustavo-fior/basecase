"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Only render component after first client-side render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 500)
      }}
      className={`
        p-2 rounded-full relative
        ${isAnimating ? 'animate-bounce scale-110' : ''}
        hover:scale-110 transition-all duration-500
      `}
    >
      <div className="w-6 h-6 relative">
        {theme === "dark" ? (
          <Sun className="h-6 w-6 dark:text-white text-black" />
        ) : (
          <Moon className="h-6 w-6 dark:text-white text-black" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
