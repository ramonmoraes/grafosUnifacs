import { multiplyMatrix, sumMatrix, warshall } from '../src/matrix';


describe("Marix", () => {
  test("multiply matrixes", () => {
    const m1 = [
      [0, 1],
      [0, 1]
    ];
    const m2 = [
      [0, 0],
      [0, 1]
    ]
    const sample = multiplyMatrix(m1, m2);
    expect(sample).toMatchSnapshot();
  });

  test("multiply boolean matrixes", () => {
    const m1 = [
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
    const m2 = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ]
    const sample = multiplyMatrix(m1, m2, true);
    expect(sample).toMatchSnapshot();
  });

  test("sum matrixes", () => {
    const m1 = [
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
    const m2 = [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ]
    
    const sample = sumMatrix(m1, m2);
    expect(sample).toMatchSnapshot();
  });

  test("warshall", () => {
    const m = [
      [ 0, 0, 0, 1],
      [ 0, 0, 1, 1],
      [ 0, 0, 0, 0],
      [ 1, 0, 0, 0],
    ]
    const sample = warshall(m, 4);
    expect(sample).toMatchSnapshot();
  })
});

