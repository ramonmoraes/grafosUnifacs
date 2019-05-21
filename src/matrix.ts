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
