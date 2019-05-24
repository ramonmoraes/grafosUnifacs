import Graph from "../src/graph";
import GraphNode from "../src/graphNode";
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
});

