import { PageMapItem } from './types'

export function convertPageMapToJs({
  pageMap,
  mdxPages,
  globalMetaPath
}: {
  pageMap: PageMapItem[]
  mdxPages: Record<string, any>
  globalMetaPath: string
}) {
  const stringified = JSON.stringify(pageMap, null, 2)
  return `export const pageMap = ${stringified}\n\n` +
    `export const mdxPages = ${mdxPages ? JSON.stringify(mdxPages) : '{}'}\n\n` +
    `export const globalMeta = ${globalMetaPath ? `'${globalMetaPath}'` : 'null'}\n`
}
