'use client'

import { useCallback } from 'react'
import { themeColors, type ThemeColor } from '@/config/colors'

export function ThemeColorSwitcher({ color }: { color: ThemeColor }) {
  const setThemeColor = useCallback(() => {
    const root = document.documentElement
    const colors = themeColors[color]
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-background-light', colors.light)
    root.style.setProperty('--color-background-dark', colors.dark)
  }, [color])

  return (
    <button onClick={setThemeColor}>
      Switch to {themeColors[color].name}
    </button>
  )
} 