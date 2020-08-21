# rxjs-operators

Rxjs操作符扩展

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

