'use client'

import { useTheme } from '@/hooks'
import cn from '@/lib/cn'

import { Moon, Sun } from '../icons'

const ThemeSwitch = () => {
  const { theme, mounted, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={cn('flex items-center w-12 h-6 ml-4')}>
      {mounted && (
        <button
          className={cn(
            'flex items-center text-center bg-slate-100 hover:bg-slate-200 p-2 rounded-full',
            'dark:bg-gray-800 dark:hover:bg-gray-700',
          )}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? (
            <Sun className={cn('w-5 h-5')} />
          ) : (
            <Moon className={cn('w-5 h-5')} />
          )}
        </button>
      )}
    </div>
  )
}

export default ThemeSwitch
