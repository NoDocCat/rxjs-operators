# rxjs-operators

Rxjs 操作符扩展

![npm](https://img.shields.io/npm/v/@ndct/rxjs-operators?logo=npm&style=for-the-badge)
![CI](https://img.shields.io/github/workflow/status/nodoccat/rxjs-operators/CI?label=CI&logo=github&style=for-the-badge)
![code quality](https://img.shields.io/codacy/grade/821168e488bd4e50ac16b50f6740ac29?logo=codacy&style=for-the-badge)
![coverage](https://img.shields.io/codacy/coverage/821168e488bd4e50ac16b50f6740ac29?logo=codacy&style=for-the-badge)

## 安装

```shell
npm install @ndct/rxjs-operators
```

## 操作符

### start

> 在订阅开始时执行副作用
>
> callback 可以返回一个函数用于清理副作用, 清理函数将在 finalize 时执行

```typescript
start<T>(callback: () => any): MonoTypeOperatorFunction<T>
```

- 参数

  | 名称     | 说明                   |
  | -------- | ---------------------- |
  | callback | 订阅开始时要调用的函数 |

- 示例

  ```javascript
  ajax(`https://api.github.com/users?per_page=5`)
    .pipe(
      start(() => {
        this.loading = true;
        return () => (this.loading = false);
      })
    )
    .subscribe();
  ```
