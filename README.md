# rxjs-operators

Rxjs 操作符扩展

![npm](https://img.shields.io/npm/v/@ndct/rxjs-operators?logo=npm&style=for-the-badge)
![CI](https://img.shields.io/github/workflow/status/nodoccat/rxjs-operators/CI?label=CI&logo=github&style=for-the-badge)

## 安装

```shell
npm install @ndct/rxjs-operators
```

## 操作符

### start

> 在订阅时执行副作用

```typescript
start<T>(callback: () => any): MonoTypeOperatorFunction<T>
```

- 参数

  | 名称     | 说明               |
  | -------- | ------------------ |
  | callback | 订阅时要调用的函数 |

- 示例

  ```javascript
  ajax(`https://api.github.com/users?per_page=5`)
    .pipe(
      start(() => (this.loading = true)),
      finalize(() => (this.loading = false))
    )
    .subscribe();
  ```
