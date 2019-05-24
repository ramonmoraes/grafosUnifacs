import Graph  from "./graph";
import {multiplyMatrix, sumMatrix, warshall, dijkstra, logMatrix, getEmptyMatrix, matrix} from './matrix';

export type graphPositionMap = {
  [key: string]: number;
};

export default class GraphMatrix {
  public graph:Graph;
  public graphPositionMap:graphPositionMap;
  public matrix:matrix;

  constructor(graph: Graph, options = {}) {
    this.graph = graph;
    graph.createLinks();
    this.graphPositionMap = this.getGraphPositionMap();
    this.matrix = this.adjacentGraphMatrix();
  }

  getGraphPositionMap = ():graphPositionMap => {
    const indexes = this.graph.nodes.map(n => n.identifier);
    const positionMap:graphPositionMap = {};
    for (let i in indexes) {
      positionMap[indexes[i]] = parseInt(i);
    }
    return positionMap;
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
