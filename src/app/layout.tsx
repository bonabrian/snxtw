import '@/styles/app.css'

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'
import Link from 'next/link'

import Analytics from '@/components/analytics'
import Providers from '@/components/providers'
import ThemeSwitch from '@/components/ui/theme-switch'
import { defaultMetadata, getMetadata } from '@/lib/metadata'

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
  const date = new Date()
  const year = date.getFullYear()

  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body>
        <Providers>
          <div className="mx-auto max-w-5xl py-12" role="main">
            <header className="flex items-center justify-end">
              <ThemeSwitch />
            </header>
            <main role="main" className="my-4">
              {children}
            </main>
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
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
