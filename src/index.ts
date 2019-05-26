import GraphNode from "./graphNode";
import Graph from "./graph";
import GraphMatrix from "./graphMatrix";

import example from "../example.json";

function getGraphFromFilePath(file: any): Graph {
  const nodes = file.nodes.map((n: any) => new GraphNode(n));
  return new Graph(nodes);
}

const g = getGraphFromFilePath(example);
g.createLinks();

const gMatrix = new GraphMatrix(g);
gMatrix.dijkstra();
