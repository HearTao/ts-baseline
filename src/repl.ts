import * as repl from 'repl'
import { walkTypes } from './'

const REPL_PROMPT: string = '# '
let contents: string = ''
const r = repl.start({ prompt: REPL_PROMPT, eval: transform, writer })

r.on('reset', reset)

function transform(cmd: string, context: object, filename: string, callback: Function) {
    contents += cmd
    callback(null, walkTypes(contents))
}
  
function writer(output: string) {
    return output
}

function reset() {
    contents = ''
}