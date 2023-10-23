'use client'

import { usePathname } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useMediaQuery } from '@/hooks'
import { min } from '@/lib/screens'

interface SidebarContextProps {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

interface SidebarContextProviderProps {
  children: React.ReactNode
}

export const SidebarContextProvider = ({
  children,
}: SidebarContextProviderProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const isMd = useMediaQuery(min('md'))
  const [show, setShow] = useState<boolean>(isMd ? true : false)
  const pathname = usePathname()

  useEffect(() => {
    if (isMd) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [isMd])

  useEffect(() => {
    !isMd && setShow(false)
  }, [isMd, pathname])

  const value = useMemo(
    () => ({ collapsed, setCollapsed, show, setShow }),
    [collapsed, show],
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext<SidebarContextProps | null>(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarContext')
  }

  return context
}
