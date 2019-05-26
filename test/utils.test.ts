import { isEqual } from "../src/utils";
import PriorityQueue from '../src/utils/priorityQueue';

describe("Utils", () => {
  test("isEqual", () => {
    expect(isEqual({ n: "n" }, { n: "n" })).toBeTruthy();
    expect(isEqual({ n: "n", i: 22 }, { n: "n", i: 23 })).toBeFalsy();
    expect(isEqual({ i: 22, n: "n" }, { n: "n", i: 22 })).toBeTruthy();
    expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBeTruthy();
    expect(isEqual({ a: [1, 3, 2] }, { a: [1, 2, 3] })).toBeTruthy();
  });

  test("priority queue", () => {
    const obj1 = {
      priority: 1,
      object: {}
    }
    const obj2 = {
      priority: 2,
      object: {}
    }
    const obj3 = {
      priority: 3,
      object: {}
    }

    const queue = new PriorityQueue();
    queue.enqueue(obj3);
    queue.enqueue(obj1);
    queue.enqueue(obj2);

    expect([obj1, obj2, obj3]).toEqual(queue.queue);
  });
});
