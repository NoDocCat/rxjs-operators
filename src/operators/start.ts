import { MonoTypeOperatorFunction } from "rxjs";

export function start<T>(callback: () => void): MonoTypeOperatorFunction<T> {
  callback && callback();
  return (source) => source;
}
