'use client'

import { useTheme } from '@/hooks'
import cn from '@/lib/cn'

import { Moon, Sun } from '../icons'

const ThemeSwitch = () => {
  const { theme, mounted, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={cn('flex h-6 w-12 items-center')}>
      {mounted && (
        <button
          className={cn(
            'flex items-center rounded-full bg-slate-100 p-2 text-center hover:bg-slate-200',
            'dark:bg-gray-800 dark:hover:bg-gray-700',
          )}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          {isDark ? (
            <Sun className={cn('h-5 w-5')} />
          ) : (
            <Moon className={cn('h-5 w-5')} />
          )}
        </button>
      )}
    </div>
  )
}

export default ThemeSwitch
