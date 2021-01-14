import { of } from "rxjs";
import { finalize } from "rxjs/operators";
import { TestScheduler } from "rxjs/testing";
import { start } from "./start";

describe("operators/start", () => {
  it("操作符应不影响流的内容", () => {
    const testScheduler = new TestScheduler((a, b) => expect(a).toEqual(b));

    testScheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const source = cold("-a--b---c---|").pipe(start(() => null));
      expectObservable(source).toBe("-a--b---c---|");
    });
  });

  it("副作用应在订阅时执行", done => {
    let loading = false;

    const source = of(1).pipe(start(() => (loading = true)));

    expect(loading).not.toBeTruthy();

    source.subscribe(() => {
      try {
        expect(loading).toBeTruthy();
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it("副作用应只执行一次", done => {
    let count = 0;

    const source = of(1, 2, 3).pipe(start(() => (count += 1)));

    source.subscribe({
      complete: () => {
        try {
          expect(count).toBe(1);
          done();
        } catch (e) {
          done(e);
        }
      },
    });
  });

  it("应正确执行清理函数", done => {
    let loading = false;
    let running = false;

    const source = of(1).pipe(
      finalize(() => {
        try {
          expect(loading).not.toBeTruthy();
          expect(running).not.toBeTruthy();
          done();
        } catch (e) {
          done(e);
        }
      }),
      start(() => {
        loading = true;
        return () => (loading = false);
      }),
      start(() => {
        running = true;
        return () => (running = false);
      })
    );

    source.subscribe(() => {
      try {
        expect(loading).toBeTruthy();
        expect(running).toBeTruthy();
      } catch (e) {
        done(e);
      }
    });
  });
});
