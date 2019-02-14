import walk, { BaselineTarget } from '../src'

console.log(walk(`const a: number = 1;`, BaselineTarget.types))
console.log(walk(`const a: number = 1;`, BaselineTarget.symbols))
