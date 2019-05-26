export type queueObject = {
  object: object,
  priority: number,
}

export default class PriorityQueue {
  public queue:queueObject[];

  constructor() {
    this.queue = []; 
  }

  enqueue = (queueObject:queueObject) => {
    this.queue.push(queueObject);
    this.sortQueue();
  }

  sortQueue = () => {
    this.queue.sort((obj1, obj2) => obj2.priority - obj1.priority);
  }

  dequeue = () => {
    return this.queue.pop();
  }
}