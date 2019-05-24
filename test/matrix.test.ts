import Graph, { GraphLinks } from "../src/graph";
import GraphNode from "../src/graphNode";
import { multiplyMatrix, sumMatrix, warshall } from '../src/matrix';
import GraphMatrix from '../src/graphMatrix';


describe("Marix", () => {
  let graph: Graph;
  let ismeloNode: GraphNode;
  let dartNode: GraphNode;

  beforeEach(() => {
    ismeloNode = new GraphNode({
      identifier: "ismelo",
      attributes: { lang: ["en", "pt"] }
    });

    dartNode = new GraphNode({
      identifier: "dart",
      attributes: { lang: ["en"] }
    });

    graph = new Graph([ismeloNode, dartNode]);
    graph.createLinks();
  });

  test("get adjacentGraphMatrix", () => {
    const sample = new GraphMatrix(graph).adjacentGraphMatrix({filteredValue: "en"})
    expect(sample).toMatchSnapshot();
  });

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

