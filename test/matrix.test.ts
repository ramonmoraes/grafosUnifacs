import Graph, { GraphLinks } from "../src/graph";
import GraphNode from "../src/graphNode";
import adjacentGraphMatrix, { multiplyMatrix } from '../src/matrix';


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
    const sample = adjacentGraphMatrix(graph, "en")
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
  })
});

