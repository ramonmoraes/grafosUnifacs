class GraphNode {
    constructor({ identifier, attributes }) {
        this.identifier = identifier;
        this.attributes = attributes;
    }
}
const tourists = [
    new GraphNode({ identifier: 'dart', attributes: { lang: 'en' } }),
    new GraphNode({ identifier: 'ismelo', attributes: { lang: 'en' } }),
    new GraphNode({ identifier: 'fgod', attributes: {} }),
    new GraphNode({ identifier: 'murtinha', attributes: {} })
];
class Grafo {
    constructor(nodes) {
        this.links = [];
        this.createLinks = () => {
            this.nodes.forEach((node) => {
                Object.keys(node.attributes).forEach((attr) => {
                    const value = node.attributes[attr];
                    this.nodes.forEach((otherNode) => {
                        if (node === otherNode)
                            return;
                        if (attr in node.attributes && otherNode.attributes[attr] === value) {
                            this.links.push({
                                identifier: attr,
                                connections: [node, otherNode]
                            });
                        }
                    });
                });
            });
            console.table(this.nodes);
            console.table(this.links);
        };
        this.nodes = nodes;
        this.createLinks();
    }
}
new Grafo(tourists);
