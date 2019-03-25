import GraphNode from './graphNode';
import Graph from './graph';

const tourists: GraphNode[] = [
  new GraphNode({
    identifier: "dart",
    attributes: { lang: ["en", "fr", "pt", "es"], age: 21 }
  }),
  new GraphNode({
    identifier: "ismelo",
    attributes: { lang: ["en", "fr", "al"], age: 12 }
  })
  // new GraphNode({
  //   identifier: "fgod",
  //   attributes: { lang: ["pt", "fr", "al"] }
  // }),
  // new GraphNode({
  //   identifier: "murtinha",
  //   attributes: { lang: ["es", "fr", "al"] }
  // })
];

new Graph(tourists);