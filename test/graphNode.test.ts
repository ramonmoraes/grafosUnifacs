import GraphNode from "../src/graphNode";

describe("GraphNode", () => {
  test("remove attribute", () => {
    const node = new GraphNode({
      identifier: "foo",
      attributes: {
        key: "val"
      }
    });

    expect("key" in node.attributes).toBeTruthy();
    node.removeAttribute("key");
    expect("key" in node.attributes).toBeFalsy();
  });

  test("snapshot match", () => {
    const node = new GraphNode({
      identifier: "foo",
      attributes: {
        key: "val",
        anotherKey: [1, 2, 3]
      }
    });
    expect(node).toMatchSnapshot();
  });
});
