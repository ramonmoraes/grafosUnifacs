class GraphNode {
  identifier: string;
  attributes: {
    [key: string]: any
  };

  constructor({ identifier, attributes }: {
    identifier: string;
    attributes?: object;
  }) {
    this.identifier = identifier;
    this.attributes = attributes;
  }

  removeAttribute = (attr: string) => {
    if (attr in this.attributes) {
      delete this.attributes[attr];
    } else {
      console.log('Attribute not found');
    }
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
    this.links = [];
    this.nodes.forEach((node: GraphNode) => {
      Object.keys(node.attributes).forEach((attr: string) => {
        const value = node.attributes[attr];
        this.nodes.forEach((otherNode: GraphNode) => {
          if (node === otherNode) return;
          if (attr in node.attributes && otherNode.attributes[attr] === value) {
            this.links.push({
              identifier: attr,
              connections: [node, otherNode]
            });
          }
        });
      });
    });

    console.table(this.nodes);
    console.table(this.links);
  }

  addNode = (node: GraphNode) => {
    this.nodes.push(node);
    this.createLinks();
  }

  removeNodeByIdentifier = (identifier: string) => {
    const newNodes = this.nodes.filter(node => node.identifier != identifier);
    if (newNodes.length == this.nodes.length) {
      console.log("Node not found")
    } else {
      this.nodes = newNodes;
      this.createLinks();
    }
  }

  removeLinkByIdentifier = (identifier: string, attr: string) => {
    const node = this.nodes.filter(node => identifier === identifier);
    if (node.length !== 1) {
      console.log('Node not found');
    } else {
      node[0].removeAttribute(attr);
    }
  }
}

new Grafo(tourists);