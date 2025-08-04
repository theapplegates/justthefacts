import type {
  ImportDeclaration,
  ImportSpecifier,
  ImportNamespaceSpecifier,
  ImportDefaultSpecifier,
  ExpressionStatement,
  CallExpression,
  MemberExpression,
  Identifier,
  Literal
} from 'estree'

import { MARKDOWN_EXTENSION_RE, META_RE, METADATA_ONLY_RQ } from './constants'

interface ImportItem {
  filePath: string
  importName: string
}

export function createImportsAst(imports: ImportItem[]): ImportDeclaration[] {
  return imports.map(({ filePath, importName }): ImportDeclaration => {
    const isMdx = MARKDOWN_EXTENSION_RE.test(filePath)
    const isMeta = META_RE.test(filePath)

    const specifier: ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier =
      isMeta
        ? {
            type: 'ImportDefaultSpecifier',
            local: { type: 'Identifier', name: importName }
          }
        : isMdx
        ? {
            type: 'ImportSpecifier',
            imported: { type: 'Identifier', name: 'metadata' },
            local: { type: 'Identifier', name: importName }
          }
        : {
            type: 'ImportNamespaceSpecifier',
            local: { type: 'Identifier', name: importName }
          }

    return {
      type: 'ImportDeclaration',
      source: {
        type: 'Literal',
        value: `private-next-root-dir/${filePath}${isMdx ? METADATA_ONLY_RQ : ''}`
      },
      specifiers: [specifier],
      attributes: [] // <- required by TypeScript
    }
  })
}
