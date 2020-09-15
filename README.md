# rxjs-operators

Rxjs 操作符扩展

[![npm (scoped)](https://img.shields.io/npm/v/@ndct/rxjs-operators?style=flat-square)](https://www.npmjs.com/package/@ndct/rxjs-operators)
[![GitHub](https://img.shields.io/github/license/nodoccat/rxjs-operators?style=flat-square)](http://www.apache.org/licenses/LICENSE-2.0)
[![ci status](https://github.com/nodoccat/rxjs-operators/workflows/CI/badge.svg)](https://github.com/NoDocCat/rxjs-operators/actions)
[![CodeFactor](https://www.codefactor.io/repository/github/nodoccat/rxjs-operators/badge)](https://www.codefactor.io/repository/github/nodoccat/rxjs-operators)
[![codecov](https://codecov.io/gh/NoDocCat/rxjs-operators/branch/master/graph/badge.svg)](https://codecov.io/gh/NoDocCat/rxjs-operators)

## 安装

```bash
npm install @ndct/rxjs-operators
```

## 操作符

### start

> 在订阅开始时执行副作用

```typescript
start<T>(callback: () => void): MonoTypeOperatorFunction<T>
```

+ Parameters

  | Name     | Description            |
  | -------- | ---------------------- |
  | callback | 订阅开始时要调用的函数 |

+ Examples

  ```typescript
  import { ajax } from 'rxjs/ajax'
  import { start, finalize } from "@ndct/rxjs-operators"
  
  ajax(`https://api.github.com/users?per_page=5`).pipe(
    start(() => console.log('load start')),
    finalize(() => console.log('load end'))
  ).subscribe(
    res => console.log(res),
    error => console.log(error)
  )
  ```

