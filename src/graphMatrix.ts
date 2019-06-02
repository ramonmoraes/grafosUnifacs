import Graph from "./graph";
import {
  dijkstra,
  logMatrix,
  getEmptyMatrix,
  matrix
} from "./matrix";
import { arrayContain } from "./utils";
import PriorityQueue from "./utils/priorityQueue";
import GraphNode from "./graphNode";

export type graphPositionMap = {
  [key: string]: number;
};

export type reverseGraphPositionMap = {
  [key: number]: string;
};

export type graphPathDistance = {
  [key: string]: {
    distance: number;
    path: string[];
  };
};

export default class GraphMatrix {
  public graph: Graph;
  public graphPositionMap: graphPositionMap = {};
  public reverseGraphPositionMap: reverseGraphPositionMap = {};
  public matrix: matrix;

  constructor(graph: Graph, options = {}) {
    this.graph = graph;
    graph.createLinks();
    this.setGraphMaps();

    this.matrix = this.adjacentGraphMatrix();
    // this.matrix = this.getAdjacentDijkstraMatrix();
  }

  setGraphMaps = () => {
    const indexes = this.graph.nodes.map(n => n.identifier);
    const { graphPositionMap, reverseGraphPositionMap } = this;

    for (let i in indexes) {
      graphPositionMap[indexes[i]] = parseInt(i);
      reverseGraphPositionMap[parseInt(i)] = indexes[i];
    }
  };

  adjacentGraphMatrix = ({ filteredValue = "", twoWays = true } = {}): matrix => {
    const { graphPositionMap, graph } = this;
    const table = graph.getSimplifiedTable(filteredValue);
    const connections = table.map(link => link.connections);
    const matrix = getEmptyMatrix(graph.nodes.length);

    connections.forEach(connection => {
      const identifier1 = connection[0];
      const pos1 = graphPositionMap[identifier1];
      const identifier2 = connection[1];
      const pos2 = graphPositionMap[identifier2];
      matrix[pos1][pos2] = 1;
      if (twoWays) matrix[pos2][pos1] = 1;
    });

    return matrix;
  };

  bellman = (startNodeIndex: number = 3) => {
    const { graph } = this;

    const startNode = graph.nodes[startNodeIndex];
    const distances = this.getBaseDistance(startNode);

    const exploredNodes: GraphNode[] = [];
    let toBeExploredNodes: GraphNode[] = [startNode];

    while (toBeExploredNodes.length != 0) {
      toBeExploredNodes.forEach(exploringNode => {
        const exploringIdentifier = exploringNode.identifier;
        const linkedNodes = graph.getAdjacentNodesByIdentifier(exploringIdentifier);

        toBeExploredNodes = toBeExploredNodes.filter(n => n !== exploringNode);
        exploredNodes.push(exploringNode);

        linkedNodes.forEach(node => {
          const nodesDist = this.getDistBetweenNodes(node, exploringNode);
          const startNodeExploringNodeDist = distances[exploringIdentifier].distance;
          const summedDist = startNodeExploringNodeDist + nodesDist;

          const nodeDijkstrakaDist = distances[node.identifier];
          if (summedDist < nodeDijkstrakaDist.distance) {
            nodeDijkstrakaDist.distance = summedDist;
            nodeDijkstrakaDist.path = [...distances[exploringIdentifier].path, node.identifier];
          }

          if (!arrayContain(exploredNodes, node)) {
            toBeExploredNodes.push(node);
          }
        });
      });
    }
    console.log(distances);
  };

  getBaseDistance = (startNode: GraphNode) => {
    const { graph } = this;
    const distances: graphPathDistance = {};
    graph.nodes.forEach(node => {
      distances[node.identifier] = {
        distance: node === startNode ? 0 : Number.POSITIVE_INFINITY,
        path: []
      };
    });
    return distances;
  };

  getDistBetweenNodes = (n1: GraphNode, n2: GraphNode): number => {
    const { graphPositionMap, matrix } = this;
    const pos1 = graphPositionMap[n1.identifier];
    const pos2 = graphPositionMap[n2.identifier];
    return matrix[pos1][pos2];
  };

  getAdjacentDijkstraMatrix = () => {
    const { matrix } = this;
    const dijkstraMatrix = getEmptyMatrix(matrix.length);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (i == j) {
          dijkstraMatrix[i][j] = 0;
          continue;
        }
        if (matrix[i][j] == 0) {
          dijkstraMatrix[i][j] = Number.POSITIVE_INFINITY;
          continue;
        }
        dijkstraMatrix[i][j] = 1;
      }
    }
    return dijkstraMatrix;
  };

  dijkstra = (startNodeIndex: number = 3) => {
    const { graph } = this;
    const startNode = graph.nodes[startNodeIndex];

    const visitedNodes: GraphNode[] = [];
    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue({
      object: {
        node: startNode,
        prev: startNode
      },
      priority: 0
    });

    while (priorityQueue.queue.length != 0) {
      const currDequeuedObj = priorityQueue.dequeue();
      const currNode = currDequeuedObj.object.node;
      const currNodeDist = currDequeuedObj.priority;
      visitedNodes.push(currNode);

      graph.getAdjacentNodesByIdentifier(currNode.identifier).forEach(neighbor => {
        if (arrayContain(visitedNodes, neighbor)) return;
        const nodeDist = this.getDistBetweenNodes(currNode, neighbor);

        priorityQueue.enqueue({
          object: {
            node: neighbor,
            prev: currNode
          },
          priority: nodeDist + currNodeDist
        });
      });
    }

    const distances = this.getBaseDistance(startNode);
    for (let queueObject of priorityQueue.dequeued) {
      const node = queueObject.object.node.identifier;
      const prev = queueObject.object.prev.identifier;
      const weigth = queueObject.priority;
      const currNodeDist = distances[node].distance;
      if (currNodeDist === Number.POSITIVE_INFINITY || queueObject.object.node === startNode) {
        distances[node] = {
          path: [...distances[prev].path, node],
          distance: weigth
        };
        continue;
      }

      if (currNodeDist < weigth) {
        distances[node] = {
          distance: weigth,
          path: [...distances[prev].path, node]
        };
      }
    }

    console.log(distances);
  };

  logMatrix = (matrix: matrix = this.matrix) => {
    const labels = Object.keys(this.graphPositionMap);
    const labaledMatrix: any = [
      ["", ...labels],
      ...matrix
    ];

    for (let i = 0; i < matrix.length; i++) {
      const row = [
        this.reverseGraphPositionMap[i],
        ...matrix[i]
      ];
      labaledMatrix[i + 1] = row;
    }

    console.table(labaledMatrix)
  }
}
