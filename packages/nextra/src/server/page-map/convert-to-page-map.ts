import { getRouteFromFilename } from '../utils.js'
import type { PageMapItem } from './types.js'

export function convertToPageMap(files: string[]): PageMapItem[] {
  return files.map(file => {
    const route = getRouteFromFilename(file)
    return {
      kind: 'MdxPage',
      name: route.split('/').pop() || '',
      route,
      file
    }
  })
}
