import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Analytics from '@/components/analytics'
import Providers from '@/components/providers'
import { getMetadata } from '@/lib/metadata'

const fontSans = Poppins({
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
      <body className="antialiased text-black bg-slate-100 dark:bg-gray-900 dark:text-slate-100">
        <Providers>
          <main
            className="flex flex-col mx-auto max-w-5xl justify-center py-10 px-4"
            role="main"
          >
            <div className="min-h-screen">{children}</div>
          </main>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
