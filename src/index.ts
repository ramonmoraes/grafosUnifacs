import GraphNode from './graphNode';
import Graph, { GraphLinks } from './graph';
import example from '../example.json';

function getGraphFromFilePath(file:any): Graph {
  const nodes = file.nodes.map((n:any) => new GraphNode(n));
  return new Graph(nodes);
}

const g = getGraphFromFilePath(example);
g.createLinks();

const table = (links: GraphLinks[]) => {
  console.table(
    links.map((x:any) => ({
      identifier: x.identifier,
      value: x.value,
      connections: x.connections.map((n:GraphNode) => n.identifier)
    }))
  )
}

console.log("Tabela completa")
table(g.links)

console.log("Tabela filtrada pelo valor 'fr'")
table(g.links.filter(link => link.value === "fr"));