interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | undefined;
  getQueue: () => Array<T | undefined>;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[];
  private head: number = 0;
  private tail: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.container.length) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.container.length;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = undefined;
    this.head = (this.head + 1) % this.container.length;
    this.length--;
  };

  peak = (): T | undefined => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  getQueue = (): (T | undefined)[] => this.container;
}
