import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { BiMoon as Moon, BiSun as Sun } from 'react-icons/bi'

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Moon size={26} />
  }

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button onClick={toggleDarkMode} title='Switch theme'>
      {theme === 'light' ? <Moon size={26} /> : <Sun size={26} />}
    </button>
  )
}

export default ThemeToggle