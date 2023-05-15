'use client'

import { ThemeProvider } from 'next-themes'

/**
 * Providers component
 * You can add your providers here
 * e.g
 * <ThemeProvider...>
 *  <SessionProvider>{children}</SessionProvider>
 * </ThemeProvider>
 */

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}

export default Providers
