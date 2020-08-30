import { Observable, of } from "rxjs";
import { start, finalize } from "../../src";
import { TestScheduler } from "rxjs/testing";

describe("operators/start", () => {
  it("应在订阅回调之前执行", () => {
    let result = 0;

    of(1, 2, 3)
      .pipe(
        start(() => expect(result).toBe(0)),
        finalize(() => expect(result).toBe(3))
      )
      .subscribe((res) => {
        result = res;
      });
  });

  it("应不影响流的内容", () => {
    const testScheduler = new TestScheduler((o1, o2) => expect(o1).toEqual(o2));

    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const sources = cold("-a--b---c---|").pipe(start(() => null));
      const expected = "-a--b---c---|";

      expectObservable(sources).toBe(expected);
    });
  });

  it("应在错误处理之前执行", () => {
    const sources = new Observable((s) => s.error(new Error("default error")));
    let result: Error | null = null;

    sources
      .pipe(
        start(() => expect(result).toBeNull()),
        finalize(() => expect(result?.message).toBe("default error"))
      )
      .subscribe(
        () => expect(true).toThrow(),
        (error) => (result = error)
      );
  });

  it("不订阅时不执行副作用", () => {
    let flag = false;

    of(1, 2, 3).pipe(start(() => (flag = true)));

    expect(flag).not.toBeTruthy();
  });

  it("副作用只执行一次", () => {
    let count = 0;

    of(1, 2, 3)
      .pipe(start(() => (count += 1)))
      .subscribe(
        () => null,
        () => null,
        () => {
          expect(count).toBe(1);
        }
      );
  });
});
