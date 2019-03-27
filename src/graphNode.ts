export default class GraphNode {
  identifier: string;
  attributes: {
    [key: string]: any;
  };

  constructor({
    identifier,
    attributes = {}
  }: {
    identifier: string;
    attributes?: object;
  }) {
    this.identifier = identifier;
    this.attributes = attributes;

    Object.keys(attributes).forEach((attr: string) => {
      if (Array.isArray(this.attributes[attr])) return;
      this.attributes[attr] = [this.attributes[attr]];
    });
  }

  removeAttribute = (attr: string) => {
    if (attr in this.attributes) {
      delete this.attributes[attr];
    } else {
      console.log("Attribute not found");
    }
  };
}
