interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[];
  private head: number = 0;
  private tail: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.container = Array(size).fill(null);
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

    this.container[this.head] = null;
    this.head = (this.head + 1) % this.container.length;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;
}

export {};
