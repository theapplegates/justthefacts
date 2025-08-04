import fs from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { walk } from 'estree-walker'
import { parse } from '@babel/parser'
import type { File } from '@napi-rs/simple-git'
import { MARKDOWN_URL_EXTENSION_RE } from '../constants.js'
import { PageMapCache } from '../page-map/cache.js'
import { resolvePageMap } from '../page-map/index.js'
import { getPageThemeInfo } from '../page-map/get-page-theme-info.js'
import { getRouteFromFile } from '../utils.js'
import { parseFrontMatter } from '../frontmatter.js'

export async function compile({
  files,
  locale,
  defaultLocale,
  pageMapCache
}: {
  files: File[]
  locale?: string
  defaultLocale?: string
  pageMapCache: PageMapCache
}) {
  const pageMapResult = await resolvePageMap({
    dir: '.',
    files,
    pageMapCache,
    locale,
    defaultLocale
  })

  const themeInfoCache = new Map<string, ReturnType<typeof getPageThemeInfo>>()

  const metaExports: Record<string, any> = {}
  for (const file of files) {
    const normalizedPath = file.name.replace(/\\/g, '/')

    if (!MARKDOWN_URL_EXTENSION_RE.test(normalizedPath)) continue

    const themeInfo =
      themeInfoCache.get(normalizedPath) ||
      getPageThemeInfo(normalizedPath, pageMapResult.items)
    themeInfoCache.set(normalizedPath, themeInfo)

    const content = await fs.readFile(normalizedPath, 'utf8')
    const { data } = parseFrontMatter(content)

    if (data) {
      metaExports[normalizedPath] = {
        data,
        __nextra_theme: themeInfo.__nextra_theme,
        __nextra_layout: themeInfo.__nextra_layout,
        __nextra_metadata: true
      }
    }
  }

  return {
    metaExports
  }
}