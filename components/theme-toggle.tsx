"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ModeToggle() {
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
      className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border border-gray-700 hover:border-[var(--color-primary)] rounded relative"
    >
      <div className="w-[1.2rem] h-[1.2rem] relative">
        {theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
