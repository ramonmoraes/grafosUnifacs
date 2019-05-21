import GraphNode from './graphNode';
import Graph, { GraphLinks } from './graph';
import matrix, {getEmptyMatrix, getGraphPositionMap} from './matrix';

import example from '../example.json';

function getGraphFromFilePath(file:any): Graph {
  const nodes = file.nodes.map((n:any) => new GraphNode(n));
  return new Graph(nodes);
}

const g = getGraphFromFilePath(example);
g.createLinks();
const m = matrix(g);
m.forEach(arr => console.log(arr))