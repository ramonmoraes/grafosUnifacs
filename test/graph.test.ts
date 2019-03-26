import Graph, { GraphLinks } from "../src/graph";
import GraphNode from "../src/graphNode";


describe("Graph", () => {
  let graph: Graph;
  beforeEach(() => {
    const nodes: GraphNode[] = [
      new GraphNode({
        identifier: "dart",
        attributes: { lang: ["en", "fr", "pt", "es"], age: 21 }
      }),
      new GraphNode({
        identifier: "ismelo",
        attributes: { lang: ["en", "fr", "al"], age: 12 }
      })
    ];
    graph = new Graph(nodes);
  });

  test("addNode", () => {
    expect(graph.nodes.length).toEqual(2);
    graph.addNode(new GraphNode({ identifier: "foo" }));
    expect(graph.nodes.length).toEqual(3);
  });

  test("removeNodeByIdentifier", () => {
    expect(graph.nodes.length).toEqual(2);
    graph.removeNodeByIdentifier("ismelo");
    expect(graph.nodes.length).toEqual(1);
  });
});
