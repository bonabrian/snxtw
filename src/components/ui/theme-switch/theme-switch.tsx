'use client'

import { RiMoonFill, RiSunFill } from 'react-icons/ri'

import { useTheme } from '@/hooks'

const ThemeSwitch = () => {
  const { theme, mounted, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center w-12 h-6 ml-4">
      {mounted && (
        <button
          className="flex items-center text-center bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 p-2 rounded-full"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? <RiSunFill size={24} /> : <RiMoonFill size={24} />}
        </button>
      )}
    </div>
  )
}

export default ThemeSwitch
