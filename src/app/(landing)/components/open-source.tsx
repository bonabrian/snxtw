import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'

const OpenSource = () => {
  return (
    <section
      id="open-source"
      className={cn('container py-8', 'md:py-12', 'lg:py-24')}
    >
      <div
        className={cn(
          'mx-auto flex max-w-4xl flex-col items-center space-y-4 text-center',
        )}
      >
        <h2
          className={cn(
            'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent drop-shadow-sm',
            'dark:from-gray-100 dark:to-gray-800',
            'md:text-6xl md:leading-tight',
          )}
        >
          Proudly Open Source
        </h2>
        <p
          className={cn(
            'max-w-[85%] leading-normal text-muted-foreground',
            'sm:text-lg',
            'sm:leading-7',
          )}
        >
          <Balancer>
            snxtw is open source and powered by open source software. The code
            is available on{' '}
            <Link
              href="https://github.com/bonabrian/snxtw"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
          </Balancer>
        </p>
      </div>
    </section>
  )
}

export default OpenSource
