import { MonoTypeOperatorFunction, defer } from "rxjs";

export function start<T>(callback: () => void): MonoTypeOperatorFunction<T> {
  return (source) =>
    defer(() => {
      callback && callback();
      return source;
    });
}
