import GraphNode from "./graphNode";
import { flat, arrayContain } from "./utils";

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
    this.links = [];
    this.nodes.forEach((node: GraphNode) => {
      this.nodes.forEach((otherNode: GraphNode) => {
        if (node === otherNode) return null;
        this.links = [...this.links, ...this.getLinkBetweenNodes(node, otherNode)];
      });
    });
  };

  getLinkBetweenNodes = (node1: GraphNode, node2: GraphNode): GraphLinks[] => {
    const links = Object.keys(node1.attributes).map((attributeKey: string) => {
      if (!(attributeKey in node2.attributes)) return null;

      return node1.attributes[attributeKey]
        .map((value: any) => {
          if (!arrayContain(node2.attributes[attributeKey], value)) return null;
          const newLink = {
            identifier: attributeKey,
            value,
            connections: [node1, node2]
          };
          const containsLink = this.containsLink(newLink);
          return containsLink ? null : newLink;
        })
        .filter((validLink: any) => validLink);
    });

    return flat(links);
  };

  containsLink = (givenLink: GraphLinks): boolean => {
    return this.links.filter((link: GraphLinks) => {
      const sameIdentifier = link.identifier === givenLink.identifier;
      const sameValue = link.value === givenLink.value;
      const sameLinks = link.connections.filter(node => arrayContain(givenLink.connections, node))
      const containsLink = sameIdentifier && sameValue && sameLinks.length === 2;
      if (containsLink) return true;
      return false;
    }).length > 0;
  }

  addNode = (node: GraphNode) => {
    this.nodes.push(node);
  };

  getNodeByIdentifier(identifier: string) {
    const nodes = this.nodes.filter(node => identifier === node.identifier);
    if (nodes.length !== 1) {
      console.log("Node not found");
      return null;
    }
    return nodes[0];
  }

  removeNodeByIdentifier = (identifier: string) => {
    const newNodes = this.nodes.filter(node => node.identifier != identifier);
    if (newNodes.length == this.nodes.length) {
      console.log("Node not found");
    } else {
      this.nodes = newNodes;
    }
  };

  removeLinkByIdentifier = (identifier: string, attr: string) => {
    const node = this.getNodeByIdentifier(identifier);
    if (node) node.removeAttribute(attr);
  };

  getLinksByIdentifier = (identifier: string) => {
    const node = this.getNodeByIdentifier(identifier);
    return node
      ? this.links.filter((l: GraphLinks) => arrayContain(l.connections, node))
      : null;
  };

  getNodeOrderByIdentifier = (identifier: string): number => {
    return this.getLinksByIdentifier(identifier).length;
  };

  getAdjacentNodesByIdentifier = (identifier: string): GraphNode[] => {
    return flat(this.getLinksByIdentifier(identifier).map(l => l.connections));
  };

  calcGraphOrder = () => {
    const nodeOrders: number[] = this.nodes.map(node => this.getNodeOrderByIdentifier(node.identifier)).sort();
    return {
      "min": nodeOrders[0],
      "max": nodeOrders[nodeOrders.length - 1],
      "med": nodeOrders.reduce((total, val) => total= total + val)/nodeOrders.length
    }
  }
}
