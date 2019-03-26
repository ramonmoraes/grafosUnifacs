import GraphNode from './graphNode';

export type GraphLinks = {
  identifier: string;
  connections: GraphNode[];
};

export default class Grafo {
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
        const values = Array.isArray(node.attributes[attr])
          ? node.attributes[attr]
          : [node.attributes[attr]];

        this.nodes.forEach((otherNode: GraphNode) => {
          if (node === otherNode) return;
          if (!(attr in node.attributes)) return;

          const newArray = Array.isArray(otherNode.attributes[attr])
            ? otherNode.attributes[attr]
            : [otherNode.attributes[attr]];

          values.forEach((val: any) => {
            if (newArray.includes(val) || val in newArray) {
              this.links.push({
                identifier: attr,
                connections: [node, otherNode]
              });
            }
          });
        });
      });
    });
  };

  addNode = (node: GraphNode) => {
    this.nodes.push(node);
    this.createLinks();
  };

  removeNodeByIdentifier = (identifier: string) => {
    const newNodes = this.nodes.filter(node => node.identifier != identifier);
    if (newNodes.length == this.nodes.length) {
      console.log("Node not found");
    } else {
      this.nodes = newNodes;
      this.createLinks();
    }
  };

  removeLinkByIdentifier = (identifier: string, attr: string) => {
    const node = this.nodes.filter(node => identifier === identifier);
    if (node.length !== 1) {
      console.log("Node not found");
    } else {
      node[0].removeAttribute(attr);
    }
  };
}