// packages/nextra/src/server/constants.ts

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const CWD = process.cwd()

export const METADATA_ONLY_RQ = '?meta-only'

export const META_FILENAME = '_meta'

export const MARKDOWN_EXTENSION_REGEX = /\.mdx?$/
export const MARKDOWN_URL_EXTENSION_RE = /\.mdx?(?:\?.*)?$/
export const MARKDOWN_EXTENSION = '.mdx'

export const IS_VERCEL = !!process.env.VERCEL

export const DEFAULT_LOCALE = 'en'
