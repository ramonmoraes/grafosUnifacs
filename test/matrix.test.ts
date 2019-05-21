import Graph, { GraphLinks } from "../src/graph";
import GraphNode from "../src/graphNode";
import matrix from '../src/matrix';


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
  });

  test("get matrix", () => {
    const sample = matrix(graph, "en")
    expect(sample).toMatchSnapshot();
  });
});

