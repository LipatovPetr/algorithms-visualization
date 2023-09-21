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
  getSize: () => number;
  print: () => void;
}

class LinkedList<T> implements ILinkedList<T> {
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

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}

const list = new LinkedList<number>();
