'use client'

import { useTheme } from '@/hooks'
import { cn } from '@/lib/utils'

import Icons from '../icons'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const ThemeSwitch = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Icons.sun
            className={cn(
              'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
            )}
          />
          <Icons.moon
            className={cn(
              'absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Icons.sun className={cn('mr-2 h-4 w-4')} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Icons.moon className={cn('mr-2 h-4 w-4')} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Icons.laptop className={cn('mr-2 h-4 w-4')} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitch
