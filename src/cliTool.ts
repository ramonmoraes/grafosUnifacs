import readline from "readline";
import GraphMatrix from "./graphMatrix";
import Graph from "./graph";

export type CliQuestion = {
  msg: string;
  func: Function;
};

export default class CliTool {
  rl: any;
  graphMatrix: GraphMatrix;
  graph: Graph;
  questions: CliQuestion[];

  constructor(graph: Graph) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.graph = graph;
    this.graphMatrix = new GraphMatrix(graph);
  }

  getQuestions = (g: Graph): CliQuestion[] => {
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
      // {msg: "Permita a inserção e a remoção de uma aresta entre 2 vértices", func: g.removeLinkByIdentifier }
    ];
  };

   start = async () => {
    const questions = this.getQuestions(this.graph);
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
      } catch {
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
