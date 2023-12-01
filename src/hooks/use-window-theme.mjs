import { useEffect, useState } from 'react'

export function useWindowTheme() {
  const [theme, setTheme] = useState(
<<<<<<< HEAD
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
=======
    window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
>>>>>>> 70d6b794f0bf3b4af147fea46d3031b11b67c585
      : 'light',
  )
  useEffect(() => {
    if (!window.matchMedia) return
    const listener = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener)
    return () =>
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener)
  }, [])
  return theme
}
