import type { Metadata } from 'next'
import merge from 'ts-deepmerge'

import { mapKeywords } from './builder'
import { DEFAULT_METADATA } from './default'

type SeoProps = Metadata & {
  url?: string | URL
}

/**
 * Helper method to deep merge the SEO params from a given page
 * with the default SEO params.
 *
 * This method also will use title and description in the OpenGraph and
 * Twitter metadata, if not set
 */
export const seo = ({ url, ...metadata }: SeoProps = {}): Metadata => {
  const title = metadata.title ?? DEFAULT_METADATA.title
  const description = metadata.description ?? DEFAULT_METADATA.description

  metadata.keywords = mapKeywords(metadata.keywords)

  metadata.openGraph = {
    title: title ?? undefined,
    description: description ?? undefined,
    ...metadata.openGraph,
  }

  metadata.twitter = {
    title: title ?? undefined,
    description: description ?? undefined,
    ...metadata.twitter,
  }

  if (url) {
    metadata.openGraph.url = url
    metadata.alternates = {
      canonical: url,
      ...metadata.alternates,
    }
  }

  return merge(DEFAULT_METADATA, metadata)
}
