import Balancer from 'react-wrap-balancer'

import Icons from '@/components/icons'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const features = [
  {
    title: 'Next.js',
    description: 'App dir, Routing, Layouts, Loading UI and API routes.',
    icon: Icons.nextJs,
  },
  {
    title: 'React 18',
    description: 'Server and Client Components. Use hook.',
    icon: Icons.react,
  },
  {
    title: 'Prisma',
    description: 'ORM using Prisma.',
    icon: Icons.prisma,
  },
  {
    title: 'Shadcn UI',
    description:
      'Re-usable UI components built using Radix UI and Tailwind CSS.',
    icon: Icons.shadcn,
  },
  {
    title: 'Tailwind CSS',
    description: 'Components styling using Tailwind CSS.',
    icon: Icons.tailwindCss,
  },
  {
    title: 'Jest',
    description:
      'Delightful JavaScript Testing Framework with a focus on simplicity.',
    icon: Icons.jest,
  },
]

const Features = () => {
  return (
    <section
      id="features"
      className={cn(
        'container space-y-6 rounded-md bg-secondary py-8',
        'md:py-12',
        'lg:py-24',
      )}
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
          Features
        </h2>
        <p
          className={cn(
            'max-w-[85%] leading-normal text-muted-foreground',
            'sm:text-lg',
            'sm:leading-7',
          )}
        >
          <Balancer>
            This template provides features like API routes, SEO, Jest, and more
            in Next.js 13 app dir.
          </Balancer>
        </p>
      </div>
      <div
        className={cn(
          'grid justify-center gap-4',
          'sm:grid-cols-2',
          'md:grid-cols-3',
        )}
      >
        {features.map((feature) => (
          <Card
            key={feature.title}
            className={cn(
              'flex h-[180px] flex-col justify-between rounded-md p-6',
            )}
          >
            <feature.icon className={cn('h-12 w-12')} />
            <div className={cn('space-y-2')}>
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Features
