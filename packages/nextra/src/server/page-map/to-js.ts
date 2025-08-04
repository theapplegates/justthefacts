import type { PageMapItem } from 'nextra';
import { META_FILENAME } from '../constants';

export function convertPageMapToJs({
  pageMap,
  mdxPages,
  globalMetaPath
}: {
  pageMap: PageMapItem[];
  mdxPages: Record<string, any>;
  globalMetaPath?: string;
}): string {
  return `export const pageMap = ${JSON.stringify(pageMap)};\n\n` +
    `export const globalMeta = ${globalMetaPath ? `import('${globalMetaPath}')` : 'null'};\n\n` +
    `export const mdxPages = {\n` +
    Object.entries(mdxPages)
      .map(
        ([key, value]) =>
          `  "${key}": () => import("${value}"),`
      )
      .join('\n') +
    `\n};\n`;
}
