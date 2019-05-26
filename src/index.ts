import GraphNode from "./graphNode";
import Graph from "./graph";
import example from "../example.json";
import CliTool from './cliTool';

console.log("Carregando valores de `example.json` no grafo");
function getGraphFromFilePath(file: any): Graph {
  const nodes = file.nodes.map((n: any) => new GraphNode(n));
  return new Graph(nodes);
}

const g = getGraphFromFilePath(example);
g.createLinks();

const cli = new CliTool(g);
cli.start();
