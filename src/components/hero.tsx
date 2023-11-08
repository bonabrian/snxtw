import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import Icons from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const stack = [
  {
    title: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
    icon: Icons.typeScript,
    className: 'hover:text-[#3178C6]',
  },
  {
    title: 'Next.js',
    link: 'https://nextjs.org/',
    icon: Icons.nextJs,
    className: 'hover:text-foreground',
  },
  {
    title: 'Tailwind CSS',
    link: 'https://tailwindcss.com/',
    icon: Icons.tailwindCss,
    className: 'hover:text-[#06B6D4]',
  },
  {
    title: 'Vercel',
    link: 'https://vercel.com/',
    icon: Icons.vercel,
    className: 'hover:text-foreground',
  },
]

const Hero = async () => {
  const { stargazers_count: stars } = await fetch(
    'https://api.github.com/repos/bonabrian/nextjs-starter-tailwind',
    {
      next: { revalidate: 60 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.error(e))

  return (
    <div className={cn('container')}>
      <div
        className={cn(
          'flex h-full min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center space-y-16 py-16',
          'lg:py-24',
        )}
      >
        <div className={cn('mx-auto w-full max-w-2xl')}>
          <h1
            className={cn(
              'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent drop-shadow-sm',
              'dark:from-gray-100 dark:to-gray-800',
              'md:text-6xl md:leading-tight',
            )}
          >
            <Balancer>
              Starter Template for Initiating Your Next.js Projects
            </Balancer>
          </h1>
          <p
            className={cn(
              'mt-4 text-center text-muted-foreground',
              'md:text-xl',
            )}
          >
            <Balancer>Bootstrapped with useful development features.</Balancer>
          </p>
          <div
            className={cn(
              'mx-auto mt-6 flex items-center justify-center space-x-4',
            )}
          >
            <Link
              href="https://github.com/new?template_name=nextjs-starter-tailwind&template_owner=bonabrian"
              className={cn(buttonVariants(), 'gap-x-2')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Use This Template
            </Link>
            <Link
              href="https://github.com/bonabrian/nextjs-starter-tailwind"
              className={cn(buttonVariants({ variant: 'outline' }), 'gap-x-2')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={cn('font-medium')}>{stars}</span>
              <Icons.star className={cn('h-4 w-4')} />
              <span>on</span>
              <Icons.gitHub className={cn('h-4 w-4')} />
            </Link>
          </div>
        </div>
        <div className={cn('flex flex-col')}>
          <h2 className="mb-4 text-center text-2xl font-semibold tracking-tight">
            Tech Stack
          </h2>
          <div
            className={cn('flex flex-wrap items-center justify-center gap-6')}
          >
            {stack.map((item, index) => (
              <Link
                key={`${index}.${item.title}`}
                href={item.link}
                className={cn('transition-colors', item.className)}
                title={item.title}
              >
                <item.icon className={cn('h-10 w-10')} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
