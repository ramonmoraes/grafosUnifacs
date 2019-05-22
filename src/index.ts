import GraphNode from './graphNode';
import Graph, { GraphLinks } from './graph';
import adjacentGraphMatrix, {multiplyMatrix} from './matrix';

import example from '../example.json';

function getGraphFromFilePath(file:any): Graph {
  const nodes = file.nodes.map((n:any) => new GraphNode(n));
  return new Graph(nodes);
}

// const g = getGraphFromFilePath(example);
// g.createLinks();
// const m = adjacentGraphMatrix(g);
// m.forEach(arr => console.log(arr))


const m1 = [
  [0, 1],
  [0, 1]
];
const m2 = [
  [0, 0],
  [0, 1]
]

const sample = multiplyMatrix(m1, m2);
console.log(sample)

