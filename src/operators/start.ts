import { defer, MonoTypeOperatorFunction } from "rxjs";
import { finalize } from "rxjs/operators";

/**
 * 在订阅开始时执行副作用
 * callback 可以返回一个函数用于清理副作用, 清理函数将在 finalize 时执行
 * @param callback 订阅开始时要调用的函数
 */
export function start<T>(callback: () => unknown): MonoTypeOperatorFunction<T> {
  return source =>
    defer(() => {
      const cleanUpFn = callback && callback();
      return typeof cleanUpFn === "function" ? source.pipe(finalize(cleanUpFn as () => void)) : source;
    });
}
