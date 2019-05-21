import { isEqual } from "../src/utils";

describe("Utils", () => {
  test("isEqual", () => {
    expect(isEqual({ n: "n" }, { n: "n" })).toBeTruthy();
    expect(isEqual({ n: "n", i: 22 }, { n: "n", i: 23 })).toBeFalsy();
    expect(isEqual({ i: 22, n: "n" }, { n: "n", i: 22 })).toBeTruthy();
    expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBeTruthy();
    expect(isEqual({ a: [1, 3, 2] }, { a: [1, 2, 3] })).toBeTruthy();
  });
});
