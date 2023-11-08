export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000'
    : 'http://localhost:3000';

export const siteConfig = {
  name: 'snxtw',
  title: 'Next.js Starter Template',
  description:
    'Next.js bootstrapped by Tailwind CSS and Typescript setup with useful development features.',
  author: {
    name: '',
    url: '',
    github: '',
    twitter: '',
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
};
