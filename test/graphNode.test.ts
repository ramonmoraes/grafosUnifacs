import GraphNode from '../src/graphNode';

test('remove attribute', () => {
  const node = new GraphNode({
    identifier: "foo",
    attributes: {
      key: "val",
    }
  });

  expect('key' in node.attributes).toBeTruthy()
  node.removeAttribute("key")
  expect('key' in node.attributes).toBeFalsy()
});

test('snapshot match', () => {
  const node = new GraphNode({
    identifier: "foo",
    attributes: {
      key: "val",
    }
  });
  expect(node).toMatchSnapshot()
});