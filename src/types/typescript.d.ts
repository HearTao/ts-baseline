import 'typescript'

declare module 'typescript' {
  interface Program {
    getDiagnosticsProducingTypeChecker: () => TypeChecker
  }

  interface IntrinsicType extends Type {
    intrinsicName: string
  }

  const enum SemanticMeaning {
    None = 0x0,
    Value = 0x1,
    Type = 0x2,
    Namespace = 0x4,
    All = Value | Type | Namespace
  }

  function isExpressionNode(node: Node): boolean
  function isDeclarationName(node: Node): boolean
  function isIntrinsicJsxName(name: string): boolean
  function skipTrivia(
    text: string,
    pos: number,
    stopAfterLineBreak?: boolean,
    stopAtComments?: boolean
  ): number
  function getSourceTextOfNodeFromSourceFile(
    sourceFile: SourceFile,
    node: Node,
    includeTrivia?: boolean
  ): string
  function isPartOfTypeNode(node: Node): boolean
  function isGlobalScopeAugmentation(module: ModuleDeclaration): boolean
  function getMeaningFromDeclaration(node: Node): SemanticMeaning
  function isTypeAlias(
    node: Node
  ): node is JSDocTypedefTag | JSDocCallbackTag | TypeAliasDeclaration
  function isExpressionWithTypeArgumentsInClassExtendsClause(
    node: Node
  ): node is ExpressionWithTypeArguments
  function isLabelName(node: Node): boolean
  function getBaseFileName(path: string): string
  function flatMap<T, U>(
    array: ReadonlyArray<T> | undefined,
    mapfn: (x: T, i: number) => U | ReadonlyArray<U> | undefined
  ): ReadonlyArray<U>
}
