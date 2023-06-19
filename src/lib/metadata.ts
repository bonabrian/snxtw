import type { Metadata } from 'next'

import { getBaseUrl, unique } from './utils'

interface Robots {
  index?: boolean
  follow?: boolean
  noarchive?: boolean
  nosnippet?: boolean
  noimageindex?: boolean
  nocache?: boolean
  notranslate?: boolean
  'max-video-preview'?: number | string
  'max-image-preview'?: 'none' | 'standard' | 'large'
  'max-snippet'?: number
}

interface OpenGraph {
  type?: string
  siteName?: string
  title?: string
  description?: string
  url?: string
  publishedTime?: string
  images?: string
}

interface MetadataProps {
  title?: string
  description?: string
  keywords?: null | string | Array<string>
  robots?: Robots
  openGraph?: OpenGraph
}

const mapKeywords = (keywords?: string | Array<string> | null): string => {
  if (!keywords) return ''

  if (Array.isArray(keywords)) {
    return unique(keywords).join(',')
  }

  return keywords
}

export const defaultMetadata = {
  applicationName: 'Next.js Starter Template',
  title: 'Next.js Starter Template',
  titleTemplate: '%s | Next.js + Tailwind CSS + Typescript Starter',
  description:
    'Next.js bootstrapped by Tailwind CSS and Typescript setup with useful development features.',
  author: {
    name: 'Bona Brian Siagian',
    url: 'https://bonabrian.com',
    email: 'bonabriansiagian@gmail.com',
    github: 'https://github.com/bonabrian',
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
  robots: {
    index: true,
    follow: true,
  },
}

export const getMetadata = ({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  keywords = defaultMetadata.keywords,
  robots = defaultMetadata.robots,
  openGraph,
}: MetadataProps = {}): Metadata => {
  const baseUrl = getBaseUrl()
  const metadataBase = new URL(baseUrl)

  const updatedTitle = defaultMetadata.titleTemplate.replace(/%s/g, title)

  const images = `${baseUrl}/api/og?title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(description)}`

  const updatedOpenGraph: OpenGraph = {
    siteName: openGraph?.siteName ?? defaultMetadata.applicationName,
    title: openGraph?.title ?? updatedTitle,
    description: openGraph?.description ?? description,
    url: openGraph?.url ?? `${metadataBase.origin}${metadataBase.pathname}`,
    images,
  }

  return {
    metadataBase,
    title: updatedTitle,
    description,
    applicationName: defaultMetadata.applicationName,
    authors: {
      url: defaultMetadata.author.url,
      name: defaultMetadata.author.name,
    },
    keywords: mapKeywords(keywords),
    viewport: {
      initialScale: 1,
      minimumScale: 1,
      maximumScale: 5,
      userScalable: true,
      width: 'device-width',
    },
    robots,
    openGraph: {
      ...openGraph,
      ...updatedOpenGraph,
    },
  }
}
