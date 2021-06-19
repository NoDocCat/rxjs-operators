import { defer, MonoTypeOperatorFunction } from "rxjs";

/**
 * 在订阅时执行副作用
 * @param callback 订阅时要调用的函数
 */
export function start<T>(callback: () => any): MonoTypeOperatorFunction<T> {
  return source =>
    defer(() => {
      callback && callback();
      return source;
    });
}
