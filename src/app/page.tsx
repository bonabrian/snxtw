import Link from 'next/link'

import {
  Eslint,
  Jest,
  NextJs,
  TailwindCss,
  TypeScript,
  Vercel,
} from '@/components/ui/icons'
import cn from '@/lib/cn'

export default function Home() {
  const stack = [
    {
      icon: <NextJs className={cn('w-6 h-6 fill-black', 'dark:fill-white')} />,
      title: 'Next.js',
    },
    {
      icon: <TailwindCss className={cn('w-6 h-6 fill-[#06B6D4]')} />,
      title: 'Tailwind CSS',
    },
    {
      icon: <TypeScript className={cn('w-6 h-6 fill-[#3178C6]')} />,
      title: 'TypeScript',
    },
    {
      icon: <Eslint className={cn('w-6 h-6 fill-[#4B32C3]')} />,
      title: 'Eslint',
    },
    {
      icon: <Jest className={cn('w-6 h-6 fill-[#C21325]')} />,
      title: 'Jest',
    },
  ]

  return (
    <div className={cn('flex flex-col justify-center min-h-[70vh]')}>
      <div className={cn('flex flex-col items-center text-center')}>
        <div className={cn('text-current mb-4')}>
          <Vercel className={cn('w-12 h-12')} />
        </div>
        <h1 className={cn('text-2xl font-bold mb-4', 'lg:text-3xl')}>
          Next.js (App Router) + Tailwind CSS + Typescript Starter Template
        </h1>
        <p className={cn('mb-4')}>
          Next.js bootstrapped by Tailwind CSS and Typescript setup with useful
          development features.
        </p>
        <div className={cn('flex items-center justify-center mb-8')}>
          <Link
            href="https://github.com/bonabrian/nextjs-starter-tailwind"
            target="_blank"
            className={cn(
              'border-b border-dotted border-gray-600 hover:text-primary-500 hover:border-primary-500',
              'dark:border-slate-50 dark:hover:border-primary-500',
            )}
          >
            See the repository
          </Link>
        </div>
        <div className={cn('flex gap-4')}>
          {stack.map(({ icon, title }) => (
            <div key={title} className={cn('flex items-center')}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
