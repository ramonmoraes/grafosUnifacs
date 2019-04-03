import GraphNode from './graphNode';
import Graph from './graph';
import example from '../example.json';

function getGraphFromFilePath(file:any): Graph {
  const nodes = file.nodes.map((n:any) => new GraphNode(n));
  return new Graph(nodes);
}

const g = getGraphFromFilePath(example);
g.createLinks();
console.log(g.links)
