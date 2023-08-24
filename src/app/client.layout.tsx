'use client'

import Link from 'next/link'

import { useSidebar } from '@/components/context'
import { Menu } from '@/components/icons'
import Sidebar from '@/components/sidebar'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui'
import cn from '@/lib/cn'
import { defaultMetadata } from '@/lib/metadata'

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const date = new Date()
  const year = date.getFullYear()
  const { collapsed, show, setShow } = useSidebar()

  return (
    <div className={cn('flex gap-4')}>
      <Sidebar />
      <div
        id="__content"
        className={cn(
          'flex flex-col flex-grow flex-1 transition-[padding] duration-faster pl-0',
          collapsed ? 'md:pl-16' : 'md:pl-64',
        )}
      >
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
        <main role="main">{children}</main>
        <footer className="flex items-center justify-center">
          <span className="mr-1">© {year}</span>
          <Link
            href={defaultMetadata.author.url}
            target="_blank"
            className="border-b border-dotted border-gray-600 dark:border-slate-50 hover:text-primary-500 hover:border-primary-500 dark:hover:border-primary-500"
          >
            {defaultMetadata.author.name}
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default ClientLayout
