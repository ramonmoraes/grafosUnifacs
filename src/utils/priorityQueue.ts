export type queueObject = {
  object: any,
  priority: number,
}

export default class PriorityQueue {
  public queue:queueObject[];
  public dequeued:queueObject[];

  constructor() {
    this.queue = [];
    this.dequeued = []; 
  }

  enqueue = (queueObject:queueObject) => {
    this.queue.push(queueObject);
    this.sortQueue(this.queue);
  }

  sortQueue = (queue: queueObject[]) => {
    queue.sort((obj1, obj2) => obj2.priority - obj1.priority);
  }

  dequeue = () => {
    const obj = this.queue.pop();
    this.dequeued.push(obj);
    return obj;
  }
}