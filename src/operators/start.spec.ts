import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { start } from "./start";

test("操作符应不影响流的内容", () => {
  const testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b));

  testScheduler.run(helpers => {
    const { cold, expectObservable } = helpers;
    const source = cold("-a--b---c---|").pipe(start(() => null));
    expectObservable(source).toBe("-a--b---c---|");
  });
});

test("应在订阅时执行副作用", () => {
  const fn = jest.fn();
  const source = of(1).pipe(start(fn));

  expect(fn).toBeCalledTimes(0);

  source.subscribe();
  expect(fn).toBeCalledTimes(1);
});

test("应只执行一次副作用", done => {
  const fn = jest.fn();
  const source = of(1, 2, 3).pipe(start(fn));

  expect(fn).toBeCalledTimes(0);

  source.subscribe({
    complete: () => {
      expect(fn).toBeCalledTimes(1);
      done();
    },
  });
});
