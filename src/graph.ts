import GraphNode from "./graphNode";
import { flat, isEqual } from "./utils";

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
    this.links = [];

    this.nodes.forEach((node: GraphNode) => {
      this.nodes.forEach((otherNode: GraphNode) => {
        if (node === otherNode) return null;
        links = [...links, ...this.getLinkBetweenNodes(node, otherNode)];
      });
    });

    this.links = this.removeDuplicatesLinks(links);
  };

  removeDuplicatesLinks = (links: GraphLinks[]): GraphLinks[] => {
    return [...new Set(links)].filter((l: GraphLinks, index: number) => index%2 != 0);
  };

  getLinkBetweenNodes = (node1: GraphNode, node2: GraphNode): GraphLinks[] => {
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
    const node = this.nodes.filter(node => identifier === node.identifier);
    if (node.length !== 1) {
      console.log("Node not found");
    } else {
      node[0].removeAttribute(attr);
    }
  };

  getNodeOrderByIdentifier = (identifier: string): number => {
    const nodes = this.nodes.filter(node => identifier === node.identifier);
    if (nodes.length !== 1) {
      console.log("Node not found");
    }

    const node = nodes[0];
    let order = 0;
    this.links.forEach((link: GraphLinks) => {
      const connections = link.connections.filter(
        (linkNode: GraphNode) => linkNode === node
      );
      order = order + connections.length;
    });
    return order;
  };
}
