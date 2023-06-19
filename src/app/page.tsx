import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const icons = [
    {
      path: '/nextjs.svg',
      alt: 'Next.js Logo',
      className: 'dark:invert',
      title: 'Next.js',
    },
    {
      path: '/tailwind.svg',
      alt: 'Tailwind Logo',
      className: '',
      title: 'Tailwind CSS',
    },
    {
      path: '/typescript.svg',
      alt: 'Typescript Logo',
      className: '',
      title: 'Typescript',
    },
  ]

  return (
    <div className="flex flex-col justify-center min-h-[70vh]">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert mb-4"
          width={54}
          height={24}
          priority
        />
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">
          Next.js (App Router) + Tailwind CSS + Typescript Starter Template
        </h1>
        <p className="mb-4">
          Next.js bootstrapped by Tailwind CSS and Typescript setup with useful
          development features.
        </p>
        <div className="flex items-center justify-center mb-8">
          <Link
            href="https://github.com/bonabrian/nextjs-starter-tailwind"
            target="_blank"
            className="border-b border-dotted border-gray-600 dark:border-slate-50 hover:text-primary-500 hover:border-primary-500 dark:hover:border-primary-500"
          >
            See the repository
          </Link>
        </div>
        <div className="flex gap-x-4">
          {icons.map(({ path, alt, className, title }) => (
            <Image
              key={path}
              src={path}
              alt={alt}
              className={className}
              title={title}
              width={24}
              height={24}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
