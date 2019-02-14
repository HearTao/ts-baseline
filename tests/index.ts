import walk, { Target } from '../src'

console.log(walk(`const a: number = 1;`, Target.types))
