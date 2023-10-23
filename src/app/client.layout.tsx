'use client'

import Link from 'next/link'

import { Menu } from '@/components/icons'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/data/app'
import { cn } from '@/lib/utils'

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <div className={cn('flex gap-4')}>
      <div
        id="__content"
        className={cn(
          'duration-faster flex flex-1 flex-grow flex-col pl-0 transition-[padding]',
        )}
      >
        <header className="flex items-center justify-between px-1 py-4 md:justify-end">
          <Button
            variant="link"
            className="ml-3 h-10 w-10 rounded-full bg-accent p-1 md:hidden"
          >
            <Menu className={cn('h-6 w-6 fill-foreground')} />
          </Button>
          <ThemeSwitch />
        </header>
        <main role="main">{children}</main>
        <footer className="flex items-center justify-center">
          <span className="mr-1">© {year}</span>
          <Link
            href={siteConfig.author.url}
            target="_blank"
            className="hover:text-primary-500 hover:border-primary-500 dark:hover:border-primary-500 border-b border-dotted border-gray-600 dark:border-slate-50"
          >
            {siteConfig.author.name}
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default ClientLayout
