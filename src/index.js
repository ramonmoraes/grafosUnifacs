class GraphNode {
    constructor({ identifier, attributes }) {
        this.removeAttribute = (attr) => {
            if (attr in this.attributes) {
                delete this.attributes[attr];
            }
            else {
                console.log("Attribute not found");
            }
        };
        this.identifier = identifier;
        this.attributes = attributes;
    }
}
const tourists = [
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
class Grafo {
    constructor(nodes) {
        this.links = [];
        this.createLinks = () => {
            this.links = [];
            this.nodes.forEach((node) => {
                Object.keys(node.attributes).forEach((attr) => {
                    const values = Array.isArray(node.attributes[attr])
                        ? node.attributes[attr]
                        : [node.attributes[attr]];
                    this.nodes.forEach((otherNode) => {
                        if (node === otherNode)
                            return;
                        if (attr in node.attributes) {
                            const newArray = Array.isArray(otherNode.attributes[attr])
                                ? otherNode.attributes[attr]
                                : [otherNode.attributes[attr]];
                            values.forEach((val) => {
                                if (newArray.includes(val) || val in newArray) {
                                    this.links.push({
                                        identifier: attr,
                                        connections: [node, otherNode]
                                    });
                                }
                            });
                        }
                    });
                });
            });
            console.table(this.nodes);
            console.table(this.links);
        };
        this.addNode = (node) => {
            this.nodes.push(node);
            this.createLinks();
        };
        this.removeNodeByIdentifier = (identifier) => {
            const newNodes = this.nodes.filter(node => node.identifier != identifier);
            if (newNodes.length == this.nodes.length) {
                console.log("Node not found");
            }
            else {
                this.nodes = newNodes;
                this.createLinks();
            }
        };
        this.removeLinkByIdentifier = (identifier, attr) => {
            const node = this.nodes.filter(node => identifier === identifier);
            if (node.length !== 1) {
                console.log("Node not found");
            }
            else {
                node[0].removeAttribute(attr);
            }
        };
        this.nodes = nodes;
        this.createLinks();
    }
}
const grafera = new Grafo(tourists);
console.log("LINKS: ", grafera.links);
