export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  deleteHead: () => T | undefined;
  deleteTail: () => T | undefined;
  getSize: () => number;
  toArray: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(array: Array<T> = []) {
    this.head = null;
    this.size = 0;

    for (const item of array) {
      this.append(item);
    }
  }

  prepend(value: T) {
    const node = new Node(value, this.head);
    this.head = node;
    this.size++;
  }

  append(value: T) {
    const node = new Node(value);
    if (this.head) {
      let curr = this.head;

      while (curr.next) {
        curr = curr.next;
      }

      curr.next = node;
    } else {
      this.head = node;
    }

    this.size++;
  }

  deleteHead(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    const deletedValue = this.head.value;
    this.head = this.head.next;
    this.size--;

    return deletedValue;
  }

  deleteTail() {
    if (!this.head) {
      return undefined;
    } else if (!this.head.next) {
      const deletedValue = this.head.value;
      this.head = null;
      this.size--;
      return deletedValue;
    } else {
      let curr = this.head;
      while (curr.next?.next) {
        curr = curr.next;
      }
      const deletedValue = curr.next!.value;
      curr.next = null;
      this.size--;

      return deletedValue;
    }
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const result: T[] = [];
    let curr = this.head;

    while (curr) {
      result.push(curr.value);
      curr = curr.next;
    }

    return result;
  }
}
