import readline from "readline";
import GraphMatrix from "./graphMatrix";
import Graph from "./graph";
import { warshall } from "./matrix";

export type CliQuestion = {
  msg: string;
  func: Function;
};

export default class CliTool {
  rl: any;
  graph: Graph;
  questions: CliQuestion[];

  constructor(graph: Graph) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.graph = graph;
  }

  getv1Questions = (g: Graph): CliQuestion[] => {
    return [
      {
        msg: "Adicionar node",
        func: async (): Promise<string> => {
          const identifier = await stringQuestion(this.rl, "Digite o identificador");
          const langs = await stringQuestion(this.rl, "Digite as linguas separaras por espaço");
          g.addRawNode(identifier, langs.split(" "));
          g.createLinks();
          console.log(g.getNodeByIdentifier(identifier));
          return "Added";
        }
      },
      {
        msg: "Remover node",
        func: async (): Promise<string> => {
          const identifier = await stringQuestion(this.rl, "Digite o identificador");
          g.removeNodeByIdentifier(identifier);
          g.createLinks();
          return "Removed";
        }
      },
      {
        msg: "Obtenha os vértices adjacentes a um determinado vértice",
        func: async (): Promise<string> => {
          const identifier = await stringQuestion(this.rl, "Digite o identificador");
          return `${g.getAdjacentNodesByIdentifier(identifier).map(n => n.identifier)}`;
        }
      },
      {
        msg: "Obtenha o grau de um determinado vértice",
        func: async (): Promise<string> => {
          const identifier = await stringQuestion(this.rl, "Digite o identificador");
          return `Grau: ${g.getNodeOrderByIdentifier(identifier)}`;
        }
      },
      {
        msg: "Obtenha o grau médio, o grau mínimo e o grau máximo",
        func: async (): Promise<string> => `${g.calcGraphOrder()}`
      },
      { msg: "Identifique se o grafo é conexo", func: () => g.breadthFirstSearch() },
      {
        msg: "Identificar a existência de um caminho de Euler",
        func: async (): Promise<string> => `${g.hasEulerianPath()}`
      }
    ];
  };

  getV2Questions = (g: Graph): CliQuestion[] => {
    return [
      {
        msg: "Matrix adjacências",
        func: async (): Promise<string> => {
          const gm = new GraphMatrix(g);
          const matrix = gm.adjacentGraphMatrix({ twoWays: false });
          gm.logMatrix(matrix);
          return "Done";
        }
      },
      {
        msg: "Matrix adjacências de Floyd-Warshall",
        func: async (): Promise<string> => {
          const gm = new GraphMatrix(g);
          const matrix = gm.adjacentGraphMatrix({ twoWays: false });
          gm.logMatrix(warshall(matrix, g.nodes.length));
          // const matrix = new GraphMatrix(g).adjacentGraphMatrix({ twoWays: false });
          // console.log(warshall(matrix, g.nodes.length));
          return "Done";
        }
      },
      {
        msg: "Algoritmo de Bellman-Ford",
        func: async (): Promise<string> => {
          const matrix = new GraphMatrix(g);
          matrix.bellman();
          return "Done";
        }
      },
      {
        msg: "Algoritmo de dijkstra",
        func: async (): Promise<string> => {
          const matrix = new GraphMatrix(g);
          matrix.dijkstra();
          return "Done";
        }
      },
      {
        msg: "Identificar quantos componentes conectados existem no grafo",
        func: async (): Promise<string> => {
          return `Existem ${g.getConnectedNodesAmount()} `;
        }
      },
      {
        msg: "Identificar quantos vértices existem no maior componente",
        func: async (): Promise<string> => {
          const nodeWithMoreConnections = g.getNodeWithMoreConnections()
          return `O maior node é ${nodeWithMoreConnections.node} com ${nodeWithMoreConnections.links} vertices`
        }
      }
    ];
  };

  start = async () => {
    const questions = [...this.getv1Questions(this.graph), ...this.getV2Questions(this.graph)];
    let running = true;
    let resp: string;
    while (running) {
      console.log("-1 - Parar execução");
      questions.forEach((q, i) => console.log(`${i} - ${q.msg}`));
      resp = await stringQuestion(this.rl, "Digite input:");
      if (resp == "-1") {
        running = false;
        this.rl.close();
        break;
      }
      try {
        console.log(await questions[parseInt(resp)].func());
      } catch (err) {
        console.error(err);
        console.log("Valor não encontrado");
      }
    }
  };
}

export function stringQuestion(rl: any, msg: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(msg + "\n", (resp: string) => {
      resolve(resp);
    });
  });
}
