export function convertPageMapToJs({
  pageMap,
  mdxPages,
  globalMetaPath
}: {
  pageMap: any;
  mdxPages?: any;
  globalMetaPath?: string;
}): string {
  return `export const pageMap = ${JSON.stringify(pageMap, null, 2)};`;
}