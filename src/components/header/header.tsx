'use client'

import { cn } from '@/lib/utils'

import { useSidebar } from '../context'
import { Menu } from '../icons'
import ThemeSwitch from '../theme-switch'
import { Button } from '../ui/button'

const Header = () => {
  const { show, setShow } = useSidebar()

  return (
    <header className="flex items-center justify-between px-1 py-4 md:justify-end">
      <Button
        variant="link"
        onClick={() => setShow(!show)}
        className="ml-3 h-10 w-10 rounded-full bg-accent p-1 md:hidden"
      >
        <Menu className={cn('h-6 w-6 fill-foreground')} />
      </Button>
      <ThemeSwitch />
    </header>
  )
}

export default Header
