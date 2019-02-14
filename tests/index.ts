import { walkTypes, walkSymbols } from '../src'

console.log(walkTypes(`const a: number = 1;`))
console.log(walkSymbols(`const a: number = 1;`))
