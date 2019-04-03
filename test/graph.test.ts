import Graph, { GraphLinks } from "../src/graph";
import GraphNode from "../src/graphNode";

describe("Graph", () => {
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

  test("getLinksBetweenNodes", () => {
    const links = graph.getLinkBetweenNodes(graph.nodes[0], graph.nodes[1]);

    expect(links.length).toEqual(1);
    expect(links[0].identifier).toEqual("lang");
    expect(links[0].value).toEqual("en");
    expect(links[0].connections[0]).toEqual(graph.nodes[0]);
    expect(links[0].connections[1]).toEqual(graph.nodes[1]);
  });

  test("createLinks", () => {
    graph.createLinks();
    expect(graph.links.length).toEqual(1);
    graph.addNode(
      new GraphNode({ identifier: "qq", attributes: { lang: ["en"] } })
    );
    graph.createLinks();
    expect(graph.links.length).toEqual(3);
  });

  test("getLinksByIdentifier", () => {
    graph.createLinks();
    let links = graph.getLinksByIdentifier("ismelo");
    expect(links).toMatchSnapshot();

    graph.addNode(
      new GraphNode({ identifier: "foo", attributes: { lang: ["pt"] } })
    );

    graph.createLinks();
    links = graph.getLinksByIdentifier("ismelo");
    expect(links).toMatchSnapshot();
  });

  test("getNodeOrderByIdentifier", () => {
    graph.createLinks();
    let order = graph.getNodeOrderByIdentifier("ismelo");
    expect(order).toEqual(1);

    order = graph.getNodeOrderByIdentifier("dart");
    expect(order).toEqual(1);

    graph.addNode(
      new GraphNode({ identifier: "foo", attributes: { lang: ["en"] } })
    );

    graph.createLinks();
    order = graph.getNodeOrderByIdentifier("ismelo");
    expect(order).toEqual(2);
  });

  test("getAdjacentNodesByIdentifier", () => {
    graph.createLinks();
    expect(graph.getAdjacentNodesByIdentifier("dart")[0]).toEqual(ismeloNode)
  });
});
