import Graph, { GraphLinks } from "../src/graph";
import GraphNode from "../src/graphNode";


describe("Graph", () => {
  let graph: Graph;
  beforeEach(() => {
    const nodes: GraphNode[] = [
      new GraphNode({
        identifier: "dart",
        attributes: { lang: ["en"], }
      }),
      new GraphNode({
        identifier: "ismelo",
        attributes: { lang: ["en"]}
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

  test.only("getLinksBetweenNodes", () => {
    const links = graph.getLinkBetweenNodes(
      graph.nodes[0],
      graph.nodes[1]
    );

    expect(links.length).toEqual(1);
    expect(links[0].identifier).toEqual('lang');
    expect(links[0].value).toEqual('en');
    expect(links[0].connections[0]).toEqual(graph.nodes[0])
    expect(links[0].connections[1]).toEqual(graph.nodes[1])
  });
});
