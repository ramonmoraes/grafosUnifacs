import Graph, { GraphLinks } from './graph';

export function getEmptyMatrix(size: number = 1, defaultValue:any = 0 ) {
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

export default function matrix (graph: Graph, filteredValue:string = "fr"): number[][] {
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
    matrix[pos2][pos1] = 1
  });
  
  matrix.forEach((element: any) => {
    console.log(element)
  });
  return matrix
}
