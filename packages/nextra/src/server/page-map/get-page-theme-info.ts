import { PageMapItem } from './types'

export function getPageThemeInfo(
  filePath: string,
  items: PageMapItem[]
): {
  __nextra_layout?: string
  __nextra_theme?: string
} {
  for (const item of items) {
    if (item.kind === 'MdxPage' && item.file === filePath) {
      return {
        __nextra_layout: item.layout,
        __nextra_theme: item.theme
      }
    }

    if ('children' in item && item.children?.length) {
      const result = getPageThemeInfo(filePath, item.children)
      if (result.__nextra_layout || result.__nextra_theme) {
        return result
      }
    }
  }
  return {}
}
