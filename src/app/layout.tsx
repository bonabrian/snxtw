import '@/styles/app.css'

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'

import Analytics from '@/components/analytics'
import { SidebarContextProvider, ThemeProvider } from '@/components/context'
import { getMetadata } from '@/lib/metadata'

import ClientLayout from './client.layout'

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div id="__app">
            <SidebarContextProvider>
              <ClientLayout>{children}</ClientLayout>
            </SidebarContextProvider>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
