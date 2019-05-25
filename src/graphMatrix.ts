import Graph from "./graph";
import {
  multiplyMatrix,
  sumMatrix,
  warshall,
  dijkstra,
  logMatrix,
  getEmptyMatrix,
  matrix
} from "./matrix";
import { arrayContain } from "./utils";
import GraphNode from "./graphNode";

export type graphPositionMap = {
  [key: string]: number;
};

export type reverseGraphPositionMap = {
  [key: number]: string;
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
  }

  setGraphMaps = () => {
    const indexes = this.graph.nodes.map(n => n.identifier);
    const { graphPositionMap, reverseGraphPositionMap } = this;

    for (let i in indexes) {
      graphPositionMap[indexes[i]] = parseInt(i);
      reverseGraphPositionMap[parseInt(i)] = indexes[i];
    }
  };

  adjacentGraphMatrix = ({
    filteredValue = "",
    twoWays = true
  } = {}): matrix => {
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

  dijkstra = (startNodeIndex: number = 2) => {
    const { graph, graphPositionMap } = this;
    const matrix = this.getAdjacentDijkstraMatrix();

    const distances: graphPositionMap = {};
    const startNode = graph.nodes[startNodeIndex];
    graph.nodes.forEach(node => {
      distances[node.identifier] =
        node === startNode ? 0 : Number.POSITIVE_INFINITY;
    });

    const exploredNodes: GraphNode[] = [];
    let toBeExploredNodes: GraphNode[] = [startNode];

    while (toBeExploredNodes.length != 0) {
      toBeExploredNodes.forEach(exploringNode => {
        const linkedNodes = graph.getAdjacentNodesByIdentifier(
          exploringNode.identifier
        );

        toBeExploredNodes = toBeExploredNodes.filter(n => n !== exploringNode);
        exploredNodes.push(exploringNode);

        linkedNodes.forEach(node => {
          const exploringNodePosition = graphPositionMap[exploringNode.identifier];
          const position = graphPositionMap[node.identifier];
          const distBetweewnNodes = matrix[position][exploringNodePosition];
          const distBetweenStartNodeAndExploringNode = distances[exploringNode.identifier];
          const summedDist = distBetweenStartNodeAndExploringNode + distBetweewnNodes;
          if (summedDist < distances[node.identifier]) {
            distances[node.identifier] = summedDist;
          }
          if (!arrayContain(exploredNodes, node)) {
            toBeExploredNodes.push(node);
          }
        });
      });
    }
    console.log(distances);
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
}
