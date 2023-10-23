export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://snxtw.vercel.app'
    : 'http://localhost:3000'

export const siteConfig = {
  name: 'snxtw',
  title: 'Next.js Starter Template',
  description:
    'Next.js bootstrapped by Tailwind CSS and Typescript setup with useful development features.',
  author: {
    name: 'Bona Brian Siagian',
    url: 'https://bonabrian.com',
    github: 'https://github.com/bonabrian',
    twitter: '@bonabrian_',
  },
  keywords: [
    'react',
    'typescript',
    'boilerplate-template',
    'nextjs',
    'nextjs-boilerplate',
    'nextjs-starter',
    'nextjs-template',
    'nextjs13',
    'app-directory',
    'tailwindcss',
    'tailwindcss-starter-kit',
    'eslint',
    'prettier',
  ],
}
