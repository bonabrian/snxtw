'use client'

import cn from '@/lib/cn'

import { useSidebar } from '../context'
import { Menu } from '../icons'
import ThemeSwitch from '../theme-switch'
import { Button } from '../ui'

const Header = () => {
  const { show, setShow } = useSidebar()

  return (
    <header className="flex px-1 py-4 items-center justify-between md:justify-end">
      <Button
        variant="link"
        onClick={() => setShow(!show)}
        className="ml-3 p-1 rounded-full w-10 h-10 bg-accent md:hidden"
      >
        <Menu className={cn('w-6 h-6 fill-foreground')} />
      </Button>
      <ThemeSwitch />
    </header>
  )
}

export default Header
