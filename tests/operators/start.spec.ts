import { of } from "rxjs";
import { start } from "../../src";

it("应当在订阅回调之前执行", () => {
  let flag = false;

  of(1, 2, 3)
    .pipe(
      start(() => {
        expect(flag).toBe(false);
      })
    )
    .subscribe(() => {
      flag = true;
    });
});
