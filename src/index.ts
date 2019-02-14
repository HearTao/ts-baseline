import TypeWriterWalker, { TypeWriterResult } from './walker'

import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'
import * as tmp from 'tmp'

export enum BaselineTarget {
  types = 'types',
  symbols = 'symbols'
}

export default function walkBaseline(content: string, target: BaselineTarget, options: ts.CompilerOptions = {}): string {
  const dir = tmp.dirSync({ prefix: 'ts-baseline' })
  const unitName = path.join(dir.name, 'temporary.ts')
  fs.writeFileSync(unitName, content)

  const program = ts.createProgram({ rootNames: [unitName], options })
  const fullWalker = new TypeWriterWalker(program, true, true);

  const gen: IterableIterator<TypeWriterResult> = target === BaselineTarget.symbols ? fullWalker.getSymbols(unitName) : fullWalker.getTypes(unitName)
  let lastIndexWritten: number | undefined;
  let typeLines = "";

  const codeLines = ts.flatMap(content.split(/\r?\n/g), e => e.split(/[\r\u2028\u2029]/g));
  for (let { done, value: result } = gen.next(); !done; { done, value: result } = gen.next()) {
    if (target === BaselineTarget.symbols && !result.symbol) {
      throw new Error("unknown symbol: " + result)
    }
    if (lastIndexWritten === undefined) {
      typeLines += codeLines.slice(0, result.line + 1).join("\r\n") + "\r\n";
    }
    else if (result.line !== lastIndexWritten) {
      if (!((lastIndexWritten + 1 < codeLines.length) && (codeLines[lastIndexWritten + 1].match(/^\s*[{|}]\s*$/) || codeLines[lastIndexWritten + 1].trim() === ""))) {
        typeLines += "\r\n";
      }
      typeLines += codeLines.slice(lastIndexWritten + 1, result.line + 1).join("\r\n") + "\r\n";
    }
    lastIndexWritten = result.line;
    const typeOrSymbolString = target === BaselineTarget.symbols ? result.symbol : result.type;
    const formattedLine = result.sourceText.replace(/\r?\n/g, "") + " : " + typeOrSymbolString;
    typeLines += ">" + formattedLine + "\r\n";
  }

  return typeLines
}

export function walkTypes(content: string, options: ts.CompilerOptions = {}) {
  return walkBaseline(content, BaselineTarget.types, options)
}

export function walkSymbols(content: string, options: ts.CompilerOptions = {}) {
  return walkBaseline(content, BaselineTarget.symbols, options)
}
