'use client'

import Link from 'next/link'
import { useRef } from 'react'

import cn from '@/lib/cn'

import { useSidebar } from '../context'
import { CaretLeft, PuzzlePiece, SquaresFour } from '../icons'
import { Button } from '../ui'

interface NavItem {
  label: string
  path: string
  icon: JSX.Element
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: <SquaresFour className={cn('w-6 h-6')} />,
  },
  {
    label: 'Built-in Components',
    path: '/components',
    icon: <PuzzlePiece className={cn('w-6 h-6')} />,
  },
]

const Sidebar = () => {
  const { collapsed, setCollapsed, show, setShow } = useSidebar()
  const sidebarRef = useRef(null)

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 left-0 right-0 z-[1] bg-background/5 backdrop-blur-sm md:hidden',
          show ? 'block' : 'hidden',
        )}
        onClick={() => setShow(false)}
      />
      <aside
        id="__sidebar"
        ref={sidebarRef}
        className={cn(
          'bg-sidebar z-[1] overflow-hidden h-screen fixed transition-all duration-faster translate-x-0',
          'md:relative',
          { 'w-64': !collapsed },
          { 'w-16': collapsed },
          { '-translate-x-full': !show },
        )}
      >
        <nav className={cn('flex flex-col py-4 h-full')}>
          <ul className={cn('my-2 flex flex-col items-stretch gap-2')}>
            {navItems.map(({ label, path, icon }) => (
              <li
                key={label}
                className={cn('transition-colors duration-normal mx-3 group', {
                  'rounded-md gap-4': !collapsed,
                  'justify-center rounded-full w-10 h-10': collapsed,
                })}
              >
                <Link
                  href={path}
                  className={cn(
                    'flex gap-2 items-center p-2 rounded-lg',
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
            'absolute w-fit h-fit hidden bottom-4 right-2',
            'md:flex',
            {
              'justify-center right-4': collapsed,
            },
          )}
        >
          <Button
            variant="link"
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full w-8 h-8 p-0 shadow-sm bg-accent"
          >
            <CaretLeft
              className={cn('w-4 h-4 fill-foreground', {
                'rotate-180': collapsed,
              })}
            />
          </Button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
