<div align="center">
  
  # ts-baseline
  
  A tools for generate typescript types and symbols
  
</div>

## How to use it:

```shell
npm install ts-baseline
```

### 1. generate types baseline

```ts
import { walkTypes } from 'ts-baseline'

const baseline = walkTypes(`const a: number = 1;`)
```

result: 

```
const a: number = 1;
>a : number
>1 : 1
```

### 2. generate symbols baseline

```ts
import { walkSymbols } from 'ts-baseline'

const baseline = walkSymbols(`const a: number = 1;`)
```

result: 

```
const a: number = 1;
>a : Symbol(a, Decl(temporary.ts, 0, 5))
```
