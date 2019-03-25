class GraphNode {
  identifier: string;
  attributes: {
    [key:  string]: any
  };

  constructor({ identifier, attributes }: {
    identifier: string;
    attributes?: object;
  }) {
    this.identifier = identifier;
    this.attributes = attributes;
  }
}

const tourists: GraphNode[] = [
  new GraphNode({ identifier: 'dart', attributes: { lang: 'en' } }),
  new GraphNode({ identifier: 'ismelo', attributes: { lang: 'en' } }),
  new GraphNode({ identifier: 'fgod', attributes: {} }),
  new GraphNode({ identifier: 'murtinha', attributes: {} })
];

type GraphLinks = {
  identifier: string,
  connections: GraphNode[]
}

class Grafo {
  nodes: GraphNode[];
  links: GraphLinks[] = [];

  constructor(nodes: GraphNode[]) {
    this.nodes = nodes;
    this.createLinks();
  }

  createLinks = () => {
    this.nodes.forEach((node: GraphNode) => {
      Object.keys(node.attributes).forEach((attr: string) => {
        const value = node.attributes[attr];
        this.nodes.forEach((otherNode: GraphNode) => {
          if (node === otherNode) return;
          if (attr in node.attributes && otherNode.attributes[attr] === value) {
            this.links.push({
              identifier: attr,
              connections: [node, otherNode]
            })
          }
        })
      });
    });

    console.table(this.nodes);
    console.table(this.links);
  }
}

new Grafo(tourists);