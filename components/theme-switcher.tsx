"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ModeToggle({ isScrolled }: { isScrolled: boolean }) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only render component after first client-side render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`bg-gray-100 dark:bg-gray-800 px-4 py-2 hover:text-[var(--color-primary)] rounded relative ${
        isScrolled ? 'backdrop-blur-sm bg-gray-100/50 dark:bg-gray-800/50' : ''
      }`}
    >
      <div className="w-[1rem] h-[1rem] relative">
        {theme === "dark" ? (
          <Sun className="h-[1rem] w-[1rem]" />
        ) : (
          <Moon className="h-[1rem] w-[1rem]" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
