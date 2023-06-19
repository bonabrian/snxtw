import type { Metadata } from 'next'

import { defaultMetadata, getMetadata } from '../metadata'

const title =
  'Next.js Starter Template | Next.js + Tailwind CSS + Typescript Starter'
const description =
  'Next.js bootstrapped by Tailwind CSS and Typescript setup with useful development features.'

const expectedMetadata: Metadata = {
  applicationName: defaultMetadata.applicationName,
  authors: {
    name: defaultMetadata.author.name,
    url: defaultMetadata.author.url,
  },
  description,
  keywords: defaultMetadata.keywords.join(','),
  metadataBase: new URL('https://tsnext-tw.vercel.app/'),
  title,
  openGraph: {
    description,
    images: `https://tsnext-tw.vercel.app/api/og?title=${encodeURIComponent(
      'Next.js Starter Template',
    )}&description=${encodeURIComponent(description)}`,
    siteName: 'Next.js Starter Template',
    title,
    url: 'https://tsnext-tw.vercel.app/',
  },
  robots: defaultMetadata.robots,
  viewport: {
    initialScale: 1,
    maximumScale: 5,
    minimumScale: 1,
    userScalable: true,
    width: 'device-width',
  },
}

describe('getMetadata', () => {
  it('should return metadata correctly', () => {
    expect(getMetadata()).toEqual(expectedMetadata)
  })

  it('should return metadata without keywords', () => {
    const metadata: Metadata = {
      ...expectedMetadata,
      keywords: '',
    }

    expect(getMetadata({ keywords: null })).toEqual(metadata)
  })

  it('should return metadata with string keywords', () => {
    const metadata: Metadata = {
      ...expectedMetadata,
      keywords: 'template,starter',
    }

    expect(getMetadata({ keywords: 'template,starter' })).toEqual(metadata)
  })
})
