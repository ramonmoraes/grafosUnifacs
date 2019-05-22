import Graph, { GraphLinks } from './graph';

export type matrix = number[][]

export function getEmptyMatrix(size: number = 1, defaultValue:any = 0 ):matrix {
  let emptyMatrix:any = [];
  for (let i = 0; i < size; i++) {
    emptyMatrix[i] = [];    
    for (let j = 0; j < size; j++) {
      emptyMatrix[i][j] = defaultValue
    }
  }
  return emptyMatrix;
}

export function getGraphPositionMap(graph: Graph) {
  const indexes = graph.nodes.map(n => n.identifier);
  const positionMap:{
    [key: string]: number
  } = {}
  for (let i in indexes) {
    positionMap[indexes[i]] = parseInt(i);
  }
  return positionMap;
}

export default function adjacentGraphMatrix (graph: Graph, filteredValue:string = "fr", twoWays:boolean = false): matrix {
  const table = graph.getSimplifiedTable(filteredValue)
  const connections = table.map(link => link.connections)
  const positionMap = getGraphPositionMap(graph);
  const matrix = getEmptyMatrix(graph.nodes.length);
  
  connections.forEach(connection => {
    const identifier1 = connection[0];
    const pos1 = positionMap[identifier1];
    const identifier2 = connection[1];
    const pos2 = positionMap[identifier2];
    matrix[pos1][pos2] = 1
    if (twoWays) matrix[pos2][pos1] = 1
  });
  
  return matrix
}

export function multiplyMatrix(m1: matrix, m2: matrix) {
  const m1Rows = m1.length;
  const m2Columns = m1[0].length;
  const bNumCols = m2[0].length;
  const m = getEmptyMatrix(m1Rows);
  
  for (let r = 0; r < m1Rows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (let c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (let i = 0; i < m2Columns; ++i) {
        m[r][c] += m1[r][i] * m2[i][c];
      }
    }
  }
  return m;
}