interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => T | undefined;
  // peak: () => T | undefined;
  getHead: () => number | undefined;
  getTail: () => number | undefined;
  getSize: () => number;
  getLength: () => number;
  getQueue: () => Array<T | undefined>;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private readonly size: number = 0;
  private container: (T | undefined)[];
  private head: number = 0;
  private tail: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.container[this.head];
    this.container[this.head % this.size] = undefined;
    this.head = this.head + 1 !== this.size ? this.head + 1 : this.head;
    this.length--;
    return item;
  };

  isEmpty = () => this.length === 0;

  getHead = () => this.head;

  getTail = () => this.tail;

  getSize = () => this.size;

  getLength = () => this.length;

  getQueue = (): (T | undefined)[] => this.container;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };
}
