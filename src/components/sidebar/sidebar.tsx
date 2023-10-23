'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

import { useSidebar } from '../providers'
import { Button } from '../ui/button'

interface NavItem {
  label: string
  path: string
  icon?: JSX.Element
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    // icon: <SquaresFour className={cn('h-6 w-6')} />,
  },
  {
    label: 'Built-in Components',
    path: '/components',
    // icon: <PuzzlePiece className={cn('h-6 w-6')} />,
  },
]

const Sidebar = () => {
  const { collapsed, setCollapsed, show, setShow } = useSidebar()
  const sidebarRef = useRef(null)

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 left-0 right-0 z-[1] bg-accent/70 md:hidden',
          show ? 'block' : 'hidden',
        )}
        onClick={() => setShow(false)}
      />
      <aside
        id="__sidebar"
        ref={sidebarRef}
        className={cn(
          'bg-sidebar duration-faster fixed z-[1] h-screen translate-x-0 overflow-hidden transition-all',
          { 'w-64': !collapsed },
          { 'w-16': collapsed },
          { '-translate-x-full': !show },
        )}
      >
        <nav className={cn('flex h-full flex-col py-4')}>
          <ul className={cn('my-2 flex flex-col items-stretch gap-2')}>
            {navItems.map(({ label, path, icon }) => (
              <li
                key={label}
                className={cn('duration-normal group mx-3 transition-colors', {
                  'rounded-md gap-4': !collapsed,
                  'justify-center rounded-full w-10 h-10': collapsed,
                })}
              >
                <Link
                  href={path}
                  className={cn(
                    'flex items-center gap-2 rounded-lg p-2',
                    'group-hover:bg-accent group-hover:text-accent-foreground',
                  )}
                >
                  {icon}
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={cn(
            'absolute bottom-4 right-2 hidden h-fit w-fit',
            'md:flex',
            {
              'justify-center right-4': collapsed,
            },
          )}
        >
          <Button
            variant="link"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 rounded-full bg-accent p-0 shadow-sm"
          >
            {/* <CaretLeft
              className={cn('h-4 w-4 fill-foreground', {
                'rotate-180': collapsed,
              })}
            /> */}
          </Button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
