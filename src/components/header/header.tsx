'use client'

import Link from 'next/link'

import { siteConfig } from '@/data/app'
import { useOnScroll } from '@/hooks'
import { cn } from '@/lib/utils'

import ThemeSwitch from '../theme-switch'

const Header = () => {
  const isScrolled = useOnScroll()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full bg-transparent',
        isScrolled
          ? 'shadow-sm backdrop-blur-[10px] duration-300 ease-in-out'
          : '',
      )}
    >
      <div className={cn('container h-full')}>
        <div className={cn('flex h-full items-center justify-between')}>
          <Link href="/" className={cn('text-2xl font-bold')}>
            {siteConfig.name}
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
