import '../global.css'

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'

import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/providers'
import { seo } from '@/data/meta'
import { cn } from '@/lib/utils'

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = seo()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div
            className={cn(
              'fixed h-screen w-full bg-gradient-to-br from-background to-blue-50 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-slate-900',
            )}
          />
          <Header />
          <main className={cn('relative z-10')}>{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
