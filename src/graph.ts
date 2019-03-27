import GraphNode from "./graphNode";
import { flat } from "./utils";

export type GraphLinks = {
  identifier: string;
  value: any;
  connections: GraphNode[];
};

export default class Grafo {
  nodes: GraphNode[];
  links: GraphLinks[] = [];

  constructor(nodes: GraphNode[]) {
    this.nodes = nodes;
  }

  createLinks = () => {
    let links: GraphLinks[] = [];
    this.nodes.forEach((node: GraphNode) => {
      this.nodes.forEach((otherNode: GraphNode) => {
        if (node === otherNode) return null;
        links = [...this.links, ...this.getLinkBetweenNodes(node, otherNode)];
      });
    });

    this.links = [... new Set(links)]
  };

  getLinkBetweenNodes = (node1: GraphNode, node2: GraphNode) => {
    const links = Object.keys(node1.attributes).map((attributeKey: string) => {
      if (!(attributeKey in node2.attributes)) return null;

      return node1.attributes[attributeKey]
        .map((value: any) =>
          value in node2.attributes[attributeKey] ||
          node2.attributes[attributeKey].includes(value)
            ? {
                identifier: attributeKey,
                value,
                connections: [node1, node2]
              }
            : null
        )
        .filter((validLink: any) => validLink);
    });

    return flat(links);
  };

  addNode = (node: GraphNode) => {
    this.nodes.push(node);
  };

  removeNodeByIdentifier = (identifier: string) => {
    const newNodes = this.nodes.filter(node => node.identifier != identifier);
    if (newNodes.length == this.nodes.length) {
      console.log("Node not found");
    } else {
      this.nodes = newNodes;
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
