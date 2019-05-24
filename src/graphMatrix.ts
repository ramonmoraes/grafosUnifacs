import Graph  from "./graph";
import {multiplyMatrix, sumMatrix, warshall, dijkstra, logMatrix, getEmptyMatrix, matrix} from './matrix';

export type graphPositionMap = {
  [key: string]: number;
};

export type reverseGraphPositionMap = {
  [key: number]: string;
};

export default class GraphMatrix {
  public graph:Graph;
  public graphPositionMap:graphPositionMap = {};
  public reverseGraphPositionMap:reverseGraphPositionMap = {};
  public matrix:matrix;

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
      reverseGraphPositionMap[parseInt(i)] = indexes[i]
    }
  }
  
  adjacentGraphMatrix = ({ filteredValue = "fr", twoWays = false } = {}): matrix => {
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
  }
}
