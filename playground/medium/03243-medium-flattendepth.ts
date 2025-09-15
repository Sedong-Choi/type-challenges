/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243/undefined
*/

/* _____________ Your Code Here _____________ */

// 한 번 flatten
type FlattenOnce<T extends any[]> =
  T extends [infer F, ...infer R]
    ? F extends any[]
      ? [...F, ...FlattenOnce<R>]
      : [F, ...FlattenOnce<R>]
    : []

// FlattenDepth: 카운터 배열만 사용
type FlattenDepth<T extends any[], D extends number = 1, C extends any[] = []> =
  C['length'] extends D
    ? T
    : FlattenOnce<T> extends T
      ? T
      : FlattenDepth<FlattenOnce<T>, D, [...C, any]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<FlattenDepth<[[1, [2, [3, [4, [5]]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<FlattenDepth<[[1], [2, [3, [4, [[5]]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer/undefined
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org/undefined
*/
