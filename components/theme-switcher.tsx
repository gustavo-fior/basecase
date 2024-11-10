"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-1 sm:h-auto h-12 flex items-center rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]">
      <button
        onClick={() => setTheme("light")}
        className={`rounded-md p-2 sm:p-1 transition-colors ${
          theme === "light" 
            ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white" 
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Sun className="sm:w-4 sm:h-4 w-5 h-5" />
        <span className="sr-only">Light mode</span>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`rounded-md p-2 sm:p-1 transition-colors ${
          theme === "dark" 
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Moon className="sm:w-4 sm:h-4 w-5 h-5" />
        <span className="sr-only">Dark mode</span>
      </button>
    </div>
  )
}
