import { matter } from 'vfile-matter'
import { VFile } from 'vfile'

export function parseFrontMatter(content: string) {
  const file = new VFile({ value: content })
  matter(file, { strip: true })
  return {
    data: file.data.matter as Record<string, any>,
    content: String(file)
  }
}