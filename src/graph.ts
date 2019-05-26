import GraphNode from "./graphNode";
import { flat, arrayContain, uniqueArray } from "./utils";
import eul from "./eulerian";

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
        this.links = [...this.links, ...this.getLinkBetweenNodes(node, otherNode)].filter(
          valid => valid
        );
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
    return (
      this.links.filter((link: GraphLinks) => {
        const sameIdentifier = link.identifier === givenLink.identifier;
        const sameValue = link.value === givenLink.value;
        const sameLinks = link.connections.filter(node =>
          arrayContain(givenLink.connections, node)
        );
        const containsLink = sameIdentifier && sameValue && sameLinks.length === 2;
        if (containsLink) return true;
        return false;
      }).length > 0
    );
  };

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
    return node ? this.links.filter((l: GraphLinks) => arrayContain(l.connections, node)) : [];
  };

  getNodeOrderByIdentifier = (identifier: string): number => {
    return this.getLinksByIdentifier(identifier).length;
  };

  getAdjacentNodesByIdentifier = (identifier: string): GraphNode[] => {
    return uniqueArray(flat(this.getLinksByIdentifier(identifier).map(l => l.connections))).filter(
      node => node.identifier != identifier
    );
  };

  calcGraphOrder = () => {
    const nodeOrders: number[] = this.nodes
      .map(node => this.getNodeOrderByIdentifier(node.identifier))
      .sort();
    return {
      min: nodeOrders[0],
      max: nodeOrders[nodeOrders.length - 1],
      med: nodeOrders.reduce((total, val) => (total = total + val)) / nodeOrders.length
    };
  };

  breadthFirstSearch(node: GraphNode = this.nodes[0], exploredNodes: GraphNode[] = []): boolean {
    if (!arrayContain(exploredNodes, node)) {
      exploredNodes.push(node);
    }

    const connectedNodes = this.getAdjacentNodesByIdentifier(node.identifier);
    const toBeExploredNodes = connectedNodes.filter(n => !arrayContain(exploredNodes, n));

    if (toBeExploredNodes.length > 0) {
      for (let eNode of toBeExploredNodes) {
        this.breadthFirstSearch(eNode, exploredNodes);
      }
    }

    const done = exploredNodes.length >= this.nodes.length;
    if (done) {
      console.log("Graph is connected, done fully BFS");
      console.table(exploredNodes);
    }
    return done;
  }

  hasEulerianPath = () => {
    const isConnected = this.breadthFirstSearch();
    if (!isConnected) return false;
    let evenLinks = 0;
    this.nodes.forEach((node: GraphNode) => {
      const identifier = node.identifier;
      const nodeLinks = this.getLinksByIdentifier(identifier);
      if (nodeLinks.length % 2 !== 0) {
        evenLinks++;
      }
    });

    return evenLinks == 0 || evenLinks == 2;
  };

  getSimplifiedTable = (filterValue: string = "") => {
    const simplified = this.links.map((x: any) => ({
      identifier: x.identifier,
      value: x.value,
      connections: x.connections.map((n: GraphNode) => n.identifier)
    }));

    return filterValue ? simplified.filter(link => link.value === filterValue) : simplified;
  };

  getEulerianPath = () => {
    const links = this.links.map(l => l.connections.map(c => c.identifier));
    return eul({ edges: links, directed: true });
  };
}
